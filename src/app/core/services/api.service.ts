import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // Generic GET request
  get<T>(endpoint: string, params?: Record<string, string>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
      params: httpParams
    });
  }

  // Generic POST request
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {
      headers: this.getHeaders()
    });
  }

  // Generic PUT request
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, {
      headers: this.getHeaders()
    });
  }

  // Generic DELETE request
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders()
    });
  }

  // Auth endpoints
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.post('auth/login', credentials);
  }

  // Customer endpoints
  getCustomers(): Observable<any> {
    return this.get('customers');
  }

  createCustomer(customer: any): Observable<any> {
    return this.post('customers', customer);
  }

  // Service Request endpoints
  getServiceRequests(): Observable<any> {
    return this.get('service-requests');
  }

  createServiceRequest(request: any): Observable<any> {
    return this.post('service-requests', request);
  }

  // Booking endpoints
  submitBooking(booking: any): Observable<any> {
    return this.post('bookings', booking);
  }

  // Analytics endpoints
  trackEvent(event: any): Observable<any> {
    return this.post('events/track', event);
  }

  getAnalytics(): Observable<any> {
    return this.get('analytics');
  }
}

