import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-booking-stepper',
  template: `
    <div class="stepper-shell" aria-label="Booking progress">
      <div class="stepper-header">
        <div class="stepper-label">Step {{ currentStep }} of {{ totalSteps }}</div>
        <div class="stepper-percent">{{ progressPercentage | number:'1.0-0' }}%</div>
      </div>
      <div class="stepper-track" role="progressbar" [attr.aria-valuemin]="1" [attr.aria-valuemax]="totalSteps" [attr.aria-valuenow]="currentStep">
        <div class="stepper-progress" [style.width.%]="progressPercentage"></div>
      </div>
      <div class="stepper-titles">
        <span
          *ngFor="let step of steps; let index = index"
          [class.active]="index + 1 === currentStep"
          [class.complete]="index + 1 < currentStep">
          {{ index + 1 }}. {{ step }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .stepper-shell {
      display: grid;
      gap: 0.45rem;
      margin-bottom: 0.9rem;
    }

    .stepper-label {
      color: var(--text-muted);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .stepper-header {
      align-items: center;
      display: flex;
      justify-content: space-between;
      gap: 0.65rem;
    }

    .stepper-percent {
      color: var(--primary);
      font-size: 0.8rem;
      font-weight: 800;
      min-width: 52px;
      text-align: right;
    }

    .stepper-track {
      background: var(--surface-muted);
      border-radius: 999px;
      height: 8px;
      overflow: hidden;
    }

    .stepper-progress {
      background: linear-gradient(135deg, #C89B3C, #A67C2E);
      border-radius: inherit;
      height: 100%;
      transition: width 0.22s ease;
    }

    .stepper-titles {
      display: grid;
      gap: 0.35rem;
    }

    .stepper-titles span {
      color: var(--text-muted);
      font-size: 0.78rem;
      font-weight: 600;
      min-height: 24px;
    }

    .stepper-titles span.active {
      color: var(--primary);
    }

    .stepper-titles span.complete {
      color: var(--success);
    }
  `]
})
export class MobileBookingStepperComponent {
  @Input() currentStep = 1;
  @Input() totalSteps = 3;
  @Input() steps: string[] = ['Select Service', 'Enter Details', 'Confirm Booking'];

  get progressPercentage(): number {
    if (this.totalSteps <= 1) {
      return 100;
    }

    const progress = (this.currentStep - 1) / (this.totalSteps - 1);
    return Math.min(100, Math.max(0, progress * 100));
  }
}
