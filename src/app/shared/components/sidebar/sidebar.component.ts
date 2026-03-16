import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  permission?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar" [class.collapsed]="isCollapsed">
      <div class="sidebar-header">
        <div class="logo" *ngIf="!isCollapsed">
          <span class="logo-text">CAC</span>
        </div>
        <button class="toggle-btn" (click)="toggleSidebar()">
          <span class="icon">☰</span>
        </button>
      </div>

      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li *ngFor="let item of menuItems" class="nav-item">
            <a [routerLink]="item.route" 
               routerLinkActive="active"
               [routerLinkActiveOptions]="{exact: item.route === '/admin/dashboard'}"
               class="nav-link"
               [title]="item.label">
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-label" *ngIf="!isCollapsed">{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-btn" (click)="logout()">
          <span class="nav-icon">↪</span>
          <span class="nav-label" *ngIf="!isCollapsed">Logout</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background: #1a1a2e;
      color: #fff;
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
    }

    .sidebar.collapsed {
      width: 60px;
    }

    .sidebar-header {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .logo-text {
      font-size: 24px;
      font-weight: bold;
      color: #00d4ff;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
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
      color: #a0a0a0;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .nav-link:hover, .nav-link.active {
      background: rgba(0, 212, 255, 0.1);
      color: #00d4ff;
      border-left: 3px solid #00d4ff;
    }

    .nav-icon {
      font-size: 20px;
      width: 30px;
      text-align: center;
    }

    .nav-label {
      margin-left: 15px;
      white-space: nowrap;
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .logout-btn {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 12px 20px;
      background: none;
      border: none;
      color: #ff6b6b;
      cursor: pointer;
      font-size: 16px;
    }

    .logout-btn:hover {
      background: rgba(255, 107, 107, 0.1);
    }
  `]
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/admin/dashboard' },
    { label: 'Customers', icon: '👥', route: '/admin/customers' },
    { label: 'Service Requests', icon: '🔧', route: '/admin/service-requests' },
    { label: 'Technicians', icon: '⚙️', route: '/admin/technicians' },
    { label: 'Invoices', icon: '📄', route: '/admin/invoices' },
    { label: 'Billing', icon: '💰', route: '/admin/billing' },
    { label: 'Analytics', icon: '📈', route: '/admin/analytics' },
    { label: 'Settings', icon: '⚙️', route: '/admin/settings' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterMenuByPermissions();
  }

  filterMenuByPermissions(): void {
    this.menuItems = this.menuItems.filter(item => {
      if (!item.permission) return true;
      return this.authService.hasPermission(item.permission);
    });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}

