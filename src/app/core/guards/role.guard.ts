import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { normalizeRoute } from '../rbac/route-access';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAccess(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAccess(route, state);
  }

  private checkAccess(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    const requiresAuth = route.data['requiresAuth'] === true;
    const moduleCode = route.data['module'] as string | undefined;
    const permissionCode = route.data['permission'] as string | undefined;
    const anyModules = (route.data['anyModules'] as string[] | undefined) ?? [];
    const isRootEntryRoute = normalizeRoute(state.url) === '/';
    const shouldRedirectAuthenticatedFromRoot = route.data['redirectAuthenticatedToDefault'] === true;

    if (!this.authService.isAuthenticated()) {
      if (!requiresAuth && !moduleCode && anyModules.length === 0) {
        return true;
      }

      return this.router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
    }

    return this.authService.loadPermissions().pipe(
      map(() => {
        if (!requiresAuth && !moduleCode && anyModules.length === 0) {
          if (!shouldRedirectAuthenticatedFromRoot || !isRootEntryRoute) {
            return true;
          }

          return this.buildDefaultRedirect(state.url);
        }

        if (moduleCode) {
          const isAllowed = permissionCode
            ? this.authService.hasPermission(moduleCode, permissionCode)
            : this.authService.hasModuleAccess(moduleCode);

          return isAllowed ? true : this.buildDefaultRedirect(state.url);
        }

        if (anyModules.length > 0) {
          return this.authService.hasAnyModuleAccess(anyModules)
            ? true
            : this.buildDefaultRedirect(state.url);
        }

        return requiresAuth && this.authService.canAccessRoute(state.url)
          ? true
          : this.buildDefaultRedirect(state.url);
      }),
      catchError(() => of(this.router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      })))
    );
  }

  private buildDefaultRedirect(sourceUrl: string): UrlTree {
    const defaultUrl = this.authService.getDefaultRedirectUrl();
    const normalizedDefaultUrl = normalizeRoute(defaultUrl);
    const normalizedSourceUrl = normalizeRoute(sourceUrl);

    if (normalizedDefaultUrl === normalizedSourceUrl) {
      return this.router.createUrlTree(['/customer'], {
        queryParams: { from: sourceUrl }
      });
    }

    return this.router.createUrlTree([defaultUrl], {
      queryParams: { from: sourceUrl }
    });
  }
}

