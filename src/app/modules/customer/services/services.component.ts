import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { Service } from '../../../shared/models';

@Component({
  selector: 'app-services',
  template: `
    <section class="page-hero">
      <div class="hero-bg-effect"></div>
      <div class="container">
        <h1>Our Services</h1>
        <p>Professional AC Services in Hyderabad</p>
      </div>
    </section>

    <section class="services-detail">
      <div class="container">
        <div class="service-item" *ngFor="let service of services">
          <h2>{{ service.name }}</h2>
          <p>{{ service.description }}</p>
          <ul>
            <li *ngFor="let feature of service.features">{{ feature }}</li>
          </ul>
          <p class="price"><strong>Price:</strong> {{ service.price }}</p>
          <a routerLink="/book-service" [queryParams]="{service: service.id}" class="btn-primary">Book Now</a>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <h2>Need AC Service?</h2>
        <p>Call us today for fast and reliable service</p>
        <a [href]="callUrl" class="btn-primary btn-pulse">Call Now</a>
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
    
    .page-hero h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }
    
    .page-hero p {
      font-size: 1.25rem;
      opacity: 0.9;
    }
    
    .services-detail {
      padding: 4rem 0;
    }
    
    .service-item {
      background: white;
      padding: 2rem;
      margin-bottom: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .service-item h2 {
      color: #333;
      margin-bottom: 1rem;
    }
    
    .service-item ul {
      list-style: none;
      padding: 0;
      margin: 1rem 0;
    }
    
    .service-item ul li {
      padding: 0.5rem 0;
      color: #666;
    }
    
    .service-item ul li::before {
      content: "✓ ";
      color: #25d366;
    }
    
    .price {
      font-size: 1.1rem;
      color: #1a73e8;
      margin: 1rem 0;
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
      transition: all 0.3s;
    }
    
    .btn-primary:hover {
      background: #1557b0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
  `]
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  callUrl: string = '';

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.services = this.configService.services;
    this.callUrl = this.configService.getCallUrl();
  }
}

