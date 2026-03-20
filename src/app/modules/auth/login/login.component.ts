import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BrandConfig } from '../../../core/models';
import { AuthService, LoginResponse } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <span class="login-chip">Secure Access</span>
          <h1>{{ brand.name }}</h1>
          <p>{{ brand.tagline }}</p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              formControlName="username"
              autocomplete="username"
              placeholder="Enter your username"
              [class.error]="loginForm.get('username')?.touched && loginForm.get('username')?.invalid">
            <span class="error-text" *ngIf="loginForm.get('username')?.touched && loginForm.get('username')?.errors?.['required']">
              Username is required
            </span>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <div class="password-field">
              <input 
                [type]="showPassword ? 'text' : 'password'"
                id="password" 
                formControlName="password"
                autocomplete="current-password"
                placeholder="Enter your password"
                [class.error]="loginForm.get('password')?.touched && loginForm.get('password')?.invalid">
              <button
                type="button"
                class="visibility-toggle"
                (click)="togglePasswordVisibility()"
                [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <span class="error-text" *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['required']">
              Password is required
            </span>
          </div>
          
          <div class="form-group remember-me">
            <label>
              <input type="checkbox" formControlName="rememberMe">
              Remember me
            </label>
          </div>
          
          <div class="error-message" *ngIf="errorMessage" aria-live="polite">
            {{ errorMessage }}
          </div>

          <div class="info-message" *ngIf="infoMessage" aria-live="polite">
            {{ infoMessage }}
          </div>
          
          <button type="submit" class="login-btn" [disabled]="isLoading || loginForm.invalid">
            <span *ngIf="!isLoading">Sign In</span>
            <span *ngIf="isLoading">Logging in...</span>
          </button>
        </form>
        
        <div class="login-footer">
          <button type="button" class="link-button" (click)="showHelp = !showHelp">
            Need help signing in?
          </button>
          <p class="help-text" *ngIf="showHelp">
            Contact your administrator to reset credentials or confirm your access permissions.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2.5rem 1rem;
    }
    
    .login-card {
      background: var(--surface);
      padding: 2rem;
      border-radius: 16px;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-strong);
      width: 100%;
      max-width: 420px;
      backdrop-filter: blur(10px);
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .login-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.9rem;
      padding: 0.35rem 0.7rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--primary);
      background: var(--surface-hero-soft);
    }
    
    .login-header h1 {
      font-size: 1.5rem;
      color: var(--text-dark);
      margin: 0 0 0.4rem;
    }

    .login-header p {
      color: var(--text-muted);
      margin: 0;
    }
    
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    
    .form-group label {
      font-weight: 600;
      color: var(--text-dark);
      font-size: 0.85rem;
    }
    
    .form-group input[type="text"],
    .form-group input[type="password"] {
      width: 100%;
      padding: 0.75rem 0.95rem;
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      font-size: 0.92rem;
      transition: border-color 0.2s, box-shadow 0.2s;
      color: var(--text-dark);
      background: var(--surface-solid);
    }

    .form-group input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: var(--shadow-focus);
    }

    .password-field {
      position: relative;
    }

    .password-field input {
      padding-right: 4.5rem;
    }

    .visibility-toggle {
      position: absolute;
      top: 50%;
      right: 0.5rem;
      transform: translateY(-50%);
      border: 1px solid var(--border-subtle);
      background: var(--surface-muted);
      color: var(--primary);
      border-radius: 999px;
      padding: 0.2rem 0.6rem;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
    }

    .visibility-toggle:hover {
      background: var(--surface-hero-soft);
    }

    .form-group input.error {
      border-color: var(--danger);
    }

    .error-text {
      color: var(--danger);
      font-size: 0.75rem;
    }
    
    .remember-me label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: normal !important;
      color: var(--text-body);
      font-size: 0.88rem;
    }

    .error-message {
      background: var(--danger-soft);
      color: var(--danger);
      padding: 0.75rem 0.85rem;
      border-radius: 8px;
      font-size: 0.88rem;
      text-align: center;
      border: 1px solid var(--danger-border);
    }

    .info-message {
      background: var(--success-soft);
      color: var(--success);
      padding: 0.75rem 0.85rem;
      border-radius: 8px;
      font-size: 0.88rem;
      text-align: center;
      border: 1px solid var(--success-border);
    }

    .login-btn {
      padding: 0.85rem 1rem;
      background: var(--surface-hero);
      color: var(--text-light);
      border: none;
      border-radius: 10px;
      font-size: 0.98rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .login-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    
    .login-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .login-footer {
      margin-top: 1.25rem;
      text-align: center;
    }
    
    .login-footer a {
      color: var(--primary);
      text-decoration: none;
      font-size: 14px;
    }

    .link-button {
      background: none;
      border: none;
      color: var(--primary);
      font-size: 0.86rem;
      cursor: pointer;
      padding: 0;
      font-weight: 600;
    }
    
    .link-button:hover {
      text-decoration: underline;
    }

    .help-text {
      margin: 0.75rem 0 0;
      color: var(--text-muted);
      font-size: 0.82rem;
      line-height: 1.5;
    }

    @media (max-width: 640px) {
      .login-container {
        padding: 1rem;
      }

      .login-card {
        padding: 1.25rem 1rem;
        border-radius: 12px;
      }

      .login-header h1 {
        font-size: 1.2rem;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  infoMessage = '';
  showHelp = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private configService: ConfigService
  ) {}

  get brand(): BrandConfig {
    return this.configService.brand;
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl(this.resolveRedirectUrl());
      return;
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password, rememberMe } = this.loginForm.getRawValue();
    const normalizedUsername = `${username ?? ''}`.trim();
    const normalizedPassword = `${password ?? ''}`;

    if (!normalizedUsername || !normalizedPassword.trim()) {
      this.errorMessage = 'Username and password are required.';
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.infoMessage = '';

    this.authService.login(normalizedUsername, normalizedPassword, rememberMe).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (_response: LoginResponse) => {
        this.router.navigateByUrl(this.resolveRedirectUrl());
      },
      error: (error) => {
        this.errorMessage = error.error?.message || error.message || 'Unable to sign in with those credentials.';
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private resolveRedirectUrl(): string {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    if (this.isValidReturnUrl(returnUrl)) {
      return returnUrl;
    }

    return this.authService.getDefaultRedirectUrl();
  }

  private isValidReturnUrl(returnUrl: string | null): returnUrl is string {
    if (!returnUrl || !returnUrl.startsWith('/') || returnUrl.startsWith('/auth')) {
      return false;
    }

    if (returnUrl === '/' || returnUrl === '') {
      return false;
    }

    return this.authService.canAccessRoute(returnUrl);
  }
}

