import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import {
  AnalyticsConfig,
  BrandConfig,
  BusinessInfo,
  Faq,
  Feature,
  Service,
  ServiceArea,
  SiteConfig,
  SiteMetadata,
  SocialLinks,
  Testimonial,
  WorkingHours,
  WorkingHoursSchedule
} from '../models';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';

const EMPTY_WORKING_HOURS: WorkingHours = {
  open: '',
  close: '',
  is24Hours: false
};

function createEmptyWorkingHours(): WorkingHoursSchedule {
  return {
    monday: { ...EMPTY_WORKING_HOURS },
    tuesday: { ...EMPTY_WORKING_HOURS },
    wednesday: { ...EMPTY_WORKING_HOURS },
    thursday: { ...EMPTY_WORKING_HOURS },
    friday: { ...EMPTY_WORKING_HOURS },
    saturday: { ...EMPTY_WORKING_HOURS },
    sunday: { ...EMPTY_WORKING_HOURS },
    emergency24x7: false
  };
}

function createEmptySiteConfig(): SiteConfig {
  const brand: BrandConfig = {
    name: '',
    tagline: '',
    whatsAppMessage: 'Hello, I need to book a service.'
  };

  const business: BusinessInfo = {
    name: brand.name,
    tagline: brand.tagline,
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: environment.siteUrl,
    address: '',
    established: '',
    experience: ''
  };

  const social: SocialLinks = {
    whatsapp: '',
    facebook: '',
    instagram: '',
    youtube: ''
  };

  const metadata: SiteMetadata = {
    version: '1.0.0',
    lastUpdated: '',
    author: '',
    copyright: ''
  };

  const analytics: AnalyticsConfig = {
    googleAnalyticsId: '',
    facebookPixelId: '',
    whatsappClickTracking: true,
    callTracking: true
  };

  return {
    brand,
    business,
    serviceAreas: [],
    services: [],
    brands: [],
    seo: {
      siteUrl: environment.siteUrl,
      defaultTitle: 'AC Service Platform',
      defaultDescription: 'Book service through the live backend-driven experience.',
      keywords: [],
      ogImage: '',
      twitterHandle: '',
      locale: 'en_IN',
      currency: 'INR'
    },
    social,
    workingHours: createEmptyWorkingHours(),
    features: [],
    testimonials: [],
    faqs: [],
    analytics,
    metadata
  };
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: SiteConfig = createEmptySiteConfig();
  private readonly configSubject = new BehaviorSubject<SiteConfig>(this.config);
  private readonly selectedCitySubject = new BehaviorSubject<string>('');
  private readonly configLoadErrorSubject = new BehaviorSubject<string>('');
  readonly config$ = this.configSubject.asObservable();
  readonly selectedCity$ = this.selectedCitySubject.asObservable();
  readonly configLoadError$ = this.configLoadErrorSubject.asObservable();

  constructor(private apiService: ApiService) {}

  async loadConfig(): Promise<void> {
    try {
      const loadedConfig = await firstValueFrom(this.apiService.getPublicSiteConfig());
      this.setConfig(loadedConfig);
      this.configLoadErrorSubject.next('');
    } catch (_error) {
      this.configLoadErrorSubject.next('We could not load the live site configuration.');
      this.configSubject.next(this.config);
      this.selectedCitySubject.next(this.availableCities[0] || '');
    }
  }

  get brand(): BrandConfig {
    return this.config.brand;
  }

  get business(): BusinessInfo {
    return this.config.business;
  }

  get services(): Service[] {
    return this.config.services;
  }

  get brands(): string[] {
    return this.config.brands;
  }

  get serviceAreas(): ServiceArea[] {
    return this.config.serviceAreas;
  }

  get availableCities(): string[] {
    const cities = this.config.serviceAreas
      .map(area => `${area.name ?? ''}`.trim())
      .filter(Boolean);

    if (cities.length === 0 && this.config.business.address) {
      const derivedCity = this.config.business.address
        .split(',')
        .map(part => part.trim())
        .filter(Boolean)
        .slice(-2, -1)[0];

      if (derivedCity) {
        cities.push(derivedCity);
      }
    }

    return Array.from(new Set(cities)).sort((left, right) => left.localeCompare(right));
  }

  get selectedCity(): string {
    return this.selectedCitySubject.value || this.availableCities[0] || '';
  }

  get features(): Feature[] {
    return this.config.features;
  }

  get testimonials(): Testimonial[] {
    return this.config.testimonials;
  }

  get faqs(): Faq[] {
    return this.config.faqs;
  }

  getServiceById(id: string): Service | undefined {
    return this.config.services.find(service => service.id === id);
  }

  getWhatsAppUrl(message?: string): string {
    const resolvedMessage = message || this.config.brand.whatsAppMessage;
    const digits = `${this.config.business.whatsapp || this.config.business.phone}`.replace(/\D/g, '');
    return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(resolvedMessage)}` : '#';
  }

  getCallUrl(): string {
    const phone = `${this.config.business.phone}`.trim();
    return phone ? `tel:${phone}` : '#';
  }

  updateBusiness(business: Partial<BusinessInfo>): void {
    const nextBusiness = {
      ...this.config.business,
      ...business
    };

    this.config = {
      ...this.config,
      brand: {
        ...this.config.brand,
        name: nextBusiness.name || this.config.brand.name,
        tagline: nextBusiness.tagline || this.config.brand.tagline
      },
      business: nextBusiness,
      social: {
        ...this.config.social,
        whatsapp: nextBusiness.whatsapp ? `https://wa.me/${nextBusiness.whatsapp.replace(/\D/g, '')}` : this.config.social.whatsapp
      },
      metadata: {
        ...this.config.metadata,
        lastUpdated: new Date().toISOString().slice(0, 10)
      }
    };

    this.configSubject.next(this.config);
  }

  setSelectedCity(city: string): void {
    const normalizedCity = `${city ?? ''}`.trim();
    const nextCity = normalizedCity || this.availableCities[0] || '';

    this.selectedCitySubject.next(nextCity);
  }

  get configLoadError(): string {
    return this.configLoadErrorSubject.value;
  }

  private setConfig(config: SiteConfig): void {
    const fallback = createEmptySiteConfig();
    const normalizedSiteUrl = `${config?.seo?.siteUrl || environment.siteUrl || fallback.seo.siteUrl}`.trim();
    const normalizedBusiness = {
      ...fallback.business,
      ...config?.business,
      tagline: config?.business?.tagline || config?.brand?.tagline || fallback.business.tagline,
      website: config?.business?.website || normalizedSiteUrl || fallback.business.website
    };

    this.config = {
      ...fallback,
      ...config,
      brand: {
        ...fallback.brand,
        ...config?.brand,
        name: config?.brand?.name || normalizedBusiness.name || fallback.brand.name,
        tagline: config?.brand?.tagline || normalizedBusiness.tagline || fallback.brand.tagline
      },
      business: {
        ...normalizedBusiness,
        whatsapp: config?.business?.whatsapp || normalizedBusiness.phone.replace(/\D/g, '')
      },
      serviceAreas: config?.serviceAreas ?? fallback.serviceAreas,
      services: config?.services ?? fallback.services,
      brands: config?.brands ?? fallback.brands,
      seo: {
        ...fallback.seo,
        ...config?.seo,
        siteUrl: normalizedSiteUrl,
        defaultTitle: config?.seo?.defaultTitle || `${config?.brand?.name || normalizedBusiness.name || fallback.brand.name} | ${config?.brand?.tagline || normalizedBusiness.tagline || fallback.brand.tagline}`,
        defaultDescription: config?.seo?.defaultDescription || normalizedBusiness.description || fallback.seo.defaultDescription
      },
      social: {
        ...fallback.social,
        ...config?.social
      },
      workingHours: {
        ...fallback.workingHours,
        ...config?.workingHours
      },
      features: config?.features ?? fallback.features,
      testimonials: config?.testimonials ?? fallback.testimonials,
      faqs: config?.faqs ?? fallback.faqs,
      analytics: {
        ...fallback.analytics,
        ...config?.analytics
      },
      metadata: {
        ...fallback.metadata,
        ...config?.metadata
      }
    };

    this.configSubject.next(this.config);
    const resolvedCity = this.selectedCitySubject.value && this.availableCities.includes(this.selectedCitySubject.value)
      ? this.selectedCitySubject.value
      : (this.availableCities[0] || '');

    this.selectedCitySubject.next(resolvedCity);
  }
}
