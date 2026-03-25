import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookingResponse } from '../../../core/services/api.service';
import { PricingQuote, Service } from '../../../core/models';

@Component({
  selector: 'app-booking-form-mobile',
  template: `
    <section class="mobile-booking-shell">
      <header class="shell-header">
        <h1>Book Service</h1>
        <p>Finish booking in under 30 seconds with just one action per step.</p>
      </header>

      <div class="trust-strip">
        <span>4.8 Rating</span>
        <span>1000+ Services Completed</span>
        <span>Verified Technicians</span>
      </div>

      <div class="city-row" *ngIf="availableCities.length > 0">
        <label for="mobile-booking-city">Service city</label>
        <select
          id="mobile-booking-city"
          [ngModel]="selectedArea"
          [ngModelOptions]="{ standalone: true }"
          (ngModelChange)="citySelected.emit($event)">
          <option *ngFor="let city of availableCities" [ngValue]="city">{{ city }}</option>
        </select>
      </div>

      <app-mobile-booking-stepper
        [currentStep]="currentStep"
        [totalSteps]="totalSteps"
        [steps]="steps">
      </app-mobile-booking-stepper>

      <div class="status-message success" *ngIf="bookingReceipt">
        <strong>Request received:</strong> {{ bookingReceipt.requestNo || ('#' + bookingReceipt.bookingId) }}
      </div>

      <div class="status-message error" *ngIf="bookingErrorMessage">{{ bookingErrorMessage }}</div>

      <form [formGroup]="bookingForm" novalidate>
        <fieldset *ngIf="currentStep === 1">
          <legend>Select Service</legend>

          <div class="form-group">
            <label for="mobile-service">Service Type *</label>
            <select id="mobile-service" #stepOneService formControlName="serviceType">
              <option value="">Select service</option>
              <option *ngFor="let service of services" [value]="service.id">{{ service.name }}</option>
            </select>
            <div class="error" *ngIf="showFieldError('serviceType', 'required')">Service is required.</div>
          </div>

          <div class="form-group">
            <label for="mobile-urgency">Priority</label>
            <select id="mobile-urgency" formControlName="urgency">
              <option value="Standard">Standard</option>
              <option value="Urgent">Urgent (+20%)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="mobile-date">Preferred Date</label>
            <input id="mobile-date" type="date" formControlName="preferredDate" [min]="minDate">
          </div>
        </fieldset>

        <fieldset *ngIf="currentStep === 2">
          <legend>Enter Details</legend>

          <div class="form-group">
            <label for="mobile-name">Full Name *</label>
            <input id="mobile-name" #stepTwoName type="text" formControlName="name" autocomplete="name">
            <div class="error" *ngIf="showFieldError('name', 'required')">Name is required.</div>
          </div>

          <div class="form-group">
            <label for="mobile-phone">Phone Number *</label>
            <input id="mobile-phone" type="tel" formControlName="phone" autocomplete="tel" inputmode="tel">
            <div class="error" *ngIf="showFieldError('phone', 'required')">Phone number is required.</div>
            <div class="error" *ngIf="showFieldError('phone', 'pattern')">Enter a valid phone number.</div>
          </div>

          <div class="form-group">
            <label for="mobile-address">Service Address *</label>
            <textarea id="mobile-address" formControlName="address" rows="3" autocomplete="street-address"></textarea>
            <div class="error" *ngIf="showFieldError('address', 'required')">Address is required.</div>
          </div>

          <div class="form-group">
            <label for="mobile-email">Email</label>
            <input id="mobile-email" type="email" formControlName="email" autocomplete="email">
            <div class="error" *ngIf="showFieldError('email', 'email')">Enter a valid email.</div>
          </div>
        </fieldset>

        <fieldset *ngIf="currentStep === 3">
          <legend>Confirm Booking</legend>

          <div class="summary-grid">
            <div class="summary-card">
              <span>Service</span>
              <strong>{{ selectedServiceName || '-' }}</strong>
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
              <strong>{{ preferredDateLabel || 'Flexible' }}</strong>
            </div>
            <div class="summary-card">
              <span>Name</span>
              <strong>{{ bookingForm.get('name')?.value || '-' }}</strong>
            </div>
            <div class="summary-card">
              <span>Phone</span>
              <strong>{{ bookingForm.get('phone')?.value || '-' }}</strong>
            </div>
            <div class="summary-card summary-card--full">
              <span>Address</span>
              <strong>{{ bookingForm.get('address')?.value || '-' }}</strong>
            </div>
          </div>

          <button
            #optionalDetailsToggle
            type="button"
            class="btn-secondary optional-toggle"
            (click)="toggleOptionalDetails()">
            {{ showOptionalDetails ? 'Hide Optional Details' : 'Add Optional Details' }}
          </button>

          <div class="optional-fields" *ngIf="showOptionalDetails">
            <div class="form-group" *ngIf="brands.length > 0; else brandInput">
              <label for="mobile-brand">AC Brand (Optional)</label>
              <select id="mobile-brand" #stepThreeBrand formControlName="acBrand">
                <option value="">Select brand</option>
                <option *ngFor="let brand of brands" [value]="brand">{{ brand }}</option>
              </select>
            </div>

            <ng-template #brandInput>
              <div class="form-group">
                <label for="mobile-brand-text">AC Brand (Optional)</label>
                <input id="mobile-brand-text" #stepThreeBrand type="text" formControlName="acBrand">
              </div>
            </ng-template>

            <div class="form-group">
              <label for="mobile-issue">Issue Notes (Optional)</label>
              <textarea id="mobile-issue" formControlName="issue" rows="3"></textarea>
            </div>
          </div>
        </fieldset>

        <div class="quote-card" *ngIf="pricingQuote">
          <div>
            <span>Estimated Price</span>
            <strong>{{ formatCurrency(pricingQuote.finalPrice) }}</strong>
          </div>
          <small>{{ pricingQuote.priceLabel || 'Final price may vary after diagnosis.' }}</small>
        </div>
      </form>

      <div class="sticky-actions">
        <button type="button" class="btn-secondary" *ngIf="currentStep > 1" (click)="onBackClick()">Back</button>
        <button type="button" class="cta-primary-lg primary-action" [disabled]="primaryDisabled" (click)="onPrimaryAction()">
          {{ primaryActionLabel }}
        </button>
      </div>

      <div class="success-footer" *ngIf="bookingSuccessMessage && bookingReceipt">
        <p>{{ bookingSuccessMessage }}</p>
        <button class="btn-secondary" type="button" (click)="onTrackClick()">Track Service</button>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .mobile-booking-shell {
      display: grid;
      gap: 0.85rem;
      margin: 0 auto;
      max-width: 680px;
      padding: 1rem 1rem calc(228px + env(safe-area-inset-bottom, 0px));
    }

    .shell-header h1 {
      color: var(--text-dark);
      font-size: 1.25rem;
      line-height: 1.3;
      margin: 0;
    }

    .shell-header p {
      color: var(--text-muted);
      display: -webkit-box;
      margin: 0.25rem 0 0;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .trust-strip {
      display: grid;
      gap: 0.45rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .trust-strip span {
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: 0.6rem;
      color: var(--text-body);
      font-size: 0.68rem;
      font-weight: 700;
      min-height: 56px;
      padding: 0.45rem;
      text-align: center;
      word-break: break-word;
    }

    .city-row {
      display: grid;
      gap: 0.4rem;
    }

    fieldset {
      animation: stepSlide 0.2s ease;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      display: grid;
      gap: 0.65rem;
      margin: 0;
      min-height: 320px;
      padding: 0.9rem;
    }

    legend {
      color: var(--text-dark);
      font-size: 0.9rem;
      font-weight: 700;
      padding: 0 0.3rem;
    }

    .form-group {
      margin: 0;
    }

    .summary-grid {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .summary-card {
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: 0.7rem;
      min-height: 44px;
      padding: 0.65rem 0.75rem;
    }

    .summary-card--full {
      grid-column: 1 / -1;
    }

    .summary-card span {
      color: var(--text-muted);
      display: block;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      margin-bottom: 0.15rem;
      text-transform: uppercase;
    }

    .summary-card strong {
      color: var(--text-dark);
      font-size: 0.9rem;
    }

    .optional-toggle {
      width: 100%;
    }

    .optional-fields {
      display: grid;
      gap: 0.65rem;
      margin-bottom: 5rem;
    }

    .quote-card {
      align-items: center;
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      display: grid;
      gap: 0.2rem;
      min-height: 44px;
      padding: 0.8rem;
    }

    .quote-card span {
      color: var(--text-muted);
      display: block;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .quote-card strong {
      color: var(--primary);
      font-size: 1.1rem;
    }

    .quote-card small {
      color: var(--text-body);
      font-size: 0.8rem;
    }

    .sticky-actions {
      align-items: center;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0), var(--surface-solid-strong));
      bottom: calc(72px + env(safe-area-inset-bottom, 0px));
      display: grid;
      gap: 0.55rem;
      grid-template-columns: 1fr;
      left: 0;
      padding: 0.9rem 1rem;
      position: fixed;
      right: 0;
      z-index: var(--mobile-z-sticky-cta, 1250);
    }

    .sticky-actions button {
      min-height: 50px;
      width: 100%;
    }

    .primary-action:active,
    .btn-secondary:active {
      transform: scale(0.98);
    }

    .success-footer {
      background: var(--success-soft);
      border: 1px solid var(--success-border);
      border-radius: var(--radius-md);
      display: grid;
      gap: 0.5rem;
      padding: 0.75rem;
    }

    .success-footer p {
      color: var(--success);
      font-size: 0.9rem;
      margin: 0;
    }

    @keyframes stepSlide {
      from {
        opacity: 0;
        transform: translateX(10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class BookingFormMobileComponent implements OnChanges, AfterViewInit {
  @Input({ required: true }) bookingForm!: FormGroup;
  @Input() services: Service[] = [];
  @Input() brands: string[] = [];
  @Input() availableCities: string[] = [];
  @Input() selectedArea = '';
  @Input() minDate = '';
  @Input() currentStep = 1;
  @Input() totalSteps = 3;
  @Input() steps: string[] = ['Select Service', 'Enter Details', 'Confirm Booking'];
  @Input() isSubmitting = false;
  @Input() pricingQuote: PricingQuote | null = null;
  @Input() bookingReceipt: BookingResponse | null = null;
  @Input() bookingSuccessMessage = '';
  @Input() bookingErrorMessage = '';
  @Input() selectedServiceName = '';
  @Input() preferredDateLabel = 'Flexible';

  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  @Output() submitBooking = new EventEmitter<void>();
  @Output() citySelected = new EventEmitter<string>();
  @Output() trackRequested = new EventEmitter<void>();
  @Output() primaryActionPressed = new EventEmitter<string>();
  @Output() secondaryActionPressed = new EventEmitter<string>();

  @ViewChild('stepOneService') private stepOneServiceInput?: ElementRef<HTMLSelectElement>;
  @ViewChild('stepTwoName') private stepTwoNameInput?: ElementRef<HTMLInputElement>;
  @ViewChild('stepThreeBrand') private stepThreeBrandInput?: ElementRef<HTMLElement>;
  @ViewChild('optionalDetailsToggle') private optionalDetailsToggle?: ElementRef<HTMLButtonElement>;

  private attemptedSubmit = false;
  showOptionalDetails = false;

  ngAfterViewInit(): void {
    this.focusStepInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentStep']) {
      this.attemptedSubmit = false;
      this.showOptionalDetails = false;
      this.focusStepInput();
    }
  }

  get primaryActionLabel(): string {
    if (this.currentStep < this.totalSteps) {
      return this.currentStep === 1 ? 'Continue' : 'Review Booking';
    }

    return this.isSubmitting ? 'Submitting...' : 'Confirm Booking';
  }

  get primaryDisabled(): boolean {
    return this.isSubmitting || !this.canProceedCurrentStep;
  }

  showFieldError(controlName: string, errorName: string): boolean {
    const control = this.bookingForm.get(controlName);
    return !!control
      && control.hasError(errorName)
      && (control.touched || control.dirty || this.attemptedSubmit);
  }

  onPrimaryAction(): void {
    this.primaryActionPressed.emit(this.primaryActionLabel);
    this.attemptedSubmit = true;

    if (!this.canProceedCurrentStep) {
      this.markCurrentStepTouched();
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.nextStep.emit();
      return;
    }

    this.submitBooking.emit();
  }

  onBackClick(): void {
    this.secondaryActionPressed.emit('Back');
    this.previousStep.emit();
  }

  onTrackClick(): void {
    this.primaryActionPressed.emit('Track Service');
    this.trackRequested.emit();
  }

  toggleOptionalDetails(): void {
    this.showOptionalDetails = !this.showOptionalDetails;
    if (this.showOptionalDetails) {
      this.focusStepInput();
    }
  }

  formatCurrency(value?: number): string {
    return new Intl.NumberFormat('en-IN', {
      currency: 'INR',
      maximumFractionDigits: 0,
      style: 'currency'
    }).format(value ?? 0);
  }

  private get canProceedCurrentStep(): boolean {
    if (this.currentStep === 1) {
      return this.isValidControl('serviceType');
    }

    if (this.currentStep === 2) {
      return this.isValidControl('name')
        && this.isValidControl('phone')
        && this.isValidControl('address')
        && this.isValidControl('email');
    }

    return this.bookingForm.valid;
  }

  private isValidControl(controlName: string): boolean {
    const control = this.bookingForm.get(controlName);
    return !!control && control.valid;
  }

  private markCurrentStepTouched(): void {
    const controlsByStep: Record<number, string[]> = {
      1: ['serviceType'],
      2: ['name', 'phone', 'address', 'email'],
      3: ['serviceType', 'name', 'phone', 'address', 'email']
    };

    const controlNames = controlsByStep[this.currentStep] ?? [];
    controlNames.forEach(controlName => {
      this.bookingForm.get(controlName)?.markAsTouched();
    });
  }

  private focusStepInput(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.setTimeout(() => {
      if (this.currentStep === 1) {
        this.stepOneServiceInput?.nativeElement.focus();
        return;
      }

      if (this.currentStep === 2) {
        this.stepTwoNameInput?.nativeElement.focus();
        return;
      }

      if (this.showOptionalDetails) {
        this.stepThreeBrandInput?.nativeElement.focus();
        return;
      }

      this.optionalDetailsToggle?.nativeElement.focus();
    }, 0);
  }
}
