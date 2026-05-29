const elements = {
  logo: document.querySelector('.logo'),
  searchSection: document.querySelector('.search-section'),
  pricingSection: document.querySelector('.pricing-section'),
  priceCards: document.querySelectorAll('.price-card'),
  cardButtons: document.querySelectorAll('.card-button'),
  searchInput: document.querySelector('.search-input'),
  searchBtn: document.querySelector('.search-btn'),
  glowElements: document.querySelectorAll('.glow'),
  domainInput: document.getElementById('domainInput'),
  searchBtnEl: document.getElementById('searchBtn')
};

function initGSAPAnimations() {
  gsap.set(elements.logo, { opacity: 0, y: -30 });
  gsap.set(elements.searchSection, { opacity: 0, y: 40, scale: 0.95 });
  gsap.set(elements.glowElements, { scale: 0, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(elements.glowElements, {
    scale: 1,
    opacity: 0.3,
    duration: 2,
    stagger: 0.3
  })
  .to(elements.logo, {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, '-=1.5')
  .to(elements.searchSection, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8
  }, '-=0.4');

  gsap.to(elements.glowElements[0], {
    x: 'random(-50, 50)',
    y: 'random(-50, 50)',
    duration: 15,
    repeat: -1,
    ease: 'sine.inOut',
    yoyo: true
  });

  gsap.to(elements.glowElements[1], {
    x: 'random(-30, 30)',
    y: 'random(-30, 30)',
    duration: 12,
    repeat: -1,
    ease: 'sine.inOut',
    yoyo: true
  });

  gsap.to(elements.glowElements[2], {
    scale: 'random(0.8, 1.2)',
    duration: 18,
    repeat: -1,
    ease: 'sine.inOut',
    yoyo: true
  });
}

function initEventListeners() {
  elements.priceCards.forEach((card) => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      const domain = elements.domainInput.value.trim();
      
      const params = new URLSearchParams({
        type: type,
        domain: domain || ''
      });
      
      window.location.href = `apply.html?${params.toString()}`;
    });
  });

  elements.cardButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const type = button.dataset.type;
      const domain = elements.domainInput.value.trim();
      
      const params = new URLSearchParams({
        type: type,
        domain: domain || ''
      });
      
      window.location.href = `apply.html?${params.toString()}`;
    });
  });

  elements.searchBtnEl.addEventListener('click', handleSearch);
  elements.domainInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  elements.searchInput.addEventListener('focus', () => {
    gsap.to(elements.searchSection, {
      scale: 1.02,
      duration: 0.3
    });
  });

  elements.searchInput.addEventListener('blur', () => {
    gsap.to(elements.searchSection, {
      scale: 1,
      duration: 0.3
    });
  });

  elements.logo.addEventListener('click', () => {
    gsap.fromTo(elements.logo, 
      { scale: 1 },
      { 
        scale: 1.1, 
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      }
    );
  });
}

function handleSearch() {
  const domain = elements.domainInput.value.trim();
  
  if (!domain) {
    showNotification('请输入要查询的域名', 'warning');
    gsap.fromTo(elements.searchSection,
      { x: 0 },
      { x: 10, duration: 0.1, yoyo: true, repeat: 2 }
    );
    return;
  }

  showNotification(`正在查询域名: ${domain}`, 'info');
  
  gsap.to(elements.searchSection, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      window.location.href = `apply.html?domain=${encodeURIComponent(domain)}`;
    }
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

function init() {
  initGSAPAnimations();
  initEventListeners();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
