export interface InvoiceItemRequest {
  itemName: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: number;
  rowGuid?: string;
  invoiceNo: string;
  serviceRequestId?: number;
  requestNo?: string;
  customerId: number;
  customerName?: string;
  customerAddress?: string;
  customerPhone?: string;
  invoiceDate: Date;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  dateCreated?: Date;
  items?: InvoiceItem[];
}

export type InvoiceStatus = 
  | 'Pending' 
  | 'Paid' 
  | 'Cancelled' 
  | 'Overdue';

export interface InvoiceItem {
  id: number;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface InvoiceCreateRequest {
  serviceRequestId?: number;
  customerId: number;
  invoiceDate?: Date;
  items: InvoiceItemRequest[];
  taxRate?: number;
}

export interface Payment {
  id: number;
  paymentMethod: string;
  amount: number;
  paymentDate: Date;
  transactionReference?: string;
  status: PaymentStatus;
}

export type PaymentStatus = 
  | 'Pending' 
  | 'Completed' 
  | 'Failed' 
  | 'Refunded';

export interface BillingSummary {
  totalBilled: number;
  totalPaid: number;
  totalOutstanding: number;
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
}

