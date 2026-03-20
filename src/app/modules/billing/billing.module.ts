import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BillingHomeComponent } from './billing-home/billing-home.component';

const routes: Routes = [
  {
    path: '',
    component: BillingHomeComponent
  },
  {
    path: '**',
    component: BillingHomeComponent
  }
];

@NgModule({
  declarations: [
    BillingHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BillingModule { }

