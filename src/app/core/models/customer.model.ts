export interface Customer {
  id: number;
  rowGuid?: string;
  customerCode: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  customerSource?: string;
  dateCreated?: Date;
}

export interface CustomerCreateRequest {
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  customerSource?: string;
}

export interface CustomerUpdateRequest {
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

export interface ContactHistory {
  id: number;
  contactType: string;
  contactSource?: string;
  contactDate: Date;
  notes?: string;
}

