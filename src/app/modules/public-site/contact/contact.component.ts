import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BusinessInfo, Service } from '../../../core/models';
import { IMAGE_CONFIG } from '../../../core/config/image.config';
import { ApiService } from '../../../core/services/api.service';
import { ConfigService } from '../../../core/services/config.service';
import { EventTrackingService } from '../../../core/services/event-tracking.service';

@Component({
  selector: 'app-contact',
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="hero-copy">
          <h1>Contact Us</h1>
          <p>Call, WhatsApp, or send a message through the same stabilized public experience.</p>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container contact-grid">
        <div class="contact-info surface-card">
          <div class="media-frame media-frame--panel contact-visual" *ngIf="contactImage as imageUrl">
            <img [src]="imageUrl" alt="Coolzo support team ready to help with AC bookings" loading="lazy" decoding="async">
          </div>

          <h2>Get In Touch</h2>
          <div class="info-item">
            <h3>Phone</h3>
            <a [href]="callUrl" [attr.aria-label]="phoneDisplay">{{ phoneDisplay }}</a>
          </div>
          <div class="info-item">
            <h3>WhatsApp</h3>
            <a [href]="whatsAppUrl" target="_blank" rel="noopener" [attr.aria-label]="whatsAppDisplay">{{ whatsAppDisplay }}</a>
          </div>
          <div class="info-item">
            <h3>Email</h3>
            <a [href]="emailUrl" [attr.aria-label]="emailDisplay">{{ emailDisplay }}</a>
          </div>
          <div class="info-item">
            <h3>Service Area</h3>
            <p>{{ business.address }}</p>
          </div>
        </div>

        <div class="contact-form surface-card">
          <h2>Send Us a Message</h2>

          <div class="status-message success" *ngIf="successMessage">
            {{ successMessage }}
          </div>

          <div class="status-message error" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Your Name *</label>
              <input type="text" id="name" formControlName="name" autocomplete="name" required>
              <div class="error" *ngIf="showFieldError('name', 'required')">
                Name is required.
              </div>
            </div>

            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input type="tel" id="phone" formControlName="phone" autocomplete="tel" inputmode="tel" required>
              <div class="error" *ngIf="showFieldError('phone', 'required')">
                Phone number is required.
              </div>
              <div class="error" *ngIf="showFieldError('phone', 'pattern')">
                Enter a valid phone number.
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email Address *</label>
              <input type="email" id="email" formControlName="email" autocomplete="email" required>
              <div class="error" *ngIf="showFieldError('email', 'required')">
                Email is required.
              </div>
              <div class="error" *ngIf="showFieldError('email', 'email')">
                Enter a valid email address.
              </div>
            </div>

            <div class="form-group">
              <label for="service">Service Required</label>
              <select id="service" formControlName="service">
                <option value="">Select a service</option>
                <option *ngFor="let service of services" [value]="service.id">{{ service.name }}</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" formControlName="message" rows="5"></textarea>
            </div>

            <button type="submit" class="cta-primary-lg" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-copy {
      margin: 0 auto;
      max-width: 720px;
    }

    .contact-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .contact-info,
    .contact-form {
      padding: 1.6rem;
    }

    .contact-visual {
      margin-bottom: 1.25rem;
    }

    .info-item {
      margin-bottom: 1.35rem;
    }

    .info-item h3 {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 0.2rem;
    }

    .info-item a,
    .info-item p {
      color: var(--text-body);
      margin: 0;
    }

    .cta-primary-lg[disabled] {
      cursor: not-allowed;
      opacity: 0.7;
    }

    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }

      .contact-info,
      .contact-form {
        padding: 1.3rem;
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  readonly contactImage = this.getImage(IMAGE_CONFIG.hero);

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private apiService: ApiService,
    private eventTrackingService: EventTrackingService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      service: [''],
      message: ['']
    });
  }

  ngOnInit(): void {
    void this.eventTrackingService.trackContactFormOpened();
  }

  get business(): BusinessInfo {
    return this.configService.business;
  }

  get services(): Service[] {
    return this.configService.services;
  }

  get callUrl(): string {
    return this.configService.getCallUrl();
  }

  get whatsAppUrl(): string {
    return this.configService.getWhatsAppUrl();
  }

  get phoneDisplay(): string {
    return this.business.phone || 'Call our team';
  }

  get whatsAppDisplay(): string {
    return this.business.whatsapp || this.business.phone || 'Chat with our team';
  }

  get emailDisplay(): string {
    return this.business.email || 'Email our team';
  }

  get emailUrl(): string {
    return this.business.email ? `mailto:${this.business.email}` : '#';
  }

  showFieldError(controlName: string, errorName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.contactForm.getRawValue();
    const [firstName, ...lastNameParts] = formValue.name.trim().split(/\s+/);
    const notes = [`Service: ${formValue.service || 'Not specified'}`];

    if (formValue.message) {
      notes.push(`Message: ${formValue.message}`);
    }

    this.apiService.createCustomer({
      firstName,
      lastName: lastNameParts.join(' ') || undefined,
      phone: formValue.phone,
      email: formValue.email,
      address: notes.join(' | '),
      customerSource: 'Website Contact Form'
    }).pipe(
      finalize(() => {
        this.isSubmitting = false;
      })
    ).subscribe({
      next: () => {
        this.handleContactSubmitted('Message sent successfully. We will contact you shortly.');
      },
      error: (error) => {
        this.errorMessage = error.error?.message || error.message || 'We could not send your message right now. Please try again or call us directly.';
      }
    });
  }

  private handleContactSubmitted(message: string): void {
    void this.eventTrackingService.trackContactFormSubmitted();
    this.successMessage = message;
    this.contactForm.reset({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: ''
    });
  }

  getImage(url: string | null | undefined): string | null {
    const value = `${url ?? ''}`.trim();
    return value ? value : null;
  }
}
