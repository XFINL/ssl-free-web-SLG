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
            
            const newCert = {
                domain: formData.domain,
                type: formData.type,
                status: 'pending',
                date: new Date().toISOString().split('T')[0],
                expiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            };
            
            window.appState.certificates.push(newCert);
            
            console.log('Form submitted:', formData);
            alert('申请已提交');
            
            router.navigate('/mine');
        });
    }
}
