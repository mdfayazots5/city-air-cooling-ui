import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-about',
  template: `
    <section class="page-hero">
      <div class="hero-bg-effect"></div>
      <div class="container">
        <h1>About Us</h1>
        <p>Your Trusted AC Service Partner in Hyderabad</p>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="about-section">
          <h2>Welcome to {{ business.name }}</h2>
          <p>{{ business.description }}</p>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <h3>{{ business.experience }}+</h3>
            <p>Years Experience</p>
          </div>
          <div class="stat-card">
            <h3>5000+</h3>
            <p>Happy Customers</p>
          </div>
          <div class="stat-card">
            <h3>1000+</h3>
            <p>AC Services</p>
          </div>
          <div class="stat-card">
            <h3>24/7</h3>
            <p>Emergency Service</p>
          </div>
        </div>

        <div class="why-choose">
          <h2>Why Choose Us</h2>
          <div class="features-grid">
            <div class="feature" *ngFor="let feature of features">
              <div class="icon">{{ feature.icon }}</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
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
    
    .about-content {
      padding: 4rem 0;
    }
    
    .about-section {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 3rem;
    }
    
    .about-section h2 {
      margin-bottom: 1rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      margin-bottom: 4rem;
    }
    
    .stat-card {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .stat-card h3 {
      font-size: 2.5rem;
      color: #1a73e8;
      margin-bottom: 0.5rem;
    }
    
    .why-choose h2 {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    
    .feature {
      text-align: center;
      padding: 2rem;
    }
    
    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
  `]
})
export class AboutComponent implements OnInit {
  business: any;
  features: any[] = [];

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.business = this.configService.business;
    this.features = this.configService.features;
  }
}

