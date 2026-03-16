/**
 * City Air Cooling Services - Site Configuration
 * 
 * This configuration file contains all the site settings that can be
 * easily modified without changing the HTML files.
 * 
 * SIMPLIFIED VERSION - Service Business Website
 */

// ============================================================================
// BUSINESS INFORMATION
// ============================================================================

const siteConfig = {
    // Business Information
    business: {
        name: 'City Air Cooling Services',
        tagline: 'Your Trusted AC Service Partner in Hyderabad',
        description: 'Professional AC repair, installation, and maintenance services in Hyderabad. Same day service by experienced technicians.',
        phone: '+919999999999',
        whatsapp: '919999999999',
        email: 'info@cityaircooling.com',
        website: 'www.cityaircooling.com',
        address: 'Hyderabad, Telangana, India',
        established: '2014',
        experience: '10+ years'
    },

    // Service Areas - Local SEO
    serviceAreas: [
        { name: 'Kukatpally', keyword: 'AC repair Kukatpally' },
        { name: 'Miyapur', keyword: 'AC service Miyapur' },
        { name: 'Ameerpet', keyword: 'AC repair Ameerpet' },
        { name: 'Banjara Hills', keyword: 'AC service Banjara Hills' },
        { name: 'Jubilee Hills', keyword: 'AC repair Jubilee Hills' },
        { name: 'Gachibowli', keyword: 'AC service Gachibowli' },
        { name: 'Madhapur', keyword: 'AC repair Madhapur' },
        { name: 'KPHB', keyword: 'AC service KPHB' },
        { name: 'SR Nagar', keyword: 'AC repair SR Nagar' },
        { name: 'Panjagutta', keyword: 'AC service Panjagutta' },
        { name: 'Begumpet', keyword: 'AC repair Begumpet' },
        { name: 'Hitec City', keyword: 'AC service Hitec City' },
        { name: 'Kondapur', keyword: 'AC repair Kondapur' },
        { name: 'Manikonda', keyword: 'AC service Manikonda' },
        { name: 'Film Nagar', keyword: 'AC repair Film Nagar' }
    ],

    // Services Offered
    services: [
        {
            id: 'repair',
            name: 'AC Repair',
            shortDescription: 'Professional diagnosis and repair of cooling problems',
            description: 'We diagnose and repair all types of AC cooling problems quickly and efficiently. Our experienced technicians use professional tools and genuine spare parts to ensure your AC runs perfectly.',
            features: ['Not cooling properly', 'Water leakage', 'Strange noises', 'PCB issues', 'Gas refilling'],
            price: 'Starting from ₹300'
        },
        {
            id: 'installation',
            name: 'AC Installation',
            shortDescription: 'Expert installation for all types of ACs',
            description: 'Professional AC installation services for all brands. We ensure proper installation for optimal performance and longevity of your air conditioner.',
            features: ['Split AC installation', 'Window AC installation', 'Central AC installation', 'Ducting work'],
            price: 'Starting from ₹500'
        },
        {
            id: 'maintenance',
            name: 'AC Maintenance',
            shortDescription: 'Regular servicing to keep your AC running efficiently',
            description: 'Regular AC maintenance to keep your cooling system running efficiently. Preventive maintenance helps avoid major repairs and extends AC life.',
            features: ['Annual service contract', 'Filter cleaning', 'Coil cleaning', 'Refrigerant check'],
            price: 'Starting from ₹250'
        },
        {
            id: 'gas',
            name: 'Gas Refilling',
            shortDescription: 'Professional gas refilling with genuine parts',
            description: 'Professional gas refilling services using high-quality refrigerants. We handle all types of gases including R-22, R-410A, and R-32.',
            features: ['Gas leak detection', 'Gas refilling', 'Pipe repair'],
            price: 'Starting from ₹800'
        },
        {
            id: 'amc',
            name: 'AMC (Annual Maintenance Contract)',
            shortDescription: 'Get peace of mind with annual maintenance contracts',
            description: 'Get peace of mind with our annual maintenance contracts. Regular servicing at fixed costs.',
            features: ['Quarterly visits', 'Free repairs', 'Priority service', 'Expert technicians'],
            price: 'Starting from ₹2500/year'
        }
    ],

    // Brands Serviced
    brands: [
        'LG', 'Samsung', 'Daikin', 'Hitachi', 'Voltas', 
        'Blue Star', 'Carrier', 'O General', 'Panasonic', 'Mitsubishi'
    ],

    // SEO Configuration
    seo: {
        siteUrl: 'https://www.cityaircooling.com',
        defaultTitle: 'City Air Cooling Services | AC Repair in Hyderabad',
        defaultDescription: 'Fast AC Repair in Hyderabad. Same Day Service by Experienced Technicians. Call Now for AC installation, repair, and maintenance.',
        keywords: [
            'AC repair Hyderabad',
            'AC service Kukatpally',
            'AC installation Hyderabad',
            'AC maintenance Hyderabad',
            'gas refilling Hyderabad',
            'AC AMC Hyderabad',
            'best AC service',
            'affordable AC repair'
        ],
        ogImage: 'assets/images/og-image.jpg',
        twitterHandle: '@cityaircooling',
        locale: 'en_IN',
        currency: 'INR'
    },

    // Social Media Links
    social: {
        whatsapp: 'https://wa.me/919999999999',
        facebook: 'https://facebook.com/cityaircooling',
        instagram: 'https://instagram.com/cityaircooling',
        youtube: 'https://youtube.com/cityaircooling'
    },

    // Working Hours
    workingHours: {
        monday: { open: '08:00', close: '21:00', is24Hours: false },
        tuesday: { open: '08:00', close: '21:00', is24Hours: false },
        wednesday: { open: '08:00', close: '21:00', is24Hours: false },
        thursday: { open: '08:00', close: '21:00', is24Hours: false },
        friday: { open: '08:00', close: '21:00', is24Hours: false },
        saturday: { open: '08:00', close: '21:00', is24Hours: false },
        sunday: { open: '08:00', close: '21:00', is24Hours: false },
        emergency24x7: true
    },

    // Features/Trust Badges
    features: [
        { icon: '🔧', title: 'Experienced Technicians', description: '10+ years of experience' },
        { icon: '⚡', title: 'Same Day Service', description: 'Quick response and fast turnaround' },
        { icon: '💰', title: 'Affordable Pricing', description: 'Transparent and competitive rates' },
        { icon: '✅', title: 'Genuine Parts', description: 'Only authentic spare parts used' },
        { icon: '⭐', title: 'Quality Service', description: 'Thousands of satisfied customers' },
        { icon: '🕐', title: '24/7 Support', description: 'Emergency services available' }
    ],

    // Testimonials
    testimonials: [
        {
            name: 'Rajesh Kumar',
            location: 'Kukatpally',
            rating: 5,
            text: 'Excellent service! The technician arrived on time and fixed my AC within an hour. Highly recommended!'
        },
        {
            name: 'Srinivas Rao',
            location: 'Miyapur',
            rating: 5,
            text: 'Very professional team. They provided fair pricing and quality service. Will definitely use again.'
        },
        {
            name: 'Pavan Kumar',
            location: 'Gachibowli',
            rating: 5,
            text: 'Best AC service in Hyderabad. Quick response and excellent workmanship.'
        },
        {
            name: 'Anil Kumar',
            location: 'Ameerpet',
            rating: 5,
            text: 'Great experience! The AC is working perfectly after repair. Thank you team!'
        },
        {
            name: 'Ravi Teja',
            location: 'Madhapur',
            rating: 5,
            text: 'Very satisfied with the AC installation. Professional service at affordable price.'
        }
    ],

    // FAQ Items
    faqs: [
        {
            question: 'How often should I service my AC?',
            answer: 'It is recommended to service your AC at least once a year. Regular maintenance ensures optimal performance and extends the lifespan of your AC unit.'
        },
        {
            question: 'Why is my AC not cooling properly?',
            answer: 'Common reasons include low refrigerant levels, dirty filters, clogged condenser coils, or compressor issues. Our technicians can diagnose and fix the problem.'
        },
        {
            question: 'How much does AC repair cost?',
            answer: 'Repair costs vary depending on the issue. We provide transparent pricing with no hidden charges. Contact us for a free estimate.'
        },
        {
            question: 'Do you offer warranty on repairs?',
            answer: 'Yes, we offer warranty on all our repair services. The warranty period varies depending on the type of repair and parts used.'
        },
        {
            question: 'What brands do you service?',
            answer: 'We service all major brands including LG, Samsung, Daikin, Hitachi, Voltas, Blue Star, Carrier, Panasonic, Mitsubishi, and more.'
        },
        {
            question: 'Do you provide emergency AC repair services?',
            answer: 'Yes, we offer 24/7 emergency services for urgent AC problems. Call us anytime for immediate assistance.'
        },
        {
            question: 'How long does AC installation take?',
            answer: 'Typically, split AC installation takes 2-3 hours. Window AC installation is quicker, usually within 1-2 hours.'
        },
        {
            question: 'What is an AMC (Annual Maintenance Contract)?',
            answer: 'AMC is an annual maintenance contract that covers regular servicing, free repairs, and priority service at a fixed annual cost.'
        }
    ],

    // Conversion Tracking (for analytics)
    analytics: {
        googleAnalyticsId: 'G-XXXXXXXXXX',
        facebookPixelId: '1234567890',
        whatsappClickTracking: true,
        callTracking: true
    },

    // Site Metadata
    metadata: {
        version: '1.0.0',
        lastUpdated: '2024-01-01',
        author: 'City Air Cooling Services',
        copyright: '© 2024 City Air Cooling Services. All rights reserved.'
    }
};

// Make config globally available
if (typeof window !== 'undefined') {
    window.siteConfig = siteConfig;
}

