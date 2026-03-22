import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ServiceRequest, Technician } from '../../../core/models';
import {
  ApiService,
  PagedResponse,
  ServiceRequestAssignmentPayload,
  ServiceRequestStatusPayload
} from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-service-requests',
  template: `
    <div class="service-requests-page">
      <div class="page-header">
        <div>
          <h1>Service Requests</h1>
          <p>Control dispatch, work progression, and completion from the live operations queue.</p>
        </div>

        <div class="filters">
          <input type="text" placeholder="Search requests..." [(ngModel)]="searchTerm">

          <select [(ngModel)]="statusFilter">
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="OnTheWay">On The Way</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select [(ngModel)]="cityFilter">
            <option value="">All Cities</option>
            <option *ngFor="let city of availableCities" [value]="city">{{ city }}</option>
          </select>
        </div>
      </div>

      <app-loading *ngIf="isLoading" message="Loading service requests..."></app-loading>

      <div class="status-message info" *ngIf="actionMessage">{{ actionMessage }}</div>
      <div class="status-message success" *ngIf="successMessage">{{ successMessage }}</div>
      <div class="status-message error" *ngIf="errorMessage">{{ errorMessage }}</div>

      <div class="stats-grid" *ngIf="!isLoading">
        <app-stat-card label="Total Requests" [value]="serviceRequests.length"></app-stat-card>
        <app-stat-card label="New" [value]="countByStatus('New')"></app-stat-card>
        <app-stat-card label="Assigned" [value]="countByStatus('Assigned')"></app-stat-card>
        <app-stat-card label="On The Way" [value]="countByStatus('OnTheWay')"></app-stat-card>
        <app-stat-card label="In Progress" [value]="countByStatus('InProgress')"></app-stat-card>
        <app-stat-card label="Completed" [value]="countByStatus('Completed')"></app-stat-card>
      </div>

      <section class="table-shell" *ngIf="!isLoading">
        <app-empty-state
          *ngIf="filteredRequests.length === 0"
          icon="[ ]"
          title="No service requests found"
          [message]="searchTerm || statusFilter ? 'Try changing the current filters.' : 'Service requests will appear here once customers start booking.'">
        </app-empty-state>

        <table *ngIf="filteredRequests.length > 0">
          <thead>
            <tr>
              <th>Request</th>
              <th>Customer</th>
              <th>Service</th>
              <th>City</th>
              <th>Status</th>
              <th>Dispatch</th>
              <th>Technician</th>
              <th>Created</th>
              <th *ngIf="canManageRequests()">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let request of filteredRequests">
              <td>
                <div class="primary-text">{{ request.requestNo || ('#' + request.id) }}</div>
                <div class="secondary-text">Lead: {{ request.leadStatus || request.status }}</div>
              </td>
              <td>
                <div class="primary-text">{{ request.customerName || '-' }}</div>
                <div class="secondary-text">{{ request.customerPhone || 'No phone' }}</div>
              </td>
              <td>
                <div class="primary-text">{{ request.serviceType || '-' }}</div>
                <div class="secondary-text" *ngIf="request.issueDescription">{{ request.issueDescription }}</div>
              </td>
              <td>
                <div class="primary-text">{{ request.city || '-' }}</div>
                <div class="secondary-text">{{ request.urgency || 'Standard' }}</div>
              </td>
              <td><app-status-badge [status]="request.status"></app-status-badge></td>
              <td>
                <div class="primary-text">{{ request.scheduledTime ? (request.scheduledTime | date:'short') : 'Not scheduled' }}</div>
                <div class="secondary-text">
                  {{ formatCurrency(request.estimatedPrice) }} | ETA {{ request.etaMinutes || 0 }} min{{ request.autoAssigned ? ' | Auto' : '' }}
                </div>
              </td>
              <td>
                <div class="primary-text">{{ request.assignedTechnicianName || 'Unassigned' }}</div>
                <div class="secondary-text">{{ request.assignedTechnicianPhone || 'Contact after assignment' }}</div>
              </td>
              <td>{{ request.dateCreated ? (request.dateCreated | date:'short') : '-' }}</td>
              <td *ngIf="canManageRequests()" class="actions">
                <ng-container *appHasPermission="'ServiceRequests:Update'">
                  <button
                    *ngIf="canAutoAssignRequest(request)"
                    class="btn-link"
                    type="button"
                    (click)="runAutoAssign(request)">
                    Auto Assign
                  </button>
                </ng-container>

                <ng-container *appHasPermission="'ServiceRequests:Update'">
                  <button
                    *ngIf="canAssignRequest(request)"
                    class="btn-link"
                    type="button"
                    (click)="openAssignment(request)">
                    {{ request.assignedTechnicianId ? 'Reassign' : 'Assign' }}
                  </button>
                </ng-container>

                <ng-container *appHasPermission="'ServiceRequests:Update'">
                  <button
                    *ngIf="canMoveToOnTheWay(request)"
                    class="btn-link"
                    type="button"
                    (click)="advanceStatus(request, 'OnTheWay')">
                    On The Way
                  </button>
                </ng-container>

                <ng-container *appHasPermission="'ServiceRequests:Update'">
                  <button
                    *ngIf="canStartRequest(request)"
                    class="btn-link"
                    type="button"
                    (click)="advanceStatus(request, 'InProgress')">
                    Start Work
                  </button>
                </ng-container>

                <ng-container *appHasPermission="'ServiceRequests:Update'">
                  <button
                    *ngIf="canCompleteRequest(request)"
                    class="btn-link success"
                    type="button"
                    (click)="advanceStatus(request, 'Completed')">
                    Complete
                  </button>
                </ng-container>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <app-modal
        [isOpen]="isAssignmentOpen"
        title="Assign Technician"
        size="large"
        [showFooter]="false"
        (closeEvent)="closeAssignment()">
        <div class="assignment-layout" *ngIf="selectedRequest">
          <div class="assignment-summary">
            <div class="summary-item">
              <span>Request</span>
              <strong>{{ selectedRequest.requestNo || ('#' + selectedRequest.id) }}</strong>
            </div>
            <div class="summary-item">
              <span>Customer</span>
              <strong>{{ selectedRequest.customerName || '-' }}</strong>
            </div>
            <div class="summary-item">
              <span>Phone</span>
              <strong>{{ selectedRequest.customerPhone || 'No phone' }}</strong>
            </div>
            <div class="summary-item">
              <span>Service</span>
              <strong>{{ selectedRequest.serviceType || '-' }}</strong>
            </div>
            <div class="summary-item">
              <span>Current Status</span>
              <strong>{{ selectedRequest.status }}</strong>
            </div>
            <div class="summary-item">
              <span>Current Technician</span>
              <strong>{{ selectedRequest.assignedTechnicianName || 'Unassigned' }}</strong>
            </div>
          </div>

          <div class="assignment-form">
            <div class="form-group">
              <label for="scheduledTime">Scheduled Time</label>
              <input
                id="scheduledTime"
                type="datetime-local"
                [(ngModel)]="scheduledTimeInput"
                [disabled]="isAssigning"
                (ngModelChange)="loadAvailableTechnicians()">
            </div>

            <div class="form-group">
              <label for="assignedTechnician">Available Technician</label>
              <select id="assignedTechnician" [(ngModel)]="selectedTechnicianId" [disabled]="isAssigning || techniciansLoading">
                <option [ngValue]="null">Select technician</option>
                <option *ngFor="let technician of technicians" [ngValue]="technician.id">
                  {{ technician.name }}{{ technician.serviceArea ? (' - ' + technician.serviceArea) : '' }}
                </option>
              </select>
            </div>

            <p class="helper-text" *ngIf="techniciansLoading">Loading available technicians for the selected time...</p>
            <p class="helper-text warning" *ngIf="!techniciansLoading && technicians.length === 0">
              No active technicians are available for the selected schedule.
            </p>

            <div class="form-actions">
              <button
                class="btn-primary"
                type="button"
                [disabled]="isAssigning || !selectedTechnicianId || !scheduledTimeInput"
                (click)="saveAssignment()">
                {{ isAssigning ? 'Saving...' : (selectedRequest.assignedTechnicianId ? 'Save Reassignment' : 'Assign Technician') }}
              </button>
              <button class="btn-secondary" type="button" [disabled]="isAssigning" (click)="closeAssignment()">Cancel</button>
            </div>
          </div>
        </div>
      </app-modal>
    </div>
  `,
  styles: [`
    .service-requests-page {
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

    .filters {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .filters input,
    .filters select,
    .form-group input,
    .form-group select {
      padding: 0.75rem 0.9rem;
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      background: var(--surface-solid);
      width: 100%;
    }

    .status-message {
      border-radius: 8px;
      margin-bottom: 1rem;
      padding: 0.9rem 1rem;
    }

    .status-message.info {
      background: var(--info-soft);
      border: 1px solid var(--info-border);
      color: var(--info);
    }

    .status-message.success {
      background: var(--success-soft);
      border: 1px solid var(--success-border);
      color: var(--success);
    }

    .status-message.error {
      background: var(--danger-soft);
      border: 1px solid var(--danger-border);
      color: var(--danger);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .table-shell {
      background: var(--surface-solid-strong);
      border-radius: 14px;
      padding: 1rem;
      box-shadow: var(--shadow-md);
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 1120px;
    }

    th,
    td {
      padding: 0.85rem 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--border-subtle);
      vertical-align: top;
    }

    th {
      background: var(--surface-muted);
      color: var(--text-body);
      font-weight: 600;
    }

    .primary-text {
      font-weight: 600;
      color: var(--text-dark);
    }

    .secondary-text {
      color: var(--text-muted);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .actions {
      white-space: nowrap;
    }

    .btn-link,
    .btn-primary,
    .btn-secondary {
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-link {
      background: none;
      color: var(--primary);
      padding: 0;
      margin-right: 0.9rem;
    }

    .btn-link.success {
      color: var(--success);
    }

    .btn-primary,
    .btn-secondary {
      padding: 0.75rem 1.1rem;
    }

    .btn-primary {
      background: var(--primary);
      color: var(--text-light);
    }

    .btn-secondary {
      background: var(--surface-muted-strong);
      color: var(--text-dark);
    }

    .assignment-layout {
      display: grid;
      grid-template-columns: minmax(220px, 0.95fr) minmax(320px, 1.2fr);
      gap: 1rem;
    }

    .assignment-summary,
    .assignment-form {
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 1rem;
    }

    .assignment-summary {
      display: grid;
      gap: 0.85rem;
    }

    .summary-item {
      display: grid;
      gap: 0.25rem;
    }

    .summary-item span {
      color: var(--text-muted);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .summary-item strong {
      color: var(--text-dark);
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.45rem;
    }

    .helper-text {
      color: var(--text-muted);
      margin: 0 0 1rem;
    }

    .helper-text.warning {
      color: var(--warning-text);
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    @media (max-width: 1100px) {
      .stats-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 900px) {
      .assignment-layout {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .service-requests-page {
        padding: 1rem;
      }

      .page-header {
        flex-direction: column;
        align-items: stretch;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .filters input,
      .filters select,
      .btn-primary,
      .btn-secondary {
        width: 100%;
      }
    }
  `]
})
export class ServiceRequestsComponent implements OnInit {
  searchTerm = '';
  statusFilter = '';
  cityFilter = '';
  serviceRequests: ServiceRequest[] = [];
  technicians: Technician[] = [];
  isLoading = true;
  isAssigning = false;
  isUpdatingStatus = false;
  techniciansLoading = false;
  isAssignmentOpen = false;
  selectedRequest: ServiceRequest | null = null;
  selectedTechnicianId: number | null = null;
  scheduledTimeInput = '';
  actionMessage = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  get filteredRequests(): ServiceRequest[] {
    const search = this.searchTerm.trim().toLowerCase();

    return this.serviceRequests.filter(request => {
      const matchesStatus = !this.statusFilter || request.status === this.statusFilter;
      const matchesCity = !this.cityFilter || request.city === this.cityFilter;
      const haystack = [
        request.requestNo,
        request.customerName,
        request.customerPhone,
        request.serviceType,
        request.leadSource,
        request.assignedTechnicianName,
        request.city,
        request.urgency
      ].join(' ').toLowerCase();

      return matchesStatus && matchesCity && (!search || haystack.includes(search));
    });
  }

  get availableCities(): string[] {
    return this.configService.availableCities;
  }

  ngOnInit(): void {
    this.loadServiceRequests();
  }

  loadServiceRequests(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const requestStream = this.isTechnicianSession()
      ? this.apiService.getMyTechnicianTickets()
      : this.apiService.getServiceRequests();

    requestStream.subscribe({
      next: data => {
        this.serviceRequests = this.normalizeServiceRequests(data);
        this.isLoading = false;
      },
      error: error => {
        this.serviceRequests = [];
        this.errorMessage = error.error?.message || error.message || 'Service request records could not be loaded right now.';
        this.isLoading = false;
      }
    });
  }

  countByStatus(status: ServiceRequest['status']): number {
    return this.serviceRequests.filter(request => request.status === status).length;
  }

  private isTechnicianSession(): boolean {
    const role = `${this.authService.getUser()?.role ?? ''}`.trim().toLowerCase();
    return role === 'technician';
  }

  canManageRequests(): boolean {
    return this.authService.hasPermission('ServiceRequests', 'Update');
  }

  canAssignRequest(request: ServiceRequest): boolean {
    return request.status === 'New' || request.status === 'Assigned';
  }

  canAutoAssignRequest(request: ServiceRequest): boolean {
    return request.status !== 'Completed' && request.status !== 'InProgress';
  }

  canMoveToOnTheWay(request: ServiceRequest): boolean {
    return request.status === 'Assigned';
  }

  canStartRequest(request: ServiceRequest): boolean {
    return request.status === 'OnTheWay';
  }

  canCompleteRequest(request: ServiceRequest): boolean {
    return request.status === 'InProgress';
  }

  openAssignment(request: ServiceRequest): void {
    if (!this.canManageRequests()) {
      this.errorMessage = 'You do not have permission to assign technicians.';
      return;
    }

    this.selectedRequest = request;
    this.selectedTechnicianId = request.assignedTechnicianId ?? null;
    this.scheduledTimeInput = this.formatDateTimeLocal(
      request.scheduledTime ?? request.preferredDate ?? new Date(Date.now() + 60 * 60 * 1000)
    );
    this.actionMessage = `Dispatch ${request.requestNo || `request #${request.id}`} to a technician.`;
    this.successMessage = '';
    this.errorMessage = '';
    this.isAssignmentOpen = true;
    this.loadAvailableTechnicians();
  }

  closeAssignment(): void {
    this.isAssignmentOpen = false;
    this.selectedRequest = null;
    this.selectedTechnicianId = null;
    this.scheduledTimeInput = '';
    this.technicians = [];
    this.techniciansLoading = false;
  }

  loadAvailableTechnicians(): void {
    if (!this.scheduledTimeInput) {
      this.technicians = [];
      return;
    }

    this.techniciansLoading = true;
    this.apiService.getAvailableTechnicians(
      new Date(this.scheduledTimeInput).toISOString(),
      this.selectedRequest?.city,
      this.selectedRequest?.serviceCode
    ).subscribe({
      next: response => {
        this.technicians = this.normalizeTechnicians(response);
        this.techniciansLoading = false;
      },
      error: error => {
        this.technicians = [];
        this.errorMessage = error.error?.message || error.message || 'Available technicians could not be loaded right now.';
        this.techniciansLoading = false;
      }
    });
  }

  runAutoAssign(request: ServiceRequest): void {
    if (!this.canManageRequests()) {
      this.errorMessage = 'You do not have permission to auto-assign technicians.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.actionMessage = `Smart dispatch is selecting the best technician for ${request.requestNo || `request #${request.id}`}.`;

    this.apiService.autoAssignServiceRequest(request.id, {
      scheduledTime: request.scheduledTime ? request.scheduledTime.toISOString() : undefined,
      allowOverride: true
    }).subscribe({
      next: (updatedRequest) => {
        this.successMessage = `${updatedRequest.requestNo || request.requestNo || 'Service request'} was auto-assigned successfully.`;
        this.loadServiceRequests();
      },
      error: error => {
        this.errorMessage = error.error?.message || error.message || 'Auto-assignment could not be completed right now.';
      }
    });
  }

  saveAssignment(): void {
    if (!this.selectedRequest || !this.selectedTechnicianId || !this.scheduledTimeInput) {
      this.errorMessage = 'Select a technician and schedule before saving.';
      return;
    }

    const payload: ServiceRequestAssignmentPayload = {
      technicianId: this.selectedTechnicianId,
      scheduledTime: new Date(this.scheduledTimeInput).toISOString()
    };

    this.isAssigning = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.apiService.assignServiceRequest(this.selectedRequest.id, payload).pipe(
      finalize(() => {
        this.isAssigning = false;
      })
    ).subscribe({
      next: () => {
        const requestLabel = this.selectedRequest?.requestNo || 'Service request';
        this.successMessage = `${requestLabel} was scheduled successfully.`;
        this.closeAssignment();
        this.loadServiceRequests();
      },
      error: error => {
        this.errorMessage = error.error?.message || error.message || 'Technician assignment could not be saved right now.';
      }
    });
  }

  advanceStatus(request: ServiceRequest, status: 'OnTheWay' | 'InProgress' | 'Completed'): void {
    if (!this.canManageRequests()) {
      this.errorMessage = 'You do not have permission to update service request status.';
      return;
    }

    const payload: ServiceRequestStatusPayload = {
      status,
      notes: status === 'Completed'
        ? 'Completed by admin operations. Billing invoice auto-generated.'
        : status === 'InProgress'
          ? 'Technician has started active service work.'
          : 'Technician has started travel to the customer location.'
    };

    this.isUpdatingStatus = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.apiService.updateServiceRequestStatus(request.id, payload).pipe(
      finalize(() => {
        this.isUpdatingStatus = false;
      })
    ).subscribe({
      next: () => {
        this.successMessage = status === 'Completed'
          ? `${request.requestNo || 'Service request'} completed. Invoice automation has been triggered.`
          : status === 'InProgress'
            ? `${request.requestNo || 'Service request'} moved to In Progress.`
            : `${request.requestNo || 'Service request'} marked as On The Way.`;
        this.loadServiceRequests();
      },
      error: error => {
        this.errorMessage = error.error?.message || error.message || 'The service request status could not be updated.';
      }
    });
  }

  private normalizeServiceRequests(data: unknown): ServiceRequest[] {
    if (Array.isArray(data)) {
      return data.map(item => this.normalizeServiceRequestRecord(item));
    }

    const paged = data as PagedResponse<ServiceRequest> | null;
    return (paged?.items ?? []).map(item => this.normalizeServiceRequestRecord(item));
  }

  private normalizeServiceRequestRecord(request: Partial<ServiceRequest>): ServiceRequest {
    return {
      id: Number(request.id) || 0,
      requestNo: `${request.requestNo ?? ''}`.trim(),
      customerId: Number(request.customerId) || 0,
      customerName: `${request.customerName ?? ''}`.trim() || undefined,
      customerPhone: `${request.customerPhone ?? ''}`.trim() || undefined,
      serviceType: `${request.serviceType ?? ''}`.trim(),
      serviceCode: `${request.serviceCode ?? ''}`.trim() || undefined,
      acType: `${request.acType ?? ''}`.trim() || undefined,
      issueDescription: `${request.issueDescription ?? ''}`.trim() || undefined,
      priority: `${request.priority ?? ''}`.trim() || 'Normal',
      status: this.normalizeStatus(request.status),
      leadSource: `${request.leadSource ?? ''}`.trim() || undefined,
      leadStatus: `${request.leadStatus ?? ''}`.trim() || undefined,
      city: `${request.city ?? ''}`.trim() || undefined,
      urgency: `${request.urgency ?? ''}`.trim() || undefined,
      estimatedPrice: typeof request.estimatedPrice === 'number' ? request.estimatedPrice : undefined,
      etaMinutes: typeof request.etaMinutes === 'number' ? request.etaMinutes : undefined,
      autoAssigned: !!request.autoAssigned,
      preferredDate: request.preferredDate ? new Date(request.preferredDate) : undefined,
      assignedTechnicianId: typeof request.assignedTechnicianId === 'number' ? request.assignedTechnicianId : undefined,
      assignedTechnicianName: `${request.assignedTechnicianName ?? ''}`.trim() || undefined,
      assignedTechnicianPhone: `${request.assignedTechnicianPhone ?? ''}`.trim() || undefined,
      scheduledTime: request.scheduledTime ? new Date(request.scheduledTime) : undefined,
      dateCreated: request.dateCreated ? new Date(request.dateCreated) : undefined,
      lastUpdated: request.lastUpdated ? new Date(request.lastUpdated) : undefined,
      completedAt: request.completedAt ? new Date(request.completedAt) : undefined
    };
  }

  private normalizeTechnicians(data: unknown): Technician[] {
    const items = Array.isArray(data)
      ? data
      : ((data as PagedResponse<Technician> | { items?: Technician[] } | null)?.items ?? []);

    return items.map(item => this.normalizeTechnicianRecord(item as Partial<Technician>));
  }

  private normalizeTechnicianRecord(technician: Partial<Technician>): Technician {
    return {
      id: Number(technician.id) || 0,
      technicianCode: `${technician.technicianCode ?? ''}`.trim(),
      name: `${technician.name ?? ''}`.trim() || 'Unnamed Technician',
      phone: `${technician.phone ?? ''}`.trim() || undefined,
      email: `${technician.email ?? ''}`.trim() || undefined,
      serviceArea: `${technician.serviceArea ?? ''}`.trim() || undefined,
      city: `${technician.city ?? ''}`.trim() || undefined,
      supportedServiceCodes: `${technician.supportedServiceCodes ?? ''}`.trim() || undefined,
      experienceYears: typeof technician.experienceYears === 'number' ? technician.experienceYears : undefined,
      currentLoad: typeof technician.currentLoad === 'number' ? technician.currentLoad : undefined,
      averageRating: typeof technician.averageRating === 'number' ? technician.averageRating : undefined,
      isActive: technician.isActive !== false,
      dateCreated: technician.dateCreated ? new Date(technician.dateCreated) : undefined
    };
  }

  private normalizeStatus(value?: string): ServiceRequest['status'] {
    const normalized = `${value ?? ''}`.trim().toLowerCase().replace(/[-_\s]/g, '');

    switch (normalized) {
      case 'assigned':
        return 'Assigned';
      case 'ontheway':
        return 'OnTheWay';
      case 'inprogress':
        return 'InProgress';
      case 'completed':
        return 'Completed';
      case 'new':
      case 'pending':
      default:
        return 'New';
    }
  }

  private formatDateTimeLocal(value: Date): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  formatCurrency(value?: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value ?? 0);
  }
}
