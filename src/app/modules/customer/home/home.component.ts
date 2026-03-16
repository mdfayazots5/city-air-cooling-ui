import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { EventTrackingService } from '../../../core/services/event-tracking.service';
import { BusinessInfo, Service, Feature, Testimonial, ServiceArea } from '../../../shared/models';

@Component({
  selector: 'app-home',
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg-effect"></div>
      <div class="container">
        <h1>AC Not Cooling?</h1>
        <h2>Fast AC Repair in Hyderabad</h2>
        <p>Same Day Service by Experienced Technicians</p>
        <div class="hero-buttons">
          <a [href]="callUrl" class="btn-primary btn-pulse" (click)="onCallClick()">Call Now</a>
          <a [href]="whatsAppUrl" class="btn-whatsapp btn-pulse" target="_blank" (click)="onWhatsAppClick()">WhatsApp</a>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="services-preview" id="services-section">
      <div class="container">
        <h2 class="animate-on-scroll">Our Services</h2>
        <div class="services-grid">
          <div class="service-card animate-on-scroll" *ngFor="let service of services">
            <h3>{{ service.name }}</h3>
            <p>{{ service.shortDescription }}</p>
            <ul>
              <li *ngFor="let feature of service.features.slice(0, 3)">{{ feature }}</li>
            </ul>
            <p class="price">{{ service.price }}</p>
            <a routerLink="/book-service" class="btn-secondary">Book Now</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why-choose-us" id="features-section">
      <div class="container">
        <h2 class="animate-on-scroll">Why Choose Us</h2>
        <div class="features-grid">
          <div class="feature-card animate-on-scroll" *ngFor="let feature of features">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Steps -->
    <section class="process-steps" id="process-section">
      <div class="container">
        <h2 class="animate-on-scroll">How It Works</h2>
        <div class="steps-grid">
          <div class="step animate-on-scroll">
            <div class="step-number">1</div>
            <h3>Contact Us</h3>
            <p>Call us or fill the booking form to request service</p>
          </div>
          <div class="step animate-on-scroll">
            <div class="step-number">2</div>
            <h3>Technician Arrives</h3>
            <p>Our experienced technician visits your location</p>
          </div>
          <div class="step animate-on-scroll">
            <div class="step-number">3</div>
            <h3>AC Repaired</h3>
            <p>We diagnose and fix your AC on the same day</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials" id="testimonials-section">
      <div class="container">
        <h2 class="animate-on-scroll">What Our Customers Say</h2>
        <div class="testimonials-grid">
          <div class="testimonial-card animate-on-scroll" *ngFor="let testimonial of testimonials">
            <div class="rating">
              <span *ngFor="let star of [1,2,3,4,5]" class="star">★</span>
            </div>
            <p class="text">"{{ testimonial.text }}"</p>
            <p class="author"><strong>{{ testimonial.name }}</strong>, {{ testimonial.location }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Areas -->
    <section class="service-areas" id="service-areas-section">
      <div class="container">
        <h2 class="animate-on-scroll">Service Areas</h2>
        <p class="animate-on-scroll">We provide AC services across Hyderabad including:</p>
        <ul class="areas-list">
          <li *ngFor="let area of serviceAreas">{{ area.name }}</li>
        </ul>
        <a routerLink="/service-areas" class="btn-secondary animate-on-scroll">View All Areas</a>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta" id="cta-section">
      <div class="container">
        <h2 class="animate-on-scroll">Need AC Service?</h2>
        <p class="animate-on-scroll">Call Now for Fast AC Service</p>
        <p class="trust-message animate-on-scroll">Trusted by hundreds of homeowners in Hyderabad</p>
        <a [href]="callUrl" class="btn-primary btn-pulse animate-on-scroll" (click)="onCallClick()">Call Now</a>
      </div>
    </section>

    <!-- Contact Preview -->
    <section class="contact-preview" id="contact-section">
      <div class="container">
        <h2 class="animate-on-scroll">Contact Us</h2>
        <div class="contact-info animate-on-scroll">
          <p><strong>Phone:</strong> <a [href]="callUrl">{{ business.phone }}</a></p>
          <p><strong>WhatsApp:</strong> <a [href]="whatsAppUrl" target="_blank">{{ business.phone }}</a></p>
          <p><strong>Email:</strong> <a [href]="'mailto:' + business.email">{{ business.email }}</a></p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Hero Section */
    .hero {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }
    
    .hero-bg-effect {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
    }
    
    .hero .container {
      position: relative;
      z-index: 1;
    }
    
    .hero h1 {
      font-size: 3.5rem;
      color: white;
      margin-bottom: 0.5rem;
    }
    
    .hero h2 {
      font-size: 2rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 1rem;
    }
    
    .hero p {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 2rem;
    }
    
    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    
    .btn-primary, .btn-whatsapp {
      padding: 1rem 2rem;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s;
    }
    
    .btn-primary {
      background: white;
      color: #667eea;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    
    .btn-whatsapp {
      background: #25d366;
      color: white;
    }
    
    .btn-whatsapp:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(37, 211, 102, 0.3);
    }
    
    /* Services Section */
    .services-preview {
      padding: 5rem 0;
      background: #f8f9fa;
    }
    
    .services-preview h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2.5rem;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    
    .service-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;
    }
    
    .service-card:hover {
      transform: translateY(-5px);
    }
    
    .service-card h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    .service-card ul {
      list-style: none;
      padding: 0;
      margin: 1rem 0;
    }
    
    .service-card ul li {
      padding: 0.25rem 0;
      color: #666;
    }
    
    .service-card ul li::before {
      content: "✓ ";
      color: #25d366;
    }
    
    .price {
      font-weight: 600;
      color: #1a73e8;
      font-size: 1.1rem;
    }
    
    /* Features Section */
    .why-choose-us {
      padding: 5rem 0;
    }
    
    .why-choose-us h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2.5rem;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    
    .feature-card {
      text-align: center;
      padding: 2rem;
    }
    
    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .feature-card h3 {
      margin-bottom: 0.5rem;
    }
    
    /* Process Steps */
    .process-steps {
      padding: 5rem 0;
      background: #f8f9fa;
    }
    
    .process-steps h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2.5rem;
    }
    
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    
    .step {
      text-align: center;
      padding: 2rem;
    }
    
    .step-number {
      width: 60px;
      height: 60px;
      background: #1a73e8;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 auto 1rem;
    }
    
    /* Testimonials */
    .testimonials {
      padding: 5rem 0;
    }
    
    .testimonials h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2.5rem;
    }
    
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .testimonial-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .rating .star {
      color: #ffc107;
    }
    
    .testimonial-card .text {
      font-style: italic;
      color: #666;
      margin: 1rem 0;
    }
    
    .testimonial-card .author {
      color: #333;
    }
    
    /* Service Areas */
    .service-areas {
      padding: 5rem 0;
      background: #f8f9fa;
      text-align: center;
    }
    
    .service-areas h2 {
      margin-bottom: 1rem;
      font-size: 2.5rem;
    }
    
    .areas-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
    }
    
    .areas-list li {
      background: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    /* CTA Section */
    .cta {
      padding: 5rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      text-align: center;
      color: white;
    }
    
    .cta h2 {
      margin-bottom: 1rem;
    }
    
    .trust-message {
      margin: 1rem 0 2rem;
      opacity: 0.9;
    }
    
    /* Contact Preview */
    .contact-preview {
      padding: 5rem 0;
      text-align: center;
    }
    
    .contact-preview h2 {
      margin-bottom: 2rem;
      font-size: 2.5rem;
    }
    
    .contact-info {
      font-size: 1.1rem;
    }
    
    .contact-info p {
      margin: 0.5rem 0;
    }
    
    .contact-info a {
      color: #1a73e8;
    }
    
    .btn-secondary {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #1a73e8;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      transition: all 0.3s;
    }
    
    .btn-secondary:hover {
      background: #1557b0;
    }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease-out;
    }
    
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
  `]
})
export class HomeComponent implements OnInit {
  business!: BusinessInfo;
  services: Service[] = [];
  features: Feature[] = [];
  testimonials: Testimonial[] = [];
  serviceAreas: ServiceArea[] = [];
  callUrl: string = '';
  whatsAppUrl: string = '';

  constructor(
    private configService: ConfigService,
    private eventTrackingService: EventTrackingService
  ) {}

  ngOnInit(): void {
    this.business = this.configService.business;
    this.services = this.configService.services;
    this.features = this.configService.features;
    this.testimonials = this.configService.testimonials;
    this.serviceAreas = this.configService.serviceAreas;
    this.callUrl = this.configService.getCallUrl();
    this.whatsAppUrl = this.configService.getWhatsAppUrl();
  }

  onCallClick(): void {
    this.eventTrackingService.trackCallButton('Call Now (Home)');
  }

  onWhatsAppClick(): void {
    this.eventTrackingService.trackWhatsAppClick('WhatsApp (Home)');
  }
}

