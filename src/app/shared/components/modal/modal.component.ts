import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="onCloseClick($event)">
      <div class="modal-container" [class]="sizeClass">
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button class="close-btn" (click)="close()">&times;</button>
        </div>
        
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
        
        <div class="modal-footer" *ngIf="showFooter">
          <button class="btn btn-secondary" (click)="close()">{{ cancelText }}</button>
          <button class="btn btn-primary" (click)="confirm()">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.2s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .modal-container {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .modal-container.small { width: 400px; }
    .modal-container.medium { width: 600px; }
    .modal-container.large { width: 800px; }
    .modal-container.full { width: 95%; }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #eee;
    }
    
    .modal-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      color: #999;
      cursor: pointer;
      line-height: 1;
    }
    
    .close-btn:hover {
      color: #333;
    }
    
    .modal-body {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }
    
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 20px;
      border-top: 1px solid #eee;
    }
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-secondary {
      background: #f0f0f0;
      color: #333;
    }
    
    .btn-secondary:hover {
      background: #e0e0e0;
    }
    
    .btn-primary {
      background: #00d4ff;
      color: #fff;
    }
    
    .btn-primary:hover {
      background: #00b8e6;
    }
  `]
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Modal';
  @Input() size: 'small' | 'medium' | 'large' | 'full' = 'medium';
  @Input() showFooter: boolean = true;
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';

  @Output() closeEvent = new EventEmitter<void>();
  @Output() confirmEvent = new EventEmitter<void>();

  get sizeClass(): string {
    return this.size;
  }

  onCloseClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  close(): void {
    this.closeEvent.emit();
  }

  confirm(): void {
    this.confirmEvent.emit();
  }
}

