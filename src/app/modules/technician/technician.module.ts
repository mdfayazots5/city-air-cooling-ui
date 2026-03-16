import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TechniciansComponent } from './technicians.component';

const routes: Routes = [
  { path: '', component: TechniciansComponent }
];

@NgModule({
  declarations: [
    TechniciansComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    TechniciansComponent
  ]
})
export class TechnicianModule { }
