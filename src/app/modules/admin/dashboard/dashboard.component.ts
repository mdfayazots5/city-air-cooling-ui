import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <h1>Admin Dashboard</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Visitors</h3>
          <p class="stat-number">{{ stats.visitors }}</p>
        </div>
        <div class="stat-card">
          <h3>Call Clicks</h3>
          <p class="stat-number">{{ stats.callClicks }}</p>
        </div>
        <div class="stat-card">
          <h3>WhatsApp Clicks</h3>
          <p class="stat-number">{{ stats.whatsAppClicks }}</p>
        </div>
        <div class="stat-card">
          <h3>Total Bookings</h3>
          <p class="stat-number">{{ stats.bookings }}</p>
        </div>
      </div>

      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Event Type</th>
              <th>Page</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let event of recentEvents">
              <td>{{ event.date | date:'short' }}</td>
              <td>{{ event.eventType }}</td>
              <td>{{ event.pageUrl }}</td>
              <td>{{ event.location || 'N/A' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
    }
    
    h1 {
      margin-bottom: 2rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .stat-card h3 {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: #1a73e8;
    }
    
    .recent-activity {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
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
  `]
})
export class DashboardComponent implements OnInit {
  stats = {
    visitors: 1250,
    callClicks: 320,
    whatsAppClicks: 180,
    bookings: 45
  };
  
  recentEvents: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Load dashboard data
  }
}

