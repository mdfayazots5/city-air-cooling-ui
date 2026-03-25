import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface ConsentCategory {
  id: string;
  name: string;
  description: string;
  isRequired: boolean;
}

export interface ConsentState {
  hasGivenConsent: boolean;
  consentId?: string;
  categories: { [key: string]: boolean };
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private readonly STORAGE_KEY = 'coolzo_cookie_consent';
  private readonly CONSENT_CATEGORIES: ConsentCategory[] = [
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      description: 'Required for core website functionality and cannot be rejected.',
      isRequired: true
    },
    {
      id: 'preferences',
      name: 'Preferences',
      description: 'Customize how the website looks and behaves for each user.',
      isRequired: false
    },
    {
      id: 'analytics',
      name: 'Analytical',
      description: 'Help us improve our website by collecting usage information.',
      isRequired: false
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Track visitors for relevant and engaging advertisements.',
      isRequired: false
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Additional non-categorized cookies.',
      isRequired: false
    }
  ];

  private consentState$ = new BehaviorSubject<ConsentState | null>(this.loadConsentState());
  private showBanner$ = new BehaviorSubject<boolean>(this.shouldShowBanner());

  constructor(private http: HttpClient) {
    this.initializeConsent();
  }

  /**
   * Get consent state as observable
   */
  getConsentState$(): Observable<ConsentState | null> {
    return this.consentState$.asObservable();
  }

  /**
   * Get banner visibility state
   */
  shouldShowBanner$(): Observable<boolean> {
    return this.showBanner$.asObservable();
  }

  /**
   * Get available consent categories
   */
  getCategories(): ConsentCategory[] {
    return this.CONSENT_CATEGORIES;
  }

  /**
   * Accept all cookies
   */
  acceptAllCookies(): void {
    const categories: { [key: string]: boolean } = {};
    this.CONSENT_CATEGORIES.forEach(cat => {
      categories[cat.id] = true;
    });

    this.saveConsent(categories);
    this.showBanner$.next(false);
  }

  /**
   * Deny all non-required cookies
   */
  denyAllCookies(): void {
    const categories: { [key: string]: boolean } = {};
    this.CONSENT_CATEGORIES.forEach(cat => {
      categories[cat.id] = cat.isRequired; // Only accept necessary
    });

    this.saveConsent(categories);
    this.showBanner$.next(false);
  }

  /**
   * Save custom consent preferences
   */
  saveConsent(categories: { [key: string]: boolean }): void {
    const consentState: ConsentState = {
      hasGivenConsent: true,
      categories,
      timestamp: Date.now()
    };

    // Save to localStorage
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(consentState));
    } catch (e) {
      console.warn('Failed to save consent to localStorage:', e);
    }

    // Save to backend via API
    this.http.post('/api/public/cookie-consent', consentState)
      .subscribe({
        error: (err) => console.warn('Failed to save consent to backend:', err)
      });

    this.consentState$.next(consentState);
    this.showBanner$.next(false);
  }

  /**
   * Update specific consent category
   */
  updateCategory(categoryId: string, accepted: boolean): void {
    const current = this.consentState$.value;
    if (!current) return;

    const category = this.CONSENT_CATEGORIES.find(c => c.id === categoryId);
    if (category?.isRequired) {
      console.warn(`Cannot modify required category: ${categoryId}`);
      return;
    }

    current.categories[categoryId] = accepted;
    this.saveConsent(current.categories);
  }

  /**
   * Check if specific category is accepted
   */
  isCategoryAccepted(categoryId: string): boolean {
    const current = this.consentState$.value;
    return current?.categories[categoryId] ?? this.getRequiredByDefault(categoryId);
  }

  /**
   * Revoke all consent and show banner again
   */
  revokeConsent(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to remove consent from localStorage:', e);
    }

    this.consentState$.next(null);
    this.showBanner$.next(true);

    // Notify backend
    this.http.post('/api/public/cookie-consent/revoke', {})
      .subscribe({
        error: (err) => console.warn('Failed to revoke consent on backend:', err)
      });
  }

  /**
   * Get current banner visibility
   */
  getCurrentShowBanner(): boolean {
    return this.showBanner$.value;
  }

  /**
   * Private helper to load consent from storage
   */
  private loadConsentState(): ConsentState | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.warn('Failed to load consent from localStorage:', e);
      return null;
    }
  }

  /**
   * Private helper to determine if banner should show
   */
  private shouldShowBanner(): boolean {
    return this.loadConsentState() === null;
  }

  /**
   * Private helper to get default required status
   */
  private getRequiredByDefault(categoryId: string): boolean {
    const category = this.CONSENT_CATEGORIES.find(c => c.id === categoryId);
    return category?.isRequired ?? false;
  }

  /**
   * Initialize consent state on service creation
   */
  private initializeConsent(): void {
    // If no prior consent exists, banner will show automatically
    // If prior consent exists, banner will be hidden
  }
}
