function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    domain: params.get('domain') || '',
    type: params.get('type') || 'single'
  };
}

function initGSAPAnimations() {
  const sections = document.querySelectorAll('.apply-section');
  const stepIndicator = document.querySelector('.step-indicator');
  const glowElements = document.querySelectorAll('.glow');

  gsap.set(sections, { opacity: 0, y: 30 });
  gsap.set(stepIndicator, { opacity: 0, scale: 0.9 });
  gsap.set(glowElements, { scale: 0, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(glowElements, {
    scale: 1,
    opacity: 0.3,
    duration: 2,
    stagger: 0.3
  })
  .to(stepIndicator, {
    opacity: 1,
    scale: 1,
    duration: 0.6
  }, '-=1.5')
  .to(sections, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.2
  }, '-=0.3');

  gsap.to(glowElements[0], {
    x: 'random(-50, 50)',
    y: 'random(-50, 50)',
    duration: 15,
    repeat: -1,
    ease: 'sine.inOut',
    yoyo: true
  });

  gsap.to(glowElements[1], {
    x: 'random(-30, 30)',
    y: 'random(-30, 30)',
    duration: 12,
    repeat: -1,
    ease: 'sine.inOut',
    yoyo: true
  });

  gsap.to(glowElements[2], {
    scale: 'random(0.8, 1.2)',
    duration: 18,
    repeat: -1,
    ease: 'sine.inOut',
    yoyo: true
  });
}

function initCSRSwitch() {
  const autoCsrFields = document.getElementById('autoCsrFields');
  const manualCsrFields = document.getElementById('manualCsrFields');
  const csrRadios = document.querySelectorAll('input[name="csrType"]');

  csrRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'auto') {
        gsap.to(manualCsrFields, { opacity: 0, height: 0, duration: 0.3, onComplete: () => {
          manualCsrFields.classList.add('hidden');
        }});
        autoCsrFields.classList.remove('hidden');
        gsap.fromTo(autoCsrFields, 
          { opacity: 0, height: 0 }, 
          { opacity: 1, height: 'auto', duration: 0.3 }
        );
      } else {
        gsap.to(autoCsrFields, { opacity: 0, height: 0, duration: 0.3, onComplete: () => {
          autoCsrFields.classList.add('hidden');
        }});
        manualCsrFields.classList.remove('hidden');
        gsap.fromTo(manualCsrFields, 
          { opacity: 0, height: 0 }, 
          { opacity: 1, height: 'auto', duration: 0.3 }
        );
      }
    });
  });
}

function initSummaryUpdate() {
  const domainInput = document.getElementById('domain');
  const certTypeRadios = document.querySelectorAll('input[name="certType"]');
  const caRadios = document.querySelectorAll('input[name="ca"]');
  const durationRadios = document.querySelectorAll('input[name="duration"]');
  const csrRadios = document.querySelectorAll('input[name="csrType"]');

  const updateSummary = () => {
    const domain = domainInput.value || '-';
    const certType = document.querySelector('input[name="certType"]:checked')?.value || 'single';
    const ca = document.querySelector('input[name="ca"]:checked')?.value || 'google';
    const duration = document.querySelector('input[name="duration"]:checked')?.value || '90';
    const csrType = document.querySelector('input[name="csrType"]:checked')?.value || 'auto';

    document.getElementById('summaryDomain').textContent = domain;
    document.getElementById('summaryType').textContent = certType === 'single' ? '单域名证书' : '泛域名证书';
    document.getElementById('summaryCA').textContent = ca === 'google' ? 'Google Trust Services' : 'ZeroSSL';
    document.getElementById('summaryDuration').textContent = `${duration}天`;
    document.getElementById('summaryCSR').textContent = csrType === 'auto' ? '自动生成' : '手动输入';

    let price = 0;
    if (certType === 'wildcard') {
      price = 15;
    } else {
      price = 5;
    }

    if (duration === '180') {
      price *= 1.5;
    } else if (duration === '365') {
      price *= 2;
    }

    document.getElementById('summaryPrice').textContent = price;
  };

  domainInput.addEventListener('input', updateSummary);
  certTypeRadios.forEach(radio => radio.addEventListener('change', updateSummary));
  caRadios.forEach(radio => radio.addEventListener('change', updateSummary));
  durationRadios.forEach(radio => radio.addEventListener('change', updateSummary));
  csrRadios.forEach(radio => radio.addEventListener('change', updateSummary));

  updateSummary();
}

function initCAOptions() {
  const caOptions = document.querySelectorAll('.ca-option');
  
  caOptions.forEach(option => {
    option.addEventListener('mouseenter', () => {
      gsap.to(option.querySelector('.ca-card'), {
        scale: 1.02,
        duration: 0.2
      });
    });
    
    option.addEventListener('mouseleave', () => {
      gsap.to(option.querySelector('.ca-card'), {
        scale: 1,
        duration: 0.2
      });
    });
  });
}

function initDurationOptions() {
  const durationOptions = document.querySelectorAll('.duration-option');
  
  durationOptions.forEach(option => {
    option.addEventListener('mouseenter', () => {
      gsap.to(option, {
        scale: 1.02,
        duration: 0.2
      });
    });
    
    option.addEventListener('mouseleave', () => {
      gsap.to(option, {
        scale: 1,
        duration: 0.2
      });
    });
  });
}

function handleSubmit() {
  const submitBtn = document.getElementById('submitBtn');
  
  submitBtn.addEventListener('click', () => {
    const domain = document.getElementById('domain').value.trim();
    
    if (!domain) {
      showNotification('请输入域名', 'warning');
      gsap.fromTo(domain,
        { x: 0 },
        { x: 10, duration: 0.1, yoyo: true, repeat: 2 }
      );
      return;
    }

    showNotification('正在提交申请...', 'info');
    
    gsap.to(submitBtn, {
      scale: 0.95,
      opacity: 0.7,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        showNotification('申请提交成功！', 'success');
        
        setTimeout(() => {
          window.location.href = 'success.html';
        }, 1500);
      }
    });
  });
}

function showNotification(message, type = 'info') {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    gsap.to(existingNotification, {
      x: 100,
      opacity: 0,
      duration: 0.3,
      onComplete: () => existingNotification.remove()
    });
  }

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  gsap.fromTo(notification,
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.3 }
  );

  setTimeout(() => {
    gsap.to(notification, {
      x: 100,
      opacity: 0,
      duration: 0.3,
      onComplete: () => notification.remove()
    });
  }, 3000);
}

function goBack() {
  window.location.href = 'index.html';
}

function init() {
  const params = getUrlParams();
  
  if (params.domain) {
    document.getElementById('domain').value = params.domain;
  }
  
  if (params.type === 'wildcard') {
    document.querySelector('input[name="certType"][value="wildcard"]').checked = true;
  }

  initGSAPAnimations();
  initCSRSwitch();
  initSummaryUpdate();
  initCAOptions();
  initDurationOptions();
  handleSubmit();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
