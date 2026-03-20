import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';
import { EventTrackingService } from '../../../core/services/event-tracking.service';

@Component({
  selector: 'app-customer-home',
  template: `
    <section class="customer-hero">
      <div class="container">
        <h1>Customer Portal</h1>
        <p>Access services, booking, and support from one place.</p>
      </div>
    </section>

    <section class="customer-section">
      <div class="container content-grid">
        <article class="panel">
          <h2>Quick Actions</h2>
          <p class="muted">
            Choose where you want to go next.
          </p>

          <div class="actions-grid">
            <a routerLink="/services" class="action-link">View Services</a>
            <a routerLink="/booking" class="action-link">Book Service</a>
            <a routerLink="/contact" class="action-link">Contact Support</a>
            <a routerLink="/faq" class="action-link">Read FAQ</a>
            <a routerLink="/service-areas" class="action-link">Service Areas</a>
            <a routerLink="/about" class="action-link">About Us</a>
          </div>
        </article>

        <article class="panel" *ngIf="focusTitle">
          <h2>{{ focusTitle }}</h2>
          <p class="muted">
            You are on a legacy customer link. Continue with the button below.
          </p>
          <a [routerLink]="focusRoute" class="btn-primary">Open {{ focusTitle }}</a>
        </article>

        <article class="panel">
          <h2>Need Immediate Help?</h2>
          <p class="muted">
            Reach us directly by phone or WhatsApp.
          </p>
          <div class="contact-actions">
            <a [href]="callUrl" class="btn-primary" (click)="onCallClick()">Call Now</a>
            <a [href]="whatsAppUrl" class="btn-whatsapp" target="_blank" rel="noopener" (click)="onWhatsAppClick()">
              WhatsApp
            </a>
          </div>
        </article>
      </div>
    </section>
  `,
  styles: [`
    .customer-hero {
      min-height: 28vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--text-light);
      background: var(--surface-hero);
      padding: 4.5rem 1rem 2rem;
    }

    .customer-hero h1 {
      margin: 0 0 0.5rem;
      font-size: 2.1rem;
    }

    .customer-hero p {
      margin: 0;
      opacity: 0.92;
    }

    .customer-section {
      padding: 2.5rem 0;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .content-grid {
      display: grid;
      gap: 1rem;
    }

    .panel {
      background: var(--surface-solid-strong);
      border-radius: 14px;
      padding: 1.25rem;
      box-shadow: var(--shadow-md);
    }

    .panel h2 {
      margin: 0 0 0.5rem;
    }

    .muted {
      margin: 0 0 1rem;
      color: var(--text-muted);
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }

    .action-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 0.75rem 1rem;
      color: var(--text-dark);
      background: var(--surface-solid);
      transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;
    }

    .action-link:hover {
      border-color: var(--primary);
      color: var(--primary);
      box-shadow: var(--shadow-focus);
    }

    .contact-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .btn-primary,
    .btn-whatsapp {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      border-radius: 10px;
      padding: 0.85rem 1.25rem;
      font-weight: 600;
    }

    .btn-primary {
      background: var(--primary);
      color: var(--text-light);
    }

    .btn-primary:hover {
      background: var(--primary-strong);
    }

    .btn-whatsapp {
      background: var(--whatsapp);
      color: var(--text-light);
    }

    .btn-whatsapp:hover {
      background: var(--whatsapp-strong);
    }

    @media (max-width: 900px) {
      .actions-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 640px) {
      .customer-hero h1 {
        font-size: 1.7rem;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CustomerHomeComponent implements OnInit {
  callUrl = '';
  whatsAppUrl = '';
  focusTitle = '';
  focusRoute = '/';

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private eventTrackingService: EventTrackingService
  ) {}

  ngOnInit(): void {
    this.callUrl = this.configService.getCallUrl();
    this.whatsAppUrl = this.configService.getWhatsAppUrl();

    this.route.data.subscribe((data: Data) => {
      this.focusTitle = data['focusTitle'] ?? '';
      this.focusRoute = data['focusRoute'] ?? '/';
    });
  }

  onCallClick(): void {
    void this.eventTrackingService.trackCallButton('Customer Portal Call Now');
  }

  onWhatsAppClick(): void {
    void this.eventTrackingService.trackWhatsAppClick('Customer Portal WhatsApp');
  }
}

