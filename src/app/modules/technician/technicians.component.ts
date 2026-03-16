import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-technicians',
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Technician Management</h1>
        <button class="btn-primary" (click)="openAddModal()">
          + Add Technician
        </button>
      </div>
      
      <div class="search-bar">
        <input 
          type="text" 
          placeholder="Search technicians..." 
          [(ngModel)]="searchTerm"
          (input)="onSearch()">
      </div>
      
      <table class="data-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Service Area</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let tech of technicians">
            <td>{{ tech.technicianCode }}</td>
            <td>{{ tech.name }}</td>
            <td>{{ tech.phone }}</td>
            <td>{{ tech.email }}</td>
            <td>{{ tech.serviceArea }}</td>
            <td>{{ tech.experienceYears }} years</td>
            <td>
              <span class="badge" [class.active]="tech.isActive" [class.inactive]="!tech.isActive">
                {{ tech.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="actions">
              <button class="btn-icon" title="Edit" (click)="editTechnician(tech)">✏️</button>
              <button class="btn-icon" title="Delete" (click)="deleteTechnician(tech)">🗑️</button>
            </td>
          </tr>
          <tr *ngIf="technicians.length === 0">
            <td colspan="8" class="no-data">No technicians found</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 20px;
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .page-header h1 {
      margin: 0;
      font-size: 24px;
      color: #333;
    }
    
    .btn-primary {
      padding: 10px 20px;
      background: #00d4ff;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .btn-primary:hover {
      background: #00b8e6;
    }
    
    .search-bar {
      margin-bottom: 20px;
    }
    
    .search-bar input {
      width: 100%;
      max-width: 400px;
      padding: 10px 16px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
    }
    
    .data-table {
      width: 100%;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
    }
    
    .badge {
      padding: 4px 10px;
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
    
    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 8px;
      font-size: 16px;
    }
    
    .btn-icon:hover {
      opacity: 0.7;
    }
    
    .no-data {
      text-align: center;
      color: #999;
      padding: 40px !important;
    }
  `]
})
export class TechniciansComponent implements OnInit {
  technicians: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTechnicians();
  }

  loadTechnicians(): void {
    this.isLoading = true;
    this.apiService.get('technicians').subscribe({
      next: (response: any) => {
        this.technicians = response.items || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    // Implement search logic
  }

  openAddModal(): void {
    // Open add modal
  }

  editTechnician(technician: any): void {
    // Edit technician
  }

  deleteTechnician(technician: any): void {
    if (confirm('Are you sure you want to delete this technician?')) {
      this.apiService.delete(`technicians/${technician.id}`).subscribe({
        next: () => {
          this.loadTechnicians();
        }
      });
    }
  }
}

