let currentStep = 1;

function updateProgress() {
  const progressFill = document.getElementById('progressFill');
  const progressLabels = document.querySelectorAll('.progress-labels span');
  
  progressFill.style.width = `${currentStep * 25}%`;
  
  progressLabels.forEach((label, index) => {
    if (index < currentStep) {
      label.classList.add('active');
    } else {
      label.classList.remove('active');
    }
  });
}

function goToStep(step) {
  const sections = document.querySelectorAll('.step-section');
  
  sections.forEach((section, index) => {
    if (index + 1 === step) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
  
  currentStep = step;
  updateProgress();
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
  const autoCsrForm = document.getElementById('autoCsrForm');
  const manualCsrForm = document.getElementById('manualCsrForm');
  const csrRadios = document.querySelectorAll('input[name="csrType"]');

  csrRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'auto') {
        manualCsrForm.classList.add('hidden');
        autoCsrForm.classList.remove('hidden');
      } else {
        autoCsrForm.classList.add('hidden');
        manualCsrForm.classList.remove('hidden');
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
  
  const typeNames = {
    single: 'Single Domain',
    multi: 'Multi Domain',
    wildcard: 'Wildcard'
  };
  document.getElementById('sumType').textContent = typeNames[certType];
  
  const caNames = {
    google: 'Google Trust',
    zerossl: 'ZeroSSL'
  };
  document.getElementById('sumCA').textContent = caNames[ca];
  document.getElementById('sumDuration').textContent = `${duration} Days`;
  document.getElementById('sumTotal').textContent = `¥${calculatePrice()}`;
}

function handleSubmit() {
  const submitBtn = document.getElementById('btnSubmit');
  
  submitBtn.addEventListener('click', () => {
    submitBtn.style.transform = 'scale(0.98)';
    submitBtn.style.opacity = '0.8';
    
    setTimeout(() => {
      submitBtn.style.transform = 'scale(1)';
      submitBtn.style.opacity = '1';
      window.location.href = 'success.html';
    }, 300);
  });
}

function goBack() {
  window.location.href = 'index.html';
}

function init() {
  document.getElementById('btnStep1').addEventListener('click', nextStep);
  document.getElementById('btnStep2').addEventListener('click', nextStep);
  document.getElementById('btnStep3').addEventListener('click', nextStep);
  
  document.getElementById('btnBack2').addEventListener('click', prevStep);
  document.getElementById('btnBack3').addEventListener('click', prevStep);
  document.getElementById('btnBack4').addEventListener('click', prevStep);
  
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
