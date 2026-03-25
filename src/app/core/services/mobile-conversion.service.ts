import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Service } from '../models';

export type MobileServiceSortMode = 'popularity' | 'price' | 'availability';

export interface MobileBookingProgress {
  currentStep: number;
  hasDraft: boolean;
  hasReceipt: boolean;
  requestNo?: string;
  totalSteps: number;
}

export interface MobileStickyAction {
  fragment?: string;
  label: 'Book Now' | 'Continue Booking' | 'Track Service';
  link: string;
  queryParams: Params | null;
  visible: boolean;
}

export interface MobileAnalyticsHook {
  action: string;
  atUtc: string;
  category: 'step' | 'cta';
  context: string;
  durationMs?: number;
  step?: number;
}

interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class MobileConversionService {
  private readonly analyticsStorageKey = 'coolzo_mobile_analytics_hooks';
  private readonly serviceHintStorageKey = 'coolzo_mobile_service_hint';
  private readonly stepStartTimes = new Map<number, number>();

  private readonly bookingProgressSubject = new BehaviorSubject<MobileBookingProgress>({
    currentStep: 1,
    hasDraft: false,
    hasReceipt: false,
    totalSteps: 3
  });
  private readonly globalCTAVisibilitySubject = new BehaviorSubject<boolean>(true);
  private readonly analyticsSubject = new Subject<MobileAnalyticsHook>();

  readonly analyticsHooks$ = this.analyticsSubject.asObservable();
  readonly bookingProgress$ = this.bookingProgressSubject.asObservable();
  readonly isGlobalCTAVisible$ = this.globalCTAVisibilitySubject.asObservable();

  private readonly cityCoordinates: Record<string, GeoCoordinate> = {
    ahmedabad: { latitude: 23.0225, longitude: 72.5714 },
    bengaluru: { latitude: 12.9716, longitude: 77.5946 },
    bangalore: { latitude: 12.9716, longitude: 77.5946 },
    chennai: { latitude: 13.0827, longitude: 80.2707 },
    delhi: { latitude: 28.6139, longitude: 77.209 },
    gurgaon: { latitude: 28.4595, longitude: 77.0266 },
    hyderabad: { latitude: 17.385, longitude: 78.4867 },
    kolkata: { latitude: 22.5726, longitude: 88.3639 },
    mumbai: { latitude: 19.076, longitude: 72.8777 },
    noida: { latitude: 28.5355, longitude: 77.391 },
    pune: { latitude: 18.5204, longitude: 73.8567 }
  };

  get bookingProgress(): MobileBookingProgress {
    return this.bookingProgressSubject.value;
  }

  updateBookingProgress(partial: Partial<MobileBookingProgress>): void {
    const current = this.bookingProgressSubject.value;
    this.bookingProgressSubject.next({
      ...current,
      ...partial
    });
  }

  clearBookingProgress(): void {
    this.bookingProgressSubject.next({
      currentStep: 1,
      hasDraft: false,
      hasReceipt: false,
      totalSteps: 3
    });
    this.stepStartTimes.clear();
  }

  setGlobalCTAVisibility(isVisible: boolean): void {
    this.globalCTAVisibilitySubject.next(!!isVisible);
  }

  get isGlobalCTAVisible(): boolean {
    return this.globalCTAVisibilitySubject.value;
  }

  getStickyAction(currentUrl: string, selectedCity: string): MobileStickyAction {
    const normalizedUrl = `${currentUrl ?? ''}`.split('?')[0].split('#')[0] || '/';
    const queryParams = selectedCity ? { city: selectedCity } : null;
    const progress = this.bookingProgress;
    const isBookingRoute = normalizedUrl.startsWith('/booking') || normalizedUrl.startsWith('/book-service');

    if (isBookingRoute) {
      if (progress.hasReceipt) {
        return {
          label: 'Track Service',
          link: '/booking',
          fragment: 'tracker',
          queryParams: null,
          visible: true
        };
      }

      return {
        label: 'Continue Booking',
        link: '/booking',
        queryParams,
        visible: false
      };
    }

    if (progress.hasReceipt) {
      return {
        label: 'Track Service',
        link: '/booking',
        fragment: 'tracker',
        queryParams: null,
        visible: true
      };
    }

    if (progress.hasDraft && progress.currentStep > 1) {
      return {
        label: 'Continue Booking',
        link: '/booking',
        queryParams,
        visible: true
      };
    }

    return {
      label: 'Book Now',
      link: '/booking',
      queryParams,
      visible: true
    };
  }

  getServiceCategories(services: Service[]): string[] {
    const categories = services.map(service => this.deriveCategory(service));
    return ['All', ...Array.from(new Set(categories))];
  }

  filterAndSortServices(services: Service[], category: string, sortMode: MobileServiceSortMode): Service[] {
    const filtered = category === 'All'
      ? [...services]
      : services.filter(service => this.deriveCategory(service) === category);

    return [...filtered].sort((left, right) => this.sortComparator(left, right, sortMode));
  }

  getRecommendedServices(services: Service[], selectedServiceId?: string, entryHint: string = ''): Service[] {
    const normalizedServiceId = `${selectedServiceId ?? ''}`.trim();
    const selectedService = normalizedServiceId
      ? services.find(service => service.id === normalizedServiceId)
      : undefined;
    const entryHintCategory = this.deriveCategoryFromHint(entryHint);
    const preferredCategory = selectedService
      ? this.deriveCategory(selectedService)
      : entryHintCategory;

    const candidateServices = preferredCategory
      ? services.filter(service => this.deriveCategory(service) === preferredCategory)
      : [...services];

    return [...candidateServices]
      .sort((left, right) => this.sortComparator(left, right, 'popularity'))
      .slice(0, 3);
  }

  isMostBooked(service: Service): boolean {
    return this.getPopularityScore(service) >= 75;
  }

  isFastService(service: Service): boolean {
    const normalizedCopy = this.getServiceCopy(service);
    return /fast|quick|urgent|same day|express|instant|24x7/.test(normalizedCopy)
      || this.getAvailabilityScore(service) >= 70;
  }

  rememberServiceHint(serviceId: string): void {
    if (typeof sessionStorage === 'undefined') {
      return;
    }

    const normalizedServiceId = `${serviceId ?? ''}`.trim();
    if (!normalizedServiceId) {
      return;
    }

    sessionStorage.setItem(this.serviceHintStorageKey, normalizedServiceId);
  }

  readRememberedServiceHint(): string {
    if (typeof sessionStorage === 'undefined') {
      return '';
    }

    return `${sessionStorage.getItem(this.serviceHintStorageKey) ?? ''}`.trim();
  }

  clearRememberedServiceHint(): void {
    if (typeof sessionStorage === 'undefined') {
      return;
    }

    sessionStorage.removeItem(this.serviceHintStorageKey);
  }

  findNearestCity(
    latitude: number,
    longitude: number,
    availableCities: string[]
  ): string {
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return '';
    }

    const normalizedCities = availableCities
      .map(city => `${city ?? ''}`.trim())
      .filter(Boolean);

    let nearestCity = '';
    let nearestDistance = Number.POSITIVE_INFINITY;

    normalizedCities.forEach(city => {
      const coordinate = this.resolveCoordinate(city);
      if (!coordinate) {
        return;
      }

      const distance = this.getDistanceInKm(latitude, longitude, coordinate.latitude, coordinate.longitude);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestCity = city;
      }
    });

    return nearestDistance <= 140 ? nearestCity : '';
  }

  startStepTimer(step: number, context = 'mobile-booking-funnel'): void {
    this.stepStartTimes.set(step, Date.now());
    this.pushAnalyticsHook({
      action: 'step_view',
      category: 'step',
      context,
      step
    });
  }

  completeStepTimer(step: number, context = 'mobile-booking-funnel'): number {
    const startedAt = this.stepStartTimes.get(step);
    const durationMs = startedAt ? Date.now() - startedAt : 0;
    this.stepStartTimes.delete(step);

    this.pushAnalyticsHook({
      action: 'step_complete',
      category: 'step',
      context,
      durationMs,
      step
    });

    return durationMs;
  }

  recordStepDropOff(step: number, context = 'mobile-booking-funnel'): void {
    this.pushAnalyticsHook({
      action: 'step_dropoff',
      category: 'step',
      context,
      step
    });
  }

  recordCtaClick(action: string, context = 'mobile-cta'): void {
    this.pushAnalyticsHook({
      action,
      category: 'cta',
      context
    });
  }

  private sortComparator(left: Service, right: Service, sortMode: MobileServiceSortMode): number {
    if (sortMode === 'price') {
      const leftPrice = this.parsePrice(left.price);
      const rightPrice = this.parsePrice(right.price);
      return leftPrice - rightPrice || left.name.localeCompare(right.name);
    }

    if (sortMode === 'availability') {
      return this.getAvailabilityScore(right) - this.getAvailabilityScore(left)
        || this.getPopularityScore(right) - this.getPopularityScore(left);
    }

    return this.getPopularityScore(right) - this.getPopularityScore(left)
      || this.getAvailabilityScore(right) - this.getAvailabilityScore(left);
  }

  private deriveCategory(service: Service): string {
    const text = this.getServiceCopy(service);

    if (/install|installation|fit|setup/.test(text)) {
      return 'Installation';
    }

    if (/repair|fix|breakdown|fault|not cooling/.test(text)) {
      return 'Repair';
    }

    if (/maint|service|tune|preventive/.test(text)) {
      return 'Maintenance';
    }

    if (/clean|deep clean|wash/.test(text)) {
      return 'Cleaning';
    }

    if (/amc|contract|annual/.test(text)) {
      return 'AMC';
    }

    return 'General';
  }

  private deriveCategoryFromHint(entryHint: string): string {
    const normalizedHint = `${entryHint ?? ''}`.trim().toLowerCase();
    if (!normalizedHint) {
      return '';
    }

    if (normalizedHint.includes('install')) {
      return 'Installation';
    }

    if (normalizedHint.includes('repair') || normalizedHint.includes('fix')) {
      return 'Repair';
    }

    if (normalizedHint.includes('clean')) {
      return 'Cleaning';
    }

    if (normalizedHint.includes('amc') || normalizedHint.includes('annual')) {
      return 'AMC';
    }

    if (normalizedHint.includes('service') || normalizedHint.includes('maint')) {
      return 'Maintenance';
    }

    return '';
  }

  private getPopularityScore(service: Service): number {
    const copy = this.getServiceCopy(service);
    let score = 30;

    if (/repair|service|maintenance/.test(copy)) {
      score += 20;
    }

    if (/split|window|inverter/.test(copy)) {
      score += 10;
    }

    score += Math.min(20, service.features.length * 4);

    const parsedPrice = this.parsePrice(service.price);
    if (parsedPrice <= 999) {
      score += 12;
    } else if (parsedPrice <= 1999) {
      score += 8;
    } else if (parsedPrice <= 2999) {
      score += 4;
    }

    return Math.min(100, score);
  }

  private getAvailabilityScore(service: Service): number {
    const copy = this.getServiceCopy(service);
    let score = 50;

    if (/fast|quick|urgent|same day|express/.test(copy)) {
      score += 20;
    }

    if (/inspection|diagnosis/.test(copy)) {
      score += 8;
    }

    score += Math.min(16, service.features.length * 3);
    return Math.min(100, score);
  }

  private parsePrice(rawPrice: string): number {
    const numeric = Number.parseFloat(`${rawPrice ?? ''}`.replace(/[^0-9.]/g, ''));
    return Number.isFinite(numeric) ? numeric : Number.POSITIVE_INFINITY;
  }

  private getServiceCopy(service: Service): string {
    const values = [
      service.name,
      service.shortDescription,
      service.description,
      ...(service.features ?? [])
    ];
    return values
      .join(' ')
      .toLowerCase();
  }

  private resolveCoordinate(city: string): GeoCoordinate | null {
    const normalizedCity = city.toLowerCase();
    const direct = this.cityCoordinates[normalizedCity];
    if (direct) {
      return direct;
    }

    const matchedKey = Object.keys(this.cityCoordinates).find(key => normalizedCity.includes(key));
    return matchedKey ? this.cityCoordinates[matchedKey] : null;
  }

  private getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRadians = (value: number) => value * (Math.PI / 180);
    const earthRadiusKm = 6371;
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2)
      + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2))
      * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
  }

  private pushAnalyticsHook(hook: Omit<MobileAnalyticsHook, 'atUtc'>): void {
    const resolvedHook: MobileAnalyticsHook = {
      ...hook,
      atUtc: new Date().toISOString()
    };

    this.analyticsSubject.next(resolvedHook);

    if (typeof sessionStorage === 'undefined') {
      return;
    }

    try {
      const existing = JSON.parse(sessionStorage.getItem(this.analyticsStorageKey) || '[]') as MobileAnalyticsHook[];
      existing.push(resolvedHook);
      const bounded = existing.slice(-200);
      sessionStorage.setItem(this.analyticsStorageKey, JSON.stringify(bounded));
    } catch {
      sessionStorage.setItem(this.analyticsStorageKey, JSON.stringify([resolvedHook]));
    }
  }
}
