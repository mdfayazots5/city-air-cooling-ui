import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty-state">
      <div class="empty-icon">{{ icon }}</div>
      <h3 class="empty-title">{{ title }}</h3>
      <p class="empty-message">{{ message }}</p>
      <button *ngIf="actionLabel" type="button" (click)="onAction()" class="btn-empty-action">
        {{ actionLabel }}
      </button>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 20px;
      opacity: 0.8;
    }

    .empty-title {
      color: var(--text-dark);
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 10px 0;
    }

    .empty-message {
      color: var(--text-muted);
      font-size: 14px;
      margin: 0 0 20px 0;
      max-width: 400px;
      line-height: 1.5;
    }

    .btn-empty-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      background: var(--primary);
      color: var(--text-light);
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-empty-action:hover {
      background: var(--primary-strong);
      transform: translateY(-1px);
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon = '[ ]';
  @Input() title = 'No Data';
  @Input() message = 'There is nothing to display at the moment.';
  @Input() actionLabel?: string;
  @Output() action = new EventEmitter<void>();

  onAction(): void {
    this.action.emit();
  }
}

