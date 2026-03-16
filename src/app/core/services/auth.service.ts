import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: string;
  roleId?: number;
  isActive: boolean;
  lastLoginDate?: Date;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user_data';

  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null
  });

  public authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredAuth();
  }

  private loadStoredAuth(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    const userJson = localStorage.getItem(this.USER_KEY);

    if (token && userJson) {
      const user = JSON.parse(userJson);
      this.authState.next({
        isAuthenticated: true,
        user,
        token,
        refreshToken
      });
    }
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { username, password }).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  register(data: {
    username: string;
    password: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/register`, data).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    this.authState.next({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null
    });

    this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe();
  }

  refreshToken(): Observable<LoginResponse | null> {
    const refreshToken = this.authState.value.refreshToken;
    if (!refreshToken) {
      return of(null);
    }

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/refresh-token`, {
      token: this.authState.value.token,
      refreshToken
    }).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => {
        console.error('Token refresh error:', error);
        this.logout();
        return of(null);
      })
    );
  }

  getToken(): string | null {
    return this.authState.value.token;
  }

  getUser(): User | null {
    return this.authState.value.user;
  }

  isAuthenticated(): boolean {
    return this.authState.value.isAuthenticated;
  }

  hasRole(role: string | string[]): boolean {
    const user = this.authState.value.user;
    if (!user) return false;

    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  }

  hasPermission(permission: string): boolean {
    const user = this.authState.value.user;
    if (!user) return false;

    const permissions = this.getPermissionsForRole(user.role);
    return permissions.includes(permission);
  }

  private getPermissionsForRole(role: string): string[] {
    const rolePermissions: { [key: string]: string[] } = {
      'SuperAdmin': ['View', 'Create', 'Update', 'Delete', 'Export', 'ViewEncrypted', 'ModifyEncrypted'],
      'Admin': ['View', 'Create', 'Update', 'Delete', 'Export', 'ViewEncrypted'],
      'Support': ['View', 'Create', 'Update'],
      'Technician': ['View', 'Update']
    };
    return rolePermissions[role] || [];
  }

  private handleAuthResponse(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));

    this.authState.next({
      isAuthenticated: true,
      user: response.user,
      token: response.token,
      refreshToken: response.refreshToken
    });
  }

  getCurrentUser(): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/auth/me`).pipe(
      tap(user => {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        const currentState = this.authState.value;
        this.authState.next({ ...currentState, user });
      }),
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }
}

