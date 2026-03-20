export interface Role {
  id: number;
  rowGuid?: string;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  dateCreated?: Date;
}

export interface Permission {
  id: number;
  rowGuid?: string;
  code: string;
  name: string;
  description?: string;
}

export interface Module {
  id: number;
  rowGuid?: string;
  code: string;
  name: string;
  description?: string;
  sortOrder?: number;
  isActive: boolean;
  routePath: string;
  showInMenu: boolean;
  defaultPermissionCode: string;
}

export interface RolePermission {
  moduleId: number;
  moduleName: string;
  permissionId: number;
  permissionName: string;
  isEnabled: boolean;
}

