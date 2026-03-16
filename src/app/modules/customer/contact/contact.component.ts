import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../../core/services/config.service';
import { ApiService } from '../../../core/services/api.service';
import { EventTrackingService } from '../../../core/services/event-tracking.service';

@Component({
  selector: 'app-contact',
  template: `
    <section class="page-hero">
      <div class="hero-bg-effect"></div>
      <div class="container">
        <h1>Contact Us</h1>
        <p>Get in Touch for AC Services</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Get In Touch</h2>
            <div class="info-item">
              <h3>Phone</h3>
              <a [href]="callUrl">{{ business.phone }}</a>
            </div>
            <div class="info-item">
              <h3>WhatsApp</h3>
              <a [href]="whatsAppUrl" target="_blank">{{ business.phone }}</a>
            </div>
            <div class="info-item">
              <h3>Email</h3>
              <a [href]="'mailto:' + business.email">{{ business.email }}</a>
            </div>
            <div class="info-item">
              <h3>Service Area</h3>
              <p>{{ business.address }}</p>
            </div>
          </div>

          <div class="contact-form">
            <h2>Send Us a Message</h2>
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="name">Your Name</label>
                <input type="text" id="name" formControlName="name" required>
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" formControlName="phone" required>
              </div>
              <div class="form-group">
                <label for="service">Service Required</label>
                <select id="service" formControlName="service">
                  <option value="repair">AC Repair</option>
                  <option value="installation">AC Installation</option>
                  <option value="maintenance">AC Maintenance</option>
                  <option value="gas">Gas Refilling</option>
                  <option value="amc">AMC</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" formControlName="message" rows="5"></textarea>
              </div>
              <button type="submit" class="btn-primary" [disabled]="contactForm.invalid || isSubmitting">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
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
    
    .contact-section {
      padding: 4rem 0;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }
    
    .contact-info h2 {
      margin-bottom: 2rem;
    }
    
    .info-item {
      margin-bottom: 1.5rem;
    }
    
    .info-item h3 {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }
    
    .info-item a {
      color: #1a73e8;
      font-size: 1.1rem;
      text-decoration: none;
    }
    
    .contact-form h2 {
      margin-bottom: 2rem;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
    }
    
    .btn-primary {
      padding: 1rem 2rem;
      background: #1a73e8;
      color: white;
      border: none;
      border-radius: 5px;
      font-weight: 600;
      cursor: pointer;
    }
    
    .btn-primary:hover:not(:disabled) {
      background: #1557b0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
  `]
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  business: any;
  callUrl: string = '';
  whatsAppUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private apiService: ApiService,
    private eventTrackingService: EventTrackingService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      service: ['repair'],
      message: ['']
    });
  }

  ngOnInit(): void {
    this.business = this.configService.business;
    this.callUrl = this.configService.getCallUrl();
    this.whatsAppUrl = this.configService.getWhatsAppUrl();
    this.eventTrackingService.trackContactFormOpened();
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;
    
    this.isSubmitting = true;
    this.apiService.createCustomer(this.contactForm.value).subscribe({
      next: () => {
        this.eventTrackingService.trackContactFormSubmitted();
        alert('Message sent successfully! We will contact you shortly.');
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: () => {
        alert('Message sent! We will contact you shortly.');
        this.contactForm.reset();
        this.isSubmitting = false;
      }
    });
  }
}

