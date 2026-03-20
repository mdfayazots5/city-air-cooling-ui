import { Component } from '@angular/core';
import { BrandConfig, BusinessInfo, Service, ServiceArea } from '../../../core/models';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>{{ brand.name }}</h3>
            <p>{{ brand.tagline }}</p>
            <div class="contact-info">
              <p><strong>Phone:</strong> <a [href]="callUrl" [attr.aria-label]="footerPhoneLabel">{{ footerPhoneLabel }}</a></p>
              <p><strong>Email:</strong> <a [href]="emailUrl" [attr.aria-label]="footerEmailLabel">{{ footerEmailLabel }}</a></p>
            </div>
            <a routerLink="/booking" [queryParams]="selectedCity ? { city: selectedCity } : null" class="cta-primary footer-cta">Book Service</a>
          </div>

          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/services">Services</a></li>
              <li><a routerLink="/service-areas">Service Areas</a></li>
              <li><a routerLink="/about">About</a></li>
              <li><a routerLink="/faq">FAQ</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Our Services</h4>
            <ul>
              <li *ngFor="let service of services.slice(0, 5)">
                <a [routerLink]="['/booking']" [queryParams]="bookingQueryParams(service.id)">{{ service.name }}</a>
              </li>
              <li *ngIf="services.length === 0"><a routerLink="/booking" [queryParams]="selectedCity ? { city: selectedCity } : null">Book Service</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Service Areas</h4>
            <ul>
              <li *ngFor="let area of serviceAreas.slice(0, 6)">
                <a [routerLink]="['/service-areas']" [queryParams]="{ area: area.name }">{{ area.name }}</a>
              </li>
              <li *ngIf="serviceAreas.length === 0"><a routerLink="/service-areas">View Coverage</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} {{ brand.name }}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--footer-bg);
      color: var(--text-light);
      padding: 3rem 0 1rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h3 {
      color: var(--text-light);
      margin-bottom: 0.5rem;
    }

    .footer-section h4 {
      color: var(--text-light);
      margin-bottom: 1rem;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-section ul li {
      margin-bottom: 0.5rem;
    }

    .footer-section a {
      color: var(--footer-text-muted);
      transition: color 0.3s;
    }

    .footer-section a:hover {
      color: var(--text-light);
    }

    .contact-info p {
      margin: 0.3rem 0;
      color: var(--footer-text-muted);
    }

    .contact-info a {
      color: var(--text-light);
    }

    .footer-cta {
      color: #ffffff !important;
      margin-top: 0.5rem;
    }

    .footer-bottom {
      border-top: 1px solid var(--footer-border);
      padding-top: 1rem;
      text-align: center;
      color: var(--footer-text-soft);
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(private configService: ConfigService) {}

  get brand(): BrandConfig {
    return this.configService.brand;
  }

  get business(): BusinessInfo {
    return this.configService.business;
  }

  get services(): Service[] {
    return this.configService.services;
  }

  get serviceAreas(): ServiceArea[] {
    return this.configService.serviceAreas;
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

  get emailUrl(): string {
    return this.business.email ? `mailto:${this.business.email}` : '#';
  }

  get footerPhoneLabel(): string {
    return this.business.phone || 'Call our team';
  }

  get footerEmailLabel(): string {
    return this.business.email || 'Email our team';
  }
}
