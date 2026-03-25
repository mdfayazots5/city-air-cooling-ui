import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import {
  PricingQuote,
  ReviewSummary,
  Service,
  ServiceRequestLiveStatus
} from '../../../core/models';
import { IMAGE_CONFIG } from '../../../core/config/image.config';
import { ApiService, BookingRequest, BookingResponse } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';
import { DeviceService } from '../../../core/services/device.service';
import { EventTrackingService } from '../../../core/services/event-tracking.service';
import { LocationService } from '../../../core/services/location.service';
import { MobileConversionService } from '../../../core/services/mobile-conversion.service';

@Component({
  selector: 'app-booking',
  template: `
    <app-booking-form-mobile
      *ngIf="deviceService.isMobile$ | async; else desktopBooking"
      [bookingForm]="bookingForm"
      [services]="services"
      [brands]="brands"
      [availableCities]="availableCities"
      [selectedArea]="selectedArea"
      [minDate]="minDate"
      [currentStep]="currentStep"
      [totalSteps]="totalSteps"
      [steps]="bookingSteps"
      [isSubmitting]="isSubmitting"
      [pricingQuote]="pricingQuote"
      [bookingReceipt]="bookingReceipt"
      [bookingSuccessMessage]="bookingSuccessMessage"
      [bookingErrorMessage]="bookingErrorMessage"
      [selectedServiceName]="selectedServiceName"
      [preferredDateLabel]="preferredDateLabel"
      (citySelected)="onCitySelected($event)"
      (nextStep)="goToNextStep()"
      (previousStep)="goToPreviousStep()"
      (primaryActionPressed)="onMobilePrimaryAction($event)"
      (secondaryActionPressed)="onMobileSecondaryAction($event)"
      (submitBooking)="onSubmit()"
      (trackRequested)="scrollToTracker()">
    </app-booking-form-mobile>

    <ng-template #desktopBooking>
    <section class="page-hero">
      <div class="container">
        <div class="hero-copy">
          <h1>Book a Service</h1>
          <p>Complete the primary booking step in under a minute, then track everything live after submission.</p>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container booking-layout">
        <div class="booking-form-container surface-card">
          <h2>Book AC Service</h2>
          <p class="booking-intro">Finish booking in 3 quick mobile-friendly steps.</p>

          <app-booking-stepper [currentStep]="currentStep" [steps]="bookingSteps"></app-booking-stepper>

          <div class="info-banner booking-city-bar">
            <div>
              <span>Service city</span>
              <strong>{{ selectedArea || 'Will be confirmed from your location' }}</strong>
            </div>
            <div class="city-selector-inline" *ngIf="availableCities.length > 1">
              <label for="booking-city" class="sr-only">Choose service city</label>
              <select
                id="booking-city"
                [ngModel]="selectedArea"
                [ngModelOptions]="{ standalone: true }"
                (ngModelChange)="onCitySelected($event)">
                <option *ngFor="let city of availableCities" [ngValue]="city">{{ city }}</option>
              </select>
            </div>
          </div>

          <div class="status-message success success-card" *ngIf="bookingReceipt">
            <div class="success-title">Request received</div>
            <p class="success-copy">{{ bookingSuccessMessage }}</p>
            <div class="success-grid">
              <div class="success-item">
                <span>Request ID</span>
                <strong>{{ bookingReceipt.requestNo || ('#' + bookingReceipt.bookingId) }}</strong>
              </div>
              <div class="success-item">
                <span>Status</span>
                <strong>{{ formatStatusLabel(bookingReceipt.status || 'New') }}</strong>
              </div>
              <div class="success-item">
                <span>City</span>
                <strong>{{ bookingReceipt.city || selectedArea || '-' }}</strong>
              </div>
              <div class="success-item">
                <span>Urgency</span>
                <strong>{{ bookingReceipt.urgency || 'Standard' }}</strong>
              </div>
              <div class="success-item">
                <span>Estimated Price</span>
                <strong>{{ formatCurrency(bookingReceipt.estimatedPrice) }}</strong>
              </div>
              <div class="success-item">
                <span>ETA</span>
                <strong>{{ bookingReceipt.etaMinutes || 0 }} min</strong>
              </div>
            </div>
            <div class="success-actions">
              <button class="cta-primary" type="button" (click)="scrollToTracker()">Track Your Service</button>
              <span class="assignment-copy" *ngIf="bookingReceipt.autoAssigned">
                Auto-assigned to {{ bookingReceipt.assignedTechnicianName || 'the next available technician' }}.
              </span>
            </div>
          </div>

          <div class="status-message error" *ngIf="bookingErrorMessage">
            {{ bookingErrorMessage }}
          </div>

          <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
            <fieldset *ngIf="currentStep === 1">
              <legend>Step 1 of 3: Select Service</legend>

              <div class="form-grid">
                <div class="form-group form-group--wide">
                  <label for="service">Service Type *</label>
                  <select id="service" formControlName="serviceType" required>
                    <option value="">Select a service</option>
                    <option *ngFor="let service of services" [value]="service.id">{{ service.name }}</option>
                  </select>
                  <div class="error" *ngIf="showFieldError('serviceType', 'required')">
                    Select a service type.
                  </div>
                </div>

                <div class="form-group">
                  <label for="urgency">Dispatch Priority</label>
                  <select id="urgency" formControlName="urgency">
                    <option value="Standard">Standard</option>
                    <option value="Urgent">Urgent (+20%)</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="date">Preferred Date</label>
                  <input type="date" id="date" formControlName="preferredDate" [min]="minDate">
                </div>
              </div>

              <div class="quote-card surface-muted" *ngIf="pricingQuote">
                <div class="quote-header">
                  <h3>Price Preview</h3>
                  <span>{{ pricingQuote.urgency }}</span>
                </div>
                <div class="quote-grid">
                  <div>
                    <span>Base Price</span>
                    <strong>{{ formatCurrency(pricingQuote.basePrice) }}</strong>
                  </div>
                  <div>
                    <span>Estimated Final</span>
                    <strong>{{ formatCurrency(pricingQuote.finalPrice) }}</strong>
                  </div>
                </div>
                <div class="quote-modifiers" *ngIf="pricingQuote.modifiers.length > 0">
                  <div class="modifier-row" *ngFor="let modifier of pricingQuote.modifiers">
                    <span>{{ modifier.label }}</span>
                    <strong>+{{ formatCurrency(modifier.amount) }}</strong>
                  </div>
                </div>
                <p class="quote-note">
                  {{ pricingQuote.priceLabel || 'Starting from live base pricing.' }} Final price may vary after diagnosis.
                </p>
              </div>
            </fieldset>

            <fieldset *ngIf="currentStep === 2">
              <legend>Step 2 of 3: Enter Details</legend>

              <div class="form-grid">
                <div class="form-group">
                  <label for="name">Full Name *</label>
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

                <div class="form-group form-group--wide">
                  <label for="address">Service Address *</label>
                  <textarea
                    id="address"
                    formControlName="address"
                    rows="3"
                    autocomplete="street-address"
                    placeholder="House no, street, landmark"
                    required>
                  </textarea>
                  <div class="error" *ngIf="showFieldError('address', 'required')">
                    Service address is required.
                  </div>
                </div>

                <div class="form-group form-group--wide">
                  <label for="email">Email Address</label>
                  <input type="email" id="email" formControlName="email" autocomplete="email">
                  <div class="error" *ngIf="showFieldError('email', 'email')">
                    Enter a valid email address.
                  </div>
                </div>

                <div class="form-group" *ngIf="brands.length > 0; else brandInput">
                  <label for="brand">AC Brand</label>
                  <select id="brand" formControlName="acBrand">
                    <option value="">Select brand</option>
                    <option *ngFor="let brand of brands" [value]="brand">{{ brand }}</option>
                  </select>
                </div>

                <ng-template #brandInput>
                  <div class="form-group">
                    <label for="brandText">AC Brand</label>
                    <input id="brandText" type="text" formControlName="acBrand" placeholder="Enter AC brand">
                  </div>
                </ng-template>

                <div class="form-group form-group--wide">
                  <label for="issue">Describe the Issue</label>
                  <textarea id="issue" formControlName="issue" rows="3" placeholder="Cooling issue, water leakage, unusual noise, or any notes"></textarea>
                </div>
              </div>
            </fieldset>

            <fieldset *ngIf="currentStep === 3">
              <legend>Step 3 of 3: Confirm Booking</legend>

              <div class="summary-grid">
                <div class="summary-card">
                  <span>Service</span>
                  <strong>{{ selectedServiceName }}</strong>
                </div>
                <div class="summary-card">
                  <span>City</span>
                  <strong>{{ selectedArea || '-' }}</strong>
                </div>
                <div class="summary-card">
                  <span>Priority</span>
                  <strong>{{ bookingForm.get('urgency')?.value || 'Standard' }}</strong>
                </div>
                <div class="summary-card">
                  <span>Date</span>
                  <strong>{{ preferredDateLabel }}</strong>
                </div>
                <div class="summary-card">
                  <span>Name</span>
                  <strong>{{ bookingForm.get('name')?.value || '-' }}</strong>
                </div>
                <div class="summary-card">
                  <span>Phone</span>
                  <strong>{{ bookingForm.get('phone')?.value || '-' }}</strong>
                </div>
                <div class="summary-card form-group--wide">
                  <span>Address</span>
                  <strong>{{ bookingForm.get('address')?.value || '-' }}</strong>
                </div>
              </div>

              <div class="quote-card surface-muted" *ngIf="pricingQuote">
                <div class="quote-header">
                  <h3>Final Price Preview</h3>
                  <span>{{ pricingQuote.urgency }}</span>
                </div>
                <div class="quote-grid">
                  <div>
                    <span>Base Price</span>
                    <strong>{{ formatCurrency(pricingQuote.basePrice) }}</strong>
                  </div>
                  <div>
                    <span>Estimated Final</span>
                    <strong>{{ formatCurrency(pricingQuote.finalPrice) }}</strong>
                  </div>
                </div>
                <p class="quote-note">
                  {{ pricingQuote.priceLabel || 'Starting from live base pricing.' }} Final price may vary after diagnosis.
                </p>
              </div>
            </fieldset>

            <div class="step-actions">
              <button type="button" class="btn-secondary step-btn" *ngIf="currentStep > 1" (click)="goToPreviousStep()">
                Back
              </button>

              <button
                type="button"
                class="cta-primary-lg step-btn"
                *ngIf="currentStep < totalSteps"
                (click)="goToNextStep()">
                {{ currentStep === 1 ? 'Continue to Details' : 'Review Booking' }}
              </button>

              <button
                type="submit"
                class="cta-primary-lg step-btn"
                *ngIf="currentStep === totalSteps"
                [disabled]="isSubmitting">
                {{ isSubmitting ? 'Submitting...' : 'Confirm & Book Service' }}
              </button>
            </div>

            <p class="submit-note" *ngIf="currentStep === totalSteps">We'll confirm availability and contact you shortly after submission.</p>
          </form>
        </div>

        <aside class="booking-sidebar surface-card">
          <div class="media-frame media-frame--panel sidebar-visual" *ngIf="bookingHeroImage as imageUrl">
            <img [src]="imageUrl" alt="Coolzo AC service team preparing for an appointment" loading="lazy" decoding="async">
          </div>

          <div class="sidebar-block">
            <h3>Fast, premium booking</h3>
            <p>Bookings are routed to the best available technician based on service fit, city coverage, and current load.</p>
            <ul class="sidebar-trust-list">
              <li>Quick confirmation call after booking</li>
              <li>Live service status once assigned</li>
              <li>No unnecessary steps before submission</li>
            </ul>
          </div>

          <div class="sidebar-block">
            <h3>Need help first?</h3>
            <p>Use a direct channel if you want to talk before submitting the form.</p>
            <div class="sidebar-actions">
              <a [href]="callUrl" class="btn-secondary" (click)="onCallClick()">Call Now</a>
              <a [href]="whatsAppUrl" class="btn-whatsapp" target="_blank" rel="noopener" (click)="onWhatsAppClick()">WhatsApp</a>
            </div>
          </div>

          <div class="sidebar-block review-block" *ngIf="reviewSummary.totalReviews > 0">
            <h3>Trust Engine</h3>
            <div class="review-rating">{{ reviewSummary.averageRating | number:'1.1-1' }}/5</div>
            <p>Built from {{ reviewSummary.totalReviews }} public customer reviews.</p>
          </div>
        </aside>
      </div>
    </section>
    </ng-template>

    <section class="section-shell" *ngIf="liveStatusLoading || liveStatus" id="tracker">
      <div class="container">
        <div class="tracker-card surface-card">
          <div class="tracker-header">
            <div>
              <h2>Track Your Service</h2>
              <p *ngIf="liveStatus">Request {{ liveStatus.requestNo }} in {{ liveStatus.city || selectedArea }}</p>
            </div>
            <div class="tracker-pill" *ngIf="liveStatus">
              {{ formatStatusLabel(liveStatus.status) }}
            </div>
          </div>

          <ng-container *ngIf="liveStatusLoading">
            <app-skeleton-loader *ngIf="deviceService.isMobile$ | async; else desktopTrackerLoading" [itemCount]="3"></app-skeleton-loader>
            <ng-template #desktopTrackerLoading>
              <app-loading message="Loading live status..."></app-loading>
            </ng-template>
          </ng-container>

          <div *ngIf="liveStatus" class="tracker-layout">
            <div class="timeline">
              <div class="timeline-step" *ngFor="let step of liveStatus.timeline" [class.completed]="step.isCompleted" [class.current]="step.isCurrent">
                <div class="timeline-dot"></div>
                <div>
                  <strong>{{ step.label }}</strong>
                  <p>{{ step.completedAt ? (step.completedAt | date:'medium') : 'Waiting for this step.' }}</p>
                </div>
              </div>
            </div>

            <div class="tracker-summary">
              <div class="summary-grid">
                <div class="summary-card">
                  <span>Technician</span>
                  <strong>{{ liveStatus.technicianName || 'Assigning now' }}</strong>
                </div>
                <div class="summary-card">
                  <span>Contact</span>
                  <strong>{{ liveStatus.technicianPhone || 'Shared after dispatch' }}</strong>
                </div>
                <div class="summary-card">
                  <span>ETA</span>
                  <strong>{{ liveStatus.etaMinutes }} min</strong>
                </div>
                <div class="summary-card">
                  <span>Estimated Price</span>
                  <strong>{{ formatCurrency(liveStatus.estimatedPrice) }}</strong>
                </div>
              </div>

              <div class="review-form-shell" *ngIf="liveStatus.canReview">
                <h3>Rate Your Service</h3>
                <p>Your feedback strengthens the trust engine for the next customer.</p>

                <div class="status-message success" *ngIf="reviewSuccessMessage">{{ reviewSuccessMessage }}</div>
                <div class="status-message error" *ngIf="reviewErrorMessage">{{ reviewErrorMessage }}</div>

                <form [formGroup]="reviewForm" (ngSubmit)="submitReview()">
                  <div class="form-grid">
                    <div class="form-group">
                      <label for="rating">Rating *</label>
                      <select id="rating" formControlName="rating">
                        <option *ngFor="let rating of [5, 4, 3, 2, 1]" [ngValue]="rating">{{ rating }} Star{{ rating > 1 ? 's' : '' }}</option>
                      </select>
                    </div>

                    <div class="form-group form-group--wide">
                      <label for="comment">Comment</label>
                      <textarea id="comment" formControlName="comment" rows="3" placeholder="Tell us how the visit went."></textarea>
                    </div>
                  </div>

                  <label class="checkbox-row">
                    <input type="checkbox" formControlName="isPublic">
                    Show this review publicly
                  </label>

                  <button class="cta-primary" type="submit" [disabled]="isSubmittingReview">
                    {{ isSubmittingReview ? 'Submitting...' : 'Submit Review' }}
                  </button>
                </form>
              </div>

              <div class="status-message success" *ngIf="liveStatus.hasReview && !liveStatus.canReview">
                Review submitted. Thank you for helping future customers book with confidence.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-copy {
      margin: 0 auto;
      max-width: 720px;
    }

    .booking-layout {
      align-items: start;
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr;
    }

    .booking-form-container,
    .booking-sidebar,
    .tracker-card {
      padding: 1.25rem;
    }

    .booking-form-container > p,
    .booking-sidebar p,
    .tracker-header p {
      color: var(--text-muted);
      margin-bottom: 1rem;
    }

    .booking-intro {
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }

    .info-banner {
      background: var(--info-soft);
      border: 1px solid var(--info-border);
      border-radius: var(--radius-sm);
      color: var(--info);
      margin-bottom: 1rem;
      padding: 0.9rem 1rem;
    }

    .booking-city-bar {
      align-items: stretch;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: space-between;
    }

    .booking-city-bar span {
      display: block;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      margin-bottom: 0.2rem;
      text-transform: uppercase;
    }

    .booking-city-bar strong {
      color: var(--primary);
    }

    .city-selector-inline select {
      min-width: 180px;
    }

    .sr-only {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    .form-grid,
    .success-grid,
    .summary-grid,
    .quote-grid {
      display: grid;
      gap: 0.9rem;
      grid-template-columns: 1fr;
    }

    .form-group--wide {
      grid-column: 1 / -1;
    }

    fieldset {
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      margin-bottom: 1.2rem;
      padding: 1.25rem;
    }

    legend {
      color: var(--text-dark);
      font-weight: 700;
      padding: 0 0.4rem;
    }

    .success-card {
      display: grid;
      gap: 0.85rem;
    }

    .success-title {
      font-size: 1rem;
      font-weight: 700;
    }

    .success-copy {
      margin: 0;
    }

    .success-item,
    .summary-card {
      background: rgba(255, 255, 255, 0.8);
      border-radius: var(--radius-sm);
      padding: 0.8rem 0.9rem;
    }

    .success-item span,
    .summary-card span {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      margin-bottom: 0.25rem;
      text-transform: uppercase;
    }

    .success-actions {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 0.85rem;
    }

    .assignment-copy {
      color: var(--text-body);
      font-weight: 600;
    }

    .quote-card {
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      margin-bottom: 1.2rem;
      padding: 1rem 1.1rem;
    }

    .quote-header,
    .tracker-header {
      align-items: start;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }

    .quote-header h3,
    .tracker-header h2 {
      margin: 0;
    }

    .quote-header span,
    .tracker-pill {
      background: var(--surface-hero-soft);
      border-radius: 999px;
      color: var(--primary);
      font-size: 0.82rem;
      font-weight: 700;
      padding: 0.4rem 0.75rem;
    }

    .quote-grid,
    .quote-modifiers {
      margin-top: 0.9rem;
    }

    .quote-grid span,
    .modifier-row span {
      color: var(--text-muted);
      display: block;
      margin-bottom: 0.25rem;
    }

    .modifier-row {
      align-items: center;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.5rem 0;
    }

    .quote-note {
      color: var(--text-body);
      margin: 0.9rem 0 0;
    }

    .step-actions {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .step-btn {
      min-height: 48px;
      width: 100%;
    }

    .cta-primary-lg[disabled] {
      cursor: not-allowed;
      opacity: 0.7;
    }

    .submit-note {
      color: var(--text-muted);
      font-size: 0.92rem;
      margin: 0.9rem 0 0;
      text-align: center;
    }

    .sidebar-block + .sidebar-block {
      border-top: 1px solid var(--border-subtle);
      margin-top: 1rem;
      padding-top: 1rem;
    }

    .sidebar-visual {
      margin-bottom: 1rem;
    }

    .sidebar-trust-list {
      color: var(--text-body);
      display: grid;
      gap: 0.55rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .sidebar-trust-list li::before {
      color: var(--accent);
      content: '+ ';
      font-weight: 700;
    }

    .sidebar-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .review-rating {
      color: var(--primary);
      font-size: 2rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .tracker-layout {
      display: grid;
      gap: 1.25rem;
      grid-template-columns: 1fr;
      margin-top: 1.25rem;
    }

    .timeline {
      display: grid;
      gap: 0.85rem;
    }

    .timeline-step {
      align-items: start;
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      display: grid;
      gap: 0.85rem;
      grid-template-columns: 18px 1fr;
      padding: 0.95rem 1rem;
    }

    .timeline-step.current {
      border-color: var(--primary);
      box-shadow: inset 0 0 0 1px rgba(0, 97, 242, 0.12);
    }

    .timeline-step.completed {
      background: var(--success-soft);
      border-color: var(--success-border);
    }

    .timeline-step p {
      color: var(--text-muted);
      margin: 0.3rem 0 0;
    }

    .timeline-dot {
      background: var(--border-subtle);
      border-radius: 999px;
      height: 18px;
      margin-top: 0.15rem;
      width: 18px;
    }

    .timeline-step.completed .timeline-dot,
    .timeline-step.current .timeline-dot {
      background: var(--primary);
    }

    .review-form-shell {
      border-top: 1px solid var(--border-subtle);
      margin-top: 1.1rem;
      padding-top: 1.1rem;
    }

    .checkbox-row {
      align-items: center;
      display: inline-flex;
      gap: 0.55rem;
      margin: 0 0 1rem;
    }

    @media (min-width: 640px) {
      .booking-city-bar {
        align-items: center;
        flex-direction: row;
      }

      .step-actions {
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
      }

      .step-btn {
        max-width: 240px;
      }
    }

    @media (min-width: 920px) {
      .booking-layout {
        grid-template-columns: minmax(0, 1.55fr) minmax(280px, 0.75fr);
      }
    }

    @media (min-width: 768px) {
      .booking-form-container,
      .booking-sidebar,
      .tracker-card {
        padding: 1.5rem;
      }

      .form-grid,
      .success-grid,
      .summary-grid,
      .quote-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .quote-header,
      .tracker-header,
      .success-actions {
        align-items: center;
        flex-direction: row;
      }
    }

    @media (min-width: 1100px) {
      .tracker-layout {
        grid-template-columns: minmax(260px, 0.85fr) minmax(0, 1.25fr);
      }
    }
  `]
})
export class BookingComponent implements OnInit, OnDestroy {
  bookingForm: FormGroup;
  reviewForm: FormGroup;
  isSubmitting = false;
  isSubmittingReview = false;
  liveStatusLoading = false;
  selectedArea = '';
  bookingSuccessMessage = '';
  bookingErrorMessage = '';
  reviewSuccessMessage = '';
  reviewErrorMessage = '';
  bookingReceipt: BookingResponse | null = null;
  pricingQuote: PricingQuote | null = null;
  liveStatus: ServiceRequestLiveStatus | null = null;
  reviewSummary: ReviewSummary = {
    averageRating: 0,
    totalReviews: 0,
    recentReviews: []
  };
  trackingRequestId: number | null = null;
  trackingRequestNo = '';
  minDate = new Date().toISOString().split('T')[0];
  readonly bookingHeroImage = this.getImage(IMAGE_CONFIG.services);
  readonly totalSteps = 3;
  readonly bookingSteps = ['Select Service', 'Enter Details', 'Confirm Booking'];
  currentStep = 1;
  private cityLockedFromRoute = false;
  private routeEntryHint = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private configService: ConfigService,
    private apiService: ApiService,
    private authService: AuthService,
    private locationService: LocationService,
    private mobileConversionService: MobileConversionService,
    readonly deviceService: DeviceService,
    private eventTrackingService: EventTrackingService
  ) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{10,15}$/)]],
      email: ['', Validators.email],
      serviceType: ['', Validators.required],
      city: [''],
      urgency: ['Standard'],
      acBrand: [''],
      issue: [''],
      address: ['', Validators.required],
      preferredDate: ['']
    });

    this.reviewForm = this.fb.group({
      rating: [5, Validators.required],
      comment: [''],
      isPublic: [true]
    });
  }

  ngOnInit(): void {
    this.mobileConversionService.setGlobalCTAVisibility(false);
    void this.eventTrackingService.trackBookingFormOpened();
    this.mobileConversionService.startStepTimer(this.currentStep);
    this.loadReviewSummary();
    this.applyUserPrefill();
    this.routeEntryHint = typeof document !== 'undefined' ? document.referrer : '';

    const defaultCity = this.configService.selectedCity || this.availableCities[0] || '';
    this.selectedArea = defaultCity;
    this.bookingForm.patchValue({ city: defaultCity }, { emitEvent: false });
    this.applyServiceDefault(this.mobileConversionService.readRememberedServiceHint());
    this.bindPricingRefresh();
    this.syncBookingProgress();

    this.route.queryParams.subscribe(params => {
      const service = `${params['service'] ?? ''}`.trim();
      const area = `${params['area'] ?? params['city'] ?? ''}`.trim();
      const trackId = Number(params['trackId'] ?? 0);
      const requestNo = `${params['requestNo'] ?? ''}`.trim();
      this.routeEntryHint = `${params['entry'] ?? ''}`.trim();

      if (service) {
        this.applyServiceDefault(service);
      } else {
        this.applyServiceDefault();
      }

      this.cityLockedFromRoute = !!area;
      if (area) {
        this.selectedArea = area;
        this.bookingForm.patchValue({ city: area });
        this.configService.setSelectedCity(area);
      } else {
        this.selectedArea = this.bookingForm.get('city')?.value || this.configService.selectedCity || '';
      }

      this.refreshPricingQuote();
      this.syncBookingProgress();

      if (trackId > 0 && requestNo) {
        this.trackingRequestId = trackId;
        this.trackingRequestNo = requestNo;
        this.loadLiveStatus(trackId, requestNo);
      }
    });

    void this.attemptAutoDetectCity();
  }

  ngOnDestroy(): void {
    this.mobileConversionService.setGlobalCTAVisibility(true);
    if (!this.bookingReceipt) {
      if (this.currentStep < this.totalSteps && this.hasBookingDraft()) {
        this.mobileConversionService.recordStepDropOff(this.currentStep);
      }

      this.mobileConversionService.completeStepTimer(this.currentStep);
    }
  }

  get services(): Service[] {
    return this.configService.services;
  }

  get brands(): string[] {
    return this.configService.brands;
  }

  get availableCities(): string[] {
    return this.configService.availableCities;
  }

  get callUrl(): string {
    return this.configService.getCallUrl();
  }

  get whatsAppUrl(): string {
    const cityMessage = this.selectedArea
      ? `Hello, I need AC service in ${this.selectedArea}.`
      : undefined;

    return this.configService.getWhatsAppUrl(cityMessage);
  }

  get selectedServiceName(): string {
    const serviceId = `${this.bookingForm.get('serviceType')?.value ?? ''}`.trim();
    if (!serviceId) {
      return 'Not selected';
    }

    return this.services.find(service => service.id === serviceId)?.name || serviceId;
  }

  get preferredDateLabel(): string {
    const rawValue = `${this.bookingForm.get('preferredDate')?.value ?? ''}`.trim();
    if (!rawValue) {
      return 'Flexible';
    }

    const parsedDate = new Date(rawValue);
    if (Number.isNaN(parsedDate.getTime())) {
      return 'Flexible';
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  showFieldError(controlName: string, errorName: string): boolean {
    const control = this.bookingForm.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }

  goToNextStep(): void {
    if (this.currentStep >= this.totalSteps) {
      return;
    }

    if (!this.validateStep(this.currentStep)) {
      return;
    }

    this.mobileConversionService.recordCtaClick('booking-next-step', 'mobile-booking');
    this.mobileConversionService.completeStepTimer(this.currentStep);
    this.currentStep += 1;
    this.preloadUpcomingStep(this.currentStep);
    this.mobileConversionService.startStepTimer(this.currentStep);
    this.syncBookingProgress();
  }

  goToPreviousStep(): void {
    if (this.currentStep <= 1) {
      return;
    }

    this.mobileConversionService.recordCtaClick('booking-back-step', 'mobile-booking');
    this.mobileConversionService.completeStepTimer(this.currentStep);
    this.currentStep -= 1;
    this.mobileConversionService.startStepTimer(this.currentStep);
    this.syncBookingProgress();
  }

  onSubmit(): void {
    if (this.currentStep < this.totalSteps) {
      this.goToNextStep();
      return;
    }

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.mobileConversionService.recordCtaClick('booking-submit', 'mobile-booking');

    this.isSubmitting = true;
    this.bookingSuccessMessage = '';
    this.bookingErrorMessage = '';
    this.bookingReceipt = null;

    const rawValue = this.bookingForm.getRawValue();
    const bookingData: BookingRequest = {
      name: `${rawValue.name ?? ''}`.trim(),
      phone: `${rawValue.phone ?? ''}`.trim(),
      serviceType: `${rawValue.serviceType ?? ''}`.trim(),
      serviceCode: `${rawValue.serviceType ?? ''}`.trim(),
      address: `${rawValue.address ?? ''}`.trim(),
      preferredDate: rawValue.preferredDate ? new Date(rawValue.preferredDate).toISOString() : null,
      source: 'Web',
      email: `${rawValue.email ?? ''}`.trim() || undefined,
      acBrand: `${rawValue.acBrand ?? ''}`.trim() || undefined,
      issue: `${rawValue.issue ?? ''}`.trim() || undefined,
      city: `${rawValue.city ?? ''}`.trim() || undefined,
      urgency: `${rawValue.urgency ?? 'Standard'}`.trim()
    };

    this.apiService.submitBooking(bookingData).pipe(
      finalize(() => {
        this.isSubmitting = false;
      })
    ).subscribe({
      next: (response) => {
        this.handleBookingSubmitted(response);
      },
      error: (error) => {
        this.bookingErrorMessage = error.error?.message || error.message || 'There was an error submitting your booking. Please try again or call us directly.';
      }
    });
  }

  submitReview(): void {
    if (!this.liveStatus || !this.liveStatus.canReview || !this.trackingRequestId || !this.trackingRequestNo) {
      return;
    }

    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    this.isSubmittingReview = true;
    this.reviewErrorMessage = '';
    this.reviewSuccessMessage = '';

    const reviewValue = this.reviewForm.getRawValue();
    this.apiService.submitReview({
      serviceRequestId: this.trackingRequestId,
      requestNo: this.trackingRequestNo,
      rating: Number(reviewValue.rating) || 5,
      comment: `${reviewValue.comment ?? ''}`.trim() || undefined,
      isPublic: !!reviewValue.isPublic
    }).pipe(
      finalize(() => {
        this.isSubmittingReview = false;
      })
    ).subscribe({
      next: () => {
        this.reviewSuccessMessage = 'Review submitted successfully.';
        this.liveStatus = {
          ...this.liveStatus!,
          canReview: false,
          hasReview: true
        };
        this.loadReviewSummary();
      },
      error: (error) => {
        this.reviewErrorMessage = error.error?.message || error.message || 'Your review could not be submitted right now.';
      }
    });
  }

  scrollToTracker(): void {
    if (typeof document === 'undefined') {
      return;
    }

    this.mobileConversionService.recordCtaClick('booking-track-service', 'mobile-booking');
    document.getElementById('tracker')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onCallClick(): void {
    this.mobileConversionService.recordCtaClick('booking-call', 'mobile-booking');
    void this.eventTrackingService.trackCallButton('Booking Module Call');
  }

  onWhatsAppClick(): void {
    this.mobileConversionService.recordCtaClick('booking-whatsapp', 'mobile-booking');
    void this.eventTrackingService.trackWhatsAppClick('Booking Module WhatsApp');
  }

  onCitySelected(city: string): void {
    const nextCity = `${city ?? ''}`.trim();
    this.selectedArea = nextCity;
    this.bookingForm.patchValue({ city: nextCity });
    if (nextCity) {
      this.configService.setSelectedCity(nextCity);
    }
    this.mobileConversionService.recordCtaClick('booking-city-change', 'mobile-booking');
    this.syncBookingProgress();
  }

  onMobilePrimaryAction(actionLabel: string): void {
    const normalizedAction = `${actionLabel ?? 'primary-action'}`
      .toLowerCase()
      .replace(/\s+/g, '-');
    this.mobileConversionService.recordCtaClick(`booking-${normalizedAction}`, 'mobile-booking');
  }

  onMobileSecondaryAction(actionLabel: string): void {
    const normalizedAction = `${actionLabel ?? 'secondary-action'}`
      .toLowerCase()
      .replace(/\s+/g, '-');
    this.mobileConversionService.recordCtaClick(`booking-${normalizedAction}`, 'mobile-booking');
  }

  formatCurrency(value?: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value ?? 0);
  }

  formatStatusLabel(status: string): string {
    return `${status ?? ''}`.replace(/([a-z])([A-Z])/g, '$1 $2') || 'New';
  }

  getImage(url: string | null | undefined): string | null {
    const value = `${url ?? ''}`.trim();
    return value ? value : null;
  }

  private bindPricingRefresh(): void {
    ['serviceType', 'preferredDate', 'urgency', 'city'].forEach(controlName => {
      this.bookingForm.get(controlName)?.valueChanges.subscribe(value => {
        if (controlName === 'serviceType') {
          const selectedService = `${value ?? ''}`.trim();
          if (selectedService) {
            this.mobileConversionService.rememberServiceHint(selectedService);
          }
        }

        if (controlName === 'city') {
          this.selectedArea = `${value ?? ''}`.trim();
          if (this.selectedArea) {
            this.configService.setSelectedCity(this.selectedArea);
          }
        }

        this.refreshPricingQuote();
        this.syncBookingProgress();
      });
    });
  }

  private refreshPricingQuote(): void {
    const serviceType = `${this.bookingForm.get('serviceType')?.value ?? ''}`.trim();
    if (!serviceType) {
      this.pricingQuote = null;
      return;
    }

    const preferredDate = this.bookingForm.get('preferredDate')?.value;
    const city = `${this.bookingForm.get('city')?.value ?? ''}`.trim();
    const urgency = `${this.bookingForm.get('urgency')?.value ?? 'Standard'}`.trim();

    this.apiService.getPricingQuote({
      serviceType,
      serviceDate: preferredDate ? new Date(preferredDate).toISOString() : undefined,
      urgency,
      city
    }).subscribe({
      next: (quote) => {
        this.pricingQuote = quote;
      },
      error: () => {
        this.pricingQuote = null;
      }
    });
  }

  private loadLiveStatus(requestId: number, requestNo: string): void {
    this.liveStatusLoading = true;
    this.apiService.getServiceRequestLiveStatus(requestId, requestNo).pipe(
      finalize(() => {
        this.liveStatusLoading = false;
      })
    ).subscribe({
      next: (status) => {
        this.liveStatus = this.normalizeLiveStatus(status);
      },
      error: () => {
        this.liveStatus = null;
      }
    });
  }

  private loadReviewSummary(): void {
    this.apiService.getReviewSummary(6).subscribe({
      next: (summary) => {
        this.reviewSummary = {
          averageRating: summary.averageRating ?? 0,
          totalReviews: summary.totalReviews ?? 0,
          recentReviews: summary.recentReviews ?? []
        };
      },
      error: () => {
        this.reviewSummary = {
          averageRating: 0,
          totalReviews: 0,
          recentReviews: []
        };
      }
    });
  }

  private handleBookingSubmitted(response: BookingResponse): void {
    const selectedService = this.bookingForm.get('serviceType')?.value || '';
    const selectedCity = this.bookingForm.get('city')?.value || this.selectedArea;

    this.mobileConversionService.completeStepTimer(this.currentStep);
    void this.eventTrackingService.trackBookingSubmitted(response);
    this.bookingReceipt = {
      ...response,
      status: response.status || 'New',
      city: response.city || selectedCity
    };
    this.bookingSuccessMessage = response.message || 'Your service request has been submitted successfully. We will contact you shortly.';
    this.trackingRequestId = response.bookingId;
    this.trackingRequestNo = response.requestNo;
    this.currentStep = this.totalSteps;
    this.loadLiveStatus(response.bookingId, response.requestNo);
    this.selectedArea = selectedCity;
    if (selectedCity) {
      this.configService.setSelectedCity(selectedCity);
    }

    this.bookingForm.patchValue({
      serviceType: selectedService,
      city: selectedCity
    });
    this.refreshPricingQuote();
    this.syncBookingProgress();
  }

  private applyUserPrefill(): void {
    const user = this.authService.getUser();
    if (!user) {
      return;
    }

    const currentFormValue = this.bookingForm.getRawValue();
    const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

    this.bookingForm.patchValue({
      email: `${currentFormValue.email ?? ''}`.trim() || user.email || '',
      name: `${currentFormValue.name ?? ''}`.trim() || fullName || user.username || '',
      phone: `${currentFormValue.phone ?? ''}`.trim() || user.phone || ''
    }, { emitEvent: false });
  }

  private applyServiceDefault(preferredServiceId?: string): void {
    const currentService = `${this.bookingForm.get('serviceType')?.value ?? ''}`.trim();
    if (currentService) {
      return;
    }

    const preferred = `${preferredServiceId ?? ''}`.trim() || this.mobileConversionService.readRememberedServiceHint();
    const recommendedServiceId = this.mobileConversionService.getRecommendedServices(
      this.services,
      preferred,
      this.routeEntryHint
    )[0]?.id;
    const fallbackServiceId = this.mobileConversionService
      .filterAndSortServices(this.services, 'All', 'popularity')[0]?.id;
    const resolvedServiceId = this.services.some(service => service.id === preferred)
      ? preferred
      : (recommendedServiceId || fallbackServiceId || this.services[0]?.id || '');

    if (!resolvedServiceId) {
      return;
    }

    this.bookingForm.patchValue({ serviceType: resolvedServiceId }, { emitEvent: false });
    this.mobileConversionService.rememberServiceHint(resolvedServiceId);
  }

  private async attemptAutoDetectCity(): Promise<void> {
    if (this.cityLockedFromRoute || this.availableCities.length === 0) {
      return;
    }

    const location = await this.locationService.getLocation();
    if (!location) {
      return;
    }

    const nearestCity = this.mobileConversionService.findNearestCity(
      location.latitude,
      location.longitude,
      this.availableCities
    );

    if (!nearestCity || nearestCity === this.selectedArea) {
      return;
    }

    this.selectedArea = nearestCity;
    this.bookingForm.patchValue({ city: nearestCity });
    this.configService.setSelectedCity(nearestCity);
    this.syncBookingProgress();
  }

  private syncBookingProgress(): void {
    this.mobileConversionService.updateBookingProgress({
      currentStep: this.currentStep,
      hasDraft: this.hasBookingDraft(),
      hasReceipt: !!this.bookingReceipt,
      requestNo: this.bookingReceipt?.requestNo,
      totalSteps: this.totalSteps
    });
  }

  private hasBookingDraft(): boolean {
    if (this.currentStep > 1) {
      return true;
    }

    const name = `${this.bookingForm.get('name')?.value ?? ''}`.trim();
    const phone = `${this.bookingForm.get('phone')?.value ?? ''}`.trim();
    const address = `${this.bookingForm.get('address')?.value ?? ''}`.trim();
    const email = `${this.bookingForm.get('email')?.value ?? ''}`.trim();
    return !!(name || phone || address || email);
  }

  private preloadUpcomingStep(step: number): void {
    if (step === 2) {
      ['name', 'phone', 'address', 'email'].forEach(controlName => {
        this.bookingForm.get(controlName)?.updateValueAndValidity({ emitEvent: false, onlySelf: true });
      });
      return;
    }

    if (step === 3) {
      this.refreshPricingQuote();
    }
  }

  private validateStep(step: number): boolean {
    const controlsByStep: Record<number, string[]> = {
      1: ['serviceType'],
      2: ['name', 'phone', 'address', 'email'],
      3: []
    };

    const controlNames = controlsByStep[step] ?? [];
    let isValid = true;

    controlNames.forEach(controlName => {
      const control = this.bookingForm.get(controlName);
      control?.markAsTouched();
      if (control?.invalid) {
        isValid = false;
      }
    });

    return isValid;
  }

  private normalizeLiveStatus(status: ServiceRequestLiveStatus): ServiceRequestLiveStatus {
    return {
      ...status,
      preferredDate: status.preferredDate ? new Date(status.preferredDate) : undefined,
      scheduledTime: status.scheduledTime ? new Date(status.scheduledTime) : undefined,
      timeline: (status.timeline ?? []).map(step => ({
        ...step,
        completedAt: step.completedAt ? new Date(step.completedAt) : undefined
      }))
    };
  }
}
