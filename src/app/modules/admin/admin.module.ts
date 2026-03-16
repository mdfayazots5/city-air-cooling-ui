import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { ServiceRequestsComponent } from './service-requests/service-requests.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'service-requests',
    component: ServiceRequestsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    CustomersComponent,
    ServiceRequestsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }

