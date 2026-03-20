import { Component } from '@angular/core';
import { BusinessInfo, Feature, Service, ServiceArea } from '../../../core/models';
import { IMAGE_CONFIG } from '../../../core/config/image.config';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-about',
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="hero-copy">
          <h1>About {{ business.name }}</h1>
          <p>{{ business.tagline }} with a booking-first experience built for fast response.</p>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container">
        <div class="about-section surface-card">
          <div>
            <span class="section-kicker">About Coolzo</span>
            <h2>Built for dependable AC service</h2>
            <p>{{ business.description }}</p>
          </div>
          <div class="media-frame media-frame--panel" *ngIf="aboutImage as imageUrl">
            <img [src]="imageUrl" alt="Coolzo technician preparing tools for a service visit" loading="lazy" decoding="async">
          </div>
        </div>

        <div class="stats-grid" *ngIf="services.length > 0 || serviceAreas.length > 0 || contactChannelCount > 0">
          <div class="stat-card surface-card">
            <h3>{{ services.length }}</h3>
            <p>Services in the live catalog</p>
          </div>
          <div class="stat-card surface-card">
            <h3>{{ serviceAreas.length }}</h3>
            <p>Active coverage areas</p>
          </div>
          <div class="stat-card surface-card">
            <h3>{{ contactChannelCount }}</h3>
            <p>Direct contact channels</p>
          </div>
        </div>

        <div class="why-choose" *ngIf="features.length > 0">
          <div class="section-heading">
            <h2>Why customers choose us</h2>
            <p>Every public route points to the same clear booking path, backed by responsive service operations.</p>
          </div>
          <div class="features-grid">
            <div class="feature surface-card" *ngFor="let feature of features">
              <div class="icon">{{ feature.icon }}</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-copy {
      margin: 0 auto;
      max-width: 720px;
    }

    .about-section,
    .feature,
    .stat-card {
      padding: 1.75rem;
    }

    .about-section {
      align-items: center;
      display: grid;
      gap: 1.25rem;
      grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.9fr);
      margin: 0 auto 1.5rem;
      max-width: 980px;
    }

    .about-section p,
    .section-heading p,
    .feature p,
    .stat-card p {
      color: var(--text-body);
    }

    .stats-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin-bottom: 2rem;
    }

    .stat-card {
      text-align: center;
    }

    .stat-card h3 {
      color: var(--primary);
      font-size: 2rem;
      margin-bottom: 0.35rem;
    }

    .section-heading {
      margin-bottom: 1.2rem;
      text-align: center;
    }

    .features-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .icon {
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

    @media (max-width: 960px) {
      .features-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
      .about-section {
        grid-template-columns: 1fr;
      }

      .stats-grid,
      .features-grid {
        grid-template-columns: 1fr;
      }

      .about-section,
      .feature,
      .stat-card {
        padding: 1.4rem;
      }
    }
  `]
})
export class AboutComponent {
  readonly aboutImage = this.getImage(IMAGE_CONFIG.technician);

  constructor(private configService: ConfigService) {}

  get business(): BusinessInfo {
    return this.configService.business;
  }

  get services(): Service[] {
    return this.configService.services;
  }

  get serviceAreas(): ServiceArea[] {
    return this.configService.serviceAreas;
  }

  get features(): Feature[] {
    return this.configService.features;
  }

  get contactChannelCount(): number {
    return [this.business.phone, this.business.whatsapp, this.business.email]
      .filter(value => `${value}`.trim().length > 0)
      .length;
  }

  getImage(url: string | null | undefined): string | null {
    const value = `${url ?? ''}`.trim();
    return value ? value : null;
  }
}
