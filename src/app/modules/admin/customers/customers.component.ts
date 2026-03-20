import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContactHistory, Customer, Invoice, ServiceRequest, StatusHistory } from '../../../core/models';
import { ApiService, PagedResponse } from '../../../core/services/api.service';

@Component({
  selector: 'app-customers',
  template: `
    <div class="customers-page">
      <div class="page-header">
        <div>
          <h1>Customer Management</h1>
          <p>Review customer lifecycle, booking flow, payments, and contact activity from the live system.</p>
        </div>

        <div class="actions">
          <input type="text" placeholder="Search customers..." [(ngModel)]="searchTerm">
        </div>
      </div>

      <app-loading *ngIf="isLoading" message="Loading customers..."></app-loading>

      <div class="status-message error" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <section class="table-shell" *ngIf="!isLoading">
        <app-empty-state
          *ngIf="filteredCustomers.length === 0"
          icon="[]"
          title="No customers found"
          [message]="searchTerm ? 'Try a different search term.' : 'Customer records will appear here once leads are created.'">
        </app-empty-state>

        <table *ngIf="filteredCustomers.length > 0">
          <thead>
            <tr>
              <th>Customer Code</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Lead Source</th>
              <th>Created</th>
              <th>Lifecycle</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let customer of filteredCustomers" [class.selected-row]="selectedCustomer?.id === customer.id">
              <td>{{ customer.customerCode || '-' }}</td>
              <td>{{ fullName(customer) }}</td>
              <td>{{ customer.phone || '-' }}</td>
              <td>{{ customer.email || '-' }}</td>
              <td>{{ customer.customerSource || '-' }}</td>
              <td>{{ customer.dateCreated ? (customer.dateCreated | date:'short') : '-' }}</td>
              <td>
                <button class="btn-link" type="button" (click)="selectCustomer(customer)">
                  {{ selectedCustomer?.id === customer.id ? 'Refresh' : 'View Lifecycle' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="detail-shell" *ngIf="selectedCustomer">
        <div class="detail-header">
          <div>
            <h2>{{ fullName(selectedCustomer) }}</h2>
            <p>{{ selectedCustomer.customerCode }} | {{ selectedCustomer.phone || 'No phone' }} | {{ selectedCustomer.email || 'No email' }}</p>
          </div>
          <button class="btn-secondary" type="button" (click)="clearSelection()">Close</button>
        </div>

        <app-loading *ngIf="detailLoading" message="Loading customer lifecycle..."></app-loading>

        <div class="status-message error" *ngIf="detailError">
          {{ detailError }}
        </div>

        <div class="summary-grid" *ngIf="!detailLoading">
          <app-stat-card label="Bookings" [value]="bookingHistory.length" icon="BK"></app-stat-card>
          <app-stat-card label="Open Requests" [value]="openRequests" icon="OP"></app-stat-card>
          <app-stat-card label="Completed" [value]="completedRequests" icon="CP"></app-stat-card>
          <app-stat-card label="Invoices" [value]="customerInvoices.length" icon="IN"></app-stat-card>
        </div>

        <div class="detail-grid" *ngIf="!detailLoading">
          <section class="detail-panel surface-card">
            <div class="panel-header">
              <h3>Booking History</h3>
              <p>Lead to operation visibility for every request.</p>
            </div>

            <app-empty-state
              *ngIf="bookingHistory.length === 0"
              icon="[ ]"
              title="No bookings found"
              message="Bookings created for this customer will appear here.">
            </app-empty-state>

            <div class="booking-list" *ngIf="bookingHistory.length > 0">
              <article class="booking-card" *ngFor="let booking of bookingHistory">
                <div class="booking-head">
                  <div>
                    <strong>{{ booking.requestNo }}</strong>
                    <p>{{ booking.serviceType }} | {{ booking.leadSource || 'Unknown source' }}</p>
                  </div>
                  <app-status-badge [status]="booking.status"></app-status-badge>
                </div>

                <div class="booking-meta">
                  <span>Lead Status: {{ booking.leadStatus || booking.status }}</span>
                  <span>Preferred: {{ booking.preferredDate ? (booking.preferredDate | date:'medium') : '-' }}</span>
                  <span>Scheduled: {{ booking.scheduledTime ? (booking.scheduledTime | date:'medium') : '-' }}</span>
                  <span>Technician: {{ booking.assignedTechnicianName || 'Not assigned' }}</span>
                </div>

                <div class="history-list" *ngIf="getServiceHistory(booking.id).length > 0">
                  <div class="history-item" *ngFor="let item of getServiceHistory(booking.id)">
                    <span class="history-status">{{ item.status }}</span>
                    <span>{{ item.changeDate | date:'short' }}</span>
                    <span>{{ item.notes || 'Status updated' }}</span>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section class="detail-panel surface-card">
            <div class="panel-header">
              <h3>Payments</h3>
              <p>Invoice and collection state for this customer.</p>
            </div>

            <app-empty-state
              *ngIf="customerInvoices.length === 0"
              icon="[ ]"
              title="No invoices found"
              message="Invoices generated for this customer will appear here.">
            </app-empty-state>

            <table *ngIf="customerInvoices.length > 0">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Request</th>
                  <th>Status</th>
                  <th>Outstanding</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let invoice of customerInvoices">
                  <td>{{ invoice.invoiceNo }}</td>
                  <td>{{ invoice.requestNo || ('SR #' + invoice.serviceRequestId) }}</td>
                  <td><app-status-badge [status]="invoice.status"></app-status-badge></td>
                  <td>{{ getOutstandingAmount(invoice) | number:'1.2-2' }}</td>
                  <td>{{ invoice.totalAmount | number:'1.2-2' }}</td>
                  <td>{{ invoice.invoiceDate | date:'shortDate' }}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        <section class="detail-panel surface-card" *ngIf="!detailLoading">
          <div class="panel-header">
            <h3>Contact Logs</h3>
            <p>Customer communication triggered through the backend.</p>
          </div>

          <app-empty-state
            *ngIf="contactHistory.length === 0"
            icon="[ ]"
            title="No contact history found"
            message="Calls, email, WhatsApp, and booking-related contact logs will appear here.">
          </app-empty-state>

          <div class="history-list" *ngIf="contactHistory.length > 0">
            <div class="history-item" *ngFor="let item of contactHistory">
              <span class="history-status">{{ item.contactType }}</span>
              <span>{{ item.contactDate | date:'short' }}</span>
              <span>{{ item.contactSource || 'System' }}</span>
              <span>{{ item.notes || 'No notes' }}</span>
            </div>
          </div>
        </section>
      </section>
    </div>
  `,
  styles: [`
    .customers-page {
      padding: 2rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .page-header h1 {
      margin: 0 0 0.4rem;
    }

    .page-header p {
      margin: 0;
      color: var(--text-muted);
    }

    .actions input {
      padding: 0.75rem 1rem;
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      width: 320px;
      max-width: 100%;
    }

    .status-message.error {
      background: var(--danger-soft);
      color: var(--danger);
      border: 1px solid var(--danger-border);
      border-radius: 8px;
      padding: 0.9rem 1rem;
      margin-bottom: 1.5rem;
    }

    .table-shell,
    .detail-shell,
    .detail-panel {
      background: var(--surface-solid-strong);
      border-radius: 14px;
      padding: 1rem;
      box-shadow: var(--shadow-md);
    }

    .table-shell,
    .detail-shell {
      margin-bottom: 1.5rem;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 0.9rem 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--border-subtle);
      vertical-align: top;
    }

    th {
      color: var(--text-body);
      font-weight: 600;
      background: var(--surface-muted);
    }

    .selected-row {
      background: var(--surface-muted);
    }

    .btn-link,
    .btn-secondary {
      border: none;
      cursor: pointer;
      font-weight: 600;
      border-radius: 10px;
    }

    .btn-link {
      background: none;
      color: var(--primary);
      padding: 0;
    }

    .btn-secondary {
      background: var(--surface-muted-strong);
      color: var(--text-dark);
      padding: 0.75rem 1rem;
    }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .detail-header h2 {
      margin: 0 0 0.3rem;
    }

    .detail-header p {
      margin: 0;
      color: var(--text-muted);
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .panel-header {
      margin-bottom: 1rem;
    }

    .panel-header h3 {
      margin: 0 0 0.3rem;
    }

    .panel-header p {
      margin: 0;
      color: var(--text-muted);
    }

    .booking-list,
    .history-list {
      display: grid;
      gap: 0.85rem;
    }

    .booking-card {
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 0.9rem;
      background: var(--surface-solid);
    }

    .booking-head {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 0.75rem;
      align-items: flex-start;
    }

    .booking-head p {
      margin: 0.25rem 0 0;
      color: var(--text-muted);
    }

    .booking-meta {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.5rem 1rem;
      color: var(--text-body);
      margin-bottom: 0.75rem;
    }

    .history-item {
      display: grid;
      grid-template-columns: 120px 150px 1fr;
      gap: 0.75rem;
      padding: 0.75rem;
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      background: var(--surface-solid);
      align-items: start;
    }

    .history-status {
      font-weight: 700;
      color: var(--primary);
    }

    @media (max-width: 1100px) {
      .detail-grid {
        grid-template-columns: 1fr;
      }

      .summary-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
      .customers-page {
        padding: 1rem;
      }

      .page-header,
      .detail-header {
        flex-direction: column;
        align-items: stretch;
      }

      .actions input,
      .btn-secondary {
        width: 100%;
      }

      .booking-meta,
      .history-item,
      .summary-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CustomersComponent implements OnInit {
  searchTerm = '';
  customers: Customer[] = [];
  bookingHistory: ServiceRequest[] = [];
  customerInvoices: Invoice[] = [];
  contactHistory: ContactHistory[] = [];
  serviceHistoryMap: Record<number, StatusHistory[]> = {};
  selectedCustomer: Customer | null = null;
  isLoading = true;
  detailLoading = false;
  errorMessage = '';
  detailError = '';

  constructor(private apiService: ApiService) {}

  get filteredCustomers(): Customer[] {
    const search = this.searchTerm.trim().toLowerCase();

    if (!search) {
      return this.customers;
    }

    return this.customers.filter(customer => {
      const haystack = [
        customer.customerCode,
        customer.firstName,
        customer.lastName,
        customer.phone,
        customer.email,
        customer.city,
        customer.customerSource
      ].join(' ').toLowerCase();

      return haystack.includes(search);
    });
  }

  get openRequests(): number {
    return this.bookingHistory.filter(booking => booking.status !== 'Completed').length;
  }

  get completedRequests(): number {
    return this.bookingHistory.filter(booking => booking.status === 'Completed').length;
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.getCustomers().subscribe({
      next: data => {
        this.customers = this.normalizeCustomers(data);
        this.isLoading = false;
      },
      error: () => {
        this.customers = [];
        this.errorMessage = 'Customer records could not be loaded right now.';
        this.isLoading = false;
      }
    });
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.detailLoading = true;
    this.detailError = '';
    this.bookingHistory = [];
    this.customerInvoices = [];
    this.contactHistory = [];
    this.serviceHistoryMap = {};

    forkJoin({
      contacts: this.apiService.getCustomerContactHistory(customer.id).pipe(
        catchError(() => of([] as ContactHistory[]))
      ),
      bookings: this.apiService.getCustomerBookings(customer.id).pipe(
        catchError(() => of([] as ServiceRequest[]))
      ),
      invoices: this.apiService.getCustomerInvoices(customer.id).pipe(
        catchError(() => of([]))
      )
    }).subscribe({
      next: ({ contacts, bookings, invoices }) => {
        this.contactHistory = contacts.map(item => ({
          ...item,
          contactDate: item.contactDate ? new Date(item.contactDate) : new Date()
        }));
        this.bookingHistory = bookings
          .map(booking => this.normalizeBooking(booking))
          .sort((left, right) => {
            const leftDate = left.dateCreated ? new Date(left.dateCreated).getTime() : 0;
            const rightDate = right.dateCreated ? new Date(right.dateCreated).getTime() : 0;
            return rightDate - leftDate;
          });
        this.customerInvoices = this.normalizeInvoices(invoices)
          .sort((left, right) => right.invoiceDate.getTime() - left.invoiceDate.getTime());

        const historyRequests = this.bookingHistory.map(booking =>
          this.apiService.getServiceRequestHistory(booking.id).pipe(
            catchError(() => of([] as StatusHistory[]))
          )
        );

        const histories$ = historyRequests.length > 0
          ? forkJoin(historyRequests)
          : of([] as StatusHistory[][]);

        histories$.subscribe({
          next: histories => {
            this.serviceHistoryMap = {};
            histories.forEach((historyItems, index) => {
              const booking = this.bookingHistory[index];
              if (!booking) {
                return;
              }

              this.serviceHistoryMap[booking.id] = historyItems.map(item => ({
                ...item,
                changeDate: item.changeDate ? new Date(item.changeDate) : new Date()
              }));
            });
            this.detailLoading = false;
          },
          error: () => {
            this.detailError = 'Service status history could not be loaded right now.';
            this.detailLoading = false;
          }
        });
      },
      error: () => {
        this.detailError = 'Customer lifecycle data could not be loaded right now.';
        this.detailLoading = false;
      }
    });
  }

  clearSelection(): void {
    this.selectedCustomer = null;
    this.bookingHistory = [];
    this.customerInvoices = [];
    this.contactHistory = [];
    this.serviceHistoryMap = {};
    this.detailError = '';
  }

  getServiceHistory(serviceRequestId: number): StatusHistory[] {
    return this.serviceHistoryMap[serviceRequestId] ?? [];
  }

  getOutstandingAmount(invoice: Invoice): number {
    if (typeof invoice.outstandingAmount === 'number') {
      return invoice.outstandingAmount;
    }

    if (typeof invoice.paidAmount === 'number') {
      return Math.max(invoice.totalAmount - invoice.paidAmount, 0);
    }

    return invoice.status === 'Paid' ? 0 : invoice.totalAmount;
  }

  fullName(customer: Customer): string {
    return [customer.firstName, customer.lastName].filter(Boolean).join(' ') || '-';
  }

  private normalizeCustomers(data: unknown): Customer[] {
    if (Array.isArray(data)) {
      return data.map(customer => this.normalizeCustomer(customer));
    }

    const paged = data as PagedResponse<Customer> | null;
    return (paged?.items ?? []).map(customer => this.normalizeCustomer(customer));
  }

  private normalizeCustomer(customer: Customer): Customer {
    return {
      ...customer,
      dateCreated: customer.dateCreated ? new Date(customer.dateCreated) : undefined
    };
  }

  private normalizeBooking(booking: ServiceRequest): ServiceRequest {
    return {
      ...booking,
      preferredDate: booking.preferredDate ? new Date(booking.preferredDate) : undefined,
      scheduledTime: booking.scheduledTime ? new Date(booking.scheduledTime) : undefined,
      dateCreated: booking.dateCreated ? new Date(booking.dateCreated) : undefined,
      lastUpdated: booking.lastUpdated ? new Date(booking.lastUpdated) : undefined
    };
  }

  private normalizeInvoices(data: unknown): Invoice[] {
    const items = Array.isArray(data)
      ? data
      : ((data as PagedResponse<Invoice> | null)?.items ?? []);

    return items.map(invoice => {
      const invoiceDate = invoice.invoiceDate ? new Date(invoice.invoiceDate) : new Date();
      const paidAmount = typeof invoice.paidAmount === 'number'
        ? invoice.paidAmount
        : (invoice.status === 'Paid' ? invoice.totalAmount : 0);
      const outstandingAmount = typeof invoice.outstandingAmount === 'number'
        ? invoice.outstandingAmount
        : Math.max(invoice.totalAmount - paidAmount, 0);

      return {
        ...invoice,
        invoiceDate,
        paidAmount,
        outstandingAmount,
        status: this.deriveInvoiceStatus(invoice.status, invoiceDate)
      };
    });
  }

  private deriveInvoiceStatus(status: Invoice['status'], invoiceDate: Date): Invoice['status'] {
    if ((status === 'Pending' || status === 'Partial') && this.isOlderThanDays(invoiceDate, 7)) {
      return 'Overdue';
    }

    return status;
  }

  private isOlderThanDays(date: Date, days: number): boolean {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - days);
    return date.getTime() < threshold.getTime();
  }
}
