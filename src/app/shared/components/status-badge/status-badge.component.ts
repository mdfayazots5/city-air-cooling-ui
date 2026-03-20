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
      background: var(--warning-tint);
      color: var(--warning);
    }

    .status-badge.assigned,
    .status-badge.confirmed {
      background: var(--info-tint);
      color: var(--primary);
    }
    
    .status-badge.in-progress,
    .status-badge.in_progress {
      background: var(--info-tint);
      color: var(--info);
    }
    
    .status-badge.completed,
    .status-badge.active {
      background: var(--success-tint);
      color: var(--success);
    }
    
    .status-badge.cancelled,
    .status-badge.rejected,
    .status-badge.inactive {
      background: var(--danger-tint);
      color: var(--danger);
    }
    
    .status-badge.pending-payment {
      background: var(--warning-tint);
      color: var(--warning);
    }

    .status-badge.overdue {
      background: var(--danger-tint);
      color: var(--danger);
    }
    
    .status-badge.paid {
      background: var(--success-tint);
      color: var(--success);
    }
    
    .status-badge.default {
      background: var(--neutral-tint);
      color: var(--text-muted);
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = '';
  @Input() showDot: boolean = true;

  private statusMap: { [key: string]: string } = {
    // General
    'pending': 'pending',
    'assigned': 'assigned',
    'in_progress': 'in-progress',
    'in-progress': 'in-progress',
    'inprogress': 'in-progress',
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
    'overdue': 'overdue',
    
    // Service requests
    'confirmed': 'confirmed',
    'scheduled': 'in-progress',
    'on_hold': 'pending',
    'on-hold': 'pending'
  };

  get label(): string {
    if (!this.status) {
      return 'Unknown';
    }

    return this.normalizeStatus(this.status)
      .replace(/-/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  get statusClass(): string {
    const key = this.normalizeStatus(this.status);
    return this.statusMap[key] || 'default';
  }

  private normalizeStatus(value: string): string {
    return value
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[_\s]+/g, '-')
      .toLowerCase()
      .trim();
  }
}


