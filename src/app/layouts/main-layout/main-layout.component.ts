import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <div class="main-layout">
      <div class="global-app-background"></div>
      <div class="main-layout-content">
        <router-outlet *ngIf="useRouterOutlet"></router-outlet>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .main-layout {
      position: relative;
      min-height: 100vh;
      overflow-x: hidden;
      background: var(--app-shell-bg);
    }

    .global-app-background {
      position: fixed;
      inset: 0;
      background:
        linear-gradient(var(--grid-line) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
      background-size: 28px 28px;
      mask-image: var(--mask-fade);
      pointer-events: none;
      opacity: 0.55;
    }

    .main-layout-content {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      z-index: 1;
    }
  `]
})
export class MainLayoutComponent {
  @Input() useRouterOutlet = true;
}

