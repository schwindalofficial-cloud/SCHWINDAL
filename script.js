// Hero Section Animation
document.addEventListener('DOMContentLoaded', function () {
    const bottleContainer = document.getElementById('bottleContainer');
    const productDetails = document.getElementById('productDetails');

    // Show bottle centered for 1 second, then animate both simultaneously
    setTimeout(() => {
        // Both animations start at the same time
        bottleContainer.classList.add('animate');
        productDetails.classList.add('animate');
    }, 1000); // 1 second delay - bottle stays centered, then both move simultaneously
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Buy Now buttons are now standard links to Amazon

// Timeline Scroll Animation
const timelineItems = document.querySelectorAll('.timeline-item');

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const timelineObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 200); // Stagger animation
            timelineObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Newsletter Form and Contact Form handlers are initialized in components/loader.js after footer loads

// Parallax effect for hero background
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile Menu Toggle is handled in components/loader.js

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.section-title, .product-layout, .faq-item, .contact-layout').forEach(el => {
    el.classList.add('reveal-hidden');
    revealObserver.observe(el);
});

