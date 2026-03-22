import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { NavigationItem } from '../../../core/models/rbac.model';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar" [class.collapsed]="isCollapsed">
      <div class="sidebar-header">
        <div class="logo" *ngIf="!isCollapsed">
          <span class="logo-text">CAC</span>
        </div>
        <button class="toggle-btn" type="button" (click)="toggleSidebar()">
          {{ isCollapsed ? 'Open' : 'Hide' }}
        </button>
      </div>

      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li *ngFor="let item of menuItems" class="nav-item">
            <a
              [routerLink]="item.route"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: item.exact === true }"
              class="nav-link"
              [title]="item.label">
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-label" *ngIf="!isCollapsed">{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-btn" type="button" (click)="logout()">
          <span class="nav-icon">-></span>
          <span class="nav-label" *ngIf="!isCollapsed">Logout</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background: var(--admin-sidebar);
      color: var(--text-light);
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
    }

    .sidebar.collapsed {
      width: 72px;
    }

    .sidebar-header {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      border-bottom: 1px solid var(--footer-border);
    }

    .logo-text {
      font-size: 24px;
      font-weight: bold;
      color: var(--primary);
    }

    .toggle-btn {
      background: none;
      border: 1px solid var(--admin-sidebar-border);
      color: var(--text-light);
      cursor: pointer;
      font-size: 12px;
      border-radius: 999px;
      padding: 0.35rem 0.65rem;
    }

    .sidebar-nav {
      flex: 1;
      padding: 20px 0;
      overflow-y: auto;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin: 5px 0;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: var(--admin-sidebar-muted);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .nav-link:hover,
    .nav-link.active {
      background: var(--primary-tint-soft);
      color: var(--primary);
      border-left: 3px solid var(--primary);
    }

    .nav-icon {
      font-size: 12px;
      font-weight: 700;
      width: 30px;
      text-align: center;
      flex-shrink: 0;
    }

    .nav-label {
      margin-left: 15px;
      white-space: nowrap;
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid var(--footer-border);
    }

    .logout-btn {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 12px 20px;
      background: none;
      border: none;
      color: var(--danger);
      cursor: pointer;
      font-size: 16px;
    }

    .logout-btn:hover {
      background: var(--danger-soft);
    }
  `]
})
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  menuItems: NavigationItem[] = [];
  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authState$.subscribe(() => {
      this.menuItems = this.authService.getNavigationItems();
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }
}

