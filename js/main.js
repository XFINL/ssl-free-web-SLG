function initMain() {
    gsap.set('.logo, .nav a', { y: -20 });
    gsap.set('.hero-label, .hero-title, .hero-subtitle', { y: 40 });
    gsap.set('.cta-button', { y: 20 });
    gsap.set('.section-label, .section-title', { y: 30 });
    gsap.set('.feature-item, .price-item, .contact-block, .application-form', { y: 20 });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}
