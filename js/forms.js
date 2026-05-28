function initForms() {
    const sslForm = document.getElementById('sslForm');
    if (sslForm) {
        sslForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                domain: document.getElementById('domain').value,
                type: document.getElementById('type').value,
                email: document.getElementById('email').value,
                organization: document.getElementById('organization').value
            };
            
            const tl = gsap.timeline();
            tl.to('.submit-button', {
                scale: 0.95,
                duration: 0.1,
                ease: 'power2.in'
            })
            .to('.submit-button', {
                scale: 1,
                duration: 0.3,
                ease: 'elastic.out(1, 0.3)'
            });
            
            console.log('Form submitted:', formData);
            
            alert('申请已提交！我们会尽快与您联系。');
        });
    }
    
    const priceButtons = document.querySelectorAll('.price-button');
    priceButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const tl = gsap.timeline();
            tl.to(this, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power2.in'
            })
            .to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'elastic.out(1, 0.3)'
            });
            
            const types = ['dv', 'ov', 'ev'];
            const typeSelect = document.getElementById('type');
            if (typeSelect) {
                typeSelect.value = types[index];
            }
            
            const applicationSection = document.getElementById('application');
            if (applicationSection) {
                gsap.to(window, {
                    scrollTo: { y: applicationSection, offsetY: 40 },
                    duration: 1,
                    ease: 'power3.out'
                });
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForms);
} else {
    initForms();
}
