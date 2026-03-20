import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  AnalyticsOverview,
  BookingHeatmapPoint,
  ClickStats,
  ConversionMetrics,
  PageStats,
  RevenueAnalytics,
  TechnicianPerformanceMetric
} from '../../../core/models';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-admin-analytics',
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Revenue, dispatch, and conversion signals for the Phase 3 operating layer.</p>
        </div>

        <button class="btn-secondary" type="button" (click)="loadAnalytics()">
          Refresh
        </button>
      </div>

      <app-loading *ngIf="isLoading" message="Loading analytics..."></app-loading>

      <div class="status-message error" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <div class="summary-grid" *ngIf="!isLoading && overviewLoaded && revenueLoaded && clicksLoaded && conversionsLoaded">
        <app-stat-card label="Bookings Today" [value]="overview.bookingsToday" icon="TD"></app-stat-card>
        <app-stat-card label="Completed Jobs" [value]="overview.completedJobs" icon="CP"></app-stat-card>
        <app-stat-card label="Total Revenue" [value]="formatCurrencyNumber(overview.totalRevenue)" icon="RV"></app-stat-card>
        <app-stat-card label="Avg Ticket" [value]="formatCurrencyNumber(revenue.averageTicketSize)" icon="AT"></app-stat-card>
        <app-stat-card label="WhatsApp Clicks" [value]="clickStats.whatsAppClicks" icon="WA"></app-stat-card>
        <app-stat-card label="Conversion %" [value]="roundMetric(conversions.conversionRate)" icon="CV"></app-stat-card>
      </div>

      <div class="panel-grid" *ngIf="!isLoading">
        <section class="panel surface-card" *ngIf="revenueLoaded">
          <div class="panel-header">
            <h2>Revenue Trend</h2>
            <p>Paid and projected value from the invoice engine.</p>
          </div>

          <div class="metric-list compact-metrics">
            <div class="metric-row">
              <span>Total Revenue</span>
              <strong>{{ formatCurrency(revenue.totalRevenue) }}</strong>
            </div>
            <div class="metric-row">
              <span>Paid Revenue</span>
              <strong>{{ formatCurrency(revenue.paidRevenue) }}</strong>
            </div>
            <div class="metric-row">
              <span>Outstanding</span>
              <strong>{{ formatCurrency(revenue.outstandingRevenue) }}</strong>
            </div>
          </div>

          <div class="spark-bars" *ngIf="revenue.trend.length > 0; else noRevenueTrend">
            <div class="bar-row" *ngFor="let point of revenue.trend.slice(-7)">
              <span>{{ point.date | date:'dd MMM' }}</span>
              <div class="bar-track">
                <div class="bar-fill" [style.width.%]="getRevenueBarWidth(point.revenue)"></div>
              </div>
              <strong>{{ formatCurrency(point.revenue) }}</strong>
            </div>
          </div>
          <ng-template #noRevenueTrend>
            <p class="empty-copy">Revenue bars will appear once invoice activity starts flowing.</p>
          </ng-template>
        </section>

        <section class="panel surface-card" *ngIf="overviewLoaded && conversionsLoaded && clicksLoaded">
          <div class="panel-header">
            <h2>Conversion Engine</h2>
            <p>Operational funnel from traffic to completed work.</p>
          </div>

          <div class="metric-list">
            <div class="metric-row">
              <span>Total Visitors</span>
              <strong>{{ overview.totalVisitors }}</strong>
            </div>
            <div class="metric-row">
              <span>Total Conversions</span>
              <strong>{{ conversions.totalConversions }}</strong>
            </div>
            <div class="metric-row">
              <span>Assigned Requests</span>
              <strong>{{ conversions.assignedRequests }}</strong>
            </div>
            <div class="metric-row">
              <span>Completed Requests</span>
              <strong>{{ conversions.completedRequests }}</strong>
            </div>
            <div class="metric-row">
              <span>Drop-Off Count</span>
              <strong>{{ conversions.dropOffCount }}</strong>
            </div>
            <div class="metric-row">
              <span>Call / WhatsApp</span>
              <strong>{{ clickStats.callClicks }} / {{ clickStats.whatsAppClicks }}</strong>
            </div>
          </div>
        </section>
      </div>

      <div class="panel-grid" *ngIf="!isLoading">
        <section class="panel surface-card" *ngIf="techniciansLoaded">
          <div class="panel-header">
            <h2>Technician Performance</h2>
            <p>Dispatch quality by completions, load, and rating.</p>
          </div>

          <app-empty-state
            *ngIf="technicianMetrics.length === 0"
            icon="[ ]"
            title="No technician analytics available"
            message="Performance metrics will appear after dispatch activity is recorded.">
          </app-empty-state>

          <table *ngIf="technicianMetrics.length > 0">
            <thead>
              <tr>
                <th>Technician</th>
                <th>City</th>
                <th>Assigned</th>
                <th>Completed</th>
                <th>Load</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let metric of technicianMetrics.slice(0, 8)">
                <td>{{ metric.technicianName }}</td>
                <td>{{ metric.city || '-' }}</td>
                <td>{{ metric.assignedJobs }}</td>
                <td>{{ metric.completedJobs }}</td>
                <td>{{ metric.currentLoad }}</td>
                <td>{{ metric.averageRating ? (metric.averageRating | number:'1.1-1') : 'New' }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="panel surface-card" *ngIf="heatmapLoaded">
          <div class="panel-header">
            <h2>Booking Heatmap</h2>
            <p>City-wise demand and completion spread.</p>
          </div>

          <app-empty-state
            *ngIf="bookingHeatmap.length === 0"
            icon="[ ]"
            title="No city heatmap available"
            message="Heatmap data will appear once bookings are created with city context.">
          </app-empty-state>

          <table *ngIf="bookingHeatmap.length > 0">
            <thead>
              <tr>
                <th>City</th>
                <th>Bookings</th>
                <th>Completed</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let point of bookingHeatmap">
                <td>{{ point.city }}</td>
                <td>{{ point.bookingCount }}</td>
                <td>{{ point.completedCount }}</td>
                <td>{{ formatCurrency(point.revenue) }}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      <section class="table-shell" *ngIf="!isLoading && topPagesLoaded">
        <div class="panel-header">
          <h2>Top Pages</h2>
          <p>Last 30 days of page activity.</p>
        </div>

        <app-empty-state
          *ngIf="topPages.length === 0"
          icon="[ ]"
          title="No page analytics available"
          message="Traffic summaries will appear once visitors start browsing the site.">
        </app-empty-state>

        <table *ngIf="topPages.length > 0">
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
              <th>Unique</th>
              <th>Traffic Share</th>
              <th>Avg. Time</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let page of topPages">
              <td>{{ page.pageUrl || '/' }}</td>
              <td>{{ page.pageViews || 0 }}</td>
              <td>{{ page.uniqueViews || 0 }}</td>
              <td>{{ getTrafficShare(page) }}%</td>
              <td>{{ formatSeconds(page.avgTimeOnPage) }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    .page {
      padding: 2rem;
    }

    .page-header {
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 1rem;
    }

    .page-header h1 {
      margin: 0 0 0.4rem;
    }

    .page-header p {
      margin: 0;
      color: var(--text-muted);
    }

    .btn-secondary {
      border: none;
      border-radius: 10px;
      padding: 0.75rem 1.2rem;
      cursor: pointer;
      font-weight: 600;
      background: var(--surface-muted-strong);
      color: var(--text-dark);
    }

    .status-message.error {
      background: var(--danger-soft);
      color: var(--danger);
      border: 1px solid var(--danger-border);
      border-radius: 8px;
      padding: 0.9rem 1rem;
      margin-bottom: 1.5rem;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .panel-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .panel,
    .table-shell {
      background: var(--surface-solid-strong);
      border-radius: 14px;
      padding: 1rem;
      box-shadow: var(--shadow-md);
    }

    .panel-header {
      margin-bottom: 1rem;
    }

    .panel-header h2 {
      margin: 0 0 0.3rem;
    }

    .panel-header p,
    .empty-copy {
      margin: 0;
      color: var(--text-muted);
    }

    .metric-list {
      display: grid;
      gap: 0.75rem;
    }

    .compact-metrics {
      margin-bottom: 1rem;
    }

    .metric-row {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border-subtle);
    }

    .metric-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .spark-bars {
      display: grid;
      gap: 0.75rem;
    }

    .bar-row {
      align-items: center;
      display: grid;
      gap: 0.75rem;
      grid-template-columns: 72px minmax(0, 1fr) 100px;
    }

    .bar-track {
      background: var(--surface-muted);
      border-radius: 999px;
      height: 10px;
      overflow: hidden;
    }

    .bar-fill {
      background: linear-gradient(90deg, var(--primary), var(--accent));
      border-radius: 999px;
      height: 100%;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 560px;
    }

    th,
    td {
      text-align: left;
      padding: 0.75rem;
      border-bottom: 1px solid var(--border-subtle);
    }

    th {
      background: var(--surface-muted);
      color: var(--text-body);
      font-weight: 600;
    }

    @media (max-width: 1200px) {
      .summary-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 900px) {
      .panel-grid {
        grid-template-columns: 1fr;
      }

      .summary-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 640px) {
      .page {
        padding: 1rem;
      }

      .page-header {
        flex-direction: column;
        align-items: stretch;
      }

      .summary-grid {
        grid-template-columns: 1fr;
      }

      .bar-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  isLoading = true;
  errorMessage = '';
  overviewLoaded = false;
  conversionsLoaded = false;
  clicksLoaded = false;
  revenueLoaded = false;
  techniciansLoaded = false;
  heatmapLoaded = false;
  topPagesLoaded = false;
  overview: AnalyticsOverview = {
    totalVisitors: 0,
    totalPageViews: 0,
    totalCallClicks: 0,
    totalWhatsAppClicks: 0,
    totalBookings: 0,
    bookingsToday: 0,
    bookingsThisWeek: 0,
    completedJobs: 0,
    totalRevenue: 0,
    conversionRate: 0
  };
  conversions: ConversionMetrics = {
    totalConversions: 0,
    callButtonConversions: 0,
    whatsAppConversions: 0,
    bookingFormConversions: 0,
    assignedRequests: 0,
    completedRequests: 0,
    dropOffCount: 0,
    conversionRate: 0
  };
  clickStats: ClickStats = {
    totalClicks: 0,
    callClicks: 0,
    whatsAppClicks: 0,
    bookingClicks: 0
  };
  revenue: RevenueAnalytics = {
    totalRevenue: 0,
    paidRevenue: 0,
    outstandingRevenue: 0,
    averageTicketSize: 0,
    trend: []
  };
  technicianMetrics: TechnicianPerformanceMetric[] = [];
  bookingHeatmap: BookingHeatmapPoint[] = [];
  topPages: PageStats[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.isLoading = true;
    this.errorMessage = '';

    forkJoin({
      overview: this.apiService.get<AnalyticsOverview>('analytics/overview').pipe(
        catchError(() => of(null))
      ),
      conversions: this.apiService.get<ConversionMetrics>('analytics/conversions').pipe(
        catchError(() => of(null))
      ),
      clicks: this.apiService.get<ClickStats>('analytics/clicks').pipe(
        catchError(() => of(null))
      ),
      revenue: this.apiService.getRevenueAnalytics().pipe(
        catchError(() => of(null))
      ),
      technicians: this.apiService.getTechnicianPerformance().pipe(
        catchError(() => of(null))
      ),
      heatmap: this.apiService.getBookingHeatmap().pipe(
        catchError(() => of(null))
      ),
      topPages: this.apiService.get<PageStats[]>('analytics/top-pages').pipe(
        catchError(() => of(null))
      )
    }).subscribe({
      next: ({ overview, conversions, clicks, revenue, technicians, heatmap, topPages }) => {
        this.overviewLoaded = !!overview;
        this.conversionsLoaded = !!conversions;
        this.clicksLoaded = !!clicks;
        this.revenueLoaded = !!revenue;
        this.techniciansLoaded = technicians !== null;
        this.heatmapLoaded = heatmap !== null;
        this.topPagesLoaded = topPages !== null;

        this.overview = overview ?? this.overview;
        this.conversions = conversions ?? this.conversions;
        this.clickStats = clicks ?? this.clickStats;
        this.revenue = revenue ?? this.revenue;
        this.technicianMetrics = technicians ?? [];
        this.bookingHeatmap = heatmap ?? [];
        this.topPages = topPages ?? [];
        if (!this.overviewLoaded || !this.conversionsLoaded || !this.clicksLoaded || !this.revenueLoaded || !this.techniciansLoaded || !this.heatmapLoaded || !this.topPagesLoaded) {
          this.errorMessage = 'Some analytics panels are temporarily unavailable. No synthetic fallback metrics are being shown.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Analytics data could not be loaded right now.';
        this.isLoading = false;
      }
    });
  }

  roundMetric(value?: number): number {
    return Number((value ?? 0).toFixed(2));
  }

  getTrafficShare(page: PageStats): number {
    if (!this.overview.totalPageViews) {
      return 0;
    }

    return this.roundMetric(((page.pageViews || 0) / this.overview.totalPageViews) * 100);
  }

  getRevenueBarWidth(revenue: number): number {
    const maxRevenue = Math.max(...this.revenue.trend.map(point => point.revenue || 0), 0);
    if (!maxRevenue) {
      return 0;
    }

    return Math.max(8, (revenue / maxRevenue) * 100);
  }

  formatSeconds(value?: number): string {
    const totalSeconds = Math.max(0, Math.round(value ?? 0));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}m ${seconds}s`;
  }

  formatCurrency(value?: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value ?? 0);
  }

  formatCurrencyNumber(value?: number): number {
    return Number((value ?? 0).toFixed(0));
  }
}
