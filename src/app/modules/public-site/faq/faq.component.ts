import { Component } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { Faq } from '../../../core/models';

@Component({
  selector: 'app-faq',
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="hero-copy">
          <h1>Frequently Asked Questions</h1>
          <p>Common booking and AC service questions answered in one place.</p>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container">
        <div class="faq-list" *ngIf="faqs.length > 0; else emptyFaqs">
          <div
            class="faq-item surface-card"
            *ngFor="let faq of faqs; let i = index"
            [class.active]="activeIndex === i"
            (click)="toggleFaq(i)">
            <h3>
              {{ faq.question }}
              <span class="toggle-indicator">{{ activeIndex === i ? '-' : '+' }}</span>
            </h3>
            <div class="faq-answer" *ngIf="activeIndex === i">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <ng-template #emptyFaqs>
          <div class="faq-item surface-card empty-panel">
            Common questions will appear here once the backend FAQ set is available.
          </div>
        </ng-template>
      </div>
    </section>
  `,
  styles: [`
    .hero-copy {
      margin: 0 auto;
      max-width: 720px;
    }

    .faq-list {
      margin: 0 auto;
      max-width: 860px;
    }

    .faq-item {
      cursor: pointer;
      margin-bottom: 1rem;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .faq-item:hover {
      transform: translateY(-2px);
    }

    .faq-item h3 {
      align-items: center;
      color: var(--text-dark);
      display: flex;
      font-size: 1rem;
      gap: 1rem;
      justify-content: space-between;
      margin: 0;
      padding: 1.35rem 1.5rem;
    }

    .faq-item.active h3,
    .toggle-indicator {
      color: var(--primary);
    }

    .toggle-indicator {
      font-size: 1.2rem;
      font-weight: 800;
      line-height: 1;
    }

    .faq-answer {
      padding: 0 1.5rem 1.35rem;
    }

    .faq-answer p,
    .empty-panel {
      color: var(--text-body);
      margin: 0;
    }

    .empty-panel {
      padding: 1.5rem;
    }
  `]
})
export class FaqComponent {
  activeIndex = -1;

  constructor(private configService: ConfigService) {}

  get faqs(): Faq[] {
    return this.configService.faqs;
  }

  toggleFaq(index: number): void {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }
}
