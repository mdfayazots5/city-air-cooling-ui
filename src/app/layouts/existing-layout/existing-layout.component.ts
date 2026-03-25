import { Component } from '@angular/core';

@Component({
  selector: 'app-existing-layout',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      width: 100%;
    }
  `]
})
export class ExistingLayoutComponent {}
