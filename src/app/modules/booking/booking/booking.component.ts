import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';
import { ApiService } from '../../../core/services/api.service';
import { EventTrackingService } from '../../../core/services/event-tracking.service';

@Component({
  selector: 'app-booking',
  template: `
    <section class="page-hero">
      <div class="hero-bg-effect"></div>
      <div class="container">
        <h1>Book a Service</h1>
        <p>Schedule Your AC Service</p>
      </div>
    </section>

    <section class="booking-section">
      <div class="container">
        <div class="booking-form-container">
          <h2>Book AC Service</h2>
          <p>Fill out the form below and we will get back to you shortly</p>
          
          <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
            <fieldset>
              <legend>Personal Information</legend>
              <div class="form-group">
                <label for="name">Full Name *</label>
                <input type="text" id="name" formControlName="name" required>
                <div class="error" *ngIf="bookingForm.get('name')?.touched && bookingForm.get('name')?.invalid">
                  Name is required
                </div>
              </div>
              <div class="form-group">
                <label for="phone">Phone Number *</label>
                <input type="tel" id="phone" formControlName="phone" required>
                <div class="error" *ngIf="bookingForm.get('phone')?.touched && bookingForm.get('phone')?.invalid">
                  Phone number is required
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" formControlName="email">
              </div>
            </fieldset>

            <fieldset>
              <legend>Service Details</legend>
              <div class="form-group">
                <label for="service">Service Type *</label>
                <select id="service" formControlName="serviceType" required>
                  <option value="">Select a service</option>
                  <option value="repair">AC Repair</option>
                  <option value="installation">AC Installation</option>
                  <option value="maintenance">AC Maintenance</option>
                  <option value="gas">Gas Refilling</option>
                  <option value="amc">AMC (Annual Maintenance Contract)</option>
                </select>
              </div>
              <div class="form-group">
                <label for="brand">AC Brand</label>
                <select id="brand" formControlName="acBrand">
                  <option value="">Select brand</option>
                  <option value="lg">LG</option>
                  <option value="samsung">Samsung</option>
                  <option value="daikin">Daikin</option>
                  <option value="hitachi">Hitachi</option>
                  <option value="voltas">Voltas</option>
                  <option value="blue-star">Blue Star</option>
                  <option value="carrier">Carrier</option>
                  <option value="panasonic">Panasonic</option>
                  <option value="mitsubishi">Mitsubishi</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="issue">Describe the Issue</label>
                <textarea id="issue" formControlName="issue" rows="4" placeholder="Please describe the problem with your AC..."></textarea>
              </div>
              <div class="form-group">
                <label for="address">Service Address *</label>
                <textarea id="address" formControlName="address" rows="3" required></textarea>
              </div>
              <div class="form-group">
                <label for="date">Preferred Date</label>
                <input type="date" id="date" formControlName="preferredDate">
              </div>
            </fieldset>

            <div class="form-actions">
              <button type="submit" class="btn-primary" [disabled]="bookingForm.invalid || isSubmitting">
                {{ isSubmitting ? 'Submitting...' : 'Book Now' }}
              </button>
            </div>
          </form>
        </div>

        <div class="alternative-booking">
          <h3>Other Ways to Book</h3>
          <p>You can also book your service through:</p>
          <div class="alt-buttons">
            <a [href]="callUrl" class="btn-primary btn-call">Call Now</a>
            <a [href]="whatsAppUrl" class="btn-whatsapp">WhatsApp</a>
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
    
    .page-hero h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }
    
    .booking-section {
      padding: 4rem 0;
    }
    
    .booking-form-container {
      max-width: 700px;
      margin: 0 auto 3rem;
    }
    
    .booking-form-container h2 {
      text-align: center;
      margin-bottom: 0.5rem;
    }
    
    .booking-form-container > p {
      text-align: center;
      color: #666;
      margin-bottom: 2rem;
    }
    
    form fieldset {
      border: 1px solid #ddd;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border-radius: 5px;
    }
    
    form legend {
      font-weight: 600;
      color: #333;
      padding: 0 0.5rem;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
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
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #1a73e8;
    }
    
    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    
    .form-actions {
      text-align: center;
    }
    
    .btn-primary {
      padding: 1rem 2rem;
      background: #1a73e8;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .btn-primary:hover:not(:disabled) {
      background: #1557b0;
    }
    
    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .alternative-booking {
      text-align: center;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 10px;
    }
    
    .alt-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1rem;
    }
    
    .btn-call {
      background: #1a73e8;
      color: white;
      padding: 1rem 2rem;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
    }
    
    .btn-whatsapp {
      background: #25d366;
      color: white;
      padding: 1rem 2rem;
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
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  isSubmitting = false;
  callUrl: string = '';
  whatsAppUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private apiService: ApiService,
    private eventTrackingService: EventTrackingService
  ) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      serviceType: ['', Validators.required],
      acBrand: [''],
      issue: [''],
      address: ['', Validators.required],
      preferredDate: ['']
    });
  }

  ngOnInit(): void {
    this.callUrl = this.configService.getCallUrl();
    this.whatsAppUrl = this.configService.getWhatsAppUrl();
    
    // Track booking form opened
    this.eventTrackingService.trackBookingFormOpened();
    
    // Pre-fill service type from query params
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        this.bookingForm.patchValue({ serviceType: params['service'] });
      }
    });
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const bookingData = this.bookingForm.value;
    
    this.apiService.submitBooking(bookingData).subscribe({
      next: (response) => {
        this.eventTrackingService.trackBookingSubmitted(bookingData);
        alert('Your service request has been submitted successfully! We will contact you shortly.');
        this.bookingForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Booking error:', error);
        alert('There was an error submitting your booking. Please try again or call us directly.');
        this.isSubmitting = false;
      }
    });
  }
}

