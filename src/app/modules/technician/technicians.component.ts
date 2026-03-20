import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Technician } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { ApiService, PagedResponse } from '../../core/services/api.service';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-technicians',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1>Technician Management</h1>
          <p>Review technician availability, coverage areas, and live roster health.</p>
        </div>

        <button *appHasPermission="'Technicians'; appHasPermissionAction: 'Create'" class="btn-primary" type="button" (click)="openAddModal()">
          Add Technician
        </button>
      </div>

      <div class="status-message info" *ngIf="actionMessage">
        {{ actionMessage }}
      </div>

      <div class="status-message success" *ngIf="successMessage">
        {{ successMessage }}
      </div>

      <div class="status-message error" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <div class="toolbar">
        <input
          type="text"
          placeholder="Search technicians..."
          [(ngModel)]="searchTerm">

        <select [(ngModel)]="cityFilter">
          <option value="">All Cities</option>
          <option *ngFor="let city of availableCities" [value]="city">{{ city }}</option>
        </select>
      </div>

      <section class="form-shell" *ngIf="isFormOpen">
        <h2>{{ isEditMode ? 'Edit Technician' : 'Add Technician' }}</h2>

        <form [formGroup]="technicianForm" (ngSubmit)="saveTechnician()">
          <div class="form-grid">
            <div class="form-group">
              <label for="technicianCode">Code *</label>
              <input id="technicianCode" type="text" formControlName="technicianCode">
              <div class="error-text" *ngIf="showFormError('technicianCode', 'required')">
                Technician code is required.
              </div>
            </div>

            <div class="form-group">
              <label for="name">Name *</label>
              <input id="name" type="text" formControlName="name">
              <div class="error-text" *ngIf="showFormError('name', 'required')">
                Technician name is required.
              </div>
            </div>

            <div class="form-group">
              <label for="phone">Phone</label>
              <input id="phone" type="tel" formControlName="phone">
              <div class="error-text" *ngIf="showFormError('phone', 'pattern')">
                Enter a valid phone number.
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email">
              <div class="error-text" *ngIf="showFormError('email', 'email')">
                Enter a valid email address.
              </div>
            </div>

            <div class="form-group">
              <label for="serviceArea">Service Area</label>
              <input id="serviceArea" type="text" formControlName="serviceArea">
            </div>

            <div class="form-group">
              <label for="city">City</label>
              <select id="city" formControlName="city">
                <option value="">Select city</option>
                <option *ngFor="let city of availableCities" [value]="city">{{ city }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="supportedServiceCodes">Supported Service Codes</label>
              <input id="supportedServiceCodes" type="text" formControlName="supportedServiceCodes" placeholder="repair, installation, gas">
            </div>

            <div class="form-group">
              <label for="experienceYears">Experience (Years)</label>
              <input id="experienceYears" type="number" min="0" formControlName="experienceYears">
              <div class="error-text" *ngIf="showFormError('experienceYears', 'min')">
                Experience cannot be negative.
              </div>
            </div>
          </div>

          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" formControlName="isActive">
              Active technician
            </label>
          </div>

          <div class="form-actions">
            <button class="btn-primary" type="submit" [disabled]="submittingForm">
              {{ submittingForm ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Technician') }}
            </button>
            <button class="btn-secondary" type="button" [disabled]="submittingForm" (click)="closeForm()">
              Cancel
            </button>
          </div>
        </form>
      </section>

      <app-loading *ngIf="isLoading" message="Loading technicians..."></app-loading>

      <div class="stats-grid" *ngIf="!isLoading">
        <app-stat-card label="Technicians" [value]="technicians.length"></app-stat-card>
        <app-stat-card label="Active" [value]="activeTechnicians"></app-stat-card>
        <app-stat-card label="Inactive" [value]="inactiveTechnicians"></app-stat-card>
        <app-stat-card label="Cities" [value]="cityCoverageCount"></app-stat-card>
        <app-stat-card label="Avg Load" [value]="averageLoad"></app-stat-card>
      </div>

      <section class="table-shell" *ngIf="!isLoading">
        <app-empty-state
          *ngIf="filteredTechnicians.length === 0"
          icon="[ ]"
          title="No technicians found"
          [message]="searchTerm ? 'Try a different search term.' : 'Technician records will appear here once the roster is configured.'">
        </app-empty-state>

        <table *ngIf="filteredTechnicians.length > 0" class="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Contact</th>
              <th>City</th>
              <th>Service Area</th>
              <th>Skills</th>
              <th>Load / Rating</th>
              <th>Experience</th>
              <th>Status</th>
              <th *ngIf="showActionsColumn">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let tech of filteredTechnicians">
              <td>{{ tech.technicianCode || '-' }}</td>
              <td>{{ tech.name || '-' }}</td>
              <td>
                <div class="primary-text">{{ tech.phone || 'No phone' }}</div>
                <div class="secondary-text">{{ tech.email || 'No email' }}</div>
              </td>
              <td>{{ tech.city || '-' }}</td>
              <td>{{ tech.serviceArea || '-' }}</td>
              <td>{{ tech.supportedServiceCodes || 'All active services' }}</td>
              <td>
                <div class="primary-text">Load {{ tech.currentLoad || 0 }}</div>
                <div class="secondary-text">Rating {{ formatRating(tech.averageRating) }}</div>
              </td>
              <td>{{ tech.experienceYears ? (tech.experienceYears + ' years') : '-' }}</td>
              <td>
                <app-status-badge [status]="tech.isActive ? 'active' : 'inactive'"></app-status-badge>
              </td>
              <td *ngIf="showActionsColumn" class="actions">
                <button *appHasPermission="'Technicians'; appHasPermissionAction: 'Update'" class="btn-link" type="button" (click)="editTechnician(tech)">Edit</button>
                <button
                  *appHasPermission="'Technicians'; appHasPermissionAction: 'Delete'"
                  class="btn-link danger"
                  type="button"
                  [disabled]="deletingId === tech.id"
                  (click)="deleteTechnician(tech)">
                  {{ deletingId === tech.id ? 'Removing...' : 'Remove' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    .page-container {
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

    .status-message {
      border-radius: 8px;
      padding: 0.9rem 1rem;
      margin-bottom: 1rem;
    }

    .status-message.info {
      background: var(--info-soft);
      color: var(--info);
      border: 1px solid var(--info-border);
    }

    .status-message.success {
      background: var(--success-soft);
      color: var(--success);
      border: 1px solid var(--success-border);
    }

    .status-message.error {
      background: var(--danger-soft);
      color: var(--danger);
      border: 1px solid var(--danger-border);
    }

    .btn-primary {
      padding: 0.75rem 1.5rem;
      background: var(--primary);
      color: var(--text-light);
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-primary:hover {
      background: var(--primary-strong);
    }

    .btn-primary:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .toolbar {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }

    .toolbar input,
    .toolbar select {
      background: var(--surface-solid);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 0.75rem 1rem;
    }

    .toolbar input {
      max-width: 360px;
      width: 100%;
    }

    .toolbar select {
      min-width: 180px;
    }

    .form-shell {
      background: var(--surface-solid-strong);
      border-radius: 14px;
      padding: 1rem;
      box-shadow: var(--shadow-md);
      margin-bottom: 1.5rem;
    }

    .form-shell h2 {
      margin: 0 0 0.9rem;
      font-size: 1.1rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.9rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.4rem;
      font-weight: 500;
      color: var(--text-dark);
    }

    .form-group input[type="text"],
    .form-group input[type="tel"],
    .form-group input[type="email"],
    .form-group input[type="number"],
    .form-group select {
      width: 100%;
      padding: 0.7rem 0.85rem;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      background: var(--surface-solid);
    }

    .checkbox-group {
      margin-top: 0.5rem;
    }

    .checkbox-group label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .btn-secondary {
      padding: 0.75rem 1.5rem;
      background: var(--surface-muted-strong);
      color: var(--text-dark);
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-secondary:hover {
      background: var(--surface-muted);
    }

    .btn-secondary:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .error-text {
      color: var(--danger);
      font-size: 0.82rem;
      margin-top: 0.25rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
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

    .data-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 860px;
    }

    .data-table th,
    .data-table td {
      padding: 0.9rem 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--border-subtle);
    }

    .data-table th {
      background: var(--surface-muted);
      color: var(--text-body);
      font-weight: 600;
    }

    .primary-text {
      color: var(--text-dark);
      font-weight: 600;
    }

    .secondary-text {
      color: var(--text-muted);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .actions {
      white-space: nowrap;
      display: inline-flex;
      gap: 0.75rem;
      align-items: center;
    }

    .btn-link {
      background: none;
      border: none;
      color: var(--primary);
      cursor: pointer;
      font-weight: 600;
      padding: 0;
    }

    .btn-link.danger {
      color: var(--danger);
    }

    .btn-link:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (max-width: 900px) {
      .stats-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .page-header {
        flex-direction: column;
        align-items: stretch;
      }

      .btn-primary,
      .btn-secondary,
      .toolbar input {
        width: 100%;
        max-width: none;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TechniciansComponent implements OnInit {
  technicians: Technician[] = [];
  searchTerm = '';
  cityFilter = '';
  isLoading = true;
  errorMessage = '';
  successMessage = '';
  actionMessage = '';
  deletingId: number | null = null;
  isFormOpen = false;
  isEditMode = false;
  editingTechnicianId: number | null = null;
  submittingForm = false;
  technicianForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private authService: AuthService,
    private configService: ConfigService
  ) {
    this.technicianForm = this.fb.group({
      technicianCode: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.pattern(/^[0-9+\-\s]{10,15}$/)],
      email: ['', Validators.email],
      serviceArea: [''],
      city: [''],
      supportedServiceCodes: [''],
      experienceYears: [0, Validators.min(0)],
      isActive: [true]
    });
  }

  get filteredTechnicians(): Technician[] {
    const search = this.searchTerm.trim().toLowerCase();

    return this.technicians.filter(technician => {
      const matchesCity = !this.cityFilter || technician.city === this.cityFilter;
      const haystack = [
        technician.technicianCode,
        technician.name,
        technician.phone,
        technician.email,
        technician.serviceArea,
        technician.city,
        technician.supportedServiceCodes
      ].join(' ').toLowerCase();

      return matchesCity && (!search || haystack.includes(search));
    });
  }

  get activeTechnicians(): number {
    return this.technicians.filter(technician => technician.isActive).length;
  }

  get inactiveTechnicians(): number {
    return this.technicians.filter(technician => !technician.isActive).length;
  }

  get cityCoverageCount(): number {
    return new Set(this.technicians.map(technician => technician.city).filter(Boolean)).size;
  }

  get averageLoad(): number {
    if (this.technicians.length === 0) {
      return 0;
    }

    const totalLoad = this.technicians.reduce((sum, technician) => sum + (technician.currentLoad || 0), 0);
    return Number((totalLoad / this.technicians.length).toFixed(1));
  }

  get showActionsColumn(): boolean {
    return this.canUpdateTechnicians() || this.canDeleteTechnicians();
  }

  get availableCities(): string[] {
    return this.configService.availableCities;
  }

  ngOnInit(): void {
    this.loadTechnicians();
  }

  loadTechnicians(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.actionMessage = '';

    this.apiService.get<PagedResponse<Technician>>('technicians', {
      page: 1,
      pageSize: 100
    }).subscribe({
      next: response => {
        this.technicians = this.normalizeTechnicians(response);
        this.actionMessage = this.technicians.length === 0
          ? 'No live technician records found yet.'
          : '';
        this.isLoading = false;
      },
      error: () => {
        this.technicians = [];
        this.errorMessage = 'Live technician API is unavailable.';
        this.isLoading = false;
      }
    });
  }

  openAddModal(): void {
    if (!this.canCreateTechnicians()) {
      this.errorMessage = 'You do not have permission to add technicians.';
      return;
    }

    this.isFormOpen = true;
    this.isEditMode = false;
    this.editingTechnicianId = null;
    this.technicianForm.reset({
      technicianCode: this.buildNextTechnicianCode(),
      name: '',
      phone: '',
      email: '',
      serviceArea: '',
      city: this.availableCities[0] || '',
      supportedServiceCodes: '',
      experienceYears: 0,
      isActive: true
    });
    this.actionMessage = 'Fill in technician details and save to create a live technician record.';
    this.errorMessage = '';
    this.successMessage = '';
  }

  editTechnician(technician: Technician): void {
    if (!this.canUpdateTechnicians()) {
      this.errorMessage = 'You do not have permission to edit technicians.';
      return;
    }

    this.isFormOpen = true;
    this.isEditMode = true;
    this.editingTechnicianId = technician.id;
    this.technicianForm.reset({
      technicianCode: technician.technicianCode || '',
      name: technician.name || '',
      phone: technician.phone || '',
      email: technician.email || '',
      serviceArea: technician.serviceArea || '',
      city: technician.city || '',
      supportedServiceCodes: technician.supportedServiceCodes || '',
      experienceYears: technician.experienceYears ?? 0,
      isActive: technician.isActive
    });
    this.actionMessage = `Editing ${technician.name || 'technician'} details.`;
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.isEditMode = false;
    this.editingTechnicianId = null;
    this.submittingForm = false;
    this.technicianForm.reset({
      technicianCode: '',
      name: '',
      phone: '',
      email: '',
      serviceArea: '',
      city: '',
      supportedServiceCodes: '',
      experienceYears: 0,
      isActive: true
    });
  }

  showFormError(controlName: string, errorName: string): boolean {
    const control = this.technicianForm.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }

  saveTechnician(): void {
    if (this.isEditMode && !this.canUpdateTechnicians()) {
      this.errorMessage = 'You do not have permission to update technicians.';
      return;
    }

    if (!this.isEditMode && !this.canCreateTechnicians()) {
      this.errorMessage = 'You do not have permission to add technicians.';
      return;
    }

    if (this.technicianForm.invalid) {
      this.technicianForm.markAllAsTouched();
      return;
    }

    const formValue = this.technicianForm.getRawValue();
    const payload: Partial<Technician> = {
      technicianCode: `${formValue.technicianCode ?? ''}`.trim(),
      name: `${formValue.name ?? ''}`.trim(),
      phone: `${formValue.phone ?? ''}`.trim() || undefined,
      email: `${formValue.email ?? ''}`.trim() || undefined,
      serviceArea: `${formValue.serviceArea ?? ''}`.trim() || undefined,
      city: `${formValue.city ?? ''}`.trim() || undefined,
      supportedServiceCodes: `${formValue.supportedServiceCodes ?? ''}`.trim() || undefined,
      experienceYears: Number(formValue.experienceYears) > 0 ? Number(formValue.experienceYears) : undefined,
      isActive: !!formValue.isActive
    };

    this.submittingForm = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isEditMode && this.editingTechnicianId) {
      this.apiService.put<Technician>(`technicians/${this.editingTechnicianId}`, payload).pipe(
        finalize(() => {
          this.submittingForm = false;
        })
      ).subscribe({
        next: () => {
          this.loadTechnicians();
          this.successMessage = `${payload.name || 'Technician'} updated successfully.`;
          this.actionMessage = '';
          this.closeForm();
        },
        error: () => {
          this.errorMessage = 'Technician could not be updated right now.';
        }
      });
      return;
    }

    this.apiService.post<Technician>('technicians', payload).pipe(
      finalize(() => {
        this.submittingForm = false;
      })
    ).subscribe({
      next: () => {
        this.loadTechnicians();
        this.successMessage = `${payload.name || 'Technician'} added successfully.`;
        this.actionMessage = '';
        this.closeForm();
      },
      error: () => {
        this.errorMessage = 'Technician could not be added right now.';
      }
    });
  }

  deleteTechnician(technician: Technician): void {
    if (!this.canDeleteTechnicians()) {
      this.errorMessage = 'You do not have permission to remove technicians.';
      return;
    }

    if (!technician.id) {
      this.errorMessage = 'This technician record cannot be removed because it is missing an id.';
      return;
    }

    if (!confirm(`Remove ${technician.name || 'this technician'} from the roster?`)) {
      return;
    }

    this.deletingId = technician.id;
    this.errorMessage = '';
    this.successMessage = '';
    this.actionMessage = '';

    this.apiService.delete(`technicians/${technician.id}`).pipe(
      finalize(() => {
        this.deletingId = null;
      })
    ).subscribe({
      next: () => {
        this.loadTechnicians();
        this.successMessage = `${technician.name || 'Technician'} was removed successfully.`;
      },
      error: () => {
        this.errorMessage = 'Technician could not be removed right now.';
      }
    });
  }

  private normalizeTechnicians(data: PagedResponse<Technician> | null): Technician[] {
    return (data?.items ?? [])
      .filter(item => typeof item.id === 'number' && item.id > 0)
      .map(item => this.normalizeTechnicianRecord(item));
  }

  private normalizeTechnicianRecord(source: Partial<Technician> | null): Technician {
    const value = source ?? {};
    const parsedExperience = Number(value.experienceYears);
    const experienceYears = Number.isFinite(parsedExperience) && parsedExperience > 0 ? parsedExperience : undefined;

    return {
      id: value.id as number,
      technicianCode: `${value.technicianCode ?? ''}`.trim(),
      name: `${value.name ?? ''}`.trim(),
      phone: `${value.phone ?? ''}`.trim() || undefined,
      email: `${value.email ?? ''}`.trim() || undefined,
      serviceArea: `${value.serviceArea ?? ''}`.trim() || undefined,
      city: `${value.city ?? ''}`.trim() || undefined,
      supportedServiceCodes: `${value.supportedServiceCodes ?? ''}`.trim() || undefined,
      experienceYears,
      currentLoad: typeof value.currentLoad === 'number' ? value.currentLoad : undefined,
      averageRating: typeof value.averageRating === 'number' ? value.averageRating : undefined,
      isActive: value.isActive !== false
    };
  }

  private buildNextTechnicianCode(): string {
    const numericCodes = this.technicians
      .map(item => Number((item.technicianCode || '').replace(/\D+/g, '')))
      .filter(code => Number.isFinite(code) && code > 0);
    const nextCode = (numericCodes.length > 0 ? Math.max(...numericCodes) : 0) + 1;

    return `TECH-${nextCode.toString().padStart(4, '0')}`;
  }

  formatRating(value?: number): string {
    return value && value > 0 ? value.toFixed(1) : 'New';
  }

  canCreateTechnicians(): boolean {
    return this.authService.hasPermission('Technicians', 'Create');
  }

  canUpdateTechnicians(): boolean {
    return this.authService.hasPermission('Technicians', 'Update');
  }

  canDeleteTechnicians(): boolean {
    return this.authService.hasPermission('Technicians', 'Delete');
  }
}
