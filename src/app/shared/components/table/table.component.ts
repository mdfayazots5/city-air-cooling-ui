import { Component, Input, Output, EventEmitter } from '@angular/core';

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

@Component({
  selector: 'app-table',
  template: `
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th *ngFor="let col of columns" 
                [style.width]="col.width"
                [class.sortable]="col.sortable"
                (click)="col.sortable && onSort(col.key)">
              {{ col.label }}
              <span *ngIf="col.sortable && sortKey === col.key" class="sort-icon">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of data; let i = index" 
              [class.selected]="selectedRow === i"
              (click)="onRowClick(row, i)">
            <td *ngFor="let col of columns">
              <ng-container [ngSwitch]="col.type">
                <span *ngSwitchCase="'date'">{{ row[col.key] | date:'mediumDate' }}</span>
                <span *ngSwitchCase="'currency'">{{ row[col.key] | currency:'INR' }}</span>
                <span *ngSwitchCase="'boolean'">
                  <span class="badge" [class.active]="row[col.key]" [class.inactive]="!row[col.key]">
                    {{ row[col.key] ? 'Yes' : 'No' }}
                  </span>
                </span>
                <span *ngSwitchCase="'actions'" class="actions">
                  <button *ngFor="let action of actions" 
                          class="action-btn"
                          [class]="action.action"
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
            <td [attr.colspan]="columns.length" class="no-data">
              No data available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="pagination" *ngIf="totalPages > 1">
      <button class="page-btn" 
              [disabled]="currentPage === 1"
              (click)="onPageChange(currentPage - 1)">
        Previous
      </button>
      <span class="page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button class="page-btn"
              [disabled]="currentPage === totalPages"
              (click)="onPageChange(currentPage + 1)">
        Next
      </button>
    </div>
  `,
  styles: [`
    .table-container {
      overflow-x: auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .data-table th, .data-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    .data-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }
    
    .data-table th.sortable {
      cursor: pointer;
      user-select: none;
    }
    
    .data-table th.sortable:hover {
      background: #e9ecef;
    }
    
    .sort-icon {
      margin-left: 4px;
      color: #00d4ff;
    }
    
    .data-table tr:hover {
      background: #f8f9fa;
    }
    
    .data-table tr.selected {
      background: rgba(0, 212, 255, 0.1);
    }
    
    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .badge.active {
      background: #d4edda;
      color: #155724;
    }
    
    .badge.inactive {
      background: #f8d7da;
      color: #721c24;
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
      background: #eee;
    }
    
    .action-btn.edit { color: #007bff; }
    .action-btn.delete { color: #dc3545; }
    .action-btn.view { color: #28a745; }
    
    .no-data {
      text-align: center;
      color: #999;
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
      border: 1px solid #ddd;
      background: #fff;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .page-btn:hover:not(:disabled) {
      background: #f8f9fa;
    }
    
    .page-info {
      color: #666;
      font-size: 14px;
    }
  `]
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;

  @Output() rowClick = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();
  @Output() sortChange = new EventEmitter<{ key: string; direction: 'asc' | 'desc' }>();
  @Output() pageChange = new EventEmitter<number>();

  selectedRow: number = -1;
  sortKey: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onRowClick(row: any, index: number): void {
    this.selectedRow = index;
    this.rowClick.emit(row);
  }

  onAction(action: string, row: any): void {
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
    this.pageChange.emit(page);
  }
}

