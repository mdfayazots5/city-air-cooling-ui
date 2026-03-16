import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-admin-billing',
  template: `
    <div class="page">
      <h1>Billing</h1>

      <div class="summary-grid">
        <div class="card">
          <p>Total Billed</p>
          <h3>{{ summary.totalBilled || 0 | number:'1.2-2' }}</h3>
        </div>
        <div class="card">
          <p>Total Paid</p>
          <h3>{{ summary.totalPaid || 0 | number:'1.2-2' }}</h3>
        </div>
        <div class="card">
          <p>Outstanding</p>
          <h3>{{ summary.totalOutstanding || 0 | number:'1.2-2' }}</h3>
        </div>
        <div class="card">
          <p>Invoices</p>
          <h3>{{ summary.totalInvoices || 0 }}</h3>
        </div>
      </div>

      <section class="table-wrapper">
        <h2>Recent Invoices</h2>
        <table>
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
              <td>{{ item.status }}</td>
              <td>{{ item.totalAmount | number:'1.2-2' }}</td>
              <td>{{ item.invoiceDate | date:'mediumDate' }}</td>
            </tr>
            <tr *ngIf="invoices.length === 0">
              <td colspan="5">No invoice data available.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    .page { padding: 2rem; }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .card {
      background: #fff;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
    }
    .card p { margin: 0; color: #64748b; font-size: 0.9rem; }
    .card h3 { margin: 0.3rem 0 0; color: #0f172a; }
    .table-wrapper {
      background: #fff;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
    }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 0.75rem; border-bottom: 1px solid #e2e8f0; }
    th { color: #334155; font-weight: 600; }
  `]
})
export class BillingComponent implements OnInit {
  summary: any = {};
  invoices: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get<any>('billing/summary').subscribe({
      next: (data) => this.summary = data ?? {},
      error: () => this.summary = {}
    });

    this.apiService.get<any>('billing').subscribe({
      next: (data) => this.invoices = data?.items ?? [],
      error: () => this.invoices = []
    });
  }
}
