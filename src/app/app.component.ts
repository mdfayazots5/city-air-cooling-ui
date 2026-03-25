import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { ConfigService } from './core/services/config.service';
import { DeviceService } from './core/services/device.service';
import { RouteScrollService } from './core/services/route-scroll.service';
import { TestIdInstrumentationService } from './core/services/test-id-instrumentation.service';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  template: `
    <app-cookie-banner></app-cookie-banner>

    <div *ngIf="configError; else appShell" class="app-fallback">
      <div class="inline-error-state">
        <strong>Something went wrong.</strong>
        <div>{{ configError }}</div>
      </div>
    </div>

    <ng-template #appShell>
      <ng-container *ngIf="useMobileLayout$ | async; else desktopLayout">
        <app-mobile-layout></app-mobile-layout>
      </ng-container>

      <ng-template #desktopLayout>
        <app-existing-layout></app-existing-layout>
      </ng-template>
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
  readonly useMobileLayout$ = combineLatest([
    this.deviceService.isMobile$,
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.router.url || '/')
    )
  ]).pipe(
    map(([isMobile, currentUrl]) => isMobile && this.isPublicRoute(currentUrl))
  );

  private readonly desktopRoutePrefixes = [
    '/admin',
    '/auth',
    '/customer',
    '/technician',
    '/billing',
    '/technicians'
  ];

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly router: Router,
    private readonly deviceService: DeviceService,
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

  private isPublicRoute(url: string): boolean {
    const normalizedUrl = `${url ?? ''}`.split('?')[0].split('#')[0] || '/';
    return !this.desktopRoutePrefixes.some(prefix => normalizedUrl.startsWith(prefix));
  }
}
