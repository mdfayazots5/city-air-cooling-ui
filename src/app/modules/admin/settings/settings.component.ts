import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EmailSettings, SystemSettings, WhatsAppSettings } from '../../../core/models';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';

type FormMessageType = 'success' | 'error' | '';

@Component({
  selector: 'app-settings',
  template: `
    <div class="settings-page">
      <div class="page-header">
        <div>
          <h1>Settings</h1>
          <p>Backend-driven business, WhatsApp, and email settings for the public and admin experience.</p>
        </div>
      </div>

      <div class="form-message error" *ngIf="loadError">
        {{ loadError }}
      </div>

      <div class="settings-section surface-card">
        <h2>Business Information</h2>
        <p class="section-description">These values power the public header, footer, contact points, and brand presentation.</p>
        <p class="read-only-note" *ngIf="!canUpdateSettings()">You have read-only access to settings.</p>

        <form [formGroup]="businessForm" (ngSubmit)="saveBusinessInfo()">
          <div class="form-group">
            <label>Business Name</label>
            <input type="text" formControlName="name" readonly>
            <small class="field-note">Brand is locked for production consistency.</small>
            <small class="field-error" *ngIf="businessForm.controls['name'].touched && businessForm.controls['name'].invalid">
              Business name is required.
            </small>
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input type="tel" formControlName="phone">
            <small class="field-error" *ngIf="businessForm.controls['phone'].touched && businessForm.controls['phone'].invalid">
              Phone number is required.
            </small>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email">
            <small class="field-error" *ngIf="businessForm.controls['email'].touched && businessForm.controls['email'].hasError('required')">
              Email is required.
            </small>
            <small class="field-error" *ngIf="businessForm.controls['email'].touched && businessForm.controls['email'].hasError('email')">
              Enter a valid email address.
            </small>
          </div>

          <div class="form-group">
            <label>Address</label>
            <textarea formControlName="address"></textarea>
            <small class="field-error" *ngIf="businessForm.controls['address'].touched && businessForm.controls['address'].invalid">
              Address is required.
            </small>
          </div>

          <div class="form-message" [class.success]="businessMessageType === 'success'" [class.error]="businessMessageType === 'error'" *ngIf="businessMessage">
            {{ businessMessage }}
          </div>

          <button *appHasPermission="'Settings'; appHasPermissionAction: 'Update'" type="submit" class="cta-primary" [disabled]="isSavingBusiness">
            {{ isSavingBusiness ? 'Saving...' : 'Save Business Info' }}
          </button>
        </form>
      </div>

      <div class="settings-section surface-card">
        <h2>WhatsApp Settings</h2>
        <p class="section-description">Keep sender and provider details aligned with the live support channel.</p>

        <form [formGroup]="whatsappForm" (ngSubmit)="saveWhatsAppSettings()">
          <div class="form-group">
            <label>Provider Name</label>
            <input type="text" formControlName="providerName">
          </div>

          <div class="form-group">
            <label>API URL</label>
            <input type="text" formControlName="apiUrl">
          </div>

          <div class="form-group">
            <label>WhatsApp Number</label>
            <input type="text" formControlName="senderNumber">
            <small class="field-error" *ngIf="whatsappForm.controls['senderNumber'].touched && whatsappForm.controls['senderNumber'].invalid">
              WhatsApp number is required.
            </small>
          </div>

          <div class="form-message" [class.success]="whatsAppMessageType === 'success'" [class.error]="whatsAppMessageType === 'error'" *ngIf="whatsAppMessage">
            {{ whatsAppMessage }}
          </div>

          <button *appHasPermission="'Settings'; appHasPermissionAction: 'Update'" type="submit" class="cta-primary" [disabled]="isSavingWhatsApp">
            {{ isSavingWhatsApp ? 'Saving...' : 'Save WhatsApp Settings' }}
          </button>
        </form>
      </div>

      <div class="settings-section surface-card">
        <h2>Email Settings</h2>
        <p class="section-description">SMTP settings are read from and saved to the backend settings API.</p>

        <form [formGroup]="emailForm" (ngSubmit)="saveEmailSettings()">
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

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" formControlName="enableSsl">
              Enable SSL
            </label>
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" formControlName="password" placeholder="Leave blank to keep the existing password">
          </div>

          <div class="form-message" [class.success]="emailMessageType === 'success'" [class.error]="emailMessageType === 'error'" *ngIf="emailMessage">
            {{ emailMessage }}
          </div>

          <button *appHasPermission="'Settings'; appHasPermissionAction: 'Update'" type="submit" class="cta-primary" [disabled]="isSavingEmail">
            {{ isSavingEmail ? 'Saving...' : 'Save Email Settings' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .settings-page {
      padding: 2rem;
    }

    .page-header {
      margin-bottom: 1.5rem;
    }

    .page-header h1 {
      margin: 0 0 0.35rem;
    }

    .page-header p,
    .section-description {
      color: var(--text-muted);
    }

    .settings-section {
      margin-bottom: 1.5rem;
      padding: 1.5rem;
    }

    .settings-section h2 {
      margin-bottom: 0.45rem;
    }

    .section-description {
      margin-bottom: 1rem;
    }

    .field-note {
      color: var(--text-muted);
      display: block;
      margin-top: 0.35rem;
    }

    .read-only-note {
      background: var(--warning-soft);
      border: 1px solid var(--warning-border);
      border-radius: var(--radius-sm);
      color: var(--warning-text);
      margin-bottom: 1rem;
      padding: 0.75rem 0.9rem;
    }

    .form-message {
      border-radius: var(--radius-sm);
      margin-bottom: 1rem;
      padding: 0.85rem 1rem;
    }

    .form-message.success {
      background: var(--success-soft);
      border: 1px solid var(--success-border);
      color: var(--success);
    }

    .form-message.error {
      background: var(--danger-soft);
      border: 1px solid var(--danger-border);
      color: var(--danger);
    }

    .checkbox-group {
      align-items: center;
      display: flex;
      min-height: 44px;
    }

    .checkbox-label {
      align-items: center;
      color: var(--text-body);
      display: inline-flex;
      gap: 0.6rem;
      margin: 0;
    }

    .checkbox-label input {
      min-height: auto;
      width: auto;
    }

    .cta-primary[disabled] {
      cursor: not-allowed;
      opacity: 0.7;
    }

    @media (max-width: 768px) {
      .settings-page,
      .settings-section {
        padding: 1rem;
      }
    }
  `]
})
export class SettingsComponent implements OnInit {
  businessForm: FormGroup;
  whatsappForm: FormGroup;
  emailForm: FormGroup;
  businessMessage = '';
  businessMessageType: FormMessageType = '';
  whatsAppMessage = '';
  whatsAppMessageType: FormMessageType = '';
  emailMessage = '';
  emailMessageType: FormMessageType = '';
  loadError = '';
  isSavingBusiness = false;
  isSavingWhatsApp = false;
  isSavingEmail = false;
  private currentSystemSettings: SystemSettings | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private configService: ConfigService,
    private apiService: ApiService
  ) {
    const business = this.configService.business;

    this.businessForm = this.fb.group({
      name: [business.name, Validators.required],
      phone: [business.phone, Validators.required],
      email: [business.email, [Validators.required, Validators.email]],
      address: [business.address, Validators.required]
    });

    this.whatsappForm = this.fb.group({
      providerName: ['Primary'],
      apiUrl: [''],
      senderNumber: [business.whatsapp, Validators.required]
    });

    this.emailForm = this.fb.group({
      smtpHost: [''],
      smtpPort: [587],
      username: [''],
      enableSsl: [true],
      password: ['']
    });
  }

  ngOnInit(): void {
    forkJoin({
      system: this.apiService.getSystemSettings(),
      whatsapp: this.apiService.getWhatsAppSettings(),
      email: this.apiService.getEmailSettings()
    }).subscribe({
      next: ({ system, whatsapp, email }) => {
        this.currentSystemSettings = system;
        this.businessForm.patchValue({
          name: system.businessName,
          phone: system.businessPhone,
          email: system.businessEmail,
          address: system.businessAddress
        });
        this.whatsappForm.patchValue({
          providerName: whatsapp.providerName || 'Primary',
          apiUrl: whatsapp.apiUrl,
          senderNumber: whatsapp.senderNumber
        });
        this.emailForm.patchValue({
          smtpHost: email.smtpHost,
          smtpPort: email.smtpPort,
          username: email.username,
          enableSsl: email.enableSsl,
          password: ''
        });
      },
      error: (error) => {
        this.loadError = error.error?.message || error.message || 'Unable to load settings from the backend.';
      }
    });
  }

  saveBusinessInfo(): void {
    if (!this.canUpdateSettings()) {
      this.businessMessage = 'You do not have permission to update settings.';
      this.businessMessageType = 'error';
      return;
    }

    if (this.businessForm.invalid) {
      this.businessForm.markAllAsTouched();
      this.businessMessage = 'Please complete all required business fields before saving.';
      this.businessMessageType = 'error';
      return;
    }

    this.isSavingBusiness = true;
    this.businessMessage = '';

    const formValue = this.businessForm.getRawValue();
    const request: SystemSettings = {
      businessName: formValue.name,
      businessPhone: formValue.phone,
      businessEmail: formValue.email,
      businessAddress: formValue.address,
      invoicePrefix: this.currentSystemSettings?.invoicePrefix || 'INV',
      requestPrefix: this.currentSystemSettings?.requestPrefix || 'SR'
    };

    this.apiService.updateSystemSettings(request).subscribe({
      next: (response) => {
        this.currentSystemSettings = response;
        this.configService.updateBusiness({
          name: response.businessName,
          phone: response.businessPhone,
          email: response.businessEmail,
          address: response.businessAddress
        });
        this.businessMessage = 'Business information saved successfully.';
        this.businessMessageType = 'success';
        this.isSavingBusiness = false;
      },
      error: (error) => {
        this.businessMessage = error.error?.message || error.message || 'Unable to save business information.';
        this.businessMessageType = 'error';
        this.isSavingBusiness = false;
      }
    });
  }

  saveWhatsAppSettings(): void {
    if (!this.canUpdateSettings()) {
      this.whatsAppMessage = 'You do not have permission to update settings.';
      this.whatsAppMessageType = 'error';
      return;
    }

    if (this.whatsappForm.invalid) {
      this.whatsappForm.markAllAsTouched();
      this.whatsAppMessage = 'Please complete the WhatsApp settings before saving.';
      this.whatsAppMessageType = 'error';
      return;
    }

    this.isSavingWhatsApp = true;
    this.whatsAppMessage = '';

    const formValue = this.whatsappForm.getRawValue();
    this.apiService.updateWhatsAppSettings({
      providerName: formValue.providerName || 'Primary',
      apiUrl: formValue.apiUrl || '',
      senderNumber: formValue.senderNumber || ''
    }).subscribe({
      next: (response: WhatsAppSettings) => {
        this.configService.updateBusiness({ whatsapp: response.senderNumber });
        this.whatsAppMessage = 'WhatsApp settings saved successfully.';
        this.whatsAppMessageType = 'success';
        this.isSavingWhatsApp = false;
      },
      error: (error) => {
        this.whatsAppMessage = error.error?.message || error.message || 'Unable to save WhatsApp settings.';
        this.whatsAppMessageType = 'error';
        this.isSavingWhatsApp = false;
      }
    });
  }

  saveEmailSettings(): void {
    if (!this.canUpdateSettings()) {
      this.emailMessage = 'You do not have permission to update settings.';
      this.emailMessageType = 'error';
      return;
    }

    this.isSavingEmail = true;
    this.emailMessage = '';

    const formValue = this.emailForm.getRawValue();
    this.apiService.updateEmailSettings({
      smtpHost: formValue.smtpHost || '',
      smtpPort: Number(formValue.smtpPort || 0),
      username: formValue.username || '',
      password: formValue.password || '',
      enableSsl: !!formValue.enableSsl
    }).subscribe({
      next: (_response: EmailSettings) => {
        this.emailForm.patchValue({ password: '' }, { emitEvent: false });
        this.emailMessage = 'Email settings saved successfully.';
        this.emailMessageType = 'success';
        this.isSavingEmail = false;
      },
      error: (error) => {
        this.emailMessage = error.error?.message || error.message || 'Unable to save email settings.';
        this.emailMessageType = 'error';
        this.isSavingEmail = false;
      }
    });
  }

  canUpdateSettings(): boolean {
    return this.authService.hasPermission('Settings', 'Update');
  }
}
