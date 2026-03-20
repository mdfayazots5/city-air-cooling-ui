export interface UserEvent {
  id: number;
  eventType: EventType;
  userId?: string;
  customerId?: number;
  pageUrl?: string;
  buttonName?: string;
  latitude?: number;
  longitude?: number;
  ipAddress?: string;
  userAgent?: string;
  city?: string;
  eventDate: Date;
}

export enum EventType {
  PageViewed = 'PageViewed',
  CallClicked = 'CallClicked',
  WhatsAppClicked = 'WhatsAppClicked',
  BookingStarted = 'BookingStarted',
  BookingCompleted = 'BookingCompleted'
}

export interface EventTrackRequest {
  eventType: string;
  userId?: string;
  customerId?: number;
  pageUrl: string;
  buttonName?: string;
  latitude?: number;
  longitude?: number;
  ipAddress?: string;
  userAgent?: string;
}

export interface AnalyticsOverview {
  totalVisitors: number;
  totalPageViews: number;
  totalCallClicks: number;
  totalWhatsAppClicks: number;
  totalBookings: number;
  bookingsToday: number;
  bookingsThisWeek: number;
  completedJobs: number;
  totalRevenue: number;
  conversionRate: number;
}

export interface ConversionMetrics {
  totalConversions: number;
  callButtonConversions: number;
  whatsAppConversions: number;
  bookingFormConversions: number;
  assignedRequests: number;
  completedRequests: number;
  dropOffCount: number;
  conversionRate: number;
}

export interface ClickStats {
  totalClicks: number;
  callClicks: number;
  whatsAppClicks: number;
  bookingClicks: number;
}

export interface TrafficData {
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  avgPagesPerSession: number;
  avgSessionDuration: number;
}

export interface PageStats {
  pageUrl: string;
  pageViews: number;
  uniqueViews: number;
  avgTimeOnPage: number;
}

export interface LocationStats {
  location: string;
  eventCount: number;
  percentage: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  date?: Date;
}

export interface ChartData {
  dataPoints: ChartDataPoint[];
  chartType: string;
}

