import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { LayoutModule } from '../../layouts/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { AnalyticsComponent } from './analytics/analytics.component';
import { BillingComponent } from './billing/billing.component';
import { PermissionGuard } from '../../core/guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { ServiceRequestsComponent } from './service-requests/service-requests.component';
import { SettingsComponent } from './settings/settings.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AdminsComponent } from './admins/admins.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } },
      { path: 'customers', component: CustomersComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } },
      { path: 'service-requests', component: ServiceRequestsComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } },
      { path: 'analytics', component: AnalyticsComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } },
      { path: 'billing', component: BillingComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } },
      { path: 'invoices', component: InvoicesComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } },
      { path: 'settings', component: SettingsComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } },
      { path: 'admins', component: AdminsComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } }
    ]
  }
];

@NgModule({
  declarations: [
    AnalyticsComponent,
    BillingComponent,
    DashboardComponent,
    CustomersComponent,
    ServiceRequestsComponent,
    SettingsComponent,
    InvoicesComponent,
    AdminsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }

