export interface ServiceRequest {
  id: number;
  rowGuid?: string;
  requestNo: string;
  customerId: number;
  customerName?: string;
  customerPhone?: string;
  serviceType: string;
  acType?: string;
  issueDescription?: string;
  priority: string;
  status: ServiceRequestStatus;
  preferredDate?: Date;
  assignedTechnicianId?: number;
  assignedTechnicianName?: string;
  dateCreated?: Date;
  lastUpdated?: Date;
}

export type ServiceRequestStatus = 
  | 'Pending' 
  | 'Assigned' 
  | 'InProgress' 
  | 'Completed' 
  | 'Cancelled';

export interface ServiceRequestCreateRequest {
  customerId: number;
  serviceType: string;
  acType?: string;
  issueDescription: string;
  priority?: string;
  preferredDate?: Date;
}

export interface ServiceRequestUpdateRequest {
  serviceType: string;
  acType?: string;
  issueDescription: string;
  priority?: string;
  preferredDate?: Date;
}

export interface StatusHistory {
  id: number;
  status: string;
  changedByUserId: number;
  changedByName?: string;
  changeDate: Date;
  notes?: string;
}

export interface Technician {
  id: number;
  rowGuid?: string;
  technicianCode: string;
  name: string;
  phone?: string;
  email?: string;
  serviceArea?: string;
  experienceYears?: number;
  isActive: boolean;
  dateCreated?: Date;
}

