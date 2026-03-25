import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';

type DeviceCategory = 'mobile' | 'tablet' | 'desktop';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private readonly mobileBreakpoint = 768;
  private readonly tabletBreakpoint = 1024;
  private readonly landscapePhoneMaxDimension = 932;
  private readonly landscapePhoneMaxMinorDimension = 500;

  private readonly isMobileSubject = new BehaviorSubject<boolean>(false);
  private readonly isTabletSubject = new BehaviorSubject<boolean>(false);
  private readonly isDesktopSubject = new BehaviorSubject<boolean>(true);

  readonly isMobile$ = this.isMobileSubject.asObservable();
  readonly isTablet$ = this.isTabletSubject.asObservable();
  readonly isDesktop$ = this.isDesktopSubject.asObservable();

  constructor(private readonly ngZone: NgZone) {
    this.updateDeviceState();
    this.bindResizeListener();
  }

  get isMobile(): boolean {
    return this.isMobileSubject.value;
  }

  get isTablet(): boolean {
    return this.isTabletSubject.value;
  }

  get isDesktop(): boolean {
    return this.isDesktopSubject.value;
  }

  private bindResizeListener(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize').pipe(
        auditTime(120)
      ).subscribe(() => {
        this.ngZone.run(() => this.updateDeviceState());
      });
    });
  }

  private updateDeviceState(): void {
    const category = this.resolveDeviceCategory();
    this.isMobileSubject.next(category === 'mobile');
    this.isTabletSubject.next(category === 'tablet');
    this.isDesktopSubject.next(category === 'desktop');
  }

  private resolveDeviceCategory(): DeviceCategory {
    const viewportWidth = this.getViewportWidth();
    const viewportHeight = this.getViewportHeight();
    const userAgent = this.getUserAgent();
    const isTabletUserAgent = /ipad|tablet|kindle|playbook|silk|android(?!.*mobile)/i.test(userAgent);
    const isMobileUserAgent = /android|webos|iphone|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
    const isCoarsePointer = this.hasCoarsePointer();
    const minorDimension = Math.min(viewportWidth, viewportHeight);
    const majorDimension = Math.max(viewportWidth, viewportHeight);
    const isLikelyLandscapePhone = minorDimension > 0
      && majorDimension > 0
      && minorDimension <= this.landscapePhoneMaxMinorDimension
      && majorDimension <= this.landscapePhoneMaxDimension
      && (isMobileUserAgent || isCoarsePointer);

    if (viewportWidth <= 0) {
      if (isTabletUserAgent) {
        return 'tablet';
      }

      if (isMobileUserAgent) {
        return 'mobile';
      }

      return 'desktop';
    }

    if (viewportWidth <= this.mobileBreakpoint) {
      return 'mobile';
    }

    if (isLikelyLandscapePhone) {
      return 'mobile';
    }

    if (viewportWidth > this.tabletBreakpoint) {
      return 'desktop';
    }

    return 'tablet';
  }

  private getViewportWidth(): number {
    if (typeof window === 'undefined') {
      return this.tabletBreakpoint + 1;
    }

    return window.innerWidth;
  }

  private getViewportHeight(): number {
    if (typeof window === 'undefined') {
      return this.tabletBreakpoint + 1;
    }

    return window.innerHeight;
  }

  private hasCoarsePointer(): boolean {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(pointer: coarse)').matches;
  }

  private getUserAgent(): string {
    if (typeof navigator === 'undefined') {
      return '';
    }

    return navigator.userAgent || '';
  }
}
