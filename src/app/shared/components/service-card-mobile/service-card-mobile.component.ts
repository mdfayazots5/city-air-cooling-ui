import { Component, Input } from '@angular/core';
import { Service } from '../../../core/models';

@Component({
  selector: 'app-service-card-mobile',
  template: `
    <article class="service-card">
      <div class="service-copy">
        <h3>{{ service.name }}</h3>
        <p class="service-description">{{ serviceDescription }}</p>
      </div>

      <div class="service-price" *ngIf="service.price">
        <span>Starting from</span>
        <strong>{{ service.price }}</strong>
      </div>

      <a class="cta-primary" routerLink="/booking" [queryParams]="bookingParams">
        Book Now
      </a>
    </article>
  `,
  styles: [`
    .service-card {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      padding: 1rem;
      width: 100%;
    }

    .service-copy h3 {
      color: var(--text-dark);
      font-size: 1.1rem;
      margin: 0 0 0.35rem;
    }

    .service-description {
      color: var(--text-body);
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .service-price {
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: 0.7rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      min-height: 44px;
      padding: 0.6rem 0.75rem;
    }

    .service-price span {
      color: var(--text-muted);
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }

    .service-price strong {
      color: var(--primary);
      font-size: 0.95rem;
    }

    .cta-primary {
      min-height: 48px;
      width: 100%;
    }
  `]
})
export class ServiceCardMobileComponent {
  @Input({ required: true }) service!: Service;
  @Input() city = '';

  get serviceDescription(): string {
    const text = `${this.service.shortDescription || this.service.description || ''}`.trim();
    return text || 'Fast response and verified AC technician support.';
  }

  get bookingParams(): { service: string; city?: string } {
    const city = `${this.city ?? ''}`.trim();
    return city
      ? { service: this.service.id, city }
      : { service: this.service.id };
  }
}

