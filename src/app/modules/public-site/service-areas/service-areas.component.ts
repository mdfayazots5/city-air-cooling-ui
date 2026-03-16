import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { ServiceArea } from '../../../core/models';

@Component({
  selector: 'app-service-areas',
  template: `
    <section class="page-hero">
      <div class="hero-bg-effect"></div>
      <div class="container">
        <h1>Service Areas</h1>
        <p>We provide AC services across Hyderabad</p>
      </div>
    </section>

    <section class="areas-section">
      <div class="container">
        <p class="intro">We are proud to serve customers across Hyderabad and surrounding areas. Our expert technicians are available in the following locations:</p>
        
        <div class="areas-grid">
          <div class="area-card" *ngFor="let area of serviceAreas">
            <h3>{{ area.name }}</h3>
            <p>{{ area.keyword }}</p>
            <a routerLink="/book-service" [queryParams]="{area: area.name}" class="btn-book">Book Now</a>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <h2>Don't see your area?</h2>
        <p>Contact us to check if we service your location</p>
        <a routerLink="/contact" class="btn-primary">Contact Us</a>
      </div>
    </section>
  `,
  styles: [`
    .page-hero {
      min-height: 40vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      position: relative;
      padding-top: 80px;
    }
    
    .areas-section {
      padding: 4rem 0;
    }
    
    .intro {
      text-align: center;
      max-width: 600px;
      margin: 0 auto 3rem;
      color: #666;
    }
    
    .areas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .area-card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    
    .area-card h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    .area-card p {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .btn-book {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: #1a73e8;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-size: 0.9rem;
    }
    
    .cta {
      padding: 4rem 0;
      background: #f8f9fa;
      text-align: center;
    }
    
    .cta h2 {
      margin-bottom: 0.5rem;
    }
    
    .cta p {
      margin-bottom: 1.5rem;
      color: #666;
    }
    
    .btn-primary {
      display: inline-block;
      padding: 1rem 2rem;
      background: #1a73e8;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
  `]
})
export class ServiceAreasComponent implements OnInit {
  serviceAreas: ServiceArea[] = [];

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.serviceAreas = this.configService.serviceAreas;
  }
}

