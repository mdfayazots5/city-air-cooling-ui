import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BillingSummary, Invoice } from '../../../core/models';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-admin-billing',
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1>Billing</h1>
          <p>Track invoice totals, payment progress, and outstanding balances.</p>
        </div>
      </div>

      <app-loading *ngIf="isLoading" message="Loading billing data..."></app-loading>

      <div class="status-message error" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <div class="summary-grid" *ngIf="!isLoading && summary">
        <app-stat-card label="Total Billed" [value]="summary.totalBilled" prefix="Rs "></app-stat-card>
        <app-stat-card label="Total Paid" [value]="summary.totalPaid" prefix="Rs "></app-stat-card>
        <app-stat-card label="Outstanding" [value]="summary.totalOutstanding" prefix="Rs "></app-stat-card>
        <app-stat-card label="Invoices" [value]="summary.totalInvoices"></app-stat-card>
      </div>

      <section class="table-wrapper" *ngIf="!isLoading && invoices !== null">
        <div class="panel-header">
          <h2>Recent Invoices</h2>
          <p>Latest invoice records and payment states.</p>
        </div>

        <app-empty-state
          *ngIf="invoices.length === 0"
          icon="[ ]"
          title="No invoices available"
          message="Invoice data will appear here once billing records are created.">
        </app-empty-state>

        <table *ngIf="invoices.length > 0">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of invoices">
              <td>{{ item.invoiceNo }}</td>
              <td>{{ item.customerName }}</td>
              <td><app-status-badge [status]="item.status"></app-status-badge></td>
              <td>{{ item.totalAmount | number:'1.2-2' }}</td>
              <td>{{ item.invoiceDate | date:'mediumDate' }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    .page {
      padding: 2rem;
    }

    .page-header {
      margin-bottom: 1.5rem;
    }

    .page-header h1 {
      margin: 0 0 0.4rem;
    }

    .page-header p {
      margin: 0;
      color: var(--text-muted);
    }

    .status-message.error {
      background: var(--danger-soft);
      color: var(--danger);
      border: 1px solid var(--danger-border);
      border-radius: 8px;
      padding: 0.9rem 1rem;
      margin-bottom: 1.5rem;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .table-wrapper {
      background: var(--surface-solid-strong);
      border-radius: 14px;
      padding: 1rem;
      box-shadow: var(--shadow-md);
      overflow-x: auto;
    }

    .panel-header {
      margin-bottom: 1rem;
    }

    .panel-header h2 {
      margin: 0 0 0.3rem;
    }

    .panel-header p {
      margin: 0;
      color: var(--text-muted);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 560px;
    }

    th,
    td {
      text-align: left;
      padding: 0.75rem;
      border-bottom: 1px solid var(--border-subtle);
    }

    th {
      background: var(--surface-muted);
      color: var(--text-body);
      font-weight: 600;
    }

    @media (max-width: 900px) {
      .summary-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 640px) {
      .page {
        padding: 1rem;
      }

      .summary-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BillingComponent implements OnInit {
  isLoading = true;
  errorMessage = '';
  summary: BillingSummary | null = null;
  invoices: Invoice[] | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    forkJoin({
      summary: this.apiService.get<BillingSummary>('billing/summary').pipe(
        catchError(() => of(null))
      ),
      billing: this.apiService.get<{ items?: Invoice[] }>('billing').pipe(
        catchError(() => of(null))
      )
    }).subscribe({
      next: ({ summary, billing }) => {
        this.invoices = billing ? this.normalizeInvoices(billing) : null;
        this.summary = summary;
        if (!summary || billing === null) {
          this.errorMessage = 'Billing is partially unavailable right now. No calculated fallback totals are being shown.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Billing data could not be loaded right now.';
        this.isLoading = false;
      }
    });
  }

  private normalizeInvoices(data: { items?: Invoice[] } | null): Invoice[] {
    return data?.items ?? [];
  }
}

