import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BrandConfig } from '../../../core/models';

type MobileLoginMethod = 'password' | 'otp';

@Component({
  selector: 'app-login-mobile',
  template: `
    <section class="mobile-login-shell">
      <div class="mobile-login-card">
        <header class="mobile-login-header">
          <span class="login-chip">Secure Access</span>
          <h1>{{ brand.name }}</h1>
          <p>{{ brand.tagline }}</p>
        </header>

        <div class="login-steps" aria-label="Login steps">
          <span [class.active]="step === 1">1. Phone/Email</span>
          <span [class.active]="step === 2">2. OTP/Password</span>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mobile-login-form" novalidate>
          <fieldset *ngIf="step === 1">
            <legend>Phone/Email</legend>

            <div class="form-group">
              <label for="mobile-username">Phone or Email</label>
              <input
                id="mobile-username"
                type="text"
                autocomplete="username"
                inputmode="email"
                formControlName="username"
                placeholder="Enter phone number or email">
              <span class="error-text" *ngIf="showControlError('username', 'required')">
                Phone or email is required.
              </span>
            </div>

            <button
              type="button"
              class="cta-primary-lg"
              [disabled]="!isControlValid('username')"
              (click)="goToCredentialStep()">
              Continue
            </button>
          </fieldset>

          <fieldset *ngIf="step === 2">
            <legend>OTP / Password</legend>

            <div class="login-method-toggle" role="group" aria-label="Choose sign-in method">
              <button
                type="button"
                class="method-btn"
                [class.active]="loginMethod === 'password'"
                (click)="setLoginMethod('password')">
                Password
              </button>
              <button
                type="button"
                class="method-btn"
                [class.active]="loginMethod === 'otp'"
                (click)="setLoginMethod('otp')">
                OTP
              </button>
            </div>

            <div class="form-group">
              <label for="mobile-password">
                {{ loginMethod === 'password' ? 'Password' : 'OTP / Password' }}
              </label>
              <div class="password-field">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  id="mobile-password"
                  autocomplete="current-password"
                  formControlName="password"
                  [placeholder]="loginMethod === 'password' ? 'Enter password' : 'Enter OTP or password'">
                <button
                  type="button"
                  class="visibility-toggle"
                  (click)="togglePasswordVisibility.emit()"
                  [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
                  {{ showPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
              <span class="error-text" *ngIf="showControlError('password', 'required')">
                {{ loginMethod === 'password' ? 'Password is required.' : 'OTP or password is required.' }}
              </span>
            </div>

            <label class="remember-toggle">
              <input type="checkbox" formControlName="rememberMe">
              Keep me signed in
            </label>

            <div class="step-actions">
              <button type="button" class="btn-secondary" (click)="goBack()">Back</button>
              <button type="submit" class="cta-primary-lg" [disabled]="isLoading || loginForm.invalid">
                {{ isLoading ? 'Signing In...' : 'Sign In' }}
              </button>
            </div>
          </fieldset>
        </form>

        <div class="error-message" *ngIf="errorMessage" aria-live="polite">
          {{ errorMessage }}
        </div>

        <div class="info-message" *ngIf="infoMessage" aria-live="polite">
          {{ infoMessage }}
        </div>

        <footer class="mobile-login-footer">
          <button type="button" class="link-button" (click)="helpToggled.emit()">
            Need help signing in?
          </button>
          <p class="help-text" *ngIf="showHelp">
            Contact your administrator to reset credentials or confirm your access permissions.
          </p>
        </footer>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .mobile-login-shell {
      align-items: center;
      display: flex;
      justify-content: center;
      min-height: 100vh;
      padding: 1rem;
    }

    .mobile-login-card {
      background: var(--surface);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      display: grid;
      gap: 0.75rem;
      max-width: 400px;
      padding: 1rem;
      width: 100%;
    }

    .mobile-login-header {
      text-align: center;
    }

    .login-chip {
      align-items: center;
      background: var(--surface-hero-soft);
      border-radius: 999px;
      color: var(--primary);
      display: inline-flex;
      font-size: 0.72rem;
      font-weight: 700;
      justify-content: center;
      letter-spacing: 0.04em;
      margin-bottom: 0.5rem;
      min-height: 28px;
      padding: 0 0.7rem;
      text-transform: uppercase;
    }

    .mobile-login-header h1 {
      color: var(--text-dark);
      font-size: 1.25rem;
      line-height: 1.3;
      margin: 0;
    }

    .mobile-login-header p {
      color: var(--text-muted);
      display: -webkit-box;
      font-size: 0.88rem;
      margin: 0.3rem 0 0;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .login-steps {
      display: grid;
      gap: 0.4rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .login-steps span {
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      color: var(--text-muted);
      font-size: 0.72rem;
      font-weight: 700;
      min-height: 34px;
      padding: 0.35rem 0.5rem;
      text-align: center;
      white-space: nowrap;
    }

    .login-steps span.active {
      background: var(--surface-hero-soft);
      border-color: var(--primary-tint-border-strong);
      color: var(--primary);
    }

    .mobile-login-form {
      display: grid;
      gap: 0.75rem;
    }

    fieldset {
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      display: grid;
      gap: 0.75rem;
      margin: 0;
      padding: 0.9rem;
    }

    legend {
      color: var(--text-dark);
      font-size: 0.82rem;
      font-weight: 700;
      padding: 0 0.3rem;
      text-transform: uppercase;
    }

    .form-group {
      margin: 0;
    }

    .form-group label {
      color: var(--text-dark);
      display: block;
      font-size: 0.84rem;
      font-weight: 700;
      margin-bottom: 0.35rem;
    }

    .form-group input[type='text'],
    .form-group input[type='password'] {
      width: 100%;
    }

    .password-field {
      position: relative;
    }

    .password-field input {
      padding-right: 4.2rem;
    }

    .visibility-toggle {
      background: var(--surface-muted);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      color: var(--primary);
      font-size: 0.74rem;
      font-weight: 700;
      min-height: 30px;
      min-width: 48px;
      padding: 0 0.55rem;
      position: absolute;
      right: 0.4rem;
      top: 50%;
      transform: translateY(-50%);
    }

    .login-method-toggle {
      display: grid;
      gap: 0.45rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .method-btn {
      align-items: center;
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      color: var(--text-body);
      display: inline-flex;
      font-size: 0.76rem;
      font-weight: 700;
      justify-content: center;
      min-height: 36px;
      padding: 0 0.65rem;
      white-space: nowrap;
    }

    .method-btn.active {
      background: var(--surface-hero-soft);
      border-color: var(--primary-tint-border-strong);
      color: var(--primary);
    }

    .remember-toggle {
      align-items: center;
      color: var(--text-body);
      display: inline-flex;
      gap: 0.45rem;
      font-size: 0.84rem;
      font-weight: 600;
    }

    .step-actions {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .step-actions button,
    .cta-primary-lg {
      width: 100%;
    }

    .error-text {
      color: var(--danger);
      display: block;
      font-size: 0.75rem;
      margin-top: 0.3rem;
    }

    .error-message {
      background: var(--danger-soft);
      border: 1px solid var(--danger-border);
      border-radius: 8px;
      color: var(--danger);
      font-size: 0.84rem;
      padding: 0.7rem 0.75rem;
      text-align: center;
    }

    .info-message {
      background: var(--success-soft);
      border: 1px solid var(--success-border);
      border-radius: 8px;
      color: var(--success);
      font-size: 0.84rem;
      padding: 0.7rem 0.75rem;
      text-align: center;
    }

    .mobile-login-footer {
      text-align: center;
    }

    .link-button {
      background: none;
      border: none;
      color: var(--primary);
      cursor: pointer;
      font-size: 0.84rem;
      font-weight: 700;
      padding: 0;
    }

    .help-text {
      color: var(--text-muted);
      font-size: 0.8rem;
      line-height: 1.45;
      margin: 0.45rem 0 0;
    }
  `]
})
export class LoginMobileComponent {
  @Input({ required: true }) brand!: BrandConfig;
  @Input({ required: true }) loginForm!: FormGroup;
  @Input() isLoading = false;
  @Input() errorMessage = '';
  @Input() infoMessage = '';
  @Input() showHelp = false;
  @Input() showPassword = false;

  @Output() submitRequested = new EventEmitter<void>();
  @Output() togglePasswordVisibility = new EventEmitter<void>();
  @Output() helpToggled = new EventEmitter<void>();

  step = 1;
  loginMethod: MobileLoginMethod = 'password';

  onSubmit(): void {
    if (this.step === 1) {
      this.goToCredentialStep();
      return;
    }

    this.submitRequested.emit();
  }

  goToCredentialStep(): void {
    if (!this.isControlValid('username')) {
      this.loginForm.get('username')?.markAsTouched();
      return;
    }

    this.step = 2;
  }

  goBack(): void {
    this.step = 1;
  }

  setLoginMethod(method: MobileLoginMethod): void {
    this.loginMethod = method;
  }

  isControlValid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.valid;
  }

  showControlError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }
}
