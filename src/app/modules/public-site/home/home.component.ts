import { Component, OnInit } from '@angular/core';
import {
  BrandConfig,
  BusinessInfo,
  Feature,
  ReviewSummary,
  Service,
  ServiceArea,
  Testimonial
} from '../../../core/models';
import { IMAGE_CONFIG } from '../../../core/config/image.config';
import { ApiService } from '../../../core/services/api.service';
import { ConfigService } from '../../../core/services/config.service';
import { EventTrackingService } from '../../../core/services/event-tracking.service';

@Component({
  selector: 'app-home',
  template: `
    <section class="hero">
      <div class="container hero-layout">
        <div class="hero-copy">
          <span class="eyebrow">{{ brand.name }} <span *ngIf="selectedCity">in {{ selectedCity }}</span></span>
          <h1>Fast AC service without the friction.</h1>
          <h2>{{ heroSubheading }}</h2>
          <p>{{ business.description }}</p>
          <div class="hero-buttons">
            <a routerLink="/booking" [queryParams]="selectedCity ? { city: selectedCity } : null" class="cta-primary-lg">Book Service Now</a>
            <a [href]="callUrl" class="btn-secondary" (click)="onCallClick()">Call Now</a>
            <a [href]="whatsAppUrl" class="btn-whatsapp" target="_blank" rel="noopener" (click)="onWhatsAppClick()">WhatsApp</a>
          </div>
        </div>

        <div class="hero-side-stack">
          <div class="media-frame media-frame--hero hero-visual" *ngIf="heroImage as imageUrl">
            <img [src]="imageUrl" alt="Premium home AC service setup" loading="eager" decoding="async">
            <div class="hero-visual-copy glass-panel">
              <strong>Premium response</strong>
              <span>Fast booking, verified dispatch, direct support</span>
            </div>
          </div>

          <div class="hero-card glass-panel">
            <h3>Booking Confidence</h3>
            <ul>
              <li>{{ averageRatingLabel }} customer rating proof</li>
              <li>Dynamic pricing and automated dispatch are live</li>
              <li>City-aware booking flow is ready for scale</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell trust-strip" *ngIf="totalReviewCount > 0">
      <div class="container trust-grid">
        <div class="trust-card surface-card">
          <span>Average Rating</span>
          <strong>{{ averageRatingLabel }}</strong>
        </div>
        <div class="trust-card surface-card">
          <span>Public Reviews</span>
          <strong>{{ totalReviewCount }}</strong>
        </div>
        <div class="trust-card surface-card">
          <span>Coverage Focus</span>
          <strong>{{ selectedCity || 'Multi-city ready' }}</strong>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container">
        <div class="section-heading">
          <h2>Services customers book most</h2>
          <p>Every service card now reflects the live pricing posture. Final price may vary after diagnosis and dispatch window logic.</p>
        </div>

        <div class="services-grid" *ngIf="services.length > 0; else emptyServices">
          <article class="service-card surface-card" *ngFor="let service of services">
            <h3>{{ service.name }}</h3>
            <p>{{ service.shortDescription }}</p>
            <ul *ngIf="service.features.length > 0">
              <li *ngFor="let feature of service.features.slice(0, 3)">{{ feature }}</li>
            </ul>
            <p class="price" *ngIf="service.price">{{ service.price }}</p>
            <p class="price-note">Final price may vary after diagnosis.</p>
            <a routerLink="/booking" [queryParams]="{ service: service.id, city: selectedCity }" class="btn-secondary">Book Now</a>
          </article>
        </div>

        <ng-template #emptyServices>
          <div class="surface-card empty-panel">
            Live services will appear here as soon as the backend catalog is available.
          </div>
        </ng-template>
      </div>
    </section>

    <section class="section-shell section-alt" *ngIf="features.length > 0">
      <div class="container">
        <div class="section-heading">
          <h2>Why customers trust {{ brand.name }}</h2>
          <p>Service confidence comes from clear response expectations, reliable technicians, and direct booking access.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card surface-card" *ngFor="let feature of features">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container">
        <div class="section-heading">
          <h2>How it works</h2>
          <p>The public funnel stays simple from landing page to confirmed request.</p>
        </div>
        <div class="steps-grid">
          <div class="step surface-card">
            <div class="step-number">1</div>
            <h3>Open the booking flow</h3>
            <p>Select your city, service need, and urgency window.</p>
          </div>
          <div class="step surface-card">
            <div class="step-number">2</div>
            <h3>See live price logic</h3>
            <p>Urgent, weekend, and seasonal pricing is calculated before you submit.</p>
          </div>
          <div class="step surface-card">
            <div class="step-number">3</div>
            <h3>Track the service live</h3>
            <p>Auto-assignment and timeline updates keep the customer informed after booking.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell section-alt" *ngIf="displayTestimonials.length > 0">
      <div class="container">
        <div class="section-heading">
          <h2>What customers say</h2>
          <p>{{ averageRatingLabel }} average rating across {{ totalReviewCount }} public reviews.</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card surface-card" *ngFor="let testimonial of displayTestimonials">
            <div class="rating">
              <span *ngFor="let star of buildStars(testimonial.rating)" class="star">*</span>
            </div>
            <p class="text">"{{ testimonial.text }}"</p>
            <p class="author"><strong>{{ testimonial.name }}</strong>, {{ testimonial.location }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container service-area-shell surface-card">
        <div class="section-heading">
          <h2>Service Areas</h2>
          <p>Browse supported locations, then compare services before you book.</p>
        </div>
        <ul class="areas-list" *ngIf="serviceAreas.length > 0; else emptyAreas">
          <li *ngFor="let area of serviceAreas">{{ area.name }}</li>
        </ul>
        <ng-template #emptyAreas>
          <div class="empty-area-copy">Coverage areas will appear here once technician coverage is available from the backend.</div>
        </ng-template>
        <a routerLink="/service-areas" class="btn-secondary">View All Areas</a>
      </div>
    </section>

    <section class="home-cta">
      <div class="container home-cta-inner">
        <h2>Need AC service right now?</h2>
        <p>Move straight into booking or use direct contact options without leaving the page.</p>
        <div class="hero-buttons">
          <a routerLink="/booking" [queryParams]="{ city: selectedCity }" class="cta-primary-lg">Book Service Now</a>
          <a [href]="callUrl" class="btn-secondary" (click)="onCallClick()">Call Now</a>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container contact-shell">
        <div class="section-heading">
          <h2>Contact {{ brand.name }}</h2>
          <p>Reach us directly if you want help before submitting a booking.</p>
        </div>
        <div class="contact-grid">
          <div class="contact-card surface-card">
            <h3>Phone</h3>
            <a [href]="callUrl" [attr.aria-label]="phoneDisplay">{{ phoneDisplay }}</a>
          </div>
          <div class="contact-card surface-card">
            <h3>WhatsApp</h3>
            <a [href]="whatsAppUrl" target="_blank" rel="noopener" [attr.aria-label]="whatsAppDisplay">{{ whatsAppDisplay }}</a>
          </div>
          <div class="contact-card surface-card">
            <h3>Email</h3>
            <a [href]="emailUrl" [attr.aria-label]="emailDisplay">{{ emailDisplay }}</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: var(--surface-hero);
      color: var(--text-light);
      overflow: hidden;
      padding: calc(var(--header-height) + 2rem) 0 4.5rem;
      position: relative;
    }

    .hero::after {
      background: var(--hero-glow);
      content: '';
      inset: 0;
      position: absolute;
    }

    .hero-layout {
      align-items: center;
      display: grid;
      gap: 1.25rem;
      grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.9fr);
      position: relative;
      z-index: 1;
    }

    .hero-side-stack {
      display: grid;
      gap: 1rem;
    }

    .eyebrow {
      color: var(--text-light-soft);
      display: inline-block;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }

    .hero-copy h1 {
      font-size: clamp(2.4rem, 5vw, 4rem);
      margin-bottom: 0.4rem;
    }

    .hero-copy h2 {
      color: var(--text-light-soft);
      font-size: clamp(1.2rem, 2.4vw, 1.8rem);
      margin-bottom: 1rem;
    }

    .hero-copy p {
      color: var(--text-light-soft);
      margin-bottom: 1.4rem;
      max-width: 680px;
    }

    .hero-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.85rem;
    }

    .hero-visual {
      min-height: 320px;
      position: relative;
    }

    .hero-visual-copy {
      bottom: 1rem;
      color: var(--text-light);
      left: 1rem;
      padding: 0.9rem 1rem;
      position: absolute;
      right: 1rem;
    }

    .hero-visual-copy strong,
    .hero-visual-copy span {
      display: block;
    }

    .hero-visual-copy strong {
      font-family: inherit;
      margin-bottom: 0.2rem;
    }

    .hero-card {
      box-shadow: none;
      padding: 1.5rem;
    }

    .hero-card h3 {
      color: var(--text-light);
      margin-bottom: 0.8rem;
    }

    .hero-card ul {
      list-style: none;
      padding: 0;
    }

    .hero-card li {
      color: var(--text-light-soft);
      padding: 0.4rem 0;
    }

    .hero-card li::before {
      content: '* ';
      font-weight: 700;
    }

    .trust-strip {
      padding-top: 0;
    }

    .trust-grid,
    .services-grid,
    .features-grid,
    .testimonials-grid,
    .contact-grid {
      display: grid;
      gap: 1rem;
    }

    .trust-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .trust-card {
      padding: 1.25rem;
      text-align: center;
    }

    .trust-card span {
      color: var(--text-muted);
      display: block;
      margin-bottom: 0.35rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-size: 0.78rem;
      font-weight: 700;
    }

    .trust-card strong {
      color: var(--text-dark);
      font-size: 1.45rem;
    }

    .section-heading {
      margin-bottom: 1.2rem;
      text-align: center;
    }

    .section-heading p {
      color: var(--text-muted);
      margin: 0 auto;
      max-width: 760px;
    }

    .section-alt {
      background: var(--section-alt-bg);
    }

    .services-grid {
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }

    .features-grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .testimonials-grid,
    .contact-grid {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }

    .service-card,
    .feature-card,
    .testimonial-card,
    .contact-card,
    .step,
    .empty-panel {
      padding: 1.5rem;
    }

    .service-card p,
    .feature-card p,
    .testimonial-card p,
    .contact-card a,
    .step p,
    .empty-panel,
    .empty-area-copy {
      color: var(--text-body);
    }

    .service-card ul {
      list-style: none;
      margin: 1rem 0;
      padding: 0;
    }

    .service-card li {
      color: var(--text-body);
      padding: 0.3rem 0;
    }

    .service-card li::before {
      color: var(--accent);
      content: '+ ';
      font-weight: 700;
    }

    .price {
      color: var(--primary);
      font-weight: 700;
      margin-bottom: 0.35rem;
    }

    .price-note {
      color: var(--text-muted);
      font-size: 0.92rem;
      margin-bottom: 1rem;
    }

    .feature-icon {
      align-items: center;
      background: var(--surface-hero-soft);
      border-radius: 999px;
      color: var(--primary);
      display: inline-flex;
      font-weight: 800;
      height: 3rem;
      justify-content: center;
      margin-bottom: 1rem;
      width: 3rem;
    }

    .steps-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .step-number {
      align-items: center;
      background: var(--primary);
      border-radius: 999px;
      color: var(--text-light);
      display: inline-flex;
      font-weight: 800;
      height: 2.5rem;
      justify-content: center;
      margin-bottom: 1rem;
      width: 2.5rem;
    }

    .rating {
      color: var(--warning);
      letter-spacing: 0.2rem;
      margin-bottom: 0.9rem;
    }

    .text {
      margin-bottom: 0.8rem;
    }

    .author {
      color: var(--text-dark);
      margin: 0;
    }

    .service-area-shell {
      padding: 2rem;
      text-align: center;
    }

    .areas-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
      list-style: none;
      margin: 1.2rem 0 1.5rem;
      padding: 0;
    }

    .areas-list li {
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      color: var(--text-body);
      padding: 0.55rem 0.95rem;
    }

    .empty-area-copy {
      margin: 1.2rem 0 1.5rem;
    }

    .home-cta {
      padding-bottom: 4.5rem;
    }

    .home-cta-inner {
      background: var(--surface-hero-soft);
      border: 1px solid var(--primary-tint-border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: 2rem;
      text-align: center;
    }

    .home-cta-inner p {
      color: var(--text-muted);
      margin-bottom: 1rem;
    }

    .contact-card h3 {
      margin-bottom: 0.35rem;
    }

    @media (max-width: 960px) {
      .hero-layout,
      .steps-grid,
      .trust-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .hero {
        padding: calc(var(--header-height) + 1.5rem) 0 3.5rem;
      }

      .hero-buttons {
        flex-direction: column;
      }

      .hero-buttons > * {
        width: 100%;
      }

      .hero-card,
      .trust-card,
      .service-card,
      .feature-card,
      .testimonial-card,
      .contact-card,
      .step,
      .service-area-shell,
      .home-cta-inner,
      .empty-panel {
        padding: 1.4rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  reviewSummary: ReviewSummary = {
    averageRating: 0,
    totalReviews: 0,
    recentReviews: []
  };
  readonly heroImage = this.getImage(IMAGE_CONFIG.hero);

  constructor(
    private configService: ConfigService,
    private apiService: ApiService,
    private eventTrackingService: EventTrackingService
  ) {}

  ngOnInit(): void {
    this.apiService.getReviewSummary(6).subscribe({
      next: (summary) => {
        this.reviewSummary = summary;
      },
      error: () => {
        this.reviewSummary = {
          averageRating: 0,
          totalReviews: 0,
          recentReviews: []
        };
      }
    });
  }

  get brand(): BrandConfig {
    return this.configService.brand;
  }

  get business(): BusinessInfo {
    return this.configService.business;
  }

  get services(): Service[] {
    return this.configService.services;
  }

  get features(): Feature[] {
    return this.configService.features;
  }

  get testimonials(): Testimonial[] {
    return this.configService.testimonials;
  }

  get serviceAreas(): ServiceArea[] {
    return this.configService.serviceAreas;
  }

  get selectedCity(): string {
    return this.configService.selectedCity;
  }

  get heroSubheading(): string {
    return this.selectedCity
      ? `${this.brand.tagline} with city-aware dispatch in ${this.selectedCity}`
      : this.brand.tagline;
  }

  get displayTestimonials(): Testimonial[] {
    if (this.reviewSummary.recentReviews.length > 0) {
      return this.reviewSummary.recentReviews.map(review => ({
        name: review.customerName || 'Coolzo customer',
        location: review.city || review.serviceType || 'Verified booking',
        rating: review.rating,
        text: review.comment || `Booked ${review.serviceType} with a verified technician.`
      }));
    }

    return this.testimonials;
  }

  get averageRatingLabel(): string {
    if (this.reviewSummary.totalReviews > 0) {
      return this.reviewSummary.averageRating.toFixed(1);
    }

    if (this.testimonials.length > 0) {
      const average = this.testimonials.reduce((sum, testimonial) => sum + (testimonial.rating || 0), 0) / this.testimonials.length;
      return average.toFixed(1);
    }

    return '5.0';
  }

  get totalReviewCount(): number {
    return this.reviewSummary.totalReviews || this.testimonials.length;
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

  get whatsAppDisplay(): string {
    return this.business.whatsapp || this.business.phone || 'Chat with our team';
  }

  get phoneDisplay(): string {
    return this.business.phone || 'Call our team';
  }

  get emailDisplay(): string {
    return this.business.email || 'Email our team';
  }

  get emailUrl(): string {
    return this.business.email ? `mailto:${this.business.email}` : '#';
  }

  buildStars(rating: number): number[] {
    return Array.from({ length: Math.max(1, Math.min(5, rating || 5)) }, (_, index) => index + 1);
  }

  getImage(url: string | null | undefined): string | null {
    const value = `${url ?? ''}`.trim();
    return value ? value : null;
  }

  onCallClick(): void {
    void this.eventTrackingService.trackCallButton('Call Now (Home)');
  }

  onWhatsAppClick(): void {
    void this.eventTrackingService.trackWhatsAppClick('WhatsApp (Home)');
  }
}
