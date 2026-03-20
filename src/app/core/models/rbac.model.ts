export interface AssignedRole {
  roleId: number;
  roleCode: string;
  roleName: string;
}

export interface PermissionEntry {
  permissionId: number;
  permissionCode: string;
  permissionName: string;
  description?: string | null;
}

export interface ModulePermission {
  moduleId: number;
  moduleCode: string;
  moduleName: string;
  description?: string | null;
  sortOrder: number;
  routePath: string;
  showInMenu: boolean;
  defaultPermissionCode: string;
  permissions: PermissionEntry[];
}

export interface PermissionProfile {
  userId: number;
  roles: AssignedRole[];
  modules: ModulePermission[];
}

export interface NavigationItem {
  moduleCode: string;
  label: string;
  route: string;
  icon: string;
  exact?: boolean;
  showInMenu?: boolean;
  defaultPermissionCode?: string;
  sortOrder?: number;
}
