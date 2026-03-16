import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';
import { BusinessInfo, ServiceArea } from '../../../core/models';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>{{ business.name }}</h3>
            <p>Your trusted AC service partner in Hyderabad</p>
            <div class="contact-info">
              <p><strong>Phone:</strong> <a [href]="callUrl">{{ business.phone }}</a></p>
              <p><strong>Email:</strong> <a [href]="'mailto:' + business.email">{{ business.email }}</a></p>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/services">Services</a></li>
              <li><a routerLink="/service-areas">Service Areas</a></li>
              <li><a routerLink="/about">About</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Our Services</h4>
            <ul>
              <li><a routerLink="/services">AC Repair</a></li>
              <li><a routerLink="/services">AC Installation</a></li>
              <li><a routerLink="/services">AC Maintenance</a></li>
              <li><a routerLink="/services">Gas Refilling</a></li>
              <li><a routerLink="/services">AMC</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Service Areas</h4>
            <ul>
              <li *ngFor="let area of serviceAreas.slice(0, 6)">
                <a [routerLink]="['/service-areas']" [queryParams]="{area: area.name}">{{ area.name }}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} {{ business.name }}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1a1a2e;
      color: white;
      padding: 3rem 0 1rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .footer-section h3 {
      color: #1a73e8;
      margin-bottom: 0.5rem;
    }
    
    .footer-section h4 {
      color: #fff;
      margin-bottom: 1rem;
    }
    
    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-section ul li {
      margin-bottom: 0.5rem;
    }
    
    .footer-section a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .footer-section a:hover {
      color: #1a73e8;
    }
    
    .contact-info p {
      margin: 0.3rem 0;
      color: #ccc;
    }
    
    .contact-info a {
      color: #1a73e8;
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1rem;
      text-align: center;
      color: #888;
    }
  `]
})
export class FooterComponent implements OnInit {
  business!: BusinessInfo;
  serviceAreas: ServiceArea[] = [];
  callUrl: string = '';
  currentYear: number = new Date().getFullYear();

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.business = this.configService.business;
    this.serviceAreas = this.configService.serviceAreas;
    this.callUrl = this.configService.getCallUrl();
  }
}

