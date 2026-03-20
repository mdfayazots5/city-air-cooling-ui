import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { PermissionGuard } from '../../core/guards';

const routes: Routes = [
  { path: '', component: CustomerHomeComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } },
  { path: 'customer-home', component: CustomerHomeComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } },
  { path: 'services', component: CustomerHomeComponent, canActivate: [PermissionGuard], data: { requiresAuth: true, focusTitle: 'Services', focusRoute: '/services' } },
  { path: 'contact', component: CustomerHomeComponent, canActivate: [PermissionGuard], data: { requiresAuth: true, focusTitle: 'Contact Support', focusRoute: '/contact' } },
  { path: 'about', component: CustomerHomeComponent, canActivate: [PermissionGuard], data: { requiresAuth: true, focusTitle: 'About Us', focusRoute: '/about' } },
  { path: 'faq', component: CustomerHomeComponent, canActivate: [PermissionGuard], data: { requiresAuth: true, focusTitle: 'FAQ', focusRoute: '/faq' } },
  { path: 'service-areas', component: CustomerHomeComponent, canActivate: [PermissionGuard], data: { requiresAuth: true, focusTitle: 'Service Areas', focusRoute: '/service-areas' } },
  { path: '**', component: CustomerHomeComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } }
];

@NgModule({
  declarations: [
    CustomerHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
