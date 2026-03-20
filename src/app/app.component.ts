import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ConfigService } from './core/services/config.service';
import { RouteScrollService } from './core/services/route-scroll.service';
import { TestIdInstrumentationService } from './core/services/test-id-instrumentation.service';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="configError; else appShell" class="app-fallback">
      <div class="inline-error-state">
        <strong>Something went wrong.</strong>
        <div>{{ configError }}</div>
      </div>
    </div>

    <ng-template #appShell>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }

    .app-fallback {
      align-items: center;
      display: flex;
      justify-content: center;
      min-height: 100vh;
      padding: 1.5rem;
    }
  `]
})
export class AppComponent {
  configError = '';

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly configService: ConfigService,
    private readonly routeScrollService: RouteScrollService,
    private readonly testIdInstrumentation: TestIdInstrumentationService
  ) {
    void this.routeScrollService;
    this.testIdInstrumentation.start();

    this.configService.configLoadError$.subscribe(error => {
      this.configError = error;
    });

    this.configService.config$.subscribe(config => {
      this.title.setTitle(config.seo.defaultTitle);
      this.meta.updateTag({ name: 'description', content: config.seo.defaultDescription });
      this.meta.updateTag({ property: 'og:title', content: config.seo.defaultTitle });
      this.meta.updateTag({ property: 'og:description', content: config.seo.defaultDescription });
      this.meta.updateTag({ property: 'og:site_name', content: config.brand.name });
    });
  }
}
