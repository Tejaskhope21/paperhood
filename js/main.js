// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ===== LIVE BOOK TYPING ANIMATION =====
const phrases = [
    "Once upon a time...",
    "In a world of words...",
    "The journey begins...",
    "Print your story today...",
    "From manuscript to masterpiece...",
    "Your voice matters...",
    "Create something beautiful...",
    "Share your passion..."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typedTextElement = document.getElementById('typedText');

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Deleting text
        typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing text
        typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // Check if completed typing
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Pause at end
        return;
    }
    
    // Check if completed deleting
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    // Adjust typing speed
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

// Start the typing animation when page loads
if (typedTextElement) {
    setTimeout(typeEffect, 500);
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        if (!isActive) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(email) {
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return re.test(email);
}

function validateName(name) {
    return name.trim().length >= 2;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (!nameInput.value.trim()) {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else if (!validateName(nameInput.value)) {
            nameError.textContent = 'Name must be at least 2 characters';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        if (!messageInput.value.trim()) {
            messageError.textContent = 'Message is required';
            isValid = false;
        } else if (!validateMessage(messageInput.value)) {
            messageError.textContent = 'Message must be at least 10 characters';
            isValid = false;
        } else {
            messageError.textContent = '';
        }

        if (isValid) {
            formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent. We\'ll get back to you within 24 hours.';
            formSuccess.style.background = 'rgba(43, 94, 59, 0.1)';
            contactForm.reset();
            setTimeout(() => {
                formSuccess.innerHTML = '';
            }, 5000);
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA Buttons
const heroCtaBtn = document.getElementById('heroCtaBtn');
const ctaUploadBtn = document.getElementById('ctaUploadBtn');
const stepsCtaBtn = document.getElementById('stepsCtaBtn');
const learnMoreBtn = document.getElementById('learnMoreBtn');

if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
}

if (ctaUploadBtn) {
    ctaUploadBtn.addEventListener('click', () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
}

if (stepsCtaBtn) {
    stepsCtaBtn.addEventListener('click', () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
}

if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    });
}

// Sticky Navbar Enhancement
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.feature-card, .step-card, .pricing-card, .testimonial-card, .faq-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Pricing buttons interaction
const pricingBtns = document.querySelectorAll('.pricing-btn');
pricingBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent.includes('Contact Sales')) {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('Thank you for your interest! This is a demo. In production, this would redirect to checkout.');
        }
    });
});

// Newsletter form
const newsletterBtn = document.querySelector('.newsletter-form button');
const newsletterInput = document.querySelector('.newsletter-form input');

if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', () => {
        if (newsletterInput.value.trim() && validateEmail(newsletterInput.value.trim())) {
            alert('Thanks for subscribing! You\'ll receive updates and offers.');
            newsletterInput.value = '';
        } else if (newsletterInput.value.trim()) {
            alert('Please enter a valid email address.');
        } else {
            alert('Please enter your email address.');
        }
    });
}

// Console log for development
console.log('Paperhood — Fully loaded with live open book and typing animation');