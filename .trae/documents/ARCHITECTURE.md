# SSL证书申请平台 - 技术架构文档

## 1. 项目技术栈

### 1.1 前端技术
- **HTML5**: 语义化结构
- **CSS3**: 
  - Flexbox / CSS Grid 布局
  - CSS Variables (自定义属性)
  - backdrop-filter 实现玻璃态
  - CSS Animations / Transitions
- **Vanilla JavaScript**: 
  - DOM 操作
  - 事件处理
  - 动画控制

### 1.2 外部资源
- **阿里巴巴图标库**
  - CDN引入
  - 图标名称：icon-search（搜索图标）
  - Unicode 或 Symbol 方式引用

---

## 2. 文件结构

```
/workspace/
├── index.html          # 首页入口文件
├── css/
│   └── styles.css      # 所有样式表
├── js/
│   └── main.js         # 所有JavaScript逻辑
└── .trae/
    └── documents/
        ├── PRD.md         # 产品需求文档
        └── ARCHITECTURE.md # 本文档
```

---

## 3. CSS架构设计

### 3.1 样式组织
```css
/* styles.css 结构大纲 */

/* 1. CSS Variables (CSS变量) */
:root {
  /* 颜色系统 */
  --bg-primary: #0a0a0a;
  --text-primary: #ffffff;
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.15);
  
  /* 圆角系统 */
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 24px;
  
  /* 间距系统 */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 40px;
}

/* 2. Reset & Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}

/* 3. 玻璃态工具类 */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* 4. 布局组件 */
.container { ... }
.header { ... }
.main-content { ... }

/* 5. 功能组件 */
.logo { ... }
.search-box { ... }
.price-card { ... }

/* 6. 动画定义 */
@keyframes fadeIn { ... }
@keyframes float { ... }

/* 7. 响应式断点 */
@media (max-width: 768px) { ... }
```

### 3.2 玻璃态效果实现
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### 3.3 液态光泽效果
```css
.liquid-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s;
}

.liquid-shine:hover::before {
  left: 100%;
}
```

---

## 4. JavaScript架构设计

### 4.1 模块组织
```javascript
// main.js 结构大纲

// 1. DOM 元素引用
const elements = {
  searchInput: document.querySelector('.search-input'),
  searchIcon: document.querySelector('.search-icon'),
  priceCards: document.querySelectorAll('.price-card')
};

// 2. 事件监听器设置
function initEventListeners() {
  // 输入框事件
  elements.searchInput.addEventListener('focus', handleInputFocus);
  elements.searchInput.addEventListener('blur', handleInputBlur);
  elements.searchInput.addEventListener('input', handleInputChange);
  
  // 搜索图标点击
  elements.searchIcon.addEventListener('click', handleSearch);
  
  // 价格卡片事件
  elements.priceCards.forEach(card => {
    card.addEventListener('mouseenter', handleCardHover);
    card.addEventListener('mouseleave', handleCardLeave);
    card.addEventListener('click', handleCardClick);
  });
}

// 3. 事件处理器
function handleInputFocus(e) { ... }
function handleInputBlur(e) { ... }
function handleInputChange(e) { ... }
function handleSearch(e) { ... }
function handleCardHover(e) { ... }
function handleCardLeave(e) { ... }
function handleCardClick(e) { ... }

// 4. 动画控制
function animateElement(element, animationClass) { ... }

// 5. 初始化
document.addEventListener('DOMContentLoaded', init);
```

### 4.2 功能函数清单
| 函数名 | 功能描述 | 参数 | 返回值 |
|--------|---------|------|--------|
| `initEventListeners` | 初始化所有事件监听 | 无 | void |
| `handleInputFocus` | 输入框聚焦处理 | Event | void |
| `handleInputBlur` | 输入框失焦处理 | Event | void |
| `handleInputChange` | 输入框内容变化处理 | Event | void |
| `handleSearch` | 搜索图标点击处理 | Event | void |
| `handleCardHover` | 价格卡片悬停处理 | Event | void |
| `handleCardLeave` | 价格卡片离开处理 | Event | void |
| `handleCardClick` | 价格卡片点击处理 | Event | void |
| `animateElement` | 元素动画控制 | Element, String | void |

---

## 5. HTML结构设计

### 5.1 文档结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SSL证书申请平台</title>
  <!-- 阿里巴巴图标库 -->
  <link rel="stylesheet" href="//at.alicdn.com/t/font_xxxxx.css">
  <!-- 自定义样式 -->
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div class="container">
    
    <!-- Header / Logo 区域 -->
    <header class="header">
      <div class="logo">
        <span class="logo-text">SecureSSL</span>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main class="main-content">
      
      <!-- 搜索框区域 -->
      <section class="search-section">
        <div class="search-box glass">
          <input 
            type="text" 
            class="search-input" 
            placeholder="输入您的域名..."
            aria-label="域名搜索"
          >
          <span class="search-icon iconfont icon-search"></span>
        </div>
      </section>

      <!-- 价格模块区域 -->
      <section class="pricing-section">
        
        <!-- 泛域名证书卡片 -->
        <article class="price-card glass liquid-shine">
          <div class="card-badge">Wildcard</div>
          <h3 class="card-title">泛域名SSL证书</h3>
          <p class="card-description">保护主域名及所有子域名</p>
          <div class="card-price">
            <span class="price-symbol">¥</span>
            <span class="price-value">15</span>
            <span class="price-unit">/张</span>
          </div>
          <button class="card-button">立即申请</button>
        </article>

        <!-- 单域名证书卡片 -->
        <article class="price-card glass liquid-shine">
          <div class="card-badge">Single</div>
          <h3 class="card-title">单域名SSL证书</h3>
          <p class="card-description">保护单个域名</p>
          <div class="card-price">
            <span class="price-symbol">¥</span>
            <span class="price-value">5</span>
            <span class="price-unit">/张</span>
          </div>
          <button class="card-button">立即申请</button>
        </article>

      </section>
    </main>

    <!-- 背景装饰元素 -->
    <div class="bg-decoration">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
    </div>

  </div>

  <!-- JavaScript -->
  <script src="js/main.js"></script>
</body>
</html>
```

---

## 6. 性能优化策略

### 6.1 CSS优化
- 使用CSS变量减少重复代码
- 避免使用 @import 引入字体
- 使用 transform 和 opacity 进行动画（GPU加速）

### 6.2 JavaScript优化
- DOM操作缓存化
- 事件委托处理重复元素
- 防抖处理输入事件

### 6.3 资源加载
- 关键CSS内联（可选）
- 异步加载非关键JS
- 图标库按需加载

---

## 7. 浏览器兼容性

### 7.1 支持的浏览器
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### 7.2 兼容性处理
- backdrop-filter 需要 -webkit- 前缀
- 使用 @supports 检测不支持的浏览器
- 提供降级方案

---

## 8. 开发规范

### 8.1 代码规范
- 使用语义化HTML标签
- CSS类名采用 BEM 命名规范
- JavaScript使用 ES6+ 语法

### 8.2 文件命名
- HTML: 小写字母 + 连字符（kebab-case）
- CSS: 小写字母 + 连字符（kebab-case）
- JS: 小写字母 + 连字符（kebab-case）

### 8.3 代码风格
- 缩进：2空格
- 引号：双引号（HTML），单引号（JS）
- 注释：中文注释

---

## 9. 部署说明

### 9.1 构建步骤
本项目无需构建步骤，可直接部署静态文件。

### 9.2 部署要求
- Web服务器：Nginx / Apache / Vercel / Netlify
- HTTPS：必需（使用SSL证书网站需要HTTPS）
- 文件路径：保持相对路径结构
