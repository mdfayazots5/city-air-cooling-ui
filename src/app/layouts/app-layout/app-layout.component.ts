import { Component } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  template: `
    <div class="app-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .app-wrapper {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class AppLayoutComponent { }
