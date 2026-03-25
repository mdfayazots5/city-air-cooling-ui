import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';

@Component({
  selector: 'app-sticky-cta',
  template: `
    <div class="sticky-cta-shell">
      <a
        class="sticky-cta-link"
        [routerLink]="link"
        [queryParams]="queryParams">
        {{ label }}
      </a>
    </div>
  `,
  styles: [`
    .sticky-cta-shell {
      bottom: 0;
      left: 0;
      padding: 0 0 env(safe-area-inset-bottom, 0px);
      position: fixed;
      right: 0;
      z-index: 1400;
    }

    .sticky-cta-link {
      align-items: center;
      background: linear-gradient(135deg, #C89B3C, #A67C2E);
      border: 1px solid rgba(166, 124, 46, 0.3);
      border-radius: 0;
      box-shadow: var(--shadow-accent-lg);
      color: var(--text-light);
      display: flex;
      font-size: 1rem;
      font-weight: 800;
      justify-content: center;
      min-height: 56px;
      text-align: center;
      width: 100%;
    }

    @media (min-width: 901px) {
      .sticky-cta-shell {
        display: none;
      }
    }
  `]
})
export class StickyCtaComponent {
  @Input() label = 'Book Service';
  @Input() link: string | any[] = '/booking';
  @Input() queryParams: Params | null = null;
}
