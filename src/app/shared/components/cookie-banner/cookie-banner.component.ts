import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CookieConsentService, ConsentCategory } from '../../../core/services/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="cookie-banner" 
      *ngIf="showBanner$ | async"
      [@bannerAnimation]
      role="banner"
      aria-label="Cookie consent banner"
    >
      <div class="cookie-banner__container">
        <!-- Main Banner -->
        <div *ngIf="!showSettings" class="cookie-banner__main">
          <div class="cookie-banner__content">
            <h2 class="cookie-banner__title">About cookies on this site</h2>
            <p class="cookie-banner__description">
              We use cookies to run our website, analyze your use of our services, manage your online preferences &amp; 
              personalize ad content. By accepting our cookies, you'll get relevant content and social media features, 
              personalized ads, and an enhanced browsing experience.
            </p>
          </div>

          <div class="cookie-banner__actions">
            <button 
              class="cookie-banner__btn cookie-banner__btn--secondary"
              (click)="onDenyAll()"
              aria-label="Deny all cookies"
            >
              Deny all
            </button>
            <button 
              class="cookie-banner__btn cookie-banner__btn--text"
              (click)="toggleSettings()"
              aria-label="Open cookie settings"
            >
              Cookie settings
            </button>
            <button 
              class="cookie-banner__btn cookie-banner__btn--primary"
              (click)="onAcceptAll()"
              aria-label="Accept all cookies"
            >
              Allow all cookies
            </button>
          </div>
        </div>

        <!-- Settings Panel -->
        <div *ngIf="showSettings" class="cookie-banner__settings">
          <button 
            class="cookie-banner__close"
            (click)="toggleSettings()"
            aria-label="Close cookie settings"
          >
            ×
          </button>

          <h2 class="cookie-banner__title">About cookies on this site</h2>
          <p class="cookie-banner__subtitle">Categories</p>
          <p class="cookie-banner__description">
            Cookies used on the site are categorized and below you can read about each category 
            and allow or deny some or all of them, except for Necessary Cookies which are required 
            to provide core website functionality.
          </p>

          <div class="cookie-banner__categories">
            <div *ngFor="let category of categories" class="cookie-category">
              <label class="cookie-category__label">
                <input 
                  type="checkbox" 
                  [checked]="isCategoryAccepted(category.id)"
                  [disabled]="category.isRequired"
                  (change)="onCategoryChange(category.id, $event)"
                  class="cookie-category__checkbox"
                  [attr.aria-label]="category.name"
                />
                <span class="cookie-category__name">{{ category.name }}</span>
                <span *ngIf="category.isRequired" class="cookie-category__required">(Required)</span>
              </label>
              <p class="cookie-category__description">{{ category.description }}</p>
            </div>
          </div>

          <div class="cookie-banner__settings-actions">
            <button 
              class="cookie-banner__btn cookie-banner__btn--secondary"
              (click)="onDenyAll()"
            >
              Deny all
            </button>
            <button 
              class="cookie-banner__btn cookie-banner__btn--primary"
              (click)="onAcceptAll()"
            >
              Allow all cookies
            </button>
            <button 
              class="cookie-banner__btn cookie-banner__btn--tertiary"
              (click)="onSaveSettings()"
            >
              Save settings
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #f8f9fa;
      border-top: 1px solid #e9ecef;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      max-height: 90vh;
      overflow-y: auto;
    }

    .cookie-banner__container {
      padding: 20px;
      max-width: 100%;
    }

    @media (min-width: 768px) {
      .cookie-banner__container {
        padding: 24px 32px;
        max-width: 1200px;
        margin: 0 auto;
      }
    }

    .cookie-banner__main {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    @media (min-width: 768px) {
      .cookie-banner__main {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        gap: 24px;
      }
    }

    .cookie-banner__content {
      flex: 1;
    }

    .cookie-banner__title {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #212529;
    }

    .cookie-banner__subtitle {
      font-size: 14px;
      font-weight: 600;
      margin: 16px 0 8px 0;
      color: #495057;
    }

    .cookie-banner__description {
      font-size: 14px;
      line-height: 1.5;
      color: #495057;
      margin: 0;
    }

    .cookie-banner__actions,
    .cookie-banner__settings-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex-shrink: 0;
    }

    @media (min-width: 768px) {
      .cookie-banner__actions {
        flex-direction: row;
        justify-content: flex-end;
      }

      .cookie-banner__settings-actions {
        flex-direction: row;
        justify-content: space-between;
        margin-top: 20px;
      }
    }

    .cookie-banner__btn {
      padding: 10px 16px;
      border-radius: 4px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: center;
      white-space: nowrap;
    }

    @media (max-width: 767px) {
      .cookie-banner__btn {
        padding: 12px 16px;
        font-size: 14px;
      }
    }

    .cookie-banner__btn--primary {
      background-color: #007bff;
      color: white;
      flex: 1;
    }

    @media (min-width: 768px) {
      .cookie-banner__btn--primary {
        flex: auto;
      }
    }

    .cookie-banner__btn--primary:hover {
      background-color: #0056b3;
    }

    .cookie-banner__btn--secondary {
      background-color: #e9ecef;
      color: #212529;
      flex: 1;
    }

    @media (min-width: 768px) {
      .cookie-banner__btn--secondary {
        flex: auto;
      }
    }

    .cookie-banner__btn--secondary:hover {
      background-color: #dee2e6;
    }

    .cookie-banner__btn--tertiary {
      background-color: transparent;
      color: #007bff;
      border: 1px solid #007bff;
      flex: 1;
    }

    @media (min-width: 768px) {
      .cookie-banner__btn--tertiary {
        flex: auto;
      }
    }

    .cookie-banner__btn--tertiary:hover {
      background-color: #f0f7ff;
    }

    .cookie-banner__btn--text {
      background-color: transparent;
      color: #007bff;
      text-decoration: underline;
      padding: 10px 0;
      flex: 1;
    }

    @media (min-width: 768px) {
      .cookie-banner__btn--text {
        flex: auto;
        padding: 10px 16px;
      }
    }

    .cookie-banner__btn--text:hover {
      color: #0056b3;
    }

    .cookie-banner__settings {
      position: relative;
    }

    .cookie-banner__close {
      position: absolute;
      top: 0;
      right: 0;
      background: none;
      border: none;
      font-size: 24px;
      color: #6c757d;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cookie-banner__close:hover {
      color: #212529;
    }

    .cookie-banner__categories {
      margin: 20px 0;
    }

    .cookie-category {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e9ecef;
    }

    .cookie-category:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .cookie-category__label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      font-size: 14px;
      color: #212529;
      cursor: pointer;
      margin-bottom: 8px;
    }

    .cookie-category__checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #007bff;
    }

    .cookie-category__checkbox:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .cookie-category__name {
      font-weight: 500;
    }

    .cookie-category__required {
      font-size: 12px;
      color: #6c757d;
      font-weight: normal;
    }

    .cookie-category__description {
      font-size: 13px;
      color: #6c757d;
      line-height: 1.4;
      margin: 0;
      padding-left: 26px;
    }
  `],
  animations: [
    trigger('bannerAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CookieBannerComponent implements OnInit, OnDestroy {
  showBanner$: Observable<boolean>;
  categories: ConsentCategory[] = [];
  showSettings = false;

  private destroy$ = new Subject<void>();

  constructor(private cookieConsentService: CookieConsentService) {
    this.showBanner$ = this.cookieConsentService.shouldShowBanner$();
  }

  ngOnInit(): void {
    this.categories = this.cookieConsentService.getCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSettings(): void {
    this.showSettings = !this.showSettings;
  }

  onAcceptAll(): void {
    this.cookieConsentService.acceptAllCookies();
    this.showSettings = false;
  }

  onDenyAll(): void {
    this.cookieConsentService.denyAllCookies();
    this.showSettings = false;
  }

  onSaveSettings(): void {
    this.showSettings = false;
  }

  onCategoryChange(categoryId: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.cookieConsentService.updateCategory(categoryId, target.checked);
  }

  isCategoryAccepted(categoryId: string): boolean {
    return this.cookieConsentService.isCategoryAccepted(categoryId);
  }
}
