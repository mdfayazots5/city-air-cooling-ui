import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';
import { ServiceArea } from '../../../core/models';
import { IMAGE_CONFIG } from '../../../core/config/image.config';

@Component({
  selector: 'app-service-areas',
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="hero-copy">
          <h1>Service Areas</h1>
          <p>Coverage across supported locations with one clear path to booking when you are ready.</p>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container">
        <p class="intro">Browse supported locations below, then head to services when you want to compare options.</p>

        <div class="media-frame media-frame--panel areas-visual" *ngIf="areasImage as imageUrl">
          <img [src]="imageUrl" alt="Coolzo residential AC service coverage" loading="lazy" decoding="async">
        </div>

        <div class="areas-grid" *ngIf="serviceAreas.length > 0; else emptyAreas">
          <div class="area-card surface-card" *ngFor="let area of serviceAreas" [class.area-card--active]="isSelectedArea(area.name)">
            <h3>{{ area.name }}</h3>
            <p>{{ area.keyword }}</p>
          </div>
        </div>

        <ng-template #emptyAreas>
          <div class="area-card surface-card empty-panel">
            Coverage locations will appear here once technician service areas are available.
          </div>
        </ng-template>

        <div class="areas-actions">
          <a routerLink="/services" class="btn-secondary">View Services</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-copy {
      margin: 0 auto;
      max-width: 720px;
    }

    .intro {
      color: var(--text-body);
      margin: 0 auto 1.5rem;
      max-width: 760px;
      text-align: center;
    }

    .areas-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .areas-visual {
      margin: 0 auto 1.5rem;
      max-width: 880px;
    }

    .area-card {
      padding: 1.4rem;
      text-align: center;
    }

    .area-card--active {
      border-color: rgba(10, 31, 68, 0.18);
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    .area-card h3 {
      color: var(--text-dark);
      margin-bottom: 0.35rem;
    }

    .area-card p,
    .empty-panel {
      color: var(--text-muted);
      margin: 0;
    }

    .areas-actions {
      display: flex;
      justify-content: center;
      margin-top: 1.5rem;
    }
  `]
})
export class ServiceAreasComponent implements OnInit {
  selectedArea = '';
  readonly areasImage = this.getImage(IMAGE_CONFIG.services);

  constructor(
    private configService: ConfigService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedArea = `${params['area'] ?? ''}`.trim().toLowerCase();
    });
  }

  get serviceAreas(): ServiceArea[] {
    return this.configService.serviceAreas;
  }

  isSelectedArea(areaName: string): boolean {
    return !!this.selectedArea && areaName.trim().toLowerCase() === this.selectedArea;
  }

  getImage(url: string | null | undefined): string | null {
    const value = `${url ?? ''}`.trim();
    return value ? value : null;
  }
}
