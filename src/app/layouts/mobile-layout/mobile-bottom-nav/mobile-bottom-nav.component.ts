import { Component } from '@angular/core';
import { IsActiveMatchOptions, Params } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';
import { MobileConversionService } from '../../../core/services/mobile-conversion.service';

interface MobileNavItem {
  exact: boolean;
  label: string;
  link: string;
  queryParams?: Params | null;
  fragment?: string;
}

@Component({
  selector: 'app-mobile-bottom-nav',
  template: `
    <nav class="bottom-nav" aria-label="Primary mobile navigation">
      <a
        *ngFor="let item of navItems"
        [routerLink]="item.link"
        [fragment]="item.fragment"
        [queryParams]="item.queryParams || null"
        (click)="onNavTap(item.label)"
        routerLinkActive="active"
        [routerLinkActiveOptions]="item.exact ? exactMatchOptions : subsetMatchOptions">
        <span>{{ item.label }}</span>
      </a>
    </nav>
  `,
  styles: [`
    :host {
      bottom: 0;
      display: block;
      left: 0;
      position: fixed;
      right: 0;
      z-index: var(--mobile-z-bottom-nav, 1240);
    }

    .bottom-nav {
      background: var(--surface-solid-strong);
      border-top: 1px solid var(--border-subtle);
      box-shadow: 0 -8px 28px rgba(10, 31, 68, 0.08);
      display: grid;
      gap: 0.35rem;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      padding: 0.4rem 0.5rem calc(0.45rem + env(safe-area-inset-bottom, 0px));
    }

    .bottom-nav a {
      align-items: center;
      border-radius: 0.75rem;
      color: var(--text-muted);
      display: inline-flex;
      font-size: 0.74rem;
      font-weight: 700;
      justify-content: center;
      min-height: 52px;
      padding: 0.4rem 0.25rem;
      text-align: center;
      transition: transform 0.14s ease, background 0.2s ease, color 0.2s ease;
      white-space: nowrap;
    }

    .bottom-nav a span {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .bottom-nav a.active {
      background: var(--surface-hero-soft);
      color: var(--primary);
    }

    .bottom-nav a:active {
      transform: scale(0.96);
    }
  `]
})
export class MobileBottomNavComponent {
  readonly exactMatchOptions: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    matrixParams: 'ignored',
    fragment: 'ignored'
  };

  readonly subsetMatchOptions: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'ignored',
    matrixParams: 'ignored',
    fragment: 'ignored'
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly mobileConversionService: MobileConversionService
  ) {}

  get navItems(): MobileNavItem[] {
    const city = `${this.configService.selectedCity ?? ''}`.trim();
    const bookingParams = city ? { city } : null;
    const progress = this.mobileConversionService.bookingProgress;
    const profileOrTrackItem: MobileNavItem = progress.hasReceipt
      ? { label: 'Track', link: '/booking', exact: false, fragment: 'tracker' }
      : { label: 'Profile', link: '/auth/login', exact: true };

    return [
      { label: 'Home', link: '/', exact: true },
      { label: 'Services', link: '/services', exact: true },
      { label: 'Book', link: '/booking', exact: true, queryParams: bookingParams },
      profileOrTrackItem
    ];
  }

  onNavTap(label: string): void {
    const normalizedLabel = `${label ?? 'nav-item'}`
      .toLowerCase()
      .replace(/\s+/g, '-');
    this.mobileConversionService.recordCtaClick(`bottom-nav-${normalizedLabel}`, 'mobile-nav');
  }
}
