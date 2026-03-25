import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  template: `
    <div class="skeleton-grid" [style.--skeleton-count]="itemCount">
      <div class="skeleton-item" *ngFor="let item of placeholders; let index = index" [attr.aria-hidden]="true">
        <div class="skeleton-line skeleton-line--title"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line skeleton-line--short"></div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-grid {
      display: grid;
      gap: 0.75rem;
      grid-template-columns: 1fr;
    }

    .skeleton-item {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 0.95rem;
    }

    .skeleton-line {
      animation: shimmer 1.2s linear infinite;
      background: linear-gradient(
        90deg,
        rgba(148, 163, 184, 0.2) 0%,
        rgba(148, 163, 184, 0.35) 40%,
        rgba(148, 163, 184, 0.2) 80%
      );
      background-size: 200% 100%;
      border-radius: 0.5rem;
      height: 11px;
      margin-bottom: 0.55rem;
    }

    .skeleton-line--title {
      height: 16px;
      width: 68%;
    }

    .skeleton-line--short {
      margin-bottom: 0;
      width: 42%;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `]
})
export class SkeletonLoaderComponent {
  @Input() itemCount = 3;

  get placeholders(): number[] {
    return Array.from({ length: Math.max(1, this.itemCount) }, (_, index) => index + 1);
  }
}
