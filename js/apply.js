let currentStep = 1;

function goToStep(step) {
  const sections = document.querySelectorAll('.apply-section');
  const steps = document.querySelectorAll('.step');
  const stepLines = document.querySelectorAll('.step-line');
  
  sections.forEach((section, index) => {
    if (index + 1 === step) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
  
  steps.forEach((stepEl, index) => {
    if (index + 1 <= step) {
      stepEl.classList.add('active');
    } else {
      stepEl.classList.remove('active');
    }
  });
  
  stepLines.forEach((line, index) => {
    if (index + 1 < step) {
      line.classList.add('active');
    } else {
      line.classList.remove('active');
    }
  });
  
  currentStep = step;
}

function nextStep() {
  if (currentStep < 4) {
    goToStep(currentStep + 1);
    updateSummary();
  }
}

function prevStep() {
  if (currentStep > 1) {
    goToStep(currentStep - 1);
  }
}

function initCSRSwitch() {
  const autoCsrFields = document.getElementById('autoCsrFields');
  const manualCsrFields = document.getElementById('manualCsrFields');
  const csrRadios = document.querySelectorAll('input[name="csrType"]');

  csrRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'auto') {
        manualCsrFields.style.display = 'none';
        autoCsrFields.style.display = 'block';
      } else {
        autoCsrFields.style.display = 'none';
        manualCsrFields.style.display = 'block';
      }
      updateSummary();
    });
  });
}

function calculatePrice() {
  const certType = document.querySelector('input[name="certType"]:checked')?.value || 'single';
  const duration = document.querySelector('input[name="duration"]:checked')?.value || '90';
  
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
  
  let addonsPrice = 0;
  if (document.getElementById('ecc').checked) addonsPrice += 2;
  if (document.getElementById('wwwSubdomain').checked) addonsPrice += 1;
  if (document.getElementById('autoRenew').checked) addonsPrice += 3;
  if (document.getElementById('ocsp').checked) addonsPrice += 1;
  
  const totalPrice = Math.round((basePrice + addonsPrice) * durationMultiplier);
  
  return totalPrice;
}

function updateSummary() {
  const certType = document.querySelector('input[name="certType"]:checked')?.value || 'single';
  const ca = document.querySelector('input[name="ca"]:checked')?.value || 'google';
  const duration = document.querySelector('input[name="duration"]:checked')?.value || '90';
  const csrType = document.querySelector('input[name="csrType"]:checked')?.value || 'auto';
  
  const typeNames = {
    single: '单域名证书',
    multi: '多域名证书',
    wildcard: '泛域名证书'
  };
  document.getElementById('summaryType').textContent = typeNames[certType];
  
  const caNames = {
    google: 'Google',
    zerossl: 'ZeroSSL'
  };
  document.getElementById('summaryCA').textContent = caNames[ca];
  document.getElementById('summaryDuration').textContent = `${duration}天`;
  document.getElementById('summaryCSR').textContent = csrType === 'auto' ? '自动生成' : '手动输入';
  document.getElementById('summaryPrice').textContent = calculatePrice();
}

function handleSubmit() {
  const submitBtn = document.getElementById('submitBtn');
  
  submitBtn.addEventListener('click', () => {
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
  document.getElementById('nextToCA').addEventListener('click', nextStep);
  document.getElementById('nextToDuration').addEventListener('click', nextStep);
  document.getElementById('nextToConfig').addEventListener('click', nextStep);
  
  document.getElementById('prevToType').addEventListener('click', prevStep);
  document.getElementById('prevToCA').addEventListener('click', prevStep);
  document.getElementById('prevToDuration').addEventListener('click', prevStep);
  
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.addEventListener('change', updateSummary);
  });
  
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateSummary);
  });
  
  initCSRSwitch();
  updateSummary();
  handleSubmit();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
