gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function initAnimations() {
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.to('.logo', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    .to('.nav a', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08
    }, '-=0.4')
    .to('.hero-label', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.3')
    .to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3')
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.cta-button', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.3');
    
    const sections = ['.features', '.pricing', '.application', '.contact'];
    
    sections.forEach(section => {
        const label = section + ' .section-label';
        const title = section + ' .section-title';
        
        gsap.to(label, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
        
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    gsap.utils.toArray('.feature-item').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    gsap.utils.toArray('.price-item').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    gsap.utils.toArray('.contact-block').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    gsap.to('.application-form', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.application-form',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: { y: target, offsetY: 40 },
                    duration: 0.8,
                    ease: 'power3.out'
                });
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}
