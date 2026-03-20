import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AppLayoutComponent,
    PublicLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    AdminLayoutComponent,
    AppLayoutComponent,
    PublicLayoutComponent,
    MainLayoutComponent
  ]
})
export class LayoutModule { }

