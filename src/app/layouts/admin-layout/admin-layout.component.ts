import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { BrandConfig } from '../../core/models';
import { ConfigService } from '../../core/services/config.service';
import { NavigationItem } from '../../core/models/rbac.model';

@Component({
  selector: 'app-admin-layout',
  template: `
    <div class="admin-layout" [class.sidebar-open]="isSidebarOpen">
      <div class="sidebar-backdrop" *ngIf="isSidebarOpen" (click)="closeSidebar()"></div>

      <aside class="sidebar" [class.open]="isSidebarOpen">
        <div class="logo">
          <h2>{{ brand.name }}</h2>
          <span>{{ brand.tagline }}</span>
        </div>
        <nav class="nav-menu">
          <a
            *ngFor="let item of menuItems"
            [routerLink]="item.route"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: item.exact === true }"
            (click)="closeSidebar()">
            <span class="nav-icon">{{ item.icon }}</span> {{ item.label }}
          </a>
        </nav>
        <div class="logout-section">
          <button type="button" (click)="logout()">Logout</button>
        </div>
      </aside>
      <main class="main-content">
        <header class="top-header">
          <button type="button" class="menu-toggle" (click)="toggleSidebar()">
            {{ isSidebarOpen ? 'Close Menu' : 'Menu' }}
          </button>

          <div class="breadcrumb">
            <span>Admin</span> / <span class="current">{{ currentPage }}</span>
          </div>
          <div class="user-info">
            <span class="user-name">{{ currentUserName }}</span>
            <div class="avatar">{{ currentUserRole.charAt(0) || 'A' }}</div>
          </div>
        </header>
        <div class="content-area" data-route-scroll-container>
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .admin-layout {
      display: flex;
      min-height: 100vh;
      position: relative;
    }

    .sidebar-backdrop {
      position: fixed;
      inset: 0;
      background: var(--overlay-dark);
      z-index: 29;
    }

    .sidebar {
      width: 260px;
      background: var(--admin-sidebar);
      color: var(--text-light);
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-md);
      z-index: 30;
    }

    .logo {
      padding: 20px 0;
      border-bottom: 1px solid var(--admin-sidebar-border);
      margin-bottom: 20px;
    }

    .logo h2 {
      margin: 0;
      font-size: 18px;
    }

    .logo span {
      font-size: 12px;
      color: var(--admin-sidebar-muted);
    }

    .nav-menu {
      flex: 1;
    }

    .nav-menu a {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      padding: 12px 15px;
      color: var(--admin-sidebar-text);
      text-decoration: none;
      border-radius: 8px;
      margin-bottom: 5px;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .nav-menu a:hover,
    .nav-menu a.active {
      background: var(--admin-sidebar-active);
      color: var(--text-light);
    }

    .nav-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.75rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.04em;
    }

    .logout-section button {
      width: 100%;
      padding: 12px;
      background: var(--danger-solid);
      color: var(--text-light);
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--surface);
      transition: margin-left 0.3s ease;
      min-width: 0;
      border-left: 1px solid var(--border-subtle);
    }

    .top-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 30px;
      background: var(--surface-solid-strong);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
      gap: 1rem;
    }

    .menu-toggle {
      display: none;
      border: 1px solid var(--border-subtle);
      background: var(--surface-solid);
      color: var(--primary);
      border-radius: 999px;
      padding: 0.5rem 0.9rem;
      font-weight: 600;
      cursor: pointer;
    }

    .breadcrumb {
      color: var(--text-muted);
    }

    .breadcrumb .current {
      color: var(--text-dark);
      font-weight: 500;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-name {
      color: var(--text-dark);
    }

    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: var(--admin-sidebar);
      color: var(--text-light);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content-area {
      flex: 1;
      padding: 30px;
      overflow-y: auto;
      min-width: 0;
    }

    @media (max-width: 1024px) {
      .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        transform: translateX(-100%);
        transition: transform 0.25s ease;
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .menu-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .top-header {
        justify-content: flex-start;
      }

      .user-info {
        margin-left: auto;
      }
    }

    @media (max-width: 768px) {
      .top-header {
        padding: 12px 16px;
      }

      .user-name {
        display: none;
      }

      .content-area {
        padding: 16px;
      }
    }
  `]
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  menuItems: NavigationItem[] = [];
  private authSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  get brand(): BrandConfig {
    return this.configService.brand;
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authState$.subscribe(() => {
      this.menuItems = this.authService.getNavigationItems();
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  logout(): void {
    this.closeSidebar();
    this.authService.logout();
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

  get currentPage(): string {
    const activeSegment = this.router.url.split('/').filter(Boolean).pop() || 'dashboard';

    return activeSegment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  get currentUserName(): string {
    return this.authService.getUser()?.username || 'Authenticated User';
  }

  get currentUserRole(): string {
    return this.authService.getUser()?.role || 'Authorized';
  }
}

