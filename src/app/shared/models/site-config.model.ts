// Site Configuration Model
// Migrated from site-config.js

export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  established: string;
  experience: string;
}

export interface ServiceArea {
  name: string;
  keyword: string;
}

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  features: string[];
  price: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface WorkingHours {
  open: string;
  close: string;
  is24Hours: boolean;
}

export interface SocialLinks {
  whatsapp: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface SeoConfig {
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
  locale: string;
  currency: string;
}

export interface AnalyticsConfig {
  googleAnalyticsId: string;
  facebookPixelId: string;
  whatsappClickTracking: boolean;
  callTracking: boolean;
}

export interface SiteConfig {
  business: BusinessInfo;
  serviceAreas: ServiceArea[];
  services: Service[];
  brands: string[];
  seo: SeoConfig;
  social: SocialLinks;
  workingHours: {
    monday: WorkingHours;
    tuesday: WorkingHours;
    wednesday: WorkingHours;
    thursday: WorkingHours;
    friday: WorkingHours;
    saturday: WorkingHours;
    sunday: WorkingHours;
    emergency24x7: boolean;
  };
  features: Feature[];
  testimonials: Testimonial[];
  faqs: Faq[];
  analytics: AnalyticsConfig;
  metadata: {
    version: string;
    lastUpdated: string;
    author: string;
    copyright: string;
  };
}

