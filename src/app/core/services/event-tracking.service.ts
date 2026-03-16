import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LocationService } from './location.service';
import { ApiService } from './api.service';

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

export type EventType = 
  | 'CallButtonClicked'
  | 'WhatsAppClicked'
  | 'BookingFormOpened'
  | 'BookingSubmitted'
  | 'PageViewed'
  | 'ContactFormOpened'
  | 'ContactFormSubmitted';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {
  private currentPageUrl: string = '';

  constructor(
    private router: Router,
    private locationService: LocationService,
    private apiService: ApiService
  ) {
    this.initPageTracking();
  }

  private initPageTracking(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentPageUrl = event.urlAfterRedirects;
      this.trackPageView();
    });
  }

  private async trackPageView(): Promise<void> {
    const location = await this.locationService.getLocation();
    
    const event: UserEvent = {
      eventType: 'PageViewed',
      pageUrl: this.currentPageUrl,
      latitude: location?.latitude,
      longitude: location?.longitude,
      userAgent: navigator.userAgent
    };

    this.sendEvent(event);
  }

  async trackCallButton(buttonName: string = 'Call Now'): Promise<void> {
    const location = await this.locationService.getLocation();
    
    const event: UserEvent = {
      eventType: 'CallButtonClicked',
      pageUrl: this.currentPageUrl,
      buttonName: buttonName,
      latitude: location?.latitude,
      longitude: location?.longitude,
      userAgent: navigator.userAgent
    };

    this.sendEvent(event);
  }

  async trackWhatsAppClick(buttonName: string = 'WhatsApp'): Promise<void> {
    const location = await this.locationService.getLocation();
    
    const event: UserEvent = {
      eventType: 'WhatsAppClicked',
      pageUrl: this.currentPageUrl,
      buttonName: buttonName,
      latitude: location?.latitude,
      longitude: location?.longitude,
      userAgent: navigator.userAgent
    };

    this.sendEvent(event);
  }

  async trackBookingFormOpened(): Promise<void> {
    const location = await this.locationService.getLocation();
    
    const event: UserEvent = {
      eventType: 'BookingFormOpened',
      pageUrl: this.currentPageUrl,
      latitude: location?.latitude,
      longitude: location?.longitude,
      userAgent: navigator.userAgent
    };

    this.sendEvent(event);
  }

  async trackBookingSubmitted(bookingData: any): Promise<void> {
    const location = await this.locationService.getLocation();
    
    const event: UserEvent = {
      eventType: 'BookingSubmitted',
      pageUrl: this.currentPageUrl,
      latitude: location?.latitude,
      longitude: location?.longitude,
      userAgent: navigator.userAgent
    };

    this.sendEvent(event);
  }

  async trackContactFormOpened(): Promise<void> {
    const location = await this.locationService.getLocation();
    
    const event: UserEvent = {
      eventType: 'ContactFormOpened',
      pageUrl: this.currentPageUrl,
      latitude: location?.latitude,
      longitude: location?.longitude,
      userAgent: navigator.userAgent
    };

    this.sendEvent(event);
  }

  async trackContactFormSubmitted(): Promise<void> {
    const location = await this.locationService.getLocation();
    
    const event: UserEvent = {
      eventType: 'ContactFormSubmitted',
      pageUrl: this.currentPageUrl,
      latitude: location?.latitude,
      longitude: location?.longitude,
      userAgent: navigator.userAgent
    };

    this.sendEvent(event);
  }

  private sendEvent(event: UserEvent): void {
    // Log to console in development
    console.log('📊 Event Tracked:', event);

    // Send to API (non-blocking)
    this.apiService.trackEvent(event).subscribe({
      next: () => console.log('Event sent to server'),
      error: (err) => console.warn('Failed to send event:', err)
    });
  }
}

