import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  private readonly publicAuthEndpoints = ['/auth/login', '/auth/register', '/auth/refresh-token'];
  private readonly retryHeader = 'x-auth-retried';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isPublicAuthRequest(request.url)) {
      return next.handle(request);
    }

    const token = this.authService.getToken();

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !!token && !request.headers.has(this.retryHeader)) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private markAsRetried(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        [this.retryHeader]: 'true'
      }
    });
  }

  private isPublicAuthRequest(url: string): boolean {
    return this.publicAuthEndpoints.some(endpoint => url.includes(endpoint));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap(response => {
          this.isRefreshing = false;
          if (response) {
            this.refreshTokenSubject.next(response.token);
            return next.handle(this.markAsRetried(this.addToken(request, response.token)));
          }
          this.refreshTokenSubject.next('');
          this.authService.logout();
          this.router.navigateByUrl('/auth/login');
          return throwError(() => new Error('Session expired'));
        }),
        catchError(error => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next('');
          this.authService.logout();
          this.router.navigateByUrl('/auth/login');
          return throwError(() => error);
        })
      );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => {
        if (token) {
          return next.handle(this.markAsRetried(this.addToken(request, token)));
        }

        return throwError(() => new Error('Session expired'));
      })
    );
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.getErrorMessage(error);
        const errorBody = this.normalizeErrorBody(error.error, errorMessage);
        return throwError(() => new HttpErrorResponse({
          error: errorBody,
          headers: error.headers,
          status: error.status,
          statusText: error.statusText,
          url: error.url || request.url
        }));
      })
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return error.error.message;
    }

    if (error.status === 0) {
      return 'Unable to connect to the server. Showing offline-safe behavior.';
    }

    switch (error.status) {
      case 400:
        return error.error?.message || 'Bad request';
      case 403:
        return 'You do not have permission to perform this action';
      case 404:
        return 'Resource not found';
      case 500:
        return 'Server error. Please try again later';
      default:
        return error.error?.message || `Error: ${error.status}`;
    }
  }

  private normalizeErrorBody(error: unknown, fallbackMessage: string): { [key: string]: unknown } {
    if (typeof error === 'string') {
      return { message: error };
    }

    if (typeof error === 'object' && error !== null) {
      return {
        ...(error as { [key: string]: unknown }),
        message: (error as { message?: string }).message || fallbackMessage
      };
    }

    return { message: fallbackMessage };
  }
}

