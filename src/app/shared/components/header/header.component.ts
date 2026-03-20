import { Component, HostListener } from '@angular/core';
import { BrandConfig, BusinessInfo } from '../../../core/models';
import { ConfigService } from '../../../core/services/config.service';
import { EventTrackingService } from '../../../core/services/event-tracking.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <div class="container header-bar">
        <a class="brand" routerLink="/" [attr.aria-label]="brand.name + ' home'" (click)="closeMobileMenu()">
          <span class="brand-mark">{{ brand.name.slice(0, 1) }}</span>
          <span class="brand-copy">
            <strong>{{ brand.name }}</strong>
            <small>{{ brand.tagline }}</small>
          </span>
        </a>

        <div class="mobile-controls">
          <a routerLink="/booking" [queryParams]="{ city: selectedCity }" class="mobile-book-cta cta-primary" (click)="closeMobileMenu()">Book Now</a>

          <button class="menu-toggle" type="button" (click)="toggleMobileMenu()">
            {{ mobileMenuOpen ? 'Close' : 'Menu' }}
          </button>
        </div>

        <div class="nav-shell" [class.open]="mobileMenuOpen">
          <nav class="navigation">
            <ul>
              <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMobileMenu()">Home</a></li>
              <li><a routerLink="/services" routerLinkActive="active" (click)="closeMobileMenu()">Services</a></li>
              <li><a routerLink="/service-areas" routerLinkActive="active" (click)="closeMobileMenu()">Service Areas</a></li>
              <li><a routerLink="/about" routerLinkActive="active" (click)="closeMobileMenu()">About</a></li>
              <li><a routerLink="/faq" routerLinkActive="active" (click)="closeMobileMenu()">FAQ</a></li>
              <li><a routerLink="/contact" routerLinkActive="active" (click)="closeMobileMenu()">Contact</a></li>
            </ul>
          </nav>

          <div class="header-actions">
            <div class="city-selector" *ngIf="availableCities.length > 0">
              <label for="header-city" class="sr-only">Choose city</label>
              <select id="header-city" [ngModel]="selectedCity" (ngModelChange)="onCityChange($event)">
                <option *ngFor="let city of availableCities" [ngValue]="city">{{ city }}</option>
              </select>
            </div>
            <a [href]="callUrl" class="quick-action" (click)="onCallClick()">Call</a>
            <a [href]="whatsAppUrl" class="quick-action quick-action--whatsapp" target="_blank" rel="noopener" (click)="onWhatsAppClick()">WhatsApp</a>
            <a routerLink="/booking" [queryParams]="{ city: selectedCity }" class="cta-primary" (click)="closeMobileMenu()">Book Now</a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: var(--header-bg);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      border-bottom: 1px solid var(--header-border);
      box-shadow: var(--shadow-sm);
    }

    .header.scrolled {
      box-shadow: var(--shadow-md);
    }

    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      min-height: var(--header-height);
    }

    .brand {
      align-items: center;
      display: inline-flex;
      gap: 0.8rem;
      min-width: 0;
    }

    .brand-mark {
      align-items: center;
      background: var(--surface-hero);
      border-radius: 1rem;
      color: var(--text-light);
      display: inline-flex;
      font-size: 1.05rem;
      font-weight: 800;
      height: 2.5rem;
      justify-content: center;
      width: 2.5rem;
    }

    .brand-copy {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .brand-copy strong {
      color: var(--text-dark);
      font-size: 1.05rem;
      line-height: 1.2;
    }

    .brand-copy small {
      color: var(--text-muted);
      font-size: 0.8rem;
    }

    .menu-toggle {
      display: none;
      border: 1px solid var(--border-subtle);
      color: var(--primary);
      border-radius: 999px;
      padding: 0.5rem 0.9rem;
      font-weight: 600;
      cursor: pointer;
    }

    .mobile-controls {
      display: none;
      align-items: center;
      gap: 0.75rem;
    }

    .mobile-book-cta {
      display: none;
      min-height: 44px;
      padding: 0.75rem 1rem;
      white-space: nowrap;
    }

    .nav-shell {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex: 1;
      justify-content: flex-end;
    }

    .navigation ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;
    }

    .navigation a {
      color: var(--text-body);
      font-weight: 500;
      transition: color 0.3s, opacity 0.3s;
    }

    .navigation a:hover,
    .navigation a.active {
      color: var(--primary);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .city-selector select {
      background: var(--surface-solid);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      color: var(--text-body);
      font-weight: 600;
      min-height: 42px;
      padding: 0.55rem 0.95rem;
    }

    .quick-action {
      color: var(--text-body);
      font-weight: 600;
      white-space: nowrap;
    }

    .quick-action--whatsapp {
      color: var(--whatsapp);
    }

    .quick-action:hover {
      color: var(--primary);
    }

    .sr-only {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    @media (max-width: 900px) {
      .menu-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
      }

      .mobile-controls {
        display: flex;
      }

      .mobile-book-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .nav-shell {
        display: none;
        width: 100%;
        flex-direction: column;
        align-items: stretch;
        padding-top: 0.5rem;
      }

      .nav-shell.open {
        display: flex;
      }

      .navigation ul {
        flex-direction: column;
        gap: 0.75rem;
      }

      .header-actions {
        flex-direction: column;
        align-items: stretch;
      }

      .city-selector select,
      .quick-action,
      .cta-primary {
        text-align: center;
        width: 100%;
      }
    }
  `]
})
export class HeaderComponent {
  isScrolled = false;
  mobileMenuOpen = false;

  constructor(
    private configService: ConfigService,
    private eventTrackingService: EventTrackingService
  ) {}

  get brand(): BrandConfig {
    return this.configService.brand;
  }

  get business(): BusinessInfo {
    return this.configService.business;
  }

  get availableCities(): string[] {
    return this.configService.availableCities;
  }

  get selectedCity(): string {
    return this.configService.selectedCity;
  }

  get callUrl(): string {
    return this.configService.getCallUrl();
  }

  get whatsAppUrl(): string {
    const cityMessage = this.selectedCity
      ? `Hello, I need AC service in ${this.selectedCity}.`
      : undefined;

    return this.configService.getWhatsAppUrl(cityMessage);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = typeof window !== 'undefined' && window.scrollY > 100;
  }

  onCityChange(city: string): void {
    this.configService.setSelectedCity(city);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  onCallClick(): void {
    void this.eventTrackingService.trackCallButton('Header Call');
  }

  onWhatsAppClick(): void {
    void this.eventTrackingService.trackWhatsAppClick('Header WhatsApp');
  }
}
