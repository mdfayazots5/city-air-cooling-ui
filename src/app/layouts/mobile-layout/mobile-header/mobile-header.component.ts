import { Component } from '@angular/core';
import { BrandConfig } from '../../../core/models';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-mobile-header',
  template: `
    <header class="mobile-header">
      <div class="mobile-header-bar">
        <a class="brand" routerLink="/" (click)="closeMenu()">
          <span class="brand-mark">{{ brandInitial }}</span>
          <span class="brand-name">{{ brand.name || 'Coolzo' }}</span>
        </a>

        <button class="menu-toggle" type="button" (click)="toggleMenu()">
          {{ menuOpen ? 'Close' : 'Menu' }}
        </button>
      </div>

      <nav class="mobile-drawer" *ngIf="menuOpen" aria-label="Mobile site navigation">
        <a routerLink="/" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active" (click)="closeMenu()">Home</a>
        <a routerLink="/services" routerLinkActive="active" (click)="closeMenu()">Services</a>
        <a routerLink="/booking" [queryParams]="selectedCity ? { city: selectedCity } : null" routerLinkActive="active" (click)="closeMenu()">Book</a>
        <a routerLink="/booking" fragment="tracker" routerLinkActive="active" (click)="closeMenu()">Track</a>
        <a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a>
      </nav>
    </header>
  `,
  styles: [`
    :host {
      display: block;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      z-index: var(--mobile-z-header, 1260);
    }

    .mobile-header {
      background: var(--header-bg);
      border-bottom: 1px solid var(--header-border);
      box-shadow: var(--shadow-sm);
      backdrop-filter: blur(10px);
    }

    .mobile-header-bar {
      align-items: center;
      display: flex;
      gap: 0.75rem;
      justify-content: space-between;
      min-height: 62px;
      padding: 0.6rem 0.9rem;
    }

    .brand {
      align-items: center;
      display: inline-flex;
      gap: 0.6rem;
      min-width: 0;
    }

    .brand-mark {
      align-items: center;
      background: var(--surface-hero);
      border-radius: 0.8rem;
      color: var(--text-light);
      display: inline-flex;
      font-size: 0.95rem;
      font-weight: 800;
      height: 2.1rem;
      justify-content: center;
      width: 2.1rem;
    }

    .brand-name {
      color: var(--text-dark);
      display: block;
      font-size: 0.95rem;
      font-weight: 700;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .menu-toggle {
      align-items: center;
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      color: var(--text-dark);
      display: inline-flex;
      font-size: 0.75rem;
      font-weight: 700;
      justify-content: center;
      min-height: 36px;
      min-width: 36px;
      padding: 0 0.7rem;
    }

    .menu-toggle {
      cursor: pointer;
    }

    .mobile-drawer {
      border-top: 1px solid var(--border-subtle);
      display: grid;
      gap: 0.35rem;
      padding: 0.65rem 0.9rem 0.85rem;
    }

    .mobile-drawer a {
      border-radius: 0.7rem;
      color: var(--text-body);
      font-weight: 600;
      min-height: 44px;
      padding: 0.65rem 0.8rem;
    }

    .mobile-drawer a.active {
      background: var(--surface-hero-soft);
      color: var(--primary);
    }
  `]
})
export class MobileHeaderComponent {
  menuOpen = false;

  constructor(private readonly configService: ConfigService) {}

  get brand(): BrandConfig {
    return this.configService.brand;
  }

  get brandInitial(): string {
    const name = `${this.brand.name ?? ''}`.trim();
    return (name[0] || 'C').toUpperCase();
  }

  get selectedCity(): string {
    return this.configService.selectedCity;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
