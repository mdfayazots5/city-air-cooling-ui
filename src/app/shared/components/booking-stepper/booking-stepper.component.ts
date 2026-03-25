import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-stepper',
  template: `
    <ol class="stepper" aria-label="Booking progress">
      <li
        *ngFor="let step of steps; let index = index"
        [class.active]="isActive(index + 1)"
        [class.complete]="isComplete(index + 1)">
        <span class="step-index">{{ index + 1 }}</span>
        <span class="step-label">{{ step }}</span>
      </li>
    </ol>
  `,
  styles: [`
    .stepper {
      display: grid;
      gap: 0.5rem;
      list-style: none;
      margin: 0 0 1rem;
      padding: 0;
    }

    .stepper li {
      align-items: center;
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: 0.8rem;
      color: var(--text-muted);
      display: flex;
      gap: 0.55rem;
      min-height: 44px;
      padding: 0.6rem 0.75rem;
    }

    .step-index {
      align-items: center;
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      color: var(--text-dark);
      display: inline-flex;
      flex-shrink: 0;
      font-size: 0.8rem;
      font-weight: 700;
      height: 1.7rem;
      justify-content: center;
      width: 1.7rem;
    }

    .step-label {
      font-size: 0.88rem;
      font-weight: 600;
    }

    .stepper li.active {
      background: var(--surface-hero-soft);
      border-color: var(--primary-tint-border-strong);
      color: var(--primary);
    }

    .stepper li.active .step-index {
      background: var(--primary);
      border-color: var(--primary);
      color: var(--text-light);
    }

    .stepper li.complete {
      background: var(--success-soft);
      border-color: var(--success-border);
      color: var(--success);
    }

    .stepper li.complete .step-index {
      background: var(--success);
      border-color: var(--success);
      color: var(--text-light);
    }

    @media (min-width: 768px) {
      .stepper {
        gap: 0.65rem;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .stepper li {
        justify-content: center;
      }
    }
  `]
})
export class BookingStepperComponent {
  @Input() currentStep = 1;
  @Input() steps: string[] = ['Select Service', 'Enter Details', 'Confirm Booking'];

  isComplete(step: number): boolean {
    return this.currentStep > step;
  }

  isActive(step: number): boolean {
    return this.currentStep === step;
  }
}

