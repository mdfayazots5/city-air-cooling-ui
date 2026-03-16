import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-admin-analytics',
  template: `
    <div class="page">
      <h1>Analytics</h1>

      <div class="summary-grid">
        <div class="card">
          <p>Total Visitors</p>
          <h3>{{ overview.totalVisitors || 0 }}</h3>
        </div>
        <div class="card">
          <p>Call Clicks</p>
          <h3>{{ overview.totalCallClicks || 0 }}</h3>
        </div>
        <div class="card">
          <p>WhatsApp Clicks</p>
          <h3>{{ overview.totalWhatsAppClicks || 0 }}</h3>
        </div>
        <div class="card">
          <p>Bookings</p>
          <h3>{{ overview.totalBookings || 0 }}</h3>
        </div>
      </div>

      <section class="card wide">
        <h2>Top Pages (Last 30 Days)</h2>
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
              <th>Unique</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let page of topPages">
              <td>{{ page.pageUrl }}</td>
              <td>{{ page.pageViews }}</td>
              <td>{{ page.uniqueViews }}</td>
            </tr>
            <tr *ngIf="topPages.length === 0">
              <td colspan="3">No page analytics available.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    .page { padding: 2rem; }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .card {
      background: #fff;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
    }
    .wide { margin-top: 1rem; }
    .card p { margin: 0; color: #64748b; font-size: 0.9rem; }
    .card h3 { margin: 0.3rem 0 0; color: #0f172a; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 0.75rem; border-bottom: 1px solid #e2e8f0; }
    th { color: #334155; font-weight: 600; }
  `]
})
export class AnalyticsComponent implements OnInit {
  overview: any = {};
  topPages: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get<any>('analytics/overview').subscribe({
      next: (data) => this.overview = data ?? {},
      error: () => this.overview = {}
    });

    this.apiService.get<any[]>('analytics/top-pages').subscribe({
      next: (data) => this.topPages = data ?? [],
      error: () => this.topPages = []
    });
  }
}
