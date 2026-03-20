import { Directive, Input, OnChanges, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit, OnChanges, OnDestroy {
  @Input('appHasPermission') moduleCode = '';
  @Input() appHasPermissionAction = 'View';

  private authSubscription?: Subscription;
  private hasEmbeddedView = false;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authState$.subscribe(() => {
      this.updateView();
    });

    this.updateView();
  }

  ngOnChanges(): void {
    this.updateView();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  private updateView(): void {
    const resolved = this.resolvePermissionRequest();
    const isAllowed = !!resolved.moduleCode
      && this.authService.hasPermission(resolved.moduleCode, resolved.permissionCode);

    if (isAllowed && !this.hasEmbeddedView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasEmbeddedView = true;
      return;
    }

    if (!isAllowed && this.hasEmbeddedView) {
      this.viewContainer.clear();
      this.hasEmbeddedView = false;
    }
  }

  private resolvePermissionRequest(): { moduleCode: string; permissionCode: string } {
    const rawModule = `${this.moduleCode ?? ''}`.trim();
    const explicitAction = `${this.appHasPermissionAction ?? ''}`.trim();

    if (rawModule.includes(':') && !explicitAction) {
      const [moduleCode, permissionCode] = rawModule.split(':', 2);
      return {
        moduleCode: moduleCode.trim(),
        permissionCode: permissionCode.trim() || 'View'
      };
    }

    if (rawModule.includes(':') && explicitAction === 'View') {
      const [moduleCode, permissionCode] = rawModule.split(':', 2);
      return {
        moduleCode: moduleCode.trim(),
        permissionCode: permissionCode.trim() || 'View'
      };
    }

    return {
      moduleCode: rawModule,
      permissionCode: explicitAction || 'View'
    };
  }
}
