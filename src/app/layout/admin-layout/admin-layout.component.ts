import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  template: `
    <div class="admin-layout">
      <aside class="sidebar">
        <div class="logo">
          <h2>City Air Cooling</h2>
          <span>Admin Panel</span>
        </div>
        <nav class="nav-menu">
          <a routerLink="/admin/dashboard" routerLinkActive="active">
            <i class="icon-dashboard"></i> Dashboard
          </a>
          <a routerLink="/admin/customers" routerLinkActive="active">
            <i class="icon-customers"></i> Customers
          </a>
          <a routerLink="/admin/service-requests" routerLinkActive="active">
            <i class="icon-service"></i> Service Requests
          </a>
          <a routerLink="/admin/technicians" routerLinkActive="active">
            <i class="icon-technicians"></i> Technicians
          </a>
          <a routerLink="/admin/billing" routerLinkActive="active">
            <i class="icon-billing"></i> Billing
          </a>
          <a routerLink="/admin/analytics" routerLinkActive="active">
            <i class="icon-analytics"></i> Analytics
          </a>
          <a routerLink="/admin/settings" routerLinkActive="active">
            <i class="icon-settings"></i> Settings
          </a>
        </nav>
        <div class="logout-section">
          <button (click)="logout()">Logout</button>
        </div>
      </aside>
      <main class="main-content">
        <header class="top-header">
          <div class="breadcrumb">
            <span>Admin</span> / <span class="current">Dashboard</span>
          </div>
          <div class="user-info">
            <span class="user-name">Admin User</span>
            <div class="avatar">A</div>
          </div>
        </header>
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }
    .sidebar {
      width: 260px;
      background: #1a1a2e;
      color: white;
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
    .logo {
      padding: 20px 0;
      border-bottom: 1px solid #333;
      margin-bottom: 20px;
    }
    .logo h2 {
      margin: 0;
      font-size: 18px;
    }
    .logo span {
      font-size: 12px;
      color: #888;
    }
    .nav-menu {
      flex: 1;
    }
    .nav-menu a {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      color: #aaa;
      text-decoration: none;
      border-radius: 8px;
      margin-bottom: 5px;
      transition: all 0.3s;
    }
    .nav-menu a:hover,
    .nav-menu a.active {
      background: #16213e;
      color: white;
    }
    .logout-section button {
      width: 100%;
      padding: 12px;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #f5f6fa;
    }
    .top-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 30px;
      background: white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    .breadcrumb {
      color: #888;
    }
    .breadcrumb .current {
      color: #333;
      font-weight: 500;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .user-name {
      color: #333;
    }
    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: #16213e;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content-area {
      flex: 1;
      padding: 30px;
      overflow-y: auto;
    }
  `]
})
export class AdminLayoutComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}

