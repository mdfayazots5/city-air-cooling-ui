import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <div class="global-app-background">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class MainLayoutComponent { }

