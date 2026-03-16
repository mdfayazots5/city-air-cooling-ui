import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-customers',
  template: `
    <div class="customers-page">
      <h1>Customer Management</h1>
      
      <div class="actions">
        <input type="text" placeholder="Search customers..." [(ngModel)]="searchTerm">
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Location</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let customer of customers">
            <td>{{ customer.id }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.city }}</td>
            <td>{{ customer.createdAt | date:'short' }}</td>
            <td>
              <button class="btn-view">View</button>
              <button class="btn-edit">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .customers-page {
      padding: 2rem;
    }
    
    h1 {
      margin-bottom: 1.5rem;
    }
    
    .actions {
      margin-bottom: 1.5rem;
    }
    
    .actions input {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 300px;
    }
    
    table {
      width: 100%;
      background: white;
      border-radius: 8px;
      overflow: hidden;
    }
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    th {
      background: #f8f9fa;
      font-weight: 600;
    }
    
    .btn-view, .btn-edit {
      padding: 0.25rem 0.75rem;
      margin-right: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn-view {
      background: #1a73e8;
      color: white;
    }
    
    .btn-edit {
      background: #28a745;
      color: white;
    }
  `]
})
export class CustomersComponent implements OnInit {
  searchTerm: string = '';
  customers: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.apiService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: () => this.customers = []
    });
  }
}

