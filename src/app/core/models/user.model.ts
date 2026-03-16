export interface User {
  id: number;
  rowGuid?: string;
  username: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  roleId?: number;
  isActive: boolean;
  lastLoginDate?: Date;
  dateCreated?: Date;
}

export interface UserCreateRequest {
  username: string;
  password: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  roleId: number;
}

export interface UserUpdateRequest {
  email: string;
  phone: string;
  roleId: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

