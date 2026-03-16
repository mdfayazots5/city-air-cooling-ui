import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  template: `
    <span class="status-badge" [ngClass]="statusClass">
      <span class="status-dot" *ngIf="showDot"></span>
      {{ label }}
    </span>
  `,
  styles: [`
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: var(--radius-full, 9999px);
      font-size: var(--text-xs, 0.75rem);
      font-weight: 500;
      text-transform: capitalize;
      letter-spacing: 0.3px;
    }
    
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }
    
    /* Status variants */
    .status-badge.pending {
      background: rgba(255, 149, 0, 0.12);
      color: #ff9500;
    }
    
    .status-badge.in-progress,
    .status-badge.in_progress {
      background: rgba(90, 200, 250, 0.12);
      color: #5ac8fa;
    }
    
    .status-badge.completed,
    .status-badge.active,
    .status-badge.completed- {
      background: rgba(52, 199, 89, 0.12);
      color: #34c759;
    }
    
    .status-badge.cancelled,
    .status-badge.rejected,
    .status-badge.inactive {
      background: rgba(255, 59, 48, 0.12);
      color: #ff3b30;
    }
    
    .status-badge.pending-payment {
      background: rgba(255, 149, 0, 0.12);
      color: #ff9500;
    }
    
    .status-badge.paid {
      background: rgba(52, 199, 89, 0.12);
      color: #34c759;
    }
    
    .status-badge.confirmed {
      background: rgba(0, 122, 255, 0.12);
      color: #007aff;
    }
    
    .status-badge.default {
      background: rgba(142, 142, 147, 0.12);
      color: #8e8e93;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = '';
  @Input() showDot: boolean = true;

  private statusMap: { [key: string]: string } = {
    // General
    'pending': 'pending',
    'in_progress': 'in-progress',
    'in-progress': 'in-progress',
    'completed': 'completed',
    'cancelled': 'cancelled',
    'rejected': 'cancelled',
    'active': 'completed',
    'inactive': 'inactive',
    'default': 'default',
    
    // Payments
    'pending_payment': 'pending-payment',
    'pending-payment': 'pending-payment',
    'paid': 'paid',
    
    // Service requests
    'confirmed': 'confirmed',
    'scheduled': 'in-progress',
    'on_hold': 'pending',
    'on-hold': 'pending'
  };

  get label(): string {
    if (!this.status) return 'Unknown';
    return this.status.replace(/_/g, ' ').toLowerCase();
  }

  get statusClass(): string {
    const key = this.status.toLowerCase();
    return this.statusMap[key] || 'default';
  }
}

