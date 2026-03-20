export interface BrandConfig {
  name: string;
  tagline: string;
  whatsAppMessage: string;
}

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

export interface WorkingHoursSchedule {
  monday: WorkingHours;
  tuesday: WorkingHours;
  wednesday: WorkingHours;
  thursday: WorkingHours;
  friday: WorkingHours;
  saturday: WorkingHours;
  sunday: WorkingHours;
  emergency24x7: boolean;
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

export interface SiteMetadata {
  version: string;
  lastUpdated: string;
  author: string;
  copyright: string;
}

export interface SiteConfig {
  brand: BrandConfig;
  business: BusinessInfo;
  serviceAreas: ServiceArea[];
  services: Service[];
  brands: string[];
  seo: SeoConfig;
  social: SocialLinks;
  workingHours: WorkingHoursSchedule;
  features: Feature[];
  testimonials: Testimonial[];
  faqs: Faq[];
  analytics: AnalyticsConfig;
  metadata: SiteMetadata;
}

export interface SystemSettings {
  businessName: string;
  businessPhone: string;
  businessEmail: string;
  businessAddress: string;
  invoicePrefix: string;
  requestPrefix: string;
}

export interface WhatsAppSettings {
  providerName: string;
  apiUrl: string;
  senderNumber: string;
  isActive: boolean;
}

export interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  username: string;
  enableSsl: boolean;
  fromEmail: string;
  fromName: string;
  isActive: boolean;
}

