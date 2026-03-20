import { Component } from '@angular/core';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-public-layout',
  template: `
    <app-main-layout [useRouterOutlet]="false">
      <div class="public-layout">
        <app-header></app-header>

        <main class="public-content">
          <router-outlet></router-outlet>
        </main>

        <a
          routerLink="/booking"
          [queryParams]="selectedCity ? { city: selectedCity } : null"
          class="floating-cta">
          Book Now
        </a>

        <app-footer></app-footer>
      </div>
    </app-main-layout>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .public-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .public-content {
      flex: 1;
      padding-top: 80px;
    }

    @media (max-width: 900px) {
      .public-content {
        padding-top: 76px;
      }
    }
  `]
})
export class PublicLayoutComponent {
  constructor(private readonly configService: ConfigService) {}

  get selectedCity(): string {
    return this.configService.selectedCity;
  }
}

