import { Component, Input } from '@angular/core';
import { BrandConfig, BusinessInfo, Service } from '../../../core/models';
import { MobileConversionService } from '../../../core/services/mobile-conversion.service';

@Component({
  selector: 'app-home-mobile',
  template: `
    <section class="mobile-hero">
      <div class="hero-copy">
        <span class="eyebrow">{{ brand.name }} <span *ngIf="selectedCity">in {{ selectedCity }}</span></span>
        <h1>Book AC Service Fast</h1>
        <p>{{ business.description || brand.tagline }}</p>
      </div>

      <div class="hero-actions">
        <a class="btn-secondary" routerLink="/booking" [queryParams]="bookingQueryParams" (click)="onBookClick()">Start Booking</a>
        <a class="btn-secondary" routerLink="/services">Browse Services</a>
      </div>

      <div class="hero-trust">
        <span>4.8 Rating</span>
        <span>1000+ Services Completed</span>
        <span>Verified Technicians</span>
      </div>
    </section>

    <section class="mobile-section">
      <header class="section-head">
        <h2>Recommended for you</h2>
        <a routerLink="/services">View all</a>
      </header>

      <div class="services-stack" *ngIf="recommendedServices.length > 0; else loadingServices">
        <app-service-card-mobile-public
          *ngFor="let service of visibleRecommendedServices"
          [service]="service"
          [city]="selectedCity"
          [recommended]="true">
        </app-service-card-mobile-public>

        <button
          type="button"
          class="btn-secondary reveal-services"
          *ngIf="hasMoreRecommendedServices"
          (click)="toggleRecommendedServices()">
          {{ showAllRecommended ? 'Show Less' : 'Show More' }}
        </button>
      </div>

      <ng-template #loadingServices>
        <app-skeleton-loader [itemCount]="3"></app-skeleton-loader>
      </ng-template>
    </section>

    <section class="mobile-section trust-strip" *ngIf="totalReviewCount > 0">
      <div class="trust-card">
        <span>Rating</span>
        <strong>{{ averageRatingLabel }}</strong>
      </div>
      <div class="trust-card">
        <span>Public Reviews</span>
        <strong>{{ totalReviewCount }}</strong>
      </div>
      <div class="trust-card">
        <span>Service City</span>
        <strong>{{ selectedCity || 'Multi-city ready' }}</strong>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .mobile-hero {
      background: var(--surface-hero);
      color: var(--text-light);
      display: grid;
      gap: 0.75rem;
      padding: 1rem;
    }

    .eyebrow {
      color: var(--text-light-soft);
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .hero-copy h1 {
      font-size: 1.25rem;
      line-height: 1.3;
      margin: 0.5rem 0 0.25rem;
    }

    .hero-copy p {
      color: var(--text-light-soft);
      display: -webkit-box;
      font-size: 0.93rem;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }

    .hero-actions {
      display: grid;
      gap: 0.55rem;
      grid-template-columns: 1fr;
    }

    .hero-actions > a {
      min-height: 48px;
      width: 100%;
    }

    .hero-trust {
      display: grid;
      gap: 0.45rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .hero-trust span {
      background: rgba(255, 255, 255, 0.14);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 0.6rem;
      color: var(--text-light);
      display: -webkit-box;
      font-size: 0.68rem;
      font-weight: 700;
      min-height: 56px;
      padding: 0.45rem;
      text-align: center;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .mobile-section {
      display: grid;
      gap: 0.75rem;
      padding: 1rem;
    }

    .section-head {
      align-items: center;
      display: flex;
      justify-content: space-between;
      gap: 0.6rem;
    }

    .section-head h2 {
      color: var(--text-dark);
      font-size: 1.125rem;
      line-height: 1.3;
      margin: 0;
    }

    .section-head a {
      color: var(--primary);
      font-size: 0.85rem;
      font-weight: 700;
    }

    .services-stack {
      display: grid;
      gap: 0.75rem;
    }

    .reveal-services {
      width: 100%;
    }

    .trust-strip {
      background: var(--surface-muted);
      border-top: 1px solid var(--border-subtle);
      gap: 0.5rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .trust-card {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 0.65rem;
      min-height: 72px;
      padding: 0.6rem;
      text-align: center;
    }

    .trust-card span {
      color: var(--text-muted);
      display: block;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      margin-bottom: 0.2rem;
      text-transform: uppercase;
    }

    .trust-card strong {
      color: var(--text-dark);
      display: -webkit-box;
      font-size: 0.84rem;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class HomeMobileComponent {
  @Input({ required: true }) brand!: BrandConfig;
  @Input({ required: true }) business!: BusinessInfo;
  @Input() services: Service[] = [];
  @Input() selectedCity = '';
  @Input() averageRatingLabel = '5.0';
  @Input() totalReviewCount = 0;

  showAllRecommended = false;
  private readonly collapsedServiceLimit = 3;

  constructor(private readonly mobileConversionService: MobileConversionService) {}

  get bookingQueryParams(): { city?: string } | null {
    const city = `${this.selectedCity ?? ''}`.trim();
    return city ? { city } : null;
  }

  get recommendedServices(): Service[] {
    return this.mobileConversionService.getRecommendedServices(this.services).slice(0, 6);
  }

  get visibleRecommendedServices(): Service[] {
    if (this.showAllRecommended) {
      return this.recommendedServices;
    }

    return this.recommendedServices.slice(0, this.collapsedServiceLimit);
  }

  get hasMoreRecommendedServices(): boolean {
    return this.recommendedServices.length > this.collapsedServiceLimit;
  }

  onBookClick(): void {
    this.mobileConversionService.recordCtaClick('home-book-service', 'mobile-home');
  }

  toggleRecommendedServices(): void {
    this.showAllRecommended = !this.showAllRecommended;
    this.mobileConversionService.recordCtaClick(
      this.showAllRecommended ? 'home-show-more-services' : 'home-show-less-services',
      'mobile-home'
    );
  }
}
