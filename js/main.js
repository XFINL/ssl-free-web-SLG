const elements = {
  searchInput: document.querySelector('.search-input'),
  searchIcon: document.querySelector('.search-icon'),
  searchBox: document.querySelector('.search-box'),
  priceCards: document.querySelectorAll('.price-card'),
  cardButtons: document.querySelectorAll('.card-button'),
  logo: document.querySelector('.logo')
};

let searchTimeout = null;

function initEventListeners() {
  if (elements.searchInput) {
    elements.searchInput.addEventListener('focus', handleInputFocus);
    elements.searchInput.addEventListener('blur', handleInputBlur);
    elements.searchInput.addEventListener('input', debounce(handleInputChange, 300));
    elements.searchInput.addEventListener('keypress', handleKeyPress);
  }
  
  if (elements.searchIcon) {
    elements.searchIcon.addEventListener('click', handleSearch);
  }
  
  elements.priceCards.forEach(card => {
    card.addEventListener('mouseenter', handleCardHover);
    card.addEventListener('mouseleave', handleCardLeave);
    card.addEventListener('click', handleCardClick);
  });
  
  elements.cardButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
    button.addEventListener('mouseenter', handleButtonHover);
    button.addEventListener('mouseleave', handleButtonLeave);
  });
  
  if (elements.logo) {
    elements.logo.addEventListener('click', handleLogoClick);
  }
}

function handleInputFocus(event) {
  const input = event.target;
  input.setAttribute('data-focused', 'true');
  animateElement(input.parentElement, 'focused');
}

function handleInputBlur(event) {
  const input = event.target;
  input.removeAttribute('data-focused');
}

function handleInputChange(event) {
  const value = event.target.value.trim();
  
  if (value.length > 0) {
    elements.searchIcon.style.color = '#ffffff';
    elements.searchIcon.style.transform = 'scale(1.1)';
  } else {
    elements.searchIcon.style.color = '';
    elements.searchIcon.style.transform = 'scale(1)';
  }
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    handleSearch(event);
  }
}

function handleSearch(event) {
  const query = elements.searchInput.value.trim();
  
  if (query) {
    showNotification(`正在搜索域名: ${query}`, 'info');
    setTimeout(() => {
      showNotification('域名查询功能即将上线', 'success');
    }, 1000);
  } else {
    elements.searchInput.focus();
    showNotification('请输入要查询的域名', 'warning');
  }
}

function handleCardHover(event) {
  const card = event.currentTarget;
  card.style.transform = 'translateY(-8px)';
  card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(255, 255, 255, 0.05)';
}

function handleCardLeave(event) {
  const card = event.currentTarget;
  card.style.transform = 'translateY(0)';
  card.style.boxShadow = '';
}

function handleCardClick(event) {
  const card = event.currentTarget;
  const cardType = card.dataset.type;
  const cardTitle = card.querySelector('.card-title').textContent;
  
  animateElement(card, 'clicked');
  
  setTimeout(() => {
    showNotification(`您选择了: ${cardTitle}`, 'info');
  }, 200);
}

function handleButtonClick(event) {
  event.stopPropagation();
  const button = event.target;
  const card = button.closest('.price-card');
  const cardType = card.dataset.type;
  const price = card.querySelector('.price-value').textContent;
  
  animateButtonClick(button);
  
  setTimeout(() => {
    if (cardType === 'wildcard') {
      showNotification('泛域名证书申请流程启动中... ¥15/张', 'success');
    } else if (cardType === 'single') {
      showNotification('单域名证书申请流程启动中... ¥5/张', 'success');
    }
  }, 300);
}

function handleButtonHover(event) {
  const button = event.target;
  button.style.transform = 'scale(1.02)';
  button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
}

function handleButtonLeave(event) {
  const button = event.target;
  button.style.transform = 'scale(1)';
  button.style.boxShadow = '';
}

function handleLogoClick() {
  showNotification('欢迎使用 SecureSSL 证书申请平台', 'info');
  animateElement(elements.logo, 'logo-bounce');
}

function animateElement(element, animationClass) {
  if (!element) return;
  
  element.classList.add(animationClass);
  
  setTimeout(() => {
    element.classList.remove(animationClass);
  }, 300);
}

function animateButtonClick(button) {
  button.style.transform = 'scale(0.95)';
  button.style.opacity = '0.8';
  
  setTimeout(() => {
    button.style.transform = 'scale(1)';
    button.style.opacity = '1';
  }, 150);
}

function showNotification(message, type = 'info') {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    color: #ffffff;
    font-size: 14px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function debounce(func, wait) {
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(searchTimeout);
      searchTimeout = null;
    };
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    searchTimeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

function init() {
  initEventListeners();
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideOut {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100px);
      }
    }
    
    .notification-info {
      border-left: 3px solid rgba(100, 181, 246, 1);
    }
    
    .notification-success {
      border-left: 3px solid rgba(129, 199, 132, 1);
    }
    
    .notification-warning {
      border-left: 3px solid rgba(255, 213, 79, 1);
    }
    
    .notification-error {
      border-left: 3px solid rgba(239, 83, 80, 1);
    }
  `;
  document.head.appendChild(style);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
