import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalComponent } from './components/modal/modal.component';
import { TableComponent } from './components/table/table.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { StickyCtaComponent } from './components/sticky-cta/sticky-cta.component';
import { BookingStepperComponent } from './components/booking-stepper/booking-stepper.component';
import { ServiceCardMobileComponent } from './components/service-card-mobile/service-card-mobile.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { HasPermissionDirective } from './directives/has-permission.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoadingComponent,
    ModalComponent,
    TableComponent,
    StatCardComponent,
    StatusBadgeComponent,
    EmptyStateComponent,
    StickyCtaComponent,
    BookingStepperComponent,
    ServiceCardMobileComponent,
    SkeletonLoaderComponent,
    HasPermissionDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoadingComponent,
    ModalComponent,
    TableComponent,
    StatCardComponent,
    StatusBadgeComponent,
    EmptyStateComponent,
    StickyCtaComponent,
    BookingStepperComponent,
    ServiceCardMobileComponent,
    SkeletonLoaderComponent,
    HasPermissionDirective
  ]
})
export class SharedModule { }

