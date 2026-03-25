import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { BookingComponent } from './booking/booking.component';
import { BookingFormMobileComponent } from './booking/booking-form.mobile.component';
import { MobileBookingStepperComponent } from './booking/mobile-booking-stepper.component';

const routes: Routes = [
  { path: '', component: BookingComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    BookingComponent,
    BookingFormMobileComponent,
    MobileBookingStepperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BookingModule { }
