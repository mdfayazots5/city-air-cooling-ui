import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ExistingLayoutComponent } from './existing-layout/existing-layout.component';
import { MobileLayoutComponent } from './mobile-layout/mobile-layout.component';
import { MobileHeaderComponent } from './mobile-layout/mobile-header/mobile-header.component';
import { MobileBottomNavComponent } from './mobile-layout/mobile-bottom-nav/mobile-bottom-nav.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AppLayoutComponent,
    PublicLayoutComponent,
    MainLayoutComponent,
    ExistingLayoutComponent,
    MobileLayoutComponent,
    MobileHeaderComponent,
    MobileBottomNavComponent
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
    MainLayoutComponent,
    ExistingLayoutComponent,
    MobileLayoutComponent
  ]
})
export class LayoutModule { }

