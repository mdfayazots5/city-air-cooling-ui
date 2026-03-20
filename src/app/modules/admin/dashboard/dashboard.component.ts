import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AnalyticsOverview, PageStats } from '../../../core/models';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <div class="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Track public engagement and incoming service demand at a glance.</p>
        </div>
      </div>

      <app-loading *ngIf="isLoading" message="Loading dashboard data..."></app-loading>

      <div class="status-message error" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <div class="stats-grid" *ngIf="!isLoading && overview">
        <app-stat-card label="Bookings Today" [value]="overview.bookingsToday" icon="TD"></app-stat-card>
        <app-stat-card label="Bookings This Week" [value]="overview.bookingsThisWeek" icon="WK"></app-stat-card>
        <app-stat-card label="Completed Jobs" [value]="overview.completedJobs" icon="CP"></app-stat-card>
        <app-stat-card label="Revenue" [value]="formatCurrencyNumber(overview.totalRevenue)" icon="RV"></app-stat-card>
        <app-stat-card label="Call Clicks" [value]="overview.totalCallClicks" icon="CC"></app-stat-card>
        <app-stat-card label="WhatsApp Clicks" [value]="overview.totalWhatsAppClicks" icon="WA"></app-stat-card>
        <app-stat-card label="Conversion %" [value]="formatMetric(overview.conversionRate)" icon="CV"></app-stat-card>
      </div>

      <section class="panel" *ngIf="!isLoading && topPages !== null">
        <div class="panel-header">
          <h2>Top Pages</h2>
          <p>Last 30 days of page activity.</p>
        </div>

        <app-empty-state
          *ngIf="topPages.length === 0"
          icon="[ ]"
          title="No analytics yet"
          message="Traffic data will appear here once page events start arriving.">
        </app-empty-state>

        <table *ngIf="topPages.length > 0">
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
              <th>Unique Views</th>
              <th>Avg. Time</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let page of topPages">
              <td>{{ page.pageUrl || '/' }}</td>
              <td>{{ page.pageViews || 0 }}</td>
              <td>{{ page.uniqueViews || 0 }}</td>
              <td>{{ formatSeconds(page.avgTimeOnPage) }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
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

    .status-message.error {
      background: var(--danger-soft);
      color: var(--danger);
      border: 1px solid var(--danger-border);
      border-radius: 8px;
      padding: 0.9rem 1rem;
      margin-bottom: 1.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .panel {
      background: var(--surface-solid-strong);
      border-radius: 14px;
      padding: 1.25rem;
      box-shadow: var(--shadow-md);
    }

    .panel-header {
      margin-bottom: 1rem;
    }

    .panel-header h2 {
      margin: 0 0 0.3rem;
    }

    .panel-header p {
      margin: 0;
      color: var(--text-muted);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 0.85rem 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--border-subtle);
    }

    th {
      color: var(--text-body);
      font-weight: 600;
    }

    @media (max-width: 900px) {
      .stats-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 640px) {
      .dashboard {
        padding: 1rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  isLoading = true;
  errorMessage = '';
  overview: AnalyticsOverview | null = null;
  topPages: PageStats[] | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    forkJoin({
      overview: this.apiService.get<AnalyticsOverview>('analytics/overview').pipe(
        catchError(() => {
          return of(null);
        })
      ),
      topPages: this.apiService.get<PageStats[]>('analytics/top-pages').pipe(
        catchError(() => of(null))
      )
    }).subscribe({
      next: ({ overview, topPages }) => {
        this.overview = overview;
        this.topPages = topPages;
        if (!overview || topPages === null) {
          this.errorMessage = 'Some dashboard panels are temporarily unavailable. No placeholder data is being shown.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Dashboard data could not be loaded right now.';
        this.isLoading = false;
      }
    });
  }

  formatSeconds(value?: number): string {
    const totalSeconds = Math.max(0, Math.round(value ?? 0));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}m ${seconds}s`;
  }

  formatMetric(value?: number): number {
    return Number((value ?? 0).toFixed(2));
  }

  formatCurrencyNumber(value?: number): number {
    return Number((value ?? 0).toFixed(0));
  }
}

