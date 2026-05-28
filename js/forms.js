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
            
            gsap.to('.submit-button', {
                scale: 0.98,
                duration: 0.1,
                ease: 'power2.in',
                yoyo: true,
                repeat: 1
            });
            
            console.log('Form submitted:', formData);
            
            alert('申请已提交');
        });
    }
    
    const priceButtons = document.querySelectorAll('.price-action');
    priceButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            gsap.to(this, {
                scale: 0.98,
                duration: 0.1,
                ease: 'power2.in',
                yoyo: true,
                repeat: 1
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
                    duration: 0.8,
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
