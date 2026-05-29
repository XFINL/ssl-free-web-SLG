window.appState = {
    certificates: [
        {
            domain: 'example.com',
            type: 'dv',
            status: 'active',
            date: '2026-03-15',
            expiry: '2026-09-15'
        },
        {
            domain: 'test.org',
            type: 'ov',
            status: 'pending',
            date: '2026-05-20',
            expiry: '2027-05-20'
        }
    ]
};

function initMain() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    gsap.set('.page-element', { opacity: 0, y: 30 });
    
    router.addRoute('/', renderHomePage);
    router.addRoute('/apply', renderApplyPage);
    router.addRoute('/mine', renderMinePage);
}

function renderHomePage() {
    const app = document.getElementById('app');
    app.innerHTML = Pages.home();
    
    setTimeout(() => {
        initPageAnimations();
        initPriceButtons();
    }, 50);
}

function renderApplyPage() {
    const app = document.getElementById('app');
    app.innerHTML = Pages.apply();
    
    setTimeout(() => {
        initPageAnimations();
        initForms();
    }, 50);
}

function renderMinePage() {
    const app = document.getElementById('app');
    app.innerHTML = Pages.mine();
    
    setTimeout(() => {
        initPageAnimations();
        initCertButtons();
    }, 50);
}

function initPageAnimations() {
    gsap.set('.page-element', { opacity: 0, y: 30 });
    
    const elements = document.querySelectorAll('.page-element');
    if (elements.length > 0) {
        gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.05
        });
    }
    
    const getCertBtn = document.getElementById('getCertBtn');
    if (getCertBtn) {
        getCertBtn.addEventListener('click', function() {
            const domainInput = document.getElementById('homeDomain');
            const domain = domainInput ? domainInput.value.trim() : '';
            
            gsap.to(this, {
                scale: 0.98,
                duration: 0.1,
                ease: 'power2.in',
                yoyo: true,
                repeat: 1
            });
            
            router.navigate('/apply');
            
            setTimeout(() => {
                const domainField = document.getElementById('domain');
                if (domainField && domain) {
                    domainField.value = domain;
                }
            }, 100);
        });
    }
    
    updateMobileNav();
}

function updateMobileNav() {
    const currentPath = window.location.hash.slice(1) || '/';
    document.querySelectorAll('.float-nav-item').forEach(item => {
        const href = item.getAttribute('href');
        const itemPath = href ? href.replace('#', '') : '';
        
        if (itemPath === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function initPriceButtons() {
}

function initCertButtons() {
    const certButtons = document.querySelectorAll('.cert-btn');
    certButtons.forEach(button => {
        button.addEventListener('click', function() {
            gsap.to(this, {
                scale: 0.98,
                duration: 0.1,
                ease: 'power2.in',
                yoyo: true,
                repeat: 1
            });
            
            const action = this.getAttribute('data-action');
            console.log('Certificate action:', action);
            alert(action === 'download' ? '证书下载中...' : '证书续期申请已提交');
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}
