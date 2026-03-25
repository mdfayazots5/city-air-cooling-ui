import { Component } from '@angular/core';
import { ConfigService } from '../../core/services/config.service';
import { DeviceService } from '../../core/services/device.service';

@Component({
  selector: 'app-public-layout',
  template: `
    <app-main-layout [useRouterOutlet]="false">
      <ng-container *ngIf="deviceService.isMobile$ | async; else desktopPublicLayout">
        <main class="public-content public-content--mobile">
          <router-outlet></router-outlet>
        </main>
      </ng-container>

      <ng-template #desktopPublicLayout>
        <div class="public-layout">
          <app-header></app-header>

          <main class="public-content">
            <router-outlet></router-outlet>
          </main>

          <app-sticky-cta
            [queryParams]="selectedCity ? { city: selectedCity } : null"
            label="Book Service">
          </app-sticky-cta>

          <app-footer></app-footer>
        </div>
      </ng-template>
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

    .public-content--mobile {
      min-height: 100vh;
      padding-bottom: 0;
      padding-top: 0;
    }

    @media (max-width: 900px) {
      .public-content {
        padding-bottom: calc(5rem + env(safe-area-inset-bottom, 0px));
        padding-top: 76px;
      }
    }
  `]
})
export class PublicLayoutComponent {
  constructor(
    private readonly configService: ConfigService,
    readonly deviceService: DeviceService
  ) {}

  get selectedCity(): string {
    return this.configService.selectedCity;
  }
}

