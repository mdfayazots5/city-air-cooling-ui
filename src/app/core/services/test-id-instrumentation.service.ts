import { Injectable, OnDestroy } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TestIdInstrumentationService implements OnDestroy {
  private readonly generatedKeys = new Map<string, number>();

  private observer?: MutationObserver;

  private scanQueued = false;

  private started = false;

  public start(): void {
    if (this.started || typeof document === 'undefined') {
      return;
    }
    this.started = true;

    this.applyToTree(document.body);
    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of Array.from(mutation.addedNodes)) {
            if (node instanceof Element) {
              this.applyToTree(node);
            }
          }
          continue;
        }

        if (mutation.type === 'attributes' && mutation.target instanceof Element) {
          this.scheduleApply(mutation.target);
        }
      }
    });

    this.observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['id', 'name', 'aria-label', 'placeholder', 'formcontrolname', 'role'],
    });
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private scheduleApply(element: Element): void {
    if (this.scanQueued) {
      return;
    }

    this.scanQueued = true;
    queueMicrotask(() => {
      this.scanQueued = false;
      this.applyToTree(element);
    });
  }

  private applyToTree(root: Element | null): void {
    if (!root) {
      return;
    }

    if (this.isInteractive(root)) {
      this.ensureTestId(root);
    }

    const candidates = root.querySelectorAll(
      'button, a, input, select, textarea, [role="button"], [tabindex], [contenteditable="true"]',
    );

    for (const candidate of Array.from(candidates)) {
      if (this.isInteractive(candidate)) {
        this.ensureTestId(candidate);
      }
    }
  }

  private ensureTestId(element: Element): void {
    if (element.hasAttribute('data-test')) {
      return;
    }

    const base =
      this.extractAttribute(element, 'data-testid') ??
      this.extractAttribute(element, 'id') ??
      this.extractAttribute(element, 'name') ??
      this.extractAttribute(element, 'formcontrolname') ??
      this.extractAttribute(element, 'aria-label') ??
      this.extractAttribute(element, 'placeholder') ??
      this.extractTextContent(element) ??
      element.tagName.toLowerCase();

    const normalized = this.normalize(base);
    const key = normalized || element.tagName.toLowerCase();
    const count = (this.generatedKeys.get(key) ?? 0) + 1;
    this.generatedKeys.set(key, count);
    const stableId = count === 1 ? key : `${key}-${count}`;
    element.setAttribute('data-test', stableId);
  }

  private isInteractive(element: Element): boolean {
    const tag = element.tagName.toLowerCase();
    if (['button', 'a', 'input', 'select', 'textarea'].includes(tag)) {
      return true;
    }

    const role = (element.getAttribute('role') ?? '').toLowerCase();
    if (role === 'button') {
      return true;
    }

    if (element.hasAttribute('contenteditable') && element.getAttribute('contenteditable') !== 'false') {
      return true;
    }

    const tabindex = element.getAttribute('tabindex');
    return tabindex !== null && Number(tabindex) >= 0;
  }

  private extractAttribute(element: Element, name: string): string | undefined {
    const value = element.getAttribute(name);
    if (!value) {
      return undefined;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  private extractTextContent(element: Element): string | undefined {
    const text = (element.textContent ?? '').trim();
    if (text.length === 0) {
      return undefined;
    }
    return text.split(/\s+/).slice(0, 6).join('-');
  }

  private normalize(value: string): string {
    return value
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
  }
}
