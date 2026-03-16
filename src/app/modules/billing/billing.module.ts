import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Billing Module
 * 
 * This module provides billing and invoice management functionality.
 * Child modules (invoices, invoice-generation, invoice-history) can be added later.
 * 
 * Route structure:
 * /admin/billing - Main billing page
 * /admin/billing/invoices - Invoice list
 * /admin/billing/generate - Generate new invoice
 * /admin/billing/history - Invoice history
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: 'invoices',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BillingModule { }

