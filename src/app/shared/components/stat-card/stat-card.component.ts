import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  template: `
    <div class="stat-card" [class.loading]="loading" [class.clickable]="clickable">
      <div class="stat-header">
        <span class="stat-icon" *ngIf="icon">{{ icon }}</span>
        <span class="stat-trend" *ngIf="trend" [class.trend-up]="trend === 'up'" [class.trend-down]="trend === 'down'">
          <span class="trend-arrow">{{ trend === 'up' ? '^' : 'v' }}</span>
          <span class="trend-value">{{ trendValue }}%</span>
        </span>
      </div>
      <div class="stat-body">
        <div class="stat-value">
          <span class="prefix" *ngIf="prefix">{{ prefix }}</span>
          <span class="value">{{ loading ? '--' : displayValue }}</span>
          <span class="suffix" *ngIf="suffix">{{ suffix }}</span>
        </div>
        <div class="stat-label">{{ label }}</div>
      </div>
      <div class="stat-footer" *ngIf="subLabel">
        <span class="sub-label">{{ subLabel }}</span>
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      background: var(--surface-solid);
      border-radius: var(--radius-lg, 14px);
      padding: var(--space-6, 24px);
      box-shadow: var(--shadow-sm);
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--primary);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .stat-card:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }

    .stat-card:hover::before {
      opacity: 1;
    }

    .stat-card.clickable {
      cursor: pointer;
    }

    .stat-card.loading {
      pointer-events: none;
    }

    .stat-card.loading .value {
      background: var(--skeleton-shimmer);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      color: transparent;
      border-radius: 4px;
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-4, 16px);
    }

    .stat-icon {
      font-size: 24px;
      line-height: 1;
    }

    .stat-trend {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: var(--radius-full, 9999px);
      font-size: 12px;
      font-weight: 500;
    }

    .stat-trend.trend-up {
      background: var(--success-tint);
      color: var(--success);
    }

    .stat-trend.trend-down {
      background: var(--danger-tint);
      color: var(--danger);
    }

    .trend-arrow {
      font-size: 10px;
    }

    .stat-body {
      margin-bottom: var(--space-2, 8px);
    }

    .stat-value {
      display: flex;
      align-items: baseline;
      gap: 2px;
    }

    .prefix {
      font-size: var(--text-xl, 1.25rem);
      font-weight: 500;
      color: var(--text-muted);
    }

    .value {
      font-size: var(--text-4xl, 2.25rem);
      font-weight: 700;
      color: var(--text-dark);
      line-height: 1.2;
    }

    .suffix {
      font-size: var(--text-lg, 1.125rem);
      font-weight: 500;
      color: var(--text-muted);
      margin-left: 4px;
    }

    .stat-label {
      font-size: var(--text-sm, 0.875rem);
      color: var(--text-muted);
      margin-top: var(--space-1, 4px);
    }

    .stat-footer {
      padding-top: var(--space-3, 12px);
      border-top: 1px solid var(--border-subtle);
    }

    .sub-label {
      font-size: var(--text-xs, 0.75rem);
      color: var(--text-muted);
    }
  `]
})
export class StatCardComponent {
  @Input() label = '';
  @Input() value: number | null = 0;
  @Input() prefix?: string;
  @Input() suffix?: string;
  @Input() icon?: string;
  @Input() trend?: 'up' | 'down';
  @Input() trendValue?: number;
  @Input() loading = false;
  @Input() clickable = false;
  @Input() subLabel?: string;

  get displayValue(): string {
    if (this.value === null) {
      return '0';
    }

    if (this.value === 0 && !this.loading) {
      return '0';
    }

    if (this.value >= 1000000) {
      return (this.value / 1000000).toFixed(1);
    }

    if (this.value >= 1000) {
      return (this.value / 1000).toFixed(1);
    }

    return this.value.toLocaleString();
  }
}

