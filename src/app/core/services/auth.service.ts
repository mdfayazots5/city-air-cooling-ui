import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from './api.service';
import {
  ModulePermission,
  NavigationItem,
  PermissionProfile
} from '../models/rbac.model';
import { normalizeRoute, routeMatches } from '../rbac/route-access';

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  role: string;
  roleId?: number;
  isActive?: boolean;
  lastLoginDate?: Date;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
  expiresAt: Date | string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  permissions: PermissionProfile | null;
  permissionsLoaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  private readonly PERMISSIONS_KEY = 'auth_permissions';

  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
    permissions: null,
    permissionsLoaded: false
  });

  public authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredAuth();
  }

  private loadStoredAuth(): void {
    const token = this.getStoredValue(this.TOKEN_KEY);
    const userJson = this.getStoredValue(this.USER_KEY);
    const permissionsJson = this.getStoredValue(this.PERMISSIONS_KEY);

    if (!token || !userJson) {
      return;
    }

    try {
      const user = JSON.parse(userJson) as User;
      const userWithRole = this.extractRoleFromUserOrToken(user, token);
      const permissions = permissionsJson
        ? JSON.parse(permissionsJson) as PermissionProfile
        : null;

      this.authState.next({
        isAuthenticated: true,
        user: userWithRole,
        token,
        refreshToken: null,
        permissions,
        permissionsLoaded: !!permissions
      });
    } catch (error) {
      this.logWarn('Stored auth data was invalid and has been cleared.', error);
      this.clearStoredAuth();
    }
  }

  login(username: string, password: string, _rememberMe: boolean = false): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${this.apiUrl}/auth/login`,
      { username, password },
      { withCredentials: true }
    ).pipe(
      map(response => this.unwrapAuthResponse(response)),
      tap(response => this.handleAuthResponse(response)),
      switchMap(response => this.loadPermissions(true).pipe(
        map(profile => {
          if (!profile) {
            throw new Error('Permissions could not be loaded for this account.');
          }

          return response;
        })
      )),
      catchError(error => {
        this.logError('Login error:', error);
        this.clearAuthState();
        return throwError(() => error);
      })
    );
  }

  register(data: {
    username: string;
    password: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  }): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${this.apiUrl}/auth/register`,
      data,
      { withCredentials: true }
    ).pipe(
      map(response => this.unwrapAuthResponse(response)),
      tap(response => this.handleAuthResponse(response)),
      switchMap(response => this.loadPermissions(true).pipe(
        map(profile => {
          if (!profile) {
            throw new Error('Permissions could not be loaded for this account.');
          }

          return response;
        })
      )),
      catchError(error => {
        this.logError('Registration error:', error);
        this.clearAuthState();
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    const token = this.authState.value.token;
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    this.http.post<ApiResponse<unknown>>(
      `${this.apiUrl}/auth/logout`,
      {},
      {
        headers,
        withCredentials: true
      }
    ).pipe(
      catchError(error => {
        this.logWarn('Logout request failed, clearing local session only.', error);
        return of(null);
      })
    ).subscribe({
      complete: () => this.clearAuthState()
    });
  }

  refreshToken(): Observable<LoginResponse | null> {
    const currentToken = this.authState.value.token;
    if (!currentToken) {
      return of(null);
    }

    return this.http.post<ApiResponse<LoginResponse>>(
      `${this.apiUrl}/auth/refresh-token`,
      { token: currentToken },
      { withCredentials: true }
    ).pipe(
      map(response => this.unwrapAuthResponse(response)),
      tap(response => this.handleAuthResponse(response)),
      switchMap(response => this.loadPermissions(true).pipe(
        map(profile => {
          if (!profile) {
            throw new Error('Permissions could not be loaded for this session.');
          }

          return response;
        })
      )),
      catchError(error => {
        this.logError('Token refresh error:', error);
        this.clearAuthState();
        return of(null);
      })
    );
  }

  getToken(): string | null {
    return this.authState.value.token;
  }

  getUser(): User | null {
    return this.authState.value.user;
  }

  isAuthenticated(): boolean {
    return this.authState.value.isAuthenticated;
  }

  hasModuleAccess(moduleCode: string): boolean {
    return this.getAccessibleModules()
      .some(module => this.normalizeCode(module.moduleCode) === this.normalizeCode(moduleCode));
  }

  hasAnyModuleAccess(moduleCodes: string[]): boolean {
    return moduleCodes.some(moduleCode => this.hasModuleAccess(moduleCode));
  }

  hasPermission(moduleCode: string, permissionCode: string): boolean {
    return this.getAccessibleModules()
      .filter(module => this.normalizeCode(module.moduleCode) === this.normalizeCode(moduleCode))
      .some(module => module.permissions.some(permission => this.normalizeCode(permission.permissionCode) === this.normalizeCode(permissionCode)));
  }

  getDefaultRedirectUrl(user: User | null = this.authState.value.user): string {
    if (!user) {
      return '/';
    }

    const firstAccessibleRoute = this.getAccessibleModules()
      .map(module => module.routePath)
      .find(routePath => !!normalizeRoute(routePath));

    if (firstAccessibleRoute) {
      return firstAccessibleRoute;
    }

    return this.isAuthenticated() ? '/customer' : '/';
  }

  canAccessRoute(route: string): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    const matchedModule = this.findModuleByRoute(route);
    if (!matchedModule) {
      return false;
    }

    const requiredPermission = matchedModule.defaultPermissionCode || 'View';
    return requiredPermission
      ? this.hasPermission(matchedModule.moduleCode, requiredPermission)
      : this.hasModuleAccess(matchedModule.moduleCode);
  }

  getCurrentUser(): Observable<User | null> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/auth/me`).pipe(
      map(response => this.unwrapAuthResponse(response)),
      tap(user => {
        const currentState = this.authState.value;
        const userWithRole = this.extractRoleFromUserOrToken(user, currentState.token ?? '');
        this.setStoredValue(this.USER_KEY, JSON.stringify(userWithRole));
        this.authState.next({ ...currentState, user: userWithRole });
      }),
      catchError(error => {
        this.logError('Failed to get current user', error);
        this.clearAuthState();
        return of(null);
      })
    );
  }

  getPermissionProfile(): PermissionProfile | null {
    return this.authState.value.permissions;
  }

  arePermissionsLoaded(): boolean {
    return this.authState.value.permissionsLoaded;
  }

  loadPermissions(force = false): Observable<PermissionProfile | null> {
    const currentState = this.authState.value;
    if (!currentState.isAuthenticated || !currentState.token) {
      return of(null);
    }

    if (!force && currentState.permissionsLoaded && currentState.permissions) {
      return of(currentState.permissions);
    }

    return this.http.get<ApiResponse<PermissionProfile>>(`${this.apiUrl}/auth/permissions`).pipe(
      map(response => this.unwrapAuthResponse(response)),
      tap(profile => this.handlePermissionsResponse(profile)),
      catchError(error => {
        this.logError('Failed to load permissions', error);

        if (error.status === 401 || error.status === 403) {
          this.clearAuthState();
        }

        return of(null);
      })
    );
  }

  getNavigationItems(): NavigationItem[] {
    return this.getAccessibleModules()
      .filter(module => module.showInMenu !== false)
      .filter(module => !!normalizeRoute(module.routePath))
      .map(module => ({
        moduleCode: module.moduleCode,
        label: module.moduleName,
        route: module.routePath,
        icon: this.buildNavigationIcon(module.moduleName),
        exact: false,
        showInMenu: module.showInMenu,
        defaultPermissionCode: module.defaultPermissionCode,
        sortOrder: module.sortOrder
      }));
  }

  private unwrapAuthResponse<T>(response: ApiResponse<T>): T {
    if (!response?.success) {
      throw new Error(response?.message || 'Authentication request failed.');
    }

    return response.data;
  }

  private handleAuthResponse(response: LoginResponse): void {
    const userWithRole = this.extractRoleFromUserOrToken(response.user, response.token);

    this.setStoredValue(this.TOKEN_KEY, response.token);
    this.setStoredValue(this.USER_KEY, JSON.stringify(userWithRole));
    this.removeStoredValue(this.PERMISSIONS_KEY);

    this.authState.next({
      isAuthenticated: true,
      user: userWithRole,
      token: response.token,
      refreshToken: response.refreshToken ?? null,
      permissions: null,
      permissionsLoaded: false
    });
  }

  private handlePermissionsResponse(profile: PermissionProfile): void {
    const currentState = this.authState.value;
    const primaryRole = profile.roles[0]?.roleCode;
    const normalizedRole = primaryRole ? this.normalizeRole(primaryRole) : currentState.user?.role ?? '';
    const nextUser = currentState.user
      ? { ...currentState.user, role: normalizedRole }
      : currentState.user;

    if (nextUser) {
      this.setStoredValue(this.USER_KEY, JSON.stringify(nextUser));
    }

    this.setStoredValue(this.PERMISSIONS_KEY, JSON.stringify(profile));
    this.authState.next({
      ...currentState,
      user: nextUser,
      permissions: profile,
      permissionsLoaded: true
    });
  }

  private extractRoleFromUserOrToken(user: User, token: string): User {
    const normalizedUser = {
      ...user,
      role: this.normalizeRole(user.role)
    };

    if (normalizedUser.role) {
      return normalizedUser;
    }

    try {
      const payload = this.decodeTokenPayload(token);
      const claimKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      const roleFromToken = this.normalizeRole((payload[claimKey] as string | undefined) ?? (payload['role'] as string | undefined));

      if (roleFromToken) {
        return { ...normalizedUser, role: roleFromToken };
      }
    } catch (e) {
      this.logWarn('Failed to extract role from token:', e);
    }

    return normalizedUser;
  }

  private clearAuthState(): void {
    this.clearStoredAuth();
    this.authState.next({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      permissions: null,
      permissionsLoaded: false
    });
  }

  private clearStoredAuth(): void {
    this.removeStoredValue(this.TOKEN_KEY);
    this.removeStoredValue(this.USER_KEY);
    this.removeStoredValue(this.PERMISSIONS_KEY);
  }

  private getStoredValue(key: string): string | null {
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      this.logWarn(`Unable to read stored auth key "${key}".`, error);
      return null;
    }
  }

  private setStoredValue(key: string, value: string): void {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      this.logWarn(`Unable to persist auth key "${key}".`, error);
    }
  }

  private removeStoredValue(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      this.logWarn(`Unable to remove auth key "${key}".`, error);
    }
  }

  private normalizeRole(role: string | null | undefined): string {
    return `${role ?? ''}`.trim();
  }

  private getAccessibleModules(): ModulePermission[] {
    return [...(this.authState.value.permissions?.modules ?? [])]
      .sort((left, right) => left.sortOrder - right.sortOrder || left.moduleName.localeCompare(right.moduleName));
  }

  private findModuleByRoute(route: string): ModulePermission | undefined {
    const normalizedRoute = normalizeRoute(route);

    return this.getAccessibleModules()
      .filter(module => !!normalizeRoute(module.routePath))
      .sort((left, right) => normalizeRoute(right.routePath).length - normalizeRoute(left.routePath).length)
      .find(module => routeMatches(normalizedRoute, module.routePath));
  }

  private buildNavigationIcon(moduleName: string): string {
    const parts = `${moduleName ?? ''}`
      .split(/\s+/)
      .map(part => part.trim())
      .filter(Boolean);

    if (parts.length === 0) {
      return 'NA';
    }

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
  }

  private normalizeCode(value: string | null | undefined): string {
    return `${value ?? ''}`.trim().toUpperCase();
  }

  private decodeTokenPayload(token: string): Record<string, unknown> {
    const payloadSegment = token?.split('.')[1];
    if (!payloadSegment) {
      throw new Error('Token payload segment is missing.');
    }

    const base64 = payloadSegment.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    return JSON.parse(atob(padded)) as Record<string, unknown>;
  }

  private logWarn(message: string, error?: unknown): void {
    if (!environment.production) {
      console.warn(message, error);
    }
  }

  private logError(message: string, error?: unknown): void {
    if (!environment.production) {
      console.error(message, error);
    }
  }
}
