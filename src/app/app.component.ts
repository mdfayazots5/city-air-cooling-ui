import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    main {
      flex: 1;
      padding-top: 80px;
    }
    
    app-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    
    app-footer {
      margin-top: auto;
    }
  `]
})
export class AppComponent {
  title = 'City Air Cooling Services';
}

