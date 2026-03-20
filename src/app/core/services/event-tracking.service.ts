import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { EventType } from '../models';
import { ApiService } from './api.service';
import { LocationService } from './location.service';

export interface UserEvent {
  eventType: EventType;
  pageUrl: string;
  buttonName?: string;
  customerId?: string;
  latitude?: number;
  longitude?: number;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {
  private currentPageUrl = '';

  constructor(
    private router: Router,
    private locationService: LocationService,
    private apiService: ApiService
  ) {
    this.initPageTracking();
  }

  private initPageTracking(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentPageUrl = event.urlAfterRedirects;
      this.schedulePageView();
    });
  }

  private schedulePageView(): void {
    if (typeof window === 'undefined') {
      void this.trackPageView();
      return;
    }

    window.setTimeout(() => {
      void this.trackPageView();
    }, 1500);
  }

  private async trackPageView(): Promise<void> {
    this.sendEvent({
      eventType: EventType.PageViewed,
      pageUrl: this.currentPageUrl,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    });
  }

  async trackCallButton(buttonName: string = 'Call Now'): Promise<void> {
    const location = await this.locationService.getLocation();

    this.sendEvent({
      eventType: EventType.CallClicked,
      pageUrl: this.currentPageUrl,
      buttonName,
      latitude: location?.latitude,
      longitude: location?.longitude,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    });
  }

  async trackWhatsAppClick(buttonName: string = 'WhatsApp'): Promise<void> {
    const location = await this.locationService.getLocation();

    this.sendEvent({
      eventType: EventType.WhatsAppClicked,
      pageUrl: this.currentPageUrl,
      buttonName,
      latitude: location?.latitude,
      longitude: location?.longitude,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    });
  }

  async trackBookingFormOpened(): Promise<void> {
    this.sendEvent({
      eventType: EventType.BookingStarted,
      pageUrl: this.currentPageUrl,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    });
  }

  async trackBookingSubmitted(_bookingData: unknown): Promise<void> {
    const location = await this.locationService.getLocation();

    this.sendEvent({
      eventType: EventType.BookingCompleted,
      pageUrl: this.currentPageUrl,
      latitude: location?.latitude,
      longitude: location?.longitude,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    });
  }

  async trackContactFormOpened(): Promise<void> {
    return Promise.resolve();
  }

  async trackContactFormSubmitted(): Promise<void> {
    return Promise.resolve();
  }

  private sendEvent(event: UserEvent): void {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      return;
    }

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const payload = new Blob([JSON.stringify(event)], { type: 'application/json' });
      if (navigator.sendBeacon(`${environment.apiUrl}/events/track`, payload)) {
        return;
      }
    }

    this.apiService.trackEvent(event).subscribe({
      error: () => void event
    });
  }
}
