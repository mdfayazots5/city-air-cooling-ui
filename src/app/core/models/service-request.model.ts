export interface ServiceRequest {
  id: number;
  rowGuid?: string;
  requestNo: string;
  customerId: number;
  customerName?: string;
  customerPhone?: string;
  serviceCode?: string;
  serviceType: string;
  acType?: string;
  issueDescription?: string;
  priority: string;
  status: ServiceRequestStatus;
  leadSource?: string;
  leadStatus?: string;
  city?: string;
  urgency?: string;
  estimatedPrice?: number;
  etaMinutes?: number;
  autoAssigned?: boolean;
  preferredDate?: Date;
  assignedTechnicianId?: number;
  assignedTechnicianName?: string;
  assignedTechnicianPhone?: string;
  scheduledTime?: Date;
  dateCreated?: Date;
  lastUpdated?: Date;
  completedAt?: Date;
}

export type ServiceRequestStatus =
  | 'New'
  | 'Assigned'
  | 'OnTheWay'
  | 'InProgress'
  | 'Completed';

export interface ServiceRequestCreateRequest {
  customerId: number;
  serviceCode?: string;
  serviceType: string;
  acType?: string;
  issueDescription: string;
  priority?: string;
  city?: string;
  urgency?: string;
  preferredDate?: Date;
}

export interface ServiceRequestUpdateRequest {
  serviceCode?: string;
  serviceType: string;
  acType?: string;
  issueDescription: string;
  priority?: string;
  city?: string;
  urgency?: string;
  preferredDate?: Date;
}

export interface StatusHistory {
  id: number;
  status: string;
  changedByUserId?: number;
  changedByName?: string;
  changeDate: Date;
  notes?: string;
}

export interface StatusTimelineStep {
  key: string;
  label: string;
  isCompleted: boolean;
  isCurrent: boolean;
  completedAt?: Date;
}

export interface ServiceRequestLiveStatus {
  serviceRequestId: number;
  requestNo: string;
  status: ServiceRequestStatus;
  city: string;
  urgency: string;
  estimatedPrice: number;
  etaMinutes: number;
  preferredDate?: Date;
  scheduledTime?: Date;
  technicianName: string;
  technicianPhone: string;
  technicianEmail: string;
  canReview: boolean;
  hasReview: boolean;
  timeline: StatusTimelineStep[];
}

export interface Technician {
  id: number;
  rowGuid?: string;
  technicianCode: string;
  name: string;
  phone?: string;
  email?: string;
  serviceArea?: string;
  city?: string;
  supportedServiceCodes?: string;
  experienceYears?: number;
  currentLoad?: number;
  averageRating?: number;
  isActive: boolean;
  dateCreated?: Date;
}

export interface PricingModifier {
  label: string;
  amount: number;
  reason: string;
}

export interface PricingQuote {
  serviceCode: string;
  serviceType: string;
  city: string;
  urgency: string;
  basePrice: number;
  finalPrice: number;
  priceLabel: string;
  modifiers: PricingModifier[];
}

export interface ReviewCreateRequest {
  serviceRequestId: number;
  requestNo: string;
  rating: number;
  comment?: string;
  isPublic?: boolean;
}

export interface ReviewData {
  id: number;
  serviceRequestId: number;
  customerId?: number;
  technicianId?: number;
  customerName: string;
  technicianName: string;
  city: string;
  serviceType: string;
  rating: number;
  comment: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  recentReviews: ReviewData[];
}

export interface RevenuePoint {
  date: Date;
  revenue: number;
  completedJobs: number;
}

export interface RevenueAnalytics {
  totalRevenue: number;
  paidRevenue: number;
  outstandingRevenue: number;
  averageTicketSize: number;
  trend: RevenuePoint[];
}

export interface TechnicianPerformanceMetric {
  technicianId: number;
  technicianName: string;
  city: string;
  currentLoad: number;
  assignedJobs: number;
  completedJobs: number;
  completionRate: number;
  averageRating: number;
}

export interface BookingHeatmapPoint {
  city: string;
  bookingCount: number;
  completedCount: number;
  revenue: number;
}
