import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../../../core/models';
import { IMAGE_CONFIG } from '../../../core/config/image.config';
import { ConfigService } from '../../../core/services/config.service';
import { DeviceService } from '../../../core/services/device.service';
import {
  MobileConversionService,
  MobileServiceSortMode
} from '../../../core/services/mobile-conversion.service';

@Component({
  selector: 'app-services',
  template: `
    <ng-container *ngIf="deviceService.isMobile$ | async; else desktopServices">
      <section class="mobile-services-page">
        <header class="mobile-services-head">
          <h1>Our Services</h1>
          <p>Choose the fastest path to booking with high-confidence options.</p>
        </header>

        <div class="mobile-trust-signals">
          <span>4.8 Rated Service</span>
          <span>1000+ Services Completed</span>
          <span>Verified Technicians</span>
        </div>

        <section class="recommended-shell" *ngIf="recommendedServices.length > 0">
          <div class="section-row">
            <h2>Recommended for you</h2>
          </div>
          <div class="recommended-list">
            <app-service-card-mobile-public
              *ngFor="let service of recommendedServices"
              [service]="service"
              [city]="selectedCity"
              [recommended]="true">
            </app-service-card-mobile-public>
          </div>
        </section>

        <div class="chip-scroll">
          <button
            type="button"
            *ngFor="let category of mobileCategories"
            class="chip"
            [class.active]="selectedCategory === category"
            (click)="onCategoryChanged(category)">
            {{ category }}
          </button>
        </div>

        <div class="sort-row">
          <label for="mobile-sort-mode">Sort by</label>
          <select
            id="mobile-sort-mode"
            [ngModel]="sortMode"
            [ngModelOptions]="{ standalone: true }"
            (ngModelChange)="onSortChanged($event)">
            <option value="popularity">Popularity</option>
            <option value="price">Price</option>
            <option value="availability">Availability</option>
          </select>
        </div>

        <div class="mobile-service-list" *ngIf="mobileVisibleServices.length > 0; else loadingServices">
          <app-service-card-mobile-public
            *ngFor="let service of mobileVisibleServices"
            [service]="service"
            [city]="selectedCity">
          </app-service-card-mobile-public>

          <button
            type="button"
            class="btn-secondary load-more-btn"
            *ngIf="hasMoreMobileServices"
            (click)="onLoadMoreServices()">
            Show More Services
          </button>
        </div>

        <ng-template #loadingServices>
          <app-skeleton-loader [itemCount]="4"></app-skeleton-loader>
        </ng-template>
      </section>
    </ng-container>

    <ng-template #desktopServices>
      <section class="page-hero">
        <div class="container">
          <div class="hero-copy">
            <h1>Our Services</h1>
            <p>Fast AC repair, installation, maintenance, and annual support from one booking-first experience.</p>
          </div>
        </div>
      </section>

      <section class="section-shell">
        <div class="container">
          <div class="services-intro surface-card">
            <div>
              <span class="section-kicker">Premium Service</span>
              <h2>Clear options, fast booking, and no clutter before checkout.</h2>
              <p>Every service card below is connected to the live catalog, so customers move straight from discovery to booking.</p>
            </div>
            <div class="media-frame media-frame--panel" *ngIf="servicesImage as imageUrl">
              <img [src]="imageUrl" alt="Residential AC service setup" loading="lazy" decoding="async">
            </div>
          </div>

          <div class="services-grid" *ngIf="services.length > 0; else emptyServices">
            <article class="service-item surface-card" *ngFor="let service of services">
              <h2>{{ service.name }}</h2>
              <p>{{ service.description }}</p>
              <ul *ngIf="service.features.length > 0">
                <li *ngFor="let feature of service.features">{{ feature }}</li>
              </ul>
              <p class="price" *ngIf="service.price">{{ service.price }}</p>
              <a routerLink="/booking" [queryParams]="bookingQueryParams(service.id)" class="cta-primary">Book Now</a>
            </article>
          </div>

          <ng-template #emptyServices>
            <div class="service-item surface-card empty-panel">
              Live services are still loading from the backend catalog.
            </div>
          </ng-template>
        </div>
      </section>

      <section class="service-cta">
        <div class="container service-cta-inner section-heading--on-dark">
          <h2 class="ui-heading-contrast">Need help choosing the right AC service?</h2>
          <p class="ui-subtext-contrast">Book now or call us directly for a quick recommendation.</p>
          <div class="cta-actions">
            <a routerLink="/booking" [queryParams]="selectedCity ? { city: selectedCity } : null" class="cta-primary-lg">Book Service Now</a>
            <a [href]="callUrl" class="btn-secondary">Call Support</a>
          </div>
        </div>
      </section>
    </ng-template>
  `,
  styles: [`
    .mobile-services-page {
      display: grid;
      gap: 0.9rem;
      padding: 1rem;
    }

    .mobile-services-head h1 {
      color: var(--text-dark);
      font-size: 1.25rem;
      line-height: 1.3;
      margin: 0;
    }

    .mobile-services-head p {
      color: var(--text-muted);
      display: -webkit-box;
      margin: 0.35rem 0 0;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }

    .mobile-trust-signals {
      display: grid;
      gap: 0.45rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .mobile-trust-signals span {
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: 0.6rem;
      color: var(--text-body);
      font-size: 0.68rem;
      font-weight: 700;
      min-height: 56px;
      padding: 0.45rem;
      text-align: center;
    }

    .recommended-shell {
      display: grid;
      gap: 0.55rem;
    }

    .section-row h2 {
      color: var(--text-dark);
      font-size: 1.02rem;
      margin: 0;
    }

    .recommended-list {
      display: grid;
      gap: 0.65rem;
    }

    .chip-scroll {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .chip {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      color: var(--text-body);
      font-size: 0.75rem;
      font-weight: 700;
      min-height: 40px;
      padding: 0 0.85rem;
      transition: all 0.18s ease;
      white-space: nowrap;
    }

    .chip.active {
      background: var(--surface-hero-soft);
      border-color: var(--primary-tint-border-strong);
      color: var(--primary);
      transform: translateY(-1px);
    }

    .sort-row {
      align-items: center;
      display: flex;
      gap: 0.6rem;
      justify-content: space-between;
    }

    .sort-row label {
      color: var(--text-muted);
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .sort-row select {
      max-width: 180px;
      min-height: 44px;
    }

    .mobile-service-list {
      display: grid;
      gap: 0.75rem;
    }

    .load-more-btn {
      width: 100%;
    }

    .hero-copy {
      margin: 0 auto;
      max-width: 720px;
    }

    .services-intro {
      align-items: center;
      display: grid;
      gap: 1.25rem;
      grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
      margin-bottom: 1.5rem;
      padding: 1.5rem;
    }

    .services-intro p {
      color: var(--text-body);
      margin-top: 0.5rem;
    }

    .services-grid {
      display: grid;
      gap: 1.25rem;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    .service-item {
      padding: 1.75rem;
    }

    .empty-panel {
      color: var(--text-body);
      text-align: center;
    }

    .service-item h2 {
      color: var(--text-dark);
      font-size: 1.45rem;
      margin-bottom: 0.75rem;
    }

    .service-item p,
    .service-item li {
      color: var(--text-body);
    }

    .service-item ul {
      list-style: none;
      margin: 1rem 0;
      padding: 0;
    }

    .service-item li {
      padding: 0.35rem 0;
    }

    .service-item li::before {
      color: var(--accent);
      content: '+ ';
      font-weight: 700;
    }

    .price {
      color: var(--primary);
      font-weight: 700;
      margin: 1rem 0 1.2rem;
    }

    .service-cta {
      padding: 0 0 4.5rem;
    }

    .service-cta-inner {
      background: var(--surface-hero-soft);
      border: 1px solid var(--primary-tint-border-strong);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: 2rem;
      text-align: center;
    }

    .service-cta-inner h2 {
      color: #0a1f44;
      -webkit-text-fill-color: #0a1f44;
      forced-color-adjust: none;
      margin-bottom: 0.5rem;
    }

    .service-cta-inner p {
      color: #334155;
      -webkit-text-fill-color: #334155;
      forced-color-adjust: none;
      margin-bottom: 1.2rem;
    }

    .cta-actions {
      display: flex;
      gap: 0.9rem;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .services-intro {
        grid-template-columns: 1fr;
        padding: 1.25rem;
      }

      .service-item {
        padding: 1.4rem;
      }

      .cta-actions {
        align-items: stretch;
        flex-direction: column;
      }
    }
  `]
})
export class ServicesComponent implements OnInit {
  selectedCategory = 'All';
  sortMode: MobileServiceSortMode = 'popularity';
  mobileVisibleCount = 6;
  private serviceHint = '';
  private routeEntryHint = '';
  private readonly mobileBatchSize = 6;

  readonly servicesImage = this.getImage(IMAGE_CONFIG.services);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly configService: ConfigService,
    readonly deviceService: DeviceService,
    private readonly mobileConversionService: MobileConversionService
  ) {}

  ngOnInit(): void {
    this.serviceHint = this.mobileConversionService.readRememberedServiceHint();
    this.routeEntryHint = `${this.route.snapshot.queryParamMap.get('entry') ?? ''}`.trim();

    this.route.queryParams.subscribe(params => {
      const selectedServiceFromRoute = `${params['service'] ?? ''}`.trim();
      if (selectedServiceFromRoute) {
        this.serviceHint = selectedServiceFromRoute;
      }
    });
  }

  get services(): Service[] {
    return this.configService.services;
  }

  get callUrl(): string {
    return this.configService.getCallUrl();
  }

  get selectedCity(): string {
    return this.configService.selectedCity;
  }

  get mobileCategories(): string[] {
    return this.mobileConversionService.getServiceCategories(this.services);
  }

  get mobileVisibleServices(): Service[] {
    return this.mobileConversionService.filterAndSortServices(
      this.services,
      this.selectedCategory,
      this.sortMode
    ).slice(0, this.mobileVisibleCount);
  }

  get hasMoreMobileServices(): boolean {
    const totalCount = this.mobileConversionService.filterAndSortServices(
      this.services,
      this.selectedCategory,
      this.sortMode
    ).length;

    return totalCount > this.mobileVisibleCount;
  }

  get recommendedServices(): Service[] {
    return this.mobileConversionService.getRecommendedServices(
      this.services,
      this.serviceHint,
      this.routeEntryHint
    );
  }

  bookingQueryParams(serviceId: string): { service: string; city?: string } {
    return this.selectedCity
      ? { service: serviceId, city: this.selectedCity }
      : { service: serviceId };
  }

  onCategoryChanged(category: string): void {
    this.selectedCategory = category;
    this.mobileVisibleCount = this.mobileBatchSize;
    this.mobileConversionService.recordCtaClick(
      `services-category-${category.toLowerCase()}`,
      'mobile-services'
    );
  }

  onSortChanged(sortMode: MobileServiceSortMode): void {
    this.sortMode = sortMode;
    this.mobileVisibleCount = this.mobileBatchSize;
    this.mobileConversionService.recordCtaClick(
      `services-sort-${sortMode}`,
      'mobile-services'
    );
  }

  onLoadMoreServices(): void {
    this.mobileVisibleCount += this.mobileBatchSize;
    this.mobileConversionService.recordCtaClick('services-load-more', 'mobile-services');
  }

  getImage(url: string | null | undefined): string | null {
    const value = `${url ?? ''}`.trim();
    return value ? value : null;
  }
}
