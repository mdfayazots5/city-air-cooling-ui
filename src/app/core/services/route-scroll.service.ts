import { ViewportScroller } from '@angular/common';
import { DestroyRef, Injectable, NgZone, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteScrollService {
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly viewportScroller: ViewportScroller
  ) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const activeRoute = this.getDeepestActivatedRoute(this.router.routerState.root);
        if (activeRoute.snapshot.data['preserveScroll'] === true) {
          return;
        }

        this.ngZone.runOutsideAngular(() => {
          requestAnimationFrame(() => {
            if (activeRoute.snapshot.fragment) {
              return;
            }

            this.viewportScroller.scrollToPosition([0, 0]);
            this.resetScrollableContainers();
          });
        });
      });
  }

  private getDeepestActivatedRoute(route: ActivatedRoute): ActivatedRoute {
    let currentRoute = route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute;
  }

  private resetScrollableContainers(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const scrollContainers = document.querySelectorAll<HTMLElement>('[data-route-scroll-container]');
    scrollContainers.forEach(container => {
      container.scrollTo({ behavior: 'auto', left: 0, top: 0 });
    });
  }
}
