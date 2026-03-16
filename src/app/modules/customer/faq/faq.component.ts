import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { Faq } from '../../../shared/models';

@Component({
  selector: 'app-faq',
  template: `
    <section class="page-hero">
      <div class="hero-bg-effect"></div>
      <div class="container">
        <h1>Frequently Asked Questions</h1>
        <p>Common questions about our AC services</p>
      </div>
    </section>

    <section class="faq-section">
      <div class="container">
        <div class="faq-list">
          <div class="faq-item" *ngFor="let faq of faqs; let i = index" 
               [class.active]="activeIndex === i" 
               (click)="toggleFaq(i)">
            <h3>{{ faq.question }}</h3>
            <div class="faq-answer" *ngIf="activeIndex === i">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-hero {
      min-height: 40vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      position: relative;
      padding-top: 80px;
    }
    
    .faq-section {
      padding: 4rem 0;
    }
    
    .faq-list {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .faq-item {
      background: white;
      margin-bottom: 1rem;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .faq-item h3 {
      padding: 1.5rem;
      margin: 0;
      color: #333;
    }
    
    .faq-item.active h3 {
      color: #1a73e8;
    }
    
    .faq-answer {
      padding: 0 1.5rem 1.5rem;
      color: #666;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
  `]
})
export class FaqComponent implements OnInit {
  faqs: Faq[] = [];
  activeIndex: number = -1;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.faqs = this.configService.faqs;
  }

  toggleFaq(index: number): void {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }
}

