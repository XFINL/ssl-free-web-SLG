gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function initAnimations() {
    const tl = gsap.timeline();
    
    tl.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.cta-button', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4');
    
    gsap.from('.logo', {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });
    
    gsap.from('.nav a', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.3
    });
    
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        tl.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        const featureNumber = card.querySelector('.feature-number');
        if (featureNumber) {
            tl.to(featureNumber, {
                color: '#333333',
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5');
        }
    });
    
    gsap.utils.toArray('.price-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    gsap.utils.toArray('.contact-item').forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1,
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
        duration: 0.8,
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
                    duration: 1,
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
