import { Component } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { Service } from '../../../core/models';
import { IMAGE_CONFIG } from '../../../core/config/image.config';

@Component({
  selector: 'app-services',
  template: `
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
      <div class="container service-cta-inner">
        <h2>Need help choosing the right AC service?</h2>
        <p>Book now or call us directly for a quick recommendation.</p>
        <div class="cta-actions">
          <a routerLink="/booking" [queryParams]="selectedCity ? { city: selectedCity } : null" class="cta-primary-lg">Book Service Now</a>
          <a [href]="callUrl" class="btn-secondary">Call Support</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
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
      margin-bottom: 0.5rem;
    }

    .service-cta-inner p {
      color: var(--text-muted);
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
export class ServicesComponent {
  readonly servicesImage = this.getImage(IMAGE_CONFIG.services);

  constructor(private configService: ConfigService) {}

  get services(): Service[] {
    return this.configService.services;
  }

  get callUrl(): string {
    return this.configService.getCallUrl();
  }

  get selectedCity(): string {
    return this.configService.selectedCity;
  }

  bookingQueryParams(serviceId: string): { service: string; city?: string } {
    return this.selectedCity
      ? { service: serviceId, city: this.selectedCity }
      : { service: serviceId };
  }

  getImage(url: string | null | undefined): string | null {
    const value = `${url ?? ''}`.trim();
    return value ? value : null;
  }
}
