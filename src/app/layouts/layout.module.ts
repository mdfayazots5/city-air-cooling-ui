import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    PublicLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AdminLayoutComponent,
    PublicLayoutComponent,
    MainLayoutComponent
  ]
})
export class LayoutModule { }

