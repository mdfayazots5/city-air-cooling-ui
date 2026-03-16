import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>City Air Cooling Services</h1>
          <p>Admin Login</p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              formControlName="username"
              placeholder="Enter your username"
              [class.error]="loginForm.get('username')?.touched && loginForm.get('username')?.invalid">
            <span class="error-text" *ngIf="loginForm.get('username')?.touched && loginForm.get('username')?.errors?.['required']">
              Username is required
            </span>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password"
              placeholder="Enter your password"
              [class.error]="loginForm.get('password')?.touched && loginForm.get('password')?.invalid">
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
          
          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
          
          <button type="submit" class="login-btn" [disabled]="isLoading || loginForm.invalid">
            <span *ngIf="!isLoading">Login</span>
            <span *ngIf="isLoading">Logging in...</span>
          </button>
        </form>
        
        <div class="login-footer">
          <a href="#">Forgot Password?</a>
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
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    }
    
    .login-card {
      background: #fff;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 400px;
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .login-header h1 {
      font-size: 24px;
      color: #1a1a2e;
      margin: 0 0 8px;
    }
    
    .login-header p {
      color: #666;
      margin: 0;
    }
    
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .form-group label {
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }
    
    .form-group input[type="text"],
    .form-group input[type="password"] {
      padding: 12px 16px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s;
    }
    
    .form-group input:focus {
      outline: none;
      border-color: #00d4ff;
    }
    
    .form-group input.error {
      border-color: #dc3545;
    }
    
    .error-text {
      color: #dc3545;
      font-size: 12px;
    }
    
    .remember-me label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: normal !important;
    }
    
    .error-message {
      background: #f8d7da;
      color: #721c24;
      padding: 12px;
      border-radius: 6px;
      font-size: 14px;
      text-align: center;
    }
    
    .login-btn {
      padding: 14px;
      background: #00d4ff;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    .login-btn:hover:not(:disabled) {
      background: #00b8e6;
    }
    
    .login-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .login-footer {
      margin-top: 20px;
      text-align: center;
    }
    
    .login-footer a {
      color: #00d4ff;
      text-decoration: none;
      font-size: 14px;
    }
    
    .login-footer a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Invalid username or password';
      }
    });
  }
}

