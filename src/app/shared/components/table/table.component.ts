import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'actions' | 'currency';
  width?: string;
}

export interface TableAction {
  label: string;
  icon: string;
  action: string;
  color?: string;
}

type TableRow = Record<string, unknown>;

@Component({
  selector: 'app-table',
  template: `
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th
              *ngFor="let col of columns"
              [style.width]="col.width"
              [class.sortable]="col.sortable"
              (click)="col.sortable && onSort(col.key)">
              {{ col.label }}
              <span *ngIf="col.sortable && sortKey === col.key" class="sort-icon">
                {{ sortDirection === 'asc' ? '^' : 'v' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="let row of data; let i = index"
            [class.selected]="selectedRow === i"
            (click)="onRowClick(row, i)">
            <td *ngFor="let col of columns">
              <ng-container [ngSwitch]="col.type">
                <span *ngSwitchCase="'date'">{{ $any(row[col.key]) | date:'mediumDate' }}</span>
                <span *ngSwitchCase="'currency'">{{ $any(row[col.key]) | currency:'INR' }}</span>
                <span *ngSwitchCase="'boolean'">
                  <span class="badge" [class.active]="!!row[col.key]" [class.inactive]="!row[col.key]">
                    {{ row[col.key] ? 'Yes' : 'No' }}
                  </span>
                </span>
                <span *ngSwitchCase="'actions'" class="actions">
                  <button
                    *ngFor="let action of actions"
                    type="button"
                    class="action-btn"
                    [ngClass]="action.action"
                    [style.color]="action.color || null"
                    [title]="action.label"
                    (click)="onAction(action.action, row); $event.stopPropagation()">
                    {{ action.icon }}
                  </button>
                </span>
                <span *ngSwitchDefault>{{ row[col.key] }}</span>
              </ng-container>
            </td>
          </tr>
          <tr *ngIf="data.length === 0">
            <td [attr.colspan]="columns.length || 1" class="no-data">
              No data available
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination" *ngIf="totalPages > 1">
      <button
        type="button"
        class="page-btn"
        [disabled]="currentPage === 1"
        (click)="onPageChange(currentPage - 1)">
        Previous
      </button>
      <span class="page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        type="button"
        class="page-btn"
        [disabled]="currentPage === totalPages"
        (click)="onPageChange(currentPage + 1)">
        Next
      </button>
    </div>
  `,
  styles: [`
    .table-container {
      overflow-x: auto;
      background: var(--surface-solid);
      border-radius: 8px;
      box-shadow: var(--shadow-sm);
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid var(--border-subtle);
    }

    .data-table th {
      background: var(--surface-muted);
      font-weight: 600;
      color: var(--text-dark);
      font-size: 14px;
    }

    .data-table th.sortable {
      cursor: pointer;
      user-select: none;
    }

    .data-table th.sortable:hover {
      background: var(--surface-muted-strong);
    }

    .sort-icon {
      margin-left: 4px;
      color: var(--primary);
    }

    .data-table tr:hover {
      background: var(--surface-muted);
    }

    .data-table tr.selected {
      background: var(--primary-tint-soft);
    }

    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .badge.active {
      background: var(--success-soft);
      color: var(--success);
    }

    .badge.inactive {
      background: var(--danger-soft);
      color: var(--danger);
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .action-btn:hover {
      background: var(--surface-muted);
    }

    .action-btn.edit {
      color: var(--primary);
    }

    .action-btn.delete {
      color: var(--danger);
    }

    .action-btn.view {
      color: var(--success);
    }

    .no-data {
      text-align: center;
      color: var(--text-muted);
      padding: 40px !important;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      gap: 16px;
    }

    .page-btn {
      padding: 8px 16px;
      border: 1px solid var(--border-subtle);
      background: var(--surface-solid);
      border-radius: 4px;
      cursor: pointer;
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-btn:hover:not(:disabled) {
      background: var(--surface-muted);
    }

    .page-info {
      color: var(--text-muted);
      font-size: 14px;
    }
  `]
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow[] = [];
  @Input() actions: TableAction[] = [];
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;

  @Output() rowClick = new EventEmitter<TableRow>();
  @Output() actionClick = new EventEmitter<{ action: string; row: TableRow }>();
  @Output() sortChange = new EventEmitter<{ key: string; direction: 'asc' | 'desc' }>();
  @Output() pageChange = new EventEmitter<number>();

  selectedRow = -1;
  sortKey = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  get totalPages(): number {
    const safePageSize = this.pageSize > 0 ? this.pageSize : 1;
    return Math.max(1, Math.ceil(this.totalItems / safePageSize));
  }

  onRowClick(row: TableRow, index: number): void {
    this.selectedRow = index;
    this.rowClick.emit(row);
  }

  onAction(action: string, row: TableRow): void {
    this.actionClick.emit({ action, row });
  }

  onSort(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.sortChange.emit({ key: this.sortKey, direction: this.sortDirection });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.pageChange.emit(page);
  }
}


