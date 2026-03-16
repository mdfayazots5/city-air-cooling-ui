import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-global-layout',
  template: `
    <div class="app-background"></div>
    <div class="app-wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    
    /* Background handled by MainLayout */
    
    .app-wrapper {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class GlobalLayoutComponent {
  constructor(private authService: AuthService) {}
}
