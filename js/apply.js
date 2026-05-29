function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    domain: params.get('domain') || '',
    type: params.get('type') || 'single'
  };
}

function initCSRSwitch() {
  const autoCsrFields = document.getElementById('autoCsrFields');
  const manualCsrFields = document.getElementById('manualCsrFields');
  const csrRadios = document.querySelectorAll('input[name="csrType"]');

  csrRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'auto') {
        manualCsrFields.style.display = 'none';
        setTimeout(() => {
          autoCsrFields.style.display = 'block';
        }, 100);
      } else {
        autoCsrFields.style.display = 'none';
        setTimeout(() => {
          manualCsrFields.style.display = 'block';
        }, 100);
      }
    });
  });
}

function initDomainDetection() {
  const domainInput = document.getElementById('domain');
  const certTypeRadios = document.querySelectorAll('input[name="certType"]');

  domainInput.addEventListener('input', () => {
    const domain = domainInput.value.trim().toLowerCase();
    
    if (domain.includes('*') || domain.includes('wildcard')) {
      certTypeRadios.forEach(radio => {
        if (radio.value === 'wildcard') {
          radio.checked = true;
        }
      });
    }
  });
}

function initAdditionalDomains() {
  const certTypeRadios = document.querySelectorAll('input[name="certType"]');
  const additionalDomains = document.getElementById('additionalDomains');

  certTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'multi') {
        additionalDomains.style.display = 'block';
      } else {
        additionalDomains.style.display = 'none';
      }
    });
  });
}

function countAdditionalDomains() {
  const textarea = document.getElementById('additionalDomainsText');
  if (!textarea) return 0;
  
  const value = textarea.value.trim();
  if (!value) return 0;
  
  return value.split('\n').filter(line => line.trim()).length;
}

function calculatePrice() {
  const certType = document.querySelector('input[name="certType"]:checked')?.value || 'single';
  const duration = document.querySelector('input[name="duration"]:checked')?.value || '90';
  const additionalDomains = countAdditionalDomains();
  
  let basePrice = 0;
  
  switch (certType) {
    case 'single':
      basePrice = 5;
      break;
    case 'multi':
      basePrice = 10;
      break;
    case 'wildcard':
      basePrice = 15;
      break;
  }
  
  let durationMultiplier = 1;
  if (duration === '180') {
    durationMultiplier = 1.5;
  } else if (duration === '365') {
    durationMultiplier = 2;
  }
  
  const additionalPrice = additionalDomains * 3;
  
  let addonsPrice = 0;
  if (document.getElementById('ecc').checked) addonsPrice += 2;
  if (document.getElementById('wwwSubdomain').checked) addonsPrice += 1;
  if (document.getElementById('autoRenew').checked) addonsPrice += 3;
  if (document.getElementById('ocsp').checked) addonsPrice += 1;
  
  const totalPrice = Math.round((basePrice + additionalPrice + addonsPrice) * durationMultiplier);
  
  return {
    basePrice,
    additionalPrice,
    addonsPrice,
    totalPrice
  };
}

function getSelectedAddons() {
  const addons = [];
  if (document.getElementById('ecc').checked) addons.push('ECC算法');
  if (document.getElementById('wwwSubdomain').checked) addons.push('www子域名');
  if (document.getElementById('autoRenew').checked) addons.push('自动续期');
  if (document.getElementById('ocsp').checked) addons.push('OCSP Stapling');
  return addons;
}

function updateSummary() {
  const domain = document.getElementById('domain').value || '-';
  const certType = document.querySelector('input[name="certType"]:checked')?.value || 'single';
  const ca = document.querySelector('input[name="ca"]:checked')?.value || 'google';
  const duration = document.querySelector('input[name="duration"]:checked')?.value || '90';
  const csrType = document.querySelector('input[name="csrType"]:checked')?.value || 'auto';
  const additionalDomains = countAdditionalDomains();
  const addons = getSelectedAddons();
  
  document.getElementById('summaryDomain').textContent = domain;
  
  const typeNames = {
    single: '单域名证书',
    multi: '多域名证书',
    wildcard: '泛域名证书'
  };
  document.getElementById('summaryType').textContent = typeNames[certType];
  
  if (certType === 'multi') {
    document.getElementById('additionalDomainsSummary').style.display = 'flex';
    document.getElementById('summaryAdditionalDomains').textContent = `${additionalDomains}个 (+¥${additionalDomains * 3})`;
  } else {
    document.getElementById('additionalDomainsSummary').style.display = 'none';
  }
  
  const caNames = {
    google: 'Google Trust Services',
    zerossl: 'ZeroSSL'
  };
  document.getElementById('summaryCA').textContent = caNames[ca];
  document.getElementById('summaryDuration').textContent = `${duration}天`;
  document.getElementById('summaryCSR').textContent = csrType === 'auto' ? '自动生成' : '手动输入';
  
  if (addons.length > 0) {
    document.getElementById('addonsSummary').style.display = 'flex';
    document.getElementById('summaryAddons').textContent = addons.join(', ');
  } else {
    document.getElementById('addonsSummary').style.display = 'none';
  }
  
  const price = calculatePrice();
  document.getElementById('summaryPrice').textContent = price.totalPrice;
}

function handleSubmit() {
  const submitBtn = document.getElementById('submitBtn');
  
  submitBtn.addEventListener('click', () => {
    const domain = document.getElementById('domain').value.trim();
    
    if (!domain) {
      showNotification('请输入域名', 'warning');
      return;
    }

    showNotification('正在提交申请...', 'info');
    
    submitBtn.style.transform = 'scale(0.95)';
    submitBtn.style.opacity = '0.7';
    
    setTimeout(() => {
      submitBtn.style.transform = 'scale(1)';
      submitBtn.style.opacity = '1';
      showNotification('申请提交成功！', 'success');
      
      setTimeout(() => {
        window.location.href = 'success.html';
      }, 1500);
    }, 200);
  });
}

function showNotification(message, type = 'info') {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.style.transform = 'translateX(100px)';
    existingNotification.style.opacity = '0';
    setTimeout(() => existingNotification.remove(), 300);
  }

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.transform = 'translateX(100px)';
  notification.style.opacity = '0';

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
    notification.style.opacity = '1';
  }, 50);

  setTimeout(() => {
    notification.style.transform = 'translateX(100px)';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
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
  
  if (params.type) {
    const radio = document.querySelector(`input[name="certType"][value="${params.type}"]`);
    if (radio) radio.checked = true;
  }

  initCSRSwitch();
  initDomainDetection();
  initAdditionalDomains();
  
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('change', updateSummary);
    input.addEventListener('input', updateSummary);
  });
  
  updateSummary();
  handleSubmit();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
