import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from './core/guards';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'customer',
    component: MainLayoutComponent,
    canActivate: [PermissionGuard],
    data: { requiresAuth: true },
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)
      }
    ]
  },
  {
    path: 'billing',
    redirectTo: 'admin/billing',
    pathMatch: 'full'
  },
  {
    path: 'technicians',
    redirectTo: 'technician',
    pathMatch: 'full'
  },
  {
    path: 'technician',
    canActivate: [PermissionGuard],
    data: { requiresAuth: true },
    loadChildren: () => import('./modules/technician/technician.module').then(m => m.TechnicianModule)
  },
  {
    path: 'admin',
    canActivate: [PermissionGuard],
    data: { requiresAuth: true },
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    component: PublicLayoutComponent,
    canActivate: [PermissionGuard],
    data: { redirectAuthenticatedToDefault: true },
    children: [
      {
        path: 'booking',
        loadChildren: () => import('./modules/booking/booking.module').then(m => m.BookingModule)
      },
      {
        path: 'book-service',
        redirectTo: 'booking',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('./modules/public-site/public-site.module').then(m => m.PublicSiteModule)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollOffset: [0, 80],
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
