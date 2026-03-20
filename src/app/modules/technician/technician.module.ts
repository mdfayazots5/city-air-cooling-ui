import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { PermissionGuard } from '../../core/guards';
import { LayoutModule } from '../../layouts/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { TechniciansComponent } from './technicians.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: TechniciansComponent, canActivate: [PermissionGuard], data: { requiresAuth: true } },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  declarations: [
    TechniciansComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    TechniciansComponent
  ]
})
export class TechnicianModule { }
