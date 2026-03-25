import { Component, Input } from '@angular/core';
import { Service } from '../../../core/models';
import { MobileConversionService } from '../../../core/services/mobile-conversion.service';

@Component({
  selector: 'app-service-card-mobile-public',
  template: `
    <article class="mobile-service-card">
      <div class="service-copy">
        <div class="badge-row">
          <span class="badge badge--recommended" *ngIf="recommended">Recommended</span>
          <span class="badge badge--popular" *ngIf="isMostBooked">Most booked</span>
          <span class="badge badge--fast" *ngIf="isFastService">Fast service</span>
        </div>
        <h3>{{ service.name }}</h3>
        <p>{{ shortDescription }}</p>
      </div>

      <div class="service-meta">
        <div class="price-badge" *ngIf="service.price">
          <span>Starting at</span>
          <strong>{{ service.price }}</strong>
        </div>
      </div>

      <a
        class="btn-secondary service-book-link"
        routerLink="/booking"
        [queryParams]="bookingQueryParams"
        (click)="rememberSelection()">
        Book Now
      </a>
    </article>
  `,
  styles: [`
    .mobile-service-card {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      display: grid;
      gap: 0.8rem;
      padding: 1rem;
    }

    .service-copy h3 {
      color: var(--text-dark);
      display: -webkit-box;
      font-size: 1rem;
      line-height: 1.35;
      margin: 0 0 0.3rem;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-bottom: 0.45rem;
    }

    .badge {
      border-radius: 999px;
      font-size: 0.66rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      padding: 0.2rem 0.5rem;
      text-transform: uppercase;
    }

    .badge--recommended {
      background: rgba(15, 118, 110, 0.14);
      color: #0f766e;
    }

    .badge--popular {
      background: rgba(10, 31, 68, 0.12);
      color: #0a1f44;
    }

    .badge--fast {
      background: rgba(19, 167, 90, 0.13);
      color: #15803d;
    }

    .service-copy p {
      color: var(--text-body);
      display: -webkit-box;
      font-size: 0.9rem;
      line-height: 1.45;
      margin: 0;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }

    .service-meta {
      min-height: 24px;
    }

    .price-badge {
      align-items: center;
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: 0.65rem;
      display: inline-flex;
      gap: 0.35rem;
      min-height: 44px;
      padding: 0.45rem 0.6rem;
    }

    .price-badge span {
      color: var(--text-muted);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .price-badge strong {
      color: var(--primary);
      font-size: 0.88rem;
    }

    .service-book-link {
      min-height: 48px;
      transition: transform 0.14s ease;
      width: 100%;
    }

    .service-book-link:active {
      transform: scale(0.98);
    }
  `]
})
export class ServiceCardMobilePublicComponent {
  @Input({ required: true }) service!: Service;
  @Input() city = '';
  @Input() recommended = false;

  constructor(private readonly mobileConversionService: MobileConversionService) {}

  get isMostBooked(): boolean {
    return this.mobileConversionService.isMostBooked(this.service);
  }

  get isFastService(): boolean {
    return this.mobileConversionService.isFastService(this.service);
  }

  get shortDescription(): string {
    const value = `${this.service.shortDescription || this.service.description || ''}`.trim();
    return value || 'Fast diagnosis and verified technician dispatch.';
  }

  get bookingQueryParams(): { service: string; city?: string } {
    const normalizedCity = `${this.city ?? ''}`.trim();
    return normalizedCity
      ? { service: this.service.id, city: normalizedCity }
      : { service: this.service.id };
  }

  rememberSelection(): void {
    this.mobileConversionService.rememberServiceHint(this.service.id);
    this.mobileConversionService.recordCtaClick('service-card-book-now', 'mobile-services');
  }
}
