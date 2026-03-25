import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
import { MobileConversionService } from '../../core/services/mobile-conversion.service';

@Component({
  selector: 'app-mobile-layout',
  template: `
    <div class="mobile-layout">
      <app-mobile-header></app-mobile-header>

      <main class="mobile-content" data-route-scroll-container>
        <router-outlet></router-outlet>
      </main>

      <ng-container *ngIf="stickyAction$ | async as stickyAction">
        <a
          *ngIf="stickyAction.visible"
          class="sticky-book-cta"
          [routerLink]="stickyAction.link"
          [queryParams]="stickyAction.queryParams"
          [fragment]="stickyAction.fragment"
          (click)="onStickyActionClick(stickyAction.label)">
          {{ stickyAction.label }}
        </a>
      </ng-container>

      <div class="quick-actions">
        <a class="quick-action quick-action--call" [href]="callUrl" aria-label="Call support" (click)="onCallQuickAction()">Call</a>
        <a class="quick-action quick-action--whatsapp" [href]="whatsAppUrl" target="_blank" rel="noopener" aria-label="Open WhatsApp" (click)="onWhatsAppQuickAction()">WhatsApp</a>
      </div>

      <app-mobile-bottom-nav></app-mobile-bottom-nav>
    </div>
  `,
  styles: [`
    :host {
      --mobile-z-content: 1;
      --mobile-z-floating: 1230;
      --mobile-z-bottom-nav: 1240;
      --mobile-z-sticky-cta: 1250;
      --mobile-z-header: 1260;
      --mobile-z-modal: 1400;
      --header-height: 62px;
      display: block;
      min-height: 100vh;
    }

    .mobile-layout {
      min-height: 100vh;
      overflow-x: hidden;
      padding-top: 62px;
      position: relative;
    }

    .mobile-content {
      min-height: calc(100vh - 62px);
      padding-bottom: calc(176px + env(safe-area-inset-bottom, 0px));
      position: relative;
      z-index: var(--mobile-z-content);
    }

    .sticky-book-cta {
      align-items: center;
      background: linear-gradient(135deg, #C89B3C, #A67C2E);
      border: 1px solid rgba(166, 124, 46, 0.3);
      border-radius: 0.8rem;
      bottom: calc(72px + env(safe-area-inset-bottom, 0px));
      box-shadow: var(--shadow-accent-lg);
      color: var(--text-light);
      display: inline-flex;
      font-size: 1rem;
      font-weight: 800;
      justify-content: center;
      left: 0.75rem;
      min-height: 52px;
      position: fixed;
      right: 0.75rem;
      transform: translateY(0);
      transition: transform 0.14s ease, box-shadow 0.2s ease;
      z-index: var(--mobile-z-sticky-cta);
    }

    .sticky-book-cta:active {
      transform: scale(0.985);
    }

    .quick-actions {
      display: grid;
      gap: 0.5rem;
      bottom: calc(132px + env(safe-area-inset-bottom, 0px));
      position: fixed;
      right: 0.75rem;
      z-index: var(--mobile-z-floating);
    }

    .quick-action {
      align-items: center;
      background: var(--surface-solid-strong);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      color: var(--text-dark);
      display: inline-flex;
      font-size: 0.72rem;
      font-weight: 700;
      justify-content: center;
      min-height: 36px;
      min-width: 36px;
      padding: 0 0.75rem;
      transition: transform 0.14s ease;
    }

    .quick-action:active {
      transform: scale(0.96);
    }

    .quick-action--call {
      border-color: rgba(10, 31, 68, 0.2);
    }

    .quick-action--whatsapp {
      border-color: rgba(19, 167, 90, 0.35);
      color: var(--whatsapp-strong);
    }
  `]
})
export class MobileLayoutComponent {
  readonly stickyAction$ = combineLatest([
    this.mobileConversionService.bookingProgress$,
    this.configService.selectedCity$,
    this.mobileConversionService.isGlobalCTAVisible$,
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.router.url || '/')
    )
  ]).pipe(
    map(([_progress, selectedCity, isGlobalCTAVisible, currentUrl]) => {
      const action = this.mobileConversionService.getStickyAction(currentUrl, selectedCity);
      return {
        ...action,
        visible: action.visible && isGlobalCTAVisible
      };
    })
  );

  constructor(
    private readonly router: Router,
    private readonly configService: ConfigService,
    private readonly mobileConversionService: MobileConversionService
  ) {}

  get callUrl(): string {
    return this.configService.getCallUrl();
  }

  get whatsAppUrl(): string {
    const city = `${this.configService.selectedCity ?? ''}`.trim();
    const message = city
      ? `Hello, I need AC service in ${city}.`
      : undefined;

    return this.configService.getWhatsAppUrl(message);
  }

  onStickyActionClick(label: string): void {
    const normalizedLabel = `${label ?? 'sticky-action'}`
      .toLowerCase()
      .replace(/\s+/g, '-');
    this.mobileConversionService.recordCtaClick(`sticky-${normalizedLabel}`, 'mobile-layout');
  }

  onCallQuickAction(): void {
    this.mobileConversionService.recordCtaClick('quick-call', 'mobile-layout');
  }

  onWhatsAppQuickAction(): void {
    this.mobileConversionService.recordCtaClick('quick-whatsapp', 'mobile-layout');
  }
}
