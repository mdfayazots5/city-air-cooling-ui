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
      background: var(--header-bg);
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
      border: 3px solid var(--border-subtle);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .loading-message {
      color: var(--text-muted);
      font-size: 14px;
      margin: 0;
    }
  `]
})
export class LoadingComponent {
  @Input() message?: string;
  @Input() overlay: boolean = false;
}


