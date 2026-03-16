/**
 * City Air Cooling Services - Main JavaScript
 * 
 * Simplified version - Service Business Website
 * 
 * Features:
 * - FAQ accordion
 * - Header scroll effect
 * - Form handling
 * - Simple animations (CSS-based)
 * 
 * @version 1.0.0
 */

(function() {
    'use strict';

    // ========================================================================
    // INITIALIZATION
    // ========================================================================

    /**
     * Initialize the main functionality
     */
    function init() {
        console.log('🚀 City Air Cooling Services - Initializing...');
        
        // Initialize components
        initHeaderScrollEffect();
        initFAQAccordion();
        initContactForm();
        initBookingForm();
        
        console.log('✅ Initialization complete');
    }

    // ========================================================================
    // HEADER SCROLL EFFECT
    // ========================================================================

    /**
     * Initialize header scroll effect
     */
    function initHeaderScrollEffect() {
        const header = document.querySelector('.header');
        
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }

    // ========================================================================
    // FAQ ACCORDION
    // ========================================================================

    /**
     * Initialize FAQ accordion
     */
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('p');
            
            if (question && answer) {
                question.style.cursor = 'pointer';
                question.setAttribute('role', 'button');
                question.setAttribute('aria-expanded', 'false');
                
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('p');
                            const otherQuestion = otherItem.querySelector('h3');
                            if (otherAnswer) {
                                otherAnswer.style.maxHeight = '0';
                                otherAnswer.style.opacity = '0';
                                otherAnswer.style.paddingTop = '0';
                            }
                            if (otherQuestion) {
                                otherQuestion.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });
                    
                    // Toggle current item
                    if (isActive) {
                        item.classList.remove('active');
                        answer.style.maxHeight = '0';
                        answer.style.opacity = '0';
                        answer.style.paddingTop = '0';
                        question.setAttribute('aria-expanded', 'false');
                    } else {
                        item.classList.add('active');
                        answer.style.maxHeight = '300px';
                        answer.style.opacity = '1';
                        answer.style.paddingTop = '10px';
                        question.setAttribute('aria-expanded', 'true');
                    }
                });
            }
        });
    }

    // ========================================================================
    // FORM HANDLERS
    // ========================================================================

    /**
     * Contact Form Handler
     */
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message! We will contact you shortly.');
                contactForm.reset();
            });
        }
    }

    /**
     * Booking Form Handler
     */
    function initBookingForm() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                var refId = 'AC-' + Date.now();
                alert('Your service request has been submitted! Reference ID: ' + refId);
                bookingForm.reset();
            });
        }
    }

    // ========================================================================
    // GLOBAL HELPER FUNCTIONS
    // ========================================================================

    /**
     * WhatsApp Quick Chat Function
     */
    function openWhatsApp() {
        var phoneNumber = '919999999999';
        var message = 'Hello, I need AC service';
        var waUrl = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
        window.open(waUrl, '_blank');
    }

    /**
     * Click to Call Function
     */
    function callNow() {
        window.location.href = 'tel:+919999999999';
    }

    /**
     * Smooth scroll to element
     */
    function smoothScrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Export for global use
    window.openWhatsApp = openWhatsApp;
    window.callNow = callNow;
    window.smoothScrollTo = smoothScrollTo;

    // ========================================================================
    // DOM READY
    // ========================================================================

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

