import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';
import { BusinessInfo } from '../../../core/models';

@Component({
  selector: 'app-header',
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <div class="container">
        <div class="logo">
          <a routerLink="/">
            <h1>{{ business.name }}</h1>
          </a>
        </div>
        <nav class="navigation">
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
            <li><a routerLink="/services" routerLinkActive="active">Services</a></li>
            <li><a routerLink="/service-areas" routerLinkActive="active">Service Areas</a></li>
            <li><a routerLink="/about" routerLinkActive="active">About</a></li>
            <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <a [href]="callUrl" class="btn-call" (click)="onCallClick()">Call Now</a>
          <a [href]="whatsAppUrl" class="btn-whatsapp" target="_blank" (click)="onWhatsAppClick()">WhatsApp</a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .header.scrolled {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .header .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .logo a {
      text-decoration: none;
      color: #1a73e8;
    }
    
    .logo h1 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }
    
    .navigation ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;
    }
    
    .navigation a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s;
    }
    
    .navigation a:hover,
    .navigation a.active {
      color: #1a73e8;
    }
    
    .header-actions {
      display: flex;
      gap: 1rem;
    }
    
    .btn-call,
    .btn-whatsapp {
      padding: 0.5rem 1rem;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
    }
    
    .btn-call {
      background: #1a73e8;
      color: white;
    }
    
    .btn-call:hover {
      background: #1557b0;
    }
    
    .btn-whatsapp {
      background: #25d366;
      color: white;
    }
    
    .btn-whatsapp:hover {
      background: #1da851;
    }
  `]
})
export class HeaderComponent implements OnInit {
  business!: BusinessInfo;
  isScrolled = false;
  callUrl: string = '';
  whatsAppUrl: string = '';

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.business = this.configService.business;
    this.callUrl = this.configService.getCallUrl();
    this.whatsAppUrl = this.configService.getWhatsAppUrl();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 100;
  }

  onCallClick(): void {
    console.log('Call button clicked');
  }

  onWhatsAppClick(): void {
    console.log('WhatsApp clicked');
  }
}

