import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-service-requests',
  template: `
    <div class="service-requests-page">
      <h1>Service Requests</h1>
      
      <div class="filters">
        <select [(ngModel)]="statusFilter">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Request No</th>
            <th>Customer</th>
            <th>Service Type</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let request of serviceRequests">
            <td>{{ request.requestNo }}</td>
            <td>{{ request.customerName }}</td>
            <td>{{ request.serviceType }}</td>
            <td>
              <span class="status-badge" [class]="request.status">
                {{ request.status }}
              </span>
            </td>
            <td>{{ request.createdAt | date:'short' }}</td>
            <td>
              <button class="btn-view">View</button>
              <button class="btn-update">Update</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .service-requests-page {
      padding: 2rem;
    }
    
    h1 {
      margin-bottom: 1.5rem;
    }
    
    .filters {
      margin-bottom: 1.5rem;
    }
    
    .filters select {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    table {
      width: 100%;
      background: white;
      border-radius: 8px;
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
    
    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.85rem;
    }
    
    .status-badge.pending { background: #ffc107; color: #333; }
    .status-badge.assigned { background: #17a2b8; color: white; }
    .status-badge.in_progress { background: #6610f2; color: white; }
    .status-badge.completed { background: #28a745; color: white; }
    .status-badge.cancelled { background: #dc3545; color: white; }
    
    .btn-view, .btn-update {
      padding: 0.25rem 0.75rem;
      margin-right: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn-view { background: #1a73e8; color: white; }
    .btn-update { background: #28a745; color: white; }
  `]
})
export class ServiceRequestsComponent implements OnInit {
  statusFilter: string = '';
  serviceRequests: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadServiceRequests();
  }

  loadServiceRequests(): void {
    this.apiService.getServiceRequests().subscribe({
      next: (data) => this.serviceRequests = data,
      error: () => this.serviceRequests = []
    });
  }
}

