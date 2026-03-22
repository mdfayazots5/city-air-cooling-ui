import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  BookingHeatmapPoint,
  ContactHistory,
  EmailSettings,
  MasterDataBundle,
  MasterDataCollection,
  PricingQuote,
  ReviewCreateRequest,
  ReviewData,
  ReviewSummary,
  RevenueAnalytics,
  ServiceRequest,
  ServiceRequestLiveStatus,
  StatusHistory,
  SiteConfig,
  SystemSettings,
  Technician,
  TechnicianPerformanceMetric,
  WhatsAppSettings
} from '../models';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  errors: string[];
}

export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ServiceRequestAssignmentPayload {
  technicianId: number;
  scheduledTime: string | Date;
}

export interface ServiceRequestStatusPayload {
  status: string;
  notes?: string;
}

export interface BookingRequest {
  name: string;
  phone: string;
  serviceType: string;
  serviceCode?: string;
  address: string;
  preferredDate?: string | Date | null;
  source: string;
  email?: string;
  acBrand?: string;
  issue?: string;
  city?: string;
  urgency?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingId: number;
  requestNo: string;
  status: string;
  leadStatus: string;
  city: string;
  urgency: string;
  estimatedPrice: number;
  etaMinutes: number;
  autoAssigned: boolean;
  assignedTechnicianName: string;
}

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

  private unwrapResponse<T>(response: ApiResponse<T>): T {
    if (!response?.success) {
      const message = response?.message || 'Request failed';
      const errors = response?.errors ?? [];
      throw new Error([message, ...errors].filter(Boolean).join(' | '));
    }

    return response.data;
  }

  get<T>(endpoint: string, params?: Record<string, string | number | boolean | null | undefined>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value === null || value === undefined || value === '') {
          return;
        }

        httpParams = httpParams.set(key, `${value}`);
      });
    }

    return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
      params: httpParams
    }).pipe(
      map(response => this.unwrapResponse(response))
    );
  }

  post<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, body, {
      headers: this.getHeaders()
    }).pipe(
      map(response => this.unwrapResponse(response))
    );
  }

  put<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, body, {
      headers: this.getHeaders()
    }).pipe(
      map(response => this.unwrapResponse(response))
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders()
    }).pipe(
      map(response => this.unwrapResponse(response))
    );
  }

  login(credentials: { username: string; password: string }): Observable<unknown> {
    return this.post('auth/login', credentials);
  }

  getCustomers(): Observable<unknown> {
    return this.get('customers');
  }

  getCustomerContactHistory(customerId: number): Observable<ContactHistory[]> {
    return this.get(`customers/${customerId}/history`);
  }

  getCustomerBookings(customerId: number): Observable<ServiceRequest[]> {
    return this.get(`customers/${customerId}/bookings`);
  }

  createCustomer(customer: unknown): Observable<unknown> {
    return this.post('customers', customer);
  }

  getServiceRequests(params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    city?: string;
    assignedTechnicianId?: number;
  }): Observable<unknown> {
    return this.get('service-requests', params);
  }

  getMyTechnicianTickets(params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    city?: string;
  }): Observable<unknown> {
    return this.get('technicians/me/tickets', params);
  }

  createServiceRequest(request: unknown): Observable<unknown> {
    return this.post('service-requests', request);
  }

  assignServiceRequest(requestId: number, assignment: ServiceRequestAssignmentPayload): Observable<unknown> {
    return this.put(`service-requests/${requestId}/assign`, {
      technicianId: assignment.technicianId,
      scheduledTime: assignment.scheduledTime
    });
  }

  updateServiceRequestStatus(requestId: number, payload: ServiceRequestStatusPayload): Observable<unknown> {
    return this.put(`service-requests/${requestId}/status`, payload);
  }

  getServiceRequestHistory(requestId: number): Observable<StatusHistory[]> {
    return this.get(`service-requests/${requestId}/history`);
  }

  getServiceRequestLiveStatus(requestId: number, requestNo: string): Observable<ServiceRequestLiveStatus> {
    return this.get(`service-requests/${requestId}/live-status`, { requestNo });
  }

  autoAssignServiceRequest(requestId: number, payload?: { scheduledTime?: string | Date | null; allowOverride?: boolean; }): Observable<ServiceRequest> {
    return this.post(`service-requests/${requestId}/auto-assign`, {
      scheduledTime: payload?.scheduledTime || undefined,
      allowOverride: payload?.allowOverride ?? false
    });
  }

  getAvailableTechnicians(date?: string, city?: string, serviceCode?: string): Observable<Technician[]> {
    return this.get('technicians/available', {
      date,
      city,
      serviceCode
    });
  }

  getCustomerInvoices(customerId: number): Observable<unknown> {
    return this.get(`invoices/customer/${customerId}`);
  }

  submitBooking(booking: BookingRequest): Observable<BookingResponse> {
    return this.post('bookings', booking);
  }

  getPricingQuote(params: {
    serviceType: string;
    serviceDate?: string | Date | null;
    urgency?: string;
    city?: string;
  }): Observable<PricingQuote> {
    return this.get('pricing/quote', {
      serviceType: params.serviceType,
      serviceDate: params.serviceDate instanceof Date ? params.serviceDate.toISOString() : params.serviceDate,
      urgency: params.urgency,
      city: params.city
    });
  }

  submitReview(review: ReviewCreateRequest): Observable<ReviewData> {
    return this.post('reviews', review);
  }

  getReviews(publicOnly: boolean = true, take: number = 20): Observable<ReviewData[]> {
    return this.get('reviews', { publicOnly, take });
  }

  getReviewSummary(take: number = 5): Observable<ReviewSummary> {
    return this.get('reviews/summary', { take });
  }

  trackEvent(event: unknown): Observable<unknown> {
    return this.post('events/track', event);
  }

  getAnalytics(): Observable<unknown> {
    return this.get('analytics/overview');
  }

  getRevenueAnalytics(params?: {
    startDate?: string;
    endDate?: string;
    city?: string;
  }): Observable<RevenueAnalytics> {
    return this.get('analytics/revenue', params);
  }

  getTechnicianPerformance(params?: {
    startDate?: string;
    endDate?: string;
    city?: string;
  }): Observable<TechnicianPerformanceMetric[]> {
    return this.get('analytics/technicians', params);
  }

  getBookingHeatmap(days: number = 30): Observable<BookingHeatmapPoint[]> {
    return this.get('analytics/heatmap', { days });
  }

  getPublicSiteConfig(): Observable<SiteConfig> {
    return this.get('settings/public-site');
  }

  getMasters(type: string): Observable<MasterDataCollection> {
    return this.get<MasterDataBundle>('public-masters', { types: type }).pipe(
      map(bundle => this.toMasterCollection(type, bundle))
    );
  }

  getAllMasters(): Observable<MasterDataBundle> {
    return this.get('public-masters');
  }

  getSystemSettings(): Observable<SystemSettings> {
    return this.get('settings/system');
  }

  updateSystemSettings(settings: SystemSettings): Observable<SystemSettings> {
    return this.put('settings/system', settings);
  }

  getWhatsAppSettings(): Observable<WhatsAppSettings> {
    return this.get('settings/whatsapp');
  }

  updateWhatsAppSettings(settings: Partial<WhatsAppSettings> & { providerName: string; apiUrl: string; senderNumber: string; }): Observable<WhatsAppSettings> {
    return this.put('settings/whatsapp', settings);
  }

  getEmailSettings(): Observable<EmailSettings> {
    return this.get('settings/email');
  }

  updateEmailSettings(settings: {
    smtpHost: string;
    smtpPort: number;
    username: string;
    password: string;
    enableSsl: boolean;
  }): Observable<EmailSettings> {
    return this.put('settings/email', settings);
  }

  private toMasterCollection(masterType: string, bundle: MasterDataBundle | null | undefined): MasterDataCollection {
    const normalizedMasterType = `${masterType ?? ''}`.trim();
    const masters = bundle?.masters ?? {};
    const matchedEntry = Object.entries(masters).find(([key]) => key.toLowerCase() === normalizedMasterType.toLowerCase());

    return {
      masterType: matchedEntry?.[0] || normalizedMasterType,
      generatedAtUtc: bundle?.generatedAtUtc || '',
      items: matchedEntry?.[1] ?? []
    };
  }
}
