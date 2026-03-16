import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-settings',
  template: `
    <div class="settings-page">
      <h1>Settings</h1>
      
      <div class="settings-section">
        <h2>Business Information</h2>
        <form [formGroup]="businessForm">
          <div class="form-group">
            <label>Business Name</label>
            <input type="text" formControlName="name">
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" formControlName="phone">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email">
          </div>
          <div class="form-group">
            <label>Address</label>
            <textarea formControlName="address"></textarea>
          </div>
          <button type="submit" class="btn-save">Save Changes</button>
        </form>
      </div>

      <div class="settings-section">
        <h2>WhatsApp Settings</h2>
        <form [formGroup]="whatsappForm">
          <div class="form-group">
            <label>WhatsApp Number</label>
            <input type="text" formControlName="number">
          </div>
          <div class="form-group">
            <label>Default Message</label>
            <textarea formControlName="defaultMessage"></textarea>
          </div>
          <button type="submit" class="btn-save">Save Changes</button>
        </form>
      </div>

      <div class="settings-section">
        <h2>Email Settings</h2>
        <form [formGroup]="emailForm">
          <div class="form-group">
            <label>SMTP Host</label>
            <input type="text" formControlName="smtpHost">
          </div>
          <div class="form-group">
            <label>SMTP Port</label>
            <input type="number" formControlName="smtpPort">
          </div>
          <div class="form-group">
            <label>Username</label>
            <input type="text" formControlName="username">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" formControlName="password">
          </div>
          <button type="submit" class="btn-save">Save Changes</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .settings-page {
      padding: 2rem;
    }
    
    h1 {
      margin-bottom: 2rem;
    }
    
    .settings-section {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }
    
    .settings-section h2 {
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .btn-save {
      padding: 0.5rem 1.5rem;
      background: #1a73e8;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn-save:hover {
      background: #1557b0;
    }
  `]
})
export class SettingsComponent implements OnInit {
  businessForm: FormGroup;
  whatsappForm: FormGroup;
  emailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService
  ) {
    const business = this.configService.business;
    
    this.businessForm = this.fb.group({
      name: [business.name],
      phone: [business.phone],
      email: [business.email],
      address: [business.address]
    });

    this.whatsappForm = this.fb.group({
      number: [business.whatsapp],
      defaultMessage: ['Hello, I need AC service']
    });

    this.emailForm = this.fb.group({
      smtpHost: [''],
      smtpPort: [587],
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {}
}

