import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Module, Permission, Role, RolePermission } from '../../../core/models/role.model';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';

type PermissionMap = Map<string, boolean>;

@Component({
  selector: 'app-admins',
  template: `
    <div class="admins-page">
      <div class="page-header">
        <div>
          <h1>Role Permission Management</h1>
          <p>Assign modules and permissions dynamically from the RBAC database.</p>
        </div>
      </div>

      <app-loading *ngIf="isLoading" message="Loading RBAC matrix..."></app-loading>

      <div class="status-message success" *ngIf="successMessage">{{ successMessage }}</div>
      <div class="status-message error" *ngIf="errorMessage">{{ errorMessage }}</div>

      <section class="workspace" *ngIf="!isLoading">
        <aside class="roles-panel">
          <h2>Roles</h2>
          <button
            *ngFor="let role of roles"
            type="button"
            class="role-card"
            [class.active]="role.id === selectedRoleId"
            (click)="selectRole(role.id)">
            <span class="role-name">{{ role.name }}</span>
            <small>{{ role.code }}</small>
          </button>
        </aside>

        <div class="matrix-panel" *ngIf="selectedRoleId">
          <div class="matrix-header">
            <div>
              <h2>{{ selectedRoleName }}</h2>
              <p>Module access is derived from enabled permissions.</p>
            </div>
            <button
              *appHasPermission="'Admins'; appHasPermissionAction: 'Update'"
              type="button"
              class="btn-save"
              [disabled]="saving"
              (click)="savePermissions()">
              {{ saving ? 'Saving...' : 'Save Permissions' }}
            </button>
          </div>

          <p class="read-only-note" *ngIf="!canUpdateAdmins()">You have read-only access to this RBAC matrix.</p>

          <div class="table-shell">
            <table *ngIf="modules.length > 0 && permissions.length > 0">
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Access</th>
                  <th *ngFor="let permission of permissions">{{ permission.name }}</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let module of modules">
                  <td>
                    <div class="module-name">{{ module.name }}</div>
                    <small>{{ module.code }}</small>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      [checked]="isModuleEnabled(module.id)"
                      [disabled]="!canUpdateAdmins()"
                      (change)="toggleModule(module.id, $any($event.target).checked)">
                  </td>
                  <td *ngFor="let permission of permissions">
                    <input
                      type="checkbox"
                      [checked]="isPermissionEnabled(module.id, permission.id)"
                      [disabled]="!canUpdateAdmins()"
                      (change)="togglePermission(module.id, permission.id, $any($event.target).checked)">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .admins-page {
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

    .status-message {
      border-radius: 8px;
      padding: 0.9rem 1rem;
      margin-bottom: 1rem;
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

    .workspace {
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr);
      gap: 1.25rem;
    }

    .roles-panel,
    .matrix-panel {
      background: var(--surface-solid-strong);
      border-radius: 14px;
      padding: 1.25rem;
      box-shadow: var(--shadow-md);
    }

    .roles-panel h2,
    .matrix-panel h2 {
      margin: 0 0 1rem;
    }

    .role-card {
      width: 100%;
      text-align: left;
      padding: 0.9rem 1rem;
      border-radius: 10px;
      border: 1px solid var(--border-subtle);
      background: var(--surface-solid);
      cursor: pointer;
      margin-bottom: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .role-card.active {
      border-color: var(--primary);
      box-shadow: var(--shadow-focus);
    }

    .role-name,
    .module-name {
      font-weight: 600;
      color: var(--text-dark);
    }

    .matrix-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .matrix-header p {
      margin: 0;
      color: var(--text-muted);
    }

    .read-only-note {
      margin: 0 0 1rem;
      color: var(--warning-text);
      background: var(--warning-soft);
      border: 1px solid var(--warning-border);
      border-radius: 8px;
      padding: 0.75rem 0.9rem;
    }

    .btn-save {
      border: none;
      border-radius: 10px;
      background: var(--primary);
      color: var(--text-light);
      padding: 0.75rem 1.2rem;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-save:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .table-shell {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 720px;
    }

    th,
    td {
      padding: 0.85rem 0.75rem;
      text-align: center;
      border-bottom: 1px solid var(--border-subtle);
    }

    th:first-child,
    td:first-child {
      text-align: left;
    }

    th {
      background: var(--surface-muted);
      color: var(--text-body);
      font-weight: 600;
    }

    @media (max-width: 960px) {
      .workspace {
        grid-template-columns: 1fr;
      }

      .matrix-header {
        flex-direction: column;
      }
    }

    @media (max-width: 768px) {
      .admins-page {
        padding: 1rem;
      }
    }
  `]
})
export class AdminsComponent implements OnInit {
  isLoading = true;
  saving = false;
  errorMessage = '';
  successMessage = '';
  roles: Role[] = [];
  modules: Module[] = [];
  permissions: Permission[] = [];
  selectedRoleId: number | null = null;
  private permissionMap: PermissionMap = new Map<string, boolean>();

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  get selectedRoleName(): string {
    return this.roles.find(role => role.id === this.selectedRoleId)?.name ?? 'Role';
  }

  ngOnInit(): void {
    this.loadMatrix();
  }

  canUpdateAdmins(): boolean {
    return this.authService.hasPermission('Admins', 'Update');
  }

  selectRole(roleId: number): void {
    if (this.selectedRoleId === roleId) {
      return;
    }

    this.selectedRoleId = roleId;
    this.successMessage = '';
    this.loadRolePermissions(roleId);
  }

  isModuleEnabled(moduleId: number): boolean {
    return this.permissions.some(permission => this.isPermissionEnabled(moduleId, permission.id));
  }

  isPermissionEnabled(moduleId: number, permissionId: number): boolean {
    return this.permissionMap.get(this.buildPermissionKey(moduleId, permissionId)) === true;
  }

  toggleModule(moduleId: number, isEnabled: boolean): void {
    const defaultPermission = this.permissions.find(permission => permission.code === 'View') ?? this.permissions[0];
    if (!defaultPermission) {
      return;
    }

    this.permissions.forEach(permission => {
      this.permissionMap.set(this.buildPermissionKey(moduleId, permission.id), false);
    });

    if (isEnabled) {
      this.permissionMap.set(this.buildPermissionKey(moduleId, defaultPermission.id), true);
    }
  }

  togglePermission(moduleId: number, permissionId: number, isEnabled: boolean): void {
    this.permissionMap.set(this.buildPermissionKey(moduleId, permissionId), isEnabled);

    if (!isEnabled && this.permissions.every(permission => !this.isPermissionEnabled(moduleId, permission.id))) {
      this.permissions.forEach(permission => {
        this.permissionMap.set(this.buildPermissionKey(moduleId, permission.id), false);
      });
    }
  }

  savePermissions(): void {
    if (!this.selectedRoleId || !this.canUpdateAdmins()) {
      return;
    }

    const enabledPermissions = Array.from(this.permissionMap.entries())
      .filter(([, enabled]) => enabled)
      .map(([key]) => {
        const [moduleId, permissionId] = key.split(':').map(value => Number(value));
        return { moduleId, permissionId, isEnabled: true };
      });

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.apiService.put<boolean>(`admin/roles/${this.selectedRoleId}/permissions`, enabledPermissions).subscribe({
      next: () => {
        this.saving = false;
        this.successMessage = `${this.selectedRoleName} permissions were updated successfully.`;
      },
      error: () => {
        this.saving = false;
        this.errorMessage = 'Role permissions could not be updated right now.';
      }
    });
  }

  private loadMatrix(): void {
    this.isLoading = true;
    this.errorMessage = '';

    forkJoin({
      roles: this.apiService.get<Role[]>('admin/roles'),
      modules: this.apiService.get<Module[]>('admin/modules'),
      permissions: this.apiService.get<Permission[]>('admin/permissions')
    }).subscribe({
      next: ({ roles, modules, permissions }) => {
        this.roles = roles;
        this.modules = modules.sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0));
        this.permissions = permissions;
        this.selectedRoleId = roles[0]?.id ?? null;

        if (this.selectedRoleId) {
          this.loadRolePermissions(this.selectedRoleId);
          return;
        }

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'RBAC data could not be loaded right now.';
      }
    });
  }

  private loadRolePermissions(roleId: number): void {
    this.isLoading = true;
    this.permissionMap.clear();

    this.apiService.get<RolePermission[]>(`admin/roles/${roleId}/permissions`).subscribe({
      next: (rolePermissions) => {
        rolePermissions.forEach(permission => {
          this.permissionMap.set(
            this.buildPermissionKey(permission.moduleId, permission.permissionId),
            permission.isEnabled
          );
        });

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Role permissions could not be loaded right now.';
      }
    });
  }

  private buildPermissionKey(moduleId: number, permissionId: number): string {
    return `${moduleId}:${permissionId}`;
  }
}

