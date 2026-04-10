export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  designation: string;
  joinDate: Date;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  qrCode?: string;
}

export interface Donation {
  id: string;
  donationId: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  paymentMethod: 'CASH' | 'CARD' | 'BANK_TRANSFER' | 'UPI';
  transactionId: string;
  receiptNo: string;
  purpose: string;
  date: Date;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  startDate: Date;
  endDate: Date;
  status: 'ACTIVE' | 'COMPLETED' | 'SUSPENDED';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  registered: number;
  image?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}