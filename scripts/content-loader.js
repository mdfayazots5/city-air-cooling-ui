/**
 * ============================================================================
 * CONTENT LOADER - Configuration-Driven UI Engine
 * City Air Cooling Services
 * ============================================================================
 * 
 * This module dynamically loads ALL content from site-config.js and injects
 * it into the HTML pages, making the entire site configuration-driven.
 * 
 * Features:
 * - Dynamic content injection from config
 * - Site branding from config
 * - Navigation from config
 * - Contact info from config
 * - Service areas from config
 * - Features/testimonials/FAQs from config
 * - Complete page content rendering
 * 
 * @version 1.0.0
 */

(function() {
    'use strict';

    // ========================================================================
    // CONTENT LOADER CLASS
    // ========================================================================

    class ContentLoader {
        constructor() {
            this.config = null;
            this.designConfig = null;
            this.isLoaded = false;
            this.loadAttempts = 0;
            this.maxAttempts = 10;
        }

        /**
         * Initialize the content loader
         */
        init() {
            // Wait for config to be available
            if (window.siteConfig !== undefined && window.designConfig !== undefined) {
                this.config = window.siteConfig;
                this.designConfig = window.designConfig;
                this.loadContent();
            } else {
                // Wait and retry
                this.loadAttempts++;
                if (this.loadAttempts < this.maxAttempts) {
                    setTimeout(() => this.init(), 100);
                } else {
                    console.warn('⚠️ Content Loader: Config not available after multiple attempts');
                    // Load with minimal defaults
                    this.loadWithDefaults();
                }
            }
        }

        /**
         * Load with default values if config unavailable
         */
        loadWithDefaults() {
            this.config = {
                business: {
                    name: 'City Air Cooling Services',
                    phone: '+919999999999',
                    email: 'info@cityaircooling.com',
                    address: 'Hyderabad, Telangana, India',
                    tagline: 'Your Trusted AC Service Partner in Hyderabad'
                },
                services: [],
                serviceAreas: [],
                features: [],
                testimonials: [],
                faqs: [],
                social: {}
            };
            this.loadContent();
        }

        /**
         * Load all content from config
         */
        loadContent() {
            if (this.isLoaded) return;
            
            // First, replace all placeholders in the document
            this.replacePlaceholders();
            
            // Apply SEO first
            this.loadSEO();
            
            // Load all content sections
            this.loadBusinessInfo();
            this.loadNavigation();
            this.loadHero();
            this.loadServices();
            this.loadFeatures();
            this.loadTestimonials();
            this.loadFAQs();
            this.loadServiceAreas();
            this.loadContactInfo();
            this.loadFooter();
            this.loadPageContent();
            
            this.isLoaded = true;
            console.log('📄 Content Loader: All content loaded from config');
        }

        /**
         * Replace all {{PLACEHOLDER}} values in the document
         */
        replacePlaceholders() {
            if (!this.config?.business) return;
            
            const business = this.config.business;
            const social = this.config.social || {};
            const seo = this.config.seo || {};
            
            // Replace in all text nodes
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const placeholders = {
                '{{SITE_NAME}}': business.name || 'City Air Cooling Services',
                '{{PHONE}}': business.phone || '',
                '{{EMAIL}}': business.email || '',
                '{{CURRENT_YEAR}}': new Date().getFullYear().toString(),
                '{{WHATSAPP_LINK}}': social.whatsapp || '',
                '{{PAGE_TITLE}}': document.title.split('|')[0].trim() || 'Home'
            };
            
            let node;
            while (node = walker.nextNode()) {
                let text = node.textContent;
                let hasChanges = false;
                
                for (const [placeholder, value] of Object.entries(placeholders)) {
                    if (text.includes(placeholder)) {
                        text = text.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
                        hasChanges = true;
                    }
                }
                
                if (hasChanges) {
                    node.textContent = text;
                }
            }
            
            // Replace in href attributes
            document.querySelectorAll('a[href*="{{PHONE}}"]').forEach(el => {
                if (business.phone) {
                    el.href = `tel:${business.phone.replace(/\D/g, '')}`;
                }
            });
            
            document.querySelectorAll('a[href*="{{EMAIL}}"]').forEach(el => {
                if (business.email) {
                    el.href = `mailto:${business.email}`;
                }
            });
            
            document.querySelectorAll('a[href*="{{WHATSAPP_LINK}}"]').forEach(el => {
                if (social.whatsapp) {
                    el.href = social.whatsapp;
                }
            });
            
            // Handle data-config attributes - inject config values
            this.applyDataConfigAttributes();
            
            // Update page title
            this.updatePageTitle();
        }

        /**
         * Apply values from data-config attributes
         */
        applyDataConfigAttributes() {
            if (!this.config) return;
            
            // Get all elements with data-config attribute
            const configElements = document.querySelectorAll('[data-config]');
            
            configElements.forEach(el => {
                const configPath = el.dataset.config;
                const value = this.getNestedValue(this.config, configPath);
                
                if (value !== undefined && value !== null) {
                    // For elements with href, update href
                    if (el.tagName === 'A') {
                        if (configPath.includes('phone')) {
                            el.href = `tel:${value.replace(/\D/g, '')}`;
                        } else if (configPath.includes('email')) {
                            el.href = `mailto:${value}`;
                        } else if (configPath.includes('whatsapp')) {
                            el.href = value;
                        }
                    }
                    
                    // Update text content if not already set
                    if (!el.textContent || el.textContent.includes('{{')) {
                        el.textContent = value;
                    }
                }
            });
        }

        /**
         * Get nested value from object using dot notation
         */
        getNestedValue(obj, path) {
            return path.split('.').reduce((acc, part) => acc && acc[part], obj);
        }

        /**
         * Update page title with site name
         */
        updatePageTitle() {
            if (!this.config?.business) return;
            
            const titleEl = document.querySelector('title');
            if (titleEl) {
                const currentTitle = titleEl.textContent;
                if (currentTitle.includes('{{SITE_NAME}}')) {
                    titleEl.textContent = currentTitle.replace('{{SITE_NAME}}', this.config.business.name);
                }
            }
        }

        // ========================================================================
        // SEO
        // ========================================================================

        /**
         * Load SEO metadata
         */
        loadSEO() {
            if (!this.config?.seo) return;

            // Update page title
            const titleEl = document.querySelector('title');
            if (titleEl && this.config.seo.defaultTitle) {
                titleEl.textContent = this.config.seo.defaultTitle;
            }

            // Update meta description
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            if (metaDesc && this.config.seo.defaultDescription) {
                metaDesc.content = this.config.seo.defaultDescription;
            }

            // Update Open Graph tags
            this.updateMetaTag('og:title', this.config.seo.defaultTitle);
            this.updateMetaTag('og:description', this.config.seo.defaultDescription);
            this.updateMetaTag('og:url', this.config.seo.siteUrl);
            this.updateMetaTag('og:locale', this.config.seo.locale || 'en_IN');
            
            // Update Twitter tags
            this.updateMetaTag('twitter:title', this.config.seo.defaultTitle);
            this.updateMetaTag('twitter:description', this.config.seo.defaultDescription);
            this.updateMetaTag('twitter:site', this.config.seo.twitterHandle);
        }

        /**
         * Helper to update or create meta tags
         */
        updateMetaTag(name, content) {
            if (!content) return;
            
            let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
            
            if (!meta) {
                meta = document.createElement('meta');
                if (name.startsWith('og:')) {
                    meta.property = name;
                } else {
                    meta.name = name;
                }
                document.head.appendChild(meta);
            }
            
            meta.content = content;
        }

        // ========================================================================
        // BUSINESS INFO
        // ========================================================================

        /**
         * Load business information
         */
        loadBusinessInfo() {
            if (!this.config?.business) return;

            // Update business name in header
            const businessNameEl = document.querySelector('[data-config="business.name"]');
            if (businessNameEl) {
                businessNameEl.textContent = this.config.business.name;
            }

            // Update logo text
            const logoText = document.querySelectorAll('.logo-text, .sidebar-logo-text, .login-logo-text');
            logoText.forEach(el => {
                el.textContent = this.config.business.name;
            });

            // Update any elements with business name
            document.querySelectorAll('[data-business-name]').forEach(el => {
                el.textContent = this.config.business.name;
            });
        }

        // ========================================================================
        // NAVIGATION
        // ========================================================================

        /**
         * Load navigation from config
         */
        loadNavigation() {
            const navContainer = document.querySelector('#main-nav ul, .navigation ul');
            if (!navContainer) return;

            const navItems = this.getNavigationItems();

            let navHTML = '';
            navItems.forEach(item => {
                if (item.cta) {
                    navHTML += `<li><a href="${item.href}" class="btn-primary btn-pulse">${item.name}</a></li>`;
                } else {
                    navHTML += `<li><a href="${item.href}">${item.name}</a></li>`;
                }
            });

            navContainer.innerHTML = navHTML;
        }

        /**
         * Get navigation items (can be customized per page)
         */
        getNavigationItems() {
            // Check if there's a custom nav for this page
            const pageName = this.getCurrentPageName();
            const customNav = this.config?.navigation?.[pageName];
            
            if (customNav && Array.isArray(customNav)) {
                return customNav;
            }

            // Default navigation
            return [
                { name: 'Home', href: 'index.html' },
                { name: 'Services', href: 'services.html' },
                { name: 'About', href: 'about.html' },
                { name: 'Service Areas', href: 'service-areas.html' },
                { name: 'Contact', href: 'contact.html' },
                { name: 'Book Service', href: 'book-service.html', cta: true }
            ];
        }

        /**
         * Get current page name
         */
        getCurrentPageName() {
            const path = window.location.pathname;
            const page = path.split('/').pop().replace('.html', '') || 'index';
            return page;
        }

        // ========================================================================
        // HERO SECTION
        // ========================================================================

        /**
         * Load hero section content
         */
        loadHero() {
            const heroContainer = document.querySelector('.hero');
            if (!heroContainer) return;

            const business = this.config.business || {};
            const social = this.config.social || {};

            // Update hero content
            const heroTitle = heroContainer.querySelector('h1');
            if (heroTitle && !heroTitle.dataset.static) {
                heroTitle.textContent = business.tagline || 'AC Not Cooling?';
            }

            const heroSubtitle = heroContainer.querySelector('h2');
            if (heroSubtitle && !heroSubtitle.dataset.static) {
                heroSubtitle.textContent = 'Fast AC Repair in Hyderabad';
            }

            const heroDesc = heroContainer.querySelector('p');
            if (heroDesc && !heroDesc.dataset.static) {
                heroDesc.textContent = 'Same Day Service by Experienced Technicians';
            }

            // Update button links
            const callBtn = heroContainer.querySelector('a[href^="tel:"]');
            if (callBtn && business.phone) {
                callBtn.href = `tel:${business.phone}`;
            }

            const waBtn = heroContainer.querySelector('.btn-whatsapp, a[href^="https://wa.me"]');
            if (waBtn && social.whatsapp) {
                waBtn.href = social.whatsapp;
            }
        }

        // ========================================================================
        // SERVICES
        // ========================================================================

        /**
         * Load services from config
         */
        loadServices() {
            const servicesContainer = document.querySelector('.services-grid, .services-list, [data-content="services"]');
            if (!servicesContainer || !this.config?.services) return;

            if (this.config.services.length === 0) {
                servicesContainer.innerHTML = '<p>No services available</p>';
                return;
            }

            let servicesHTML = '';
            this.config.services.forEach((service, index) => {
                servicesHTML += this.renderServiceCard(service, index);
            });

            // Check if container is a grid or needs grid wrapper
            if (servicesContainer.classList.contains('services-grid')) {
                servicesContainer.innerHTML = servicesHTML;
            } else {
                servicesContainer.innerHTML = `<div class="services-grid">${servicesHTML}</div>`;
            }
        }

        /**
         * Render a service card
         */
        renderServiceCard(service, index) {
            const icon = service.icon || this.getServiceIcon(service.id);
            
            return `
                <div class="service-card animate-on-scroll" data-index="${index}">
                    <div class="service-card-icon">${icon}</div>
                    <h3 class="service-card-title">${service.name}</h3>
                    <p class="service-card-description">${service.shortDescription || ''}</p>
                    ${service.features ? `<ul class="service-features">${service.features.map(f => `<li>${f}</li>`).join('')}</ul>` : ''}
                    ${service.price ? `<span class="service-price">${service.price}</span>` : ''}
                </div>
            `;
        }

        /**
         * Get service icon based on service ID
         */
        getServiceIcon(serviceId) {
            const icons = {
                repair: '🔧',
                installation: '⚙️',
                maintenance: '🛠️',
                gas: '❄️',
                amc: '📋'
            };
            return icons[serviceId] || '🔧';
        }

        // ========================================================================
        // FEATURES
        // ========================================================================

        /**
         * Load features/trust badges from config
         */
        loadFeatures() {
            const featuresContainer = document.querySelector('.features-grid, [data-content="features"]');
            if (!featuresContainer || !this.config?.features) return;

            if (this.config.features.length === 0) {
                // Use default features
                return this.loadDefaultFeatures(featuresContainer);
            }

            let featuresHTML = '';
            this.config.features.forEach((feature, index) => {
                featuresHTML += this.renderFeatureCard(feature, index);
            });

            if (featuresContainer.classList.contains('features-grid')) {
                featuresContainer.innerHTML = featuresHTML;
            } else {
                featuresContainer.innerHTML = `<div class="features-grid">${featuresHTML}</div>`;
            }
        }

        /**
         * Load default features if not in config
         */
        loadDefaultFeatures(container) {
            const defaults = [
                { icon: '🔧', title: 'Experienced Technicians', description: '10+ years of experience' },
                { icon: '⚡', title: 'Same Day Service', description: 'Quick response and fast turnaround' },
                { icon: '💰', title: 'Affordable Pricing', description: 'Transparent and competitive rates' },
                { icon: '✅', title: 'Genuine Parts', description: 'Only authentic spare parts used' }
            ];

            let html = '';
            defaults.forEach((feature, index) => {
                html += this.renderFeatureCard(feature, index);
            });

            if (container.classList.contains('features-grid')) {
                container.innerHTML = html;
            } else {
                container.innerHTML = `<div class="features-grid">${html}</div>`;
            }
        }

        /**
         * Render a feature card
         */
        renderFeatureCard(feature, index) {
            return `
                <div class="feature animate-on-scroll" data-index="${index}">
                    <div class="feature-icon">${feature.icon || '✓'}</div>
                    <h3>${feature.title}</h3>
                    <p>${feature.description || ''}</p>
                </div>
            `;
        }

        // ========================================================================
        // TESTIMONIALS
        // ========================================================================

        /**
         * Load testimonials from config
         */
        loadTestimonials() {
            const testimonialsContainer = document.querySelector('.testimonials-grid, [data-content="testimonials"]');
            if (!testimonialsContainer || !this.config?.testimonials) return;

            if (this.config.testimonials.length === 0) {
                testimonialsContainer.innerHTML = '<p>No testimonials yet</p>';
                return;
            }

            let testimonialsHTML = '';
            this.config.testimonials.forEach((testimonial, index) => {
                testimonialsHTML += this.renderTestimonialCard(testimonial, index);
            });

            if (testimonialsContainer.classList.contains('testimonials-grid')) {
                testimonialsContainer.innerHTML = testimonialsHTML;
            } else {
                testimonialsContainer.innerHTML = `<div class="testimonials-grid">${testimonialsHTML}</div>`;
            }
        }

        /**
         * Render a testimonial card
         */
        renderTestimonialCard(testimonial, index) {
            return `
                <div class="testimonial animate-on-scroll" data-index="${index}">
                    <p>"${testimonial.text}"</p>
                    <span>- ${testimonial.name}${testimonial.location ? `, ${testimonial.location}` : ''}</span>
                </div>
            `;
        }

        // ========================================================================
        // FAQs
        // ========================================================================

        /**
         * Load FAQs from config
         */
        loadFAQs() {
            const faqContainer = document.querySelector('.faq-list, .faq-container, [data-content="faqs"]');
            if (!faqContainer || !this.config?.faqs) return;

            if (this.config.faqs.length === 0) {
                faqContainer.innerHTML = '<p>No FAQs available</p>';
                return;
            }

            let faqHTML = '';
            this.config.faqs.forEach((faq, index) => {
                faqHTML += this.renderFaqItem(faq, index);
            });

            if (faqContainer.classList.contains('faq-list')) {
                faqContainer.innerHTML = faqHTML;
            } else {
                faqContainer.innerHTML = `<div class="faq-list">${faqHTML}</div>`;
            }
        }

        /**
         * Render an FAQ item
         */
        renderFaqItem(faq, index) {
            return `
                <div class="faq-item animate-on-scroll" data-index="${index}">
                    <h3 class="faq-question" role="button" aria-expanded="false">
                        ${faq.question}
                        <span class="faq-icon">+</span>
                    </h3>
                    <div class="faq-answer">
                        <div class="faq-answer-content">
                            <p>${faq.answer}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // ========================================================================
        // SERVICE AREAS
        // ========================================================================

        /**
         * Load service areas from config
         */
        loadServiceAreas() {
            const areasContainer = document.querySelector('.areas-list, [data-content="service-areas"]');
            if (!areasContainer || !this.config?.serviceAreas) return;

            if (this.config.serviceAreas.length === 0) {
                return this.loadDefaultServiceAreas(areasContainer);
            }

            let areasHTML = '';
            this.config.serviceAreas.forEach((area, index) => {
                areasHTML += `<li class="animate-on-scroll" data-index="${index}">${area.name}</li>`;
            });

            if (areasContainer.tagName === 'UL') {
                areasContainer.innerHTML = areasHTML;
            } else {
                areasContainer.innerHTML = `<ul class="areas-list">${areasHTML}</ul>`;
            }
        }

        /**
         * Load default service areas
         */
        loadDefaultServiceAreas(container) {
            const defaults = [
                'Kukatpally', 'Miyapur', 'Ameerpet', 'Banjara Hills',
                'Jubilee Hills', 'Gachibowli', 'Madhapur', 'KPHB'
            ];

            let html = defaults.map((area, i) => 
                `<li class="animate-on-scroll" data-index="${i}">${area}</li>`
            ).join('');

            if (container.tagName === 'UL') {
                container.innerHTML = html;
            } else {
                container.innerHTML = `<ul class="areas-list">${html}</ul>`;
            }
        }

        // ========================================================================
        // CONTACT INFO
        // ========================================================================

        /**
         * Load contact information
         */
        loadContactInfo() {
            if (!this.config?.business) return;
            const business = this.config.business;
            const social = this.config.social || {};

            // Phone links
            const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
            phoneLinks.forEach(el => {
                if (business.phone) {
                    el.href = `tel:${business.phone.replace(/\D/g, '')}`;
                    if (!el.textContent.includes('{{')) {
                        el.textContent = business.phone;
                    }
                }
            });

            // WhatsApp links
            const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"], .btn-whatsapp');
            whatsappLinks.forEach(el => {
                if (social.whatsapp) {
                    el.href = social.whatsapp;
                }
            });

            // Email links
            const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
            emailLinks.forEach(el => {
                if (business.email) {
                    el.href = `mailto:${business.email}`;
                    if (!el.textContent.includes('{{')) {
                        el.textContent = business.email;
                    }
                }
            });

            // Plain text contact info
            const contactTexts = document.querySelectorAll('.contact-info p, .footer-section p');
            contactTexts.forEach(el => {
                let text = el.innerHTML;
                text = text.replace(/Phone:?\s*[\d+\s-]+/gi, `Phone: ${business.phone || ''}`);
                text = text.replace(/Email:?\s*[\w@.\s-]+/gi, `Email: ${business.email || ''}`);
                text = text.replace(/WhatsApp:?\s*[\d+\s-]+/gi, `WhatsApp: ${business.phone || ''}`);
                el.innerHTML = text;
            });
        }

        // ========================================================================
        // FOOTER
        // ========================================================================

        /**
         * Load footer content
         */
        loadFooter() {
            const footerContainer = document.querySelector('#main-footer, .footer');
            if (!footerContainer || !this.config?.business) return;

            const business = this.config.business;
            const social = this.config.social || {};
            const currentYear = new Date().getFullYear();

            // Update business name
            const businessNameEl = footerContainer.querySelector('h3');
            if (businessNameEl && !businessNameEl.dataset.static) {
                businessNameEl.textContent = business.name || 'City Air Cooling Services';
            }

            // Update footer bottom
            const footerBottom = footerContainer.querySelector('.footer-bottom p');
            if (footerBottom && !footerBottom.dataset.static) {
                footerBottom.innerHTML = `&copy; ${currentYear} ${business.name || 'City Air Cooling Services'}. All rights reserved.`;
            }

            // Update contact info in footer
            const contactSection = footerContainer.querySelectorAll('.footer-section');
            contactSection.forEach(section => {
                const ps = section.querySelectorAll('p');
                ps.forEach(p => {
                    let text = p.innerHTML;
                    if (business.phone && text.includes('Phone:')) {
                        text = text.replace(/Phone:[\s\d+-]*/, `Phone: ${business.phone}`);
                    }
                    if (business.email && text.includes('Email:')) {
                        text = text.replace(/Email:[\s\w@.]*/, `Email: ${business.email}`);
                    }
                    p.innerHTML = text;
                });
            });
        }

        // ========================================================================
        // PAGE CONTENT (Generic)
        // ========================================================================

        /**
         * Load page-specific content
         */
        loadPageContent() {
            const pageName = this.getCurrentPageName();
            
            // Call page-specific loaders
            switch(pageName) {
                case 'index':
                    this.loadIndexPage();
                    break;
                case 'services':
                    this.loadServicesPage();
                    break;
                case 'contact':
                    this.loadContactPage();
                    break;
                case 'book-service':
                    this.loadBookingPage();
                    break;
                // Add more pages as needed
            }
        }

        /**
         * Load index/home page content
         */
        loadIndexPage() {
            // Index page has hero, services preview, features, testimonials, service areas, CTA
            this.loadServices();
            this.loadFeatures();
            this.loadTestimonials();
            this.loadServiceAreas();
        }

        /**
         * Load services page content
         */
        loadServicesPage() {
            this.loadServices();
        }

        /**
         * Load contact page content
         */
        loadContactPage() {
            this.loadContactInfo();
        }

        /**
         * Load booking page content
         */
        loadBookingPage() {
            const business = this.config?.business || {};
            
            // Update booking phone numbers
            document.querySelectorAll('[data-booking-phone]').forEach(el => {
                el.textContent = business.phone || '';
            });
            
            // Update WhatsApp links
            const waLinks = document.querySelectorAll('[data-booking-whatsapp]');
            waLinks.forEach(el => {
                if (this.config?.social?.whatsapp) {
                    el.href = this.config.social.whatsapp;
                }
            });
        }
    }

    // ========================================================================
    // INITIALIZE
    // ========================================================================

    window.ContentLoader = ContentLoader;
    window.contentLoader = new ContentLoader();

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.contentLoader.init();
        });
    } else {
        window.contentLoader.init();
    }

})();

