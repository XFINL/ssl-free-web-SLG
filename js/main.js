function initMain() {
    gsap.set('.hero-title, .hero-subtitle, .cta-button', { y: 40 });
    gsap.set('.section-title, .feature-card, .price-card, .contact-item, .application-form', { y: 30 });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}
