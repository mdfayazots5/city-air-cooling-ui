import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-container" [class.overlay]="overlay" [class.inline]="!overlay">
      <div class="loading-content">
        <div class="spinner"></div>
        <p *ngIf="message" class="loading-message">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .loading-container.overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      z-index: 9999;
    }
    
    .loading-container.inline {
      padding: 40px 20px;
    }
    
    .loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border-light, #e5e5ea);
      border-top-color: var(--color-primary, #007aff);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .loading-message {
      color: var(--color-text-secondary, #6e6e73);
      font-size: 14px;
      margin: 0;
    }
  `]
})
export class LoadingComponent {
  @Input() message?: string;
  @Input() overlay: boolean = false;
}

