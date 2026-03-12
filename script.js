// ===========================
// Mobile Menu Toggle
// ===========================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ===========================
// Navbar Scroll Effect
// ===========================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===========================
// Smooth Scrolling for Anchor Links
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default if it's just "#" (like mobile menu toggle)
        if (href === '#') return;

        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Intersection Observer for Scroll Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
const animatedElements = document.querySelectorAll('.service-card, .benefit-item, .about-content, .hero-content');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// Active Navigation Link Highlighting
// ===========================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to current section link
            const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (currentLink && !currentLink.classList.contains('cta-button')) {
                currentLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===========================
// EmailJS Configuration
// ===========================

// EmailJS credentials - configured and ready to use
// Dashboard: https://dashboard.emailjs.com/
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'tp57nyEDr_YG3S3qX',      // From Account > General
    SERVICE_ID: 'service_bqa7537',        // Zoho Email Service
    TEMPLATE_ID: 'wkhzdv8'                // Contact Form Template
};

// Initialize EmailJS (only if credentials are configured)
if (EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

        // Disable submit button to prevent double submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            // Not configured yet - show helpful message
            console.warn('EmailJS not configured yet. See setup instructions in script.js');
            alert('EmailJS not configured yet!\n\nPlease follow the setup instructions at the top of script.js to connect your email service.\n\nFor now, please email us at: hello@equalpath.ai');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            return;
        }

        try {
            // Send email using EmailJS
            const response = await emailjs.sendForm(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                contactForm
            );

            console.log('Email sent successfully:', response);

            // Hide form and show success message
            Array.from(contactForm.elements).forEach(element => {
                if (element.tagName !== 'BUTTON') {
                    element.style.display = 'none';
                }
            });
            submitButton.style.display = 'none';
            formSuccess.style.display = 'block';

            // Track form submission
            trackEvent('Contact Form', 'Submit', data.interest);

            // Reset form after 10 seconds for another submission
            setTimeout(() => {
                contactForm.reset();
                Array.from(contactForm.elements).forEach(element => {
                    element.style.display = '';
                });
                submitButton.style.display = '';
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                formSuccess.style.display = 'none';
            }, 10000);

        } catch (error) {
            console.error('EmailJS error:', error);
            alert('Sorry, there was an error sending your message.\n\nPlease try emailing us directly at: hello@equalpath.ai');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // Add real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.validity.valid) {
                this.style.borderColor = 'transparent';
            } else {
                this.style.borderColor = '#ef4444';
            }
        });

        input.addEventListener('input', function() {
            if (this.validity.valid && this.style.borderColor === 'rgb(239, 68, 68)') {
                this.style.borderColor = 'transparent';
            }
        });
    });
}

// ===========================
// Performance: Lazy Loading Images
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Analytics Event Tracking (Optional)
// ===========================

function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    // If you use Google Analytics, you would add:
    // gtag('event', action, { 'event_category': category, 'event_label': label });
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track CTA button clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        trackEvent('CTA', 'Click', buttonText);
    });
});

// ===========================
// Accessibility: Skip to Main Content
// ===========================

// Add a skip link for keyboard users
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link visually-hidden';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    z-index: 100;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ===========================
// Console Message
// ===========================

console.log('%c👋 Welcome to Equal Path!', 'font-size: 20px; color: #3b82f6; font-weight: bold;');
console.log('%cInterested in how this site works? We can help you build your own!', 'font-size: 14px; color: #8b5cf6;');
console.log('%cContact us at hello@equalpath.ai', 'font-size: 12px; color: #64748b;');
