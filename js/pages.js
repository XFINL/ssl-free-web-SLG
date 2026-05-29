const Pages = {
    home: () => `
        <section class="hero">
            <div class="container">
                <div class="grid">
                    <div class="grid-item col-1-8">
                        <div class="hero-content">
                            <div class="hero-label page-element">安全证书</div>
                            <h1 class="hero-title page-element">SSL证书<br/>申请服务</h1>
                            <p class="hero-subtitle page-element">保护您的网站安全，建立用户信任</p>
                        </div>
                    </div>
                    <div class="grid-item col-9-12">
                        <a href="#/apply" class="cta-button page-element">立即申请</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <div class="grid">
                    <div class="grid-item col-1-2">
                        <div class="section-label page-element">01</div>
                    </div>
                    <div class="grid-item col-3-12">
                        <h2 class="section-title page-element">核心功能</h2>
                    </div>
                </div>
                <div class="grid feature-grid">
                    <div class="grid-item col-1-4">
                        <div class="feature-item page-element">
                            <div class="feature-num">01</div>
                            <div class="feature-content">
                                <h3>快速申请</h3>
                                <p>简化的申请流程，几分钟即可完成</p>
                            </div>
                        </div>
                    </div>
                    <div class="grid-item col-5-8">
                        <div class="feature-item page-element">
                            <div class="feature-num">02</div>
                            <div class="feature-content">
                                <h3>256位加密</h3>
                                <p>最高级别的安全加密标准</p>
                            </div>
                        </div>
                    </div>
                    <div class="grid-item col-9-12">
                        <div class="feature-item page-element">
                            <div class="feature-num">03</div>
                            <div class="feature-content">
                                <h3>自动续期</h3>
                                <p>智能提醒与自动续期服务</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="pricing">
            <div class="container">
                <div class="grid">
                    <div class="grid-item col-1-2">
                        <div class="section-label page-element">02</div>
                    </div>
                    <div class="grid-item col-3-12">
                        <h2 class="section-title page-element">选择方案</h2>
                    </div>
                </div>
                <div class="grid pricing-grid">
                    <div class="grid-item col-1-4">
                        <div class="price-item page-element">
                            <div class="price-header">
                                <div class="price-level">基础</div>
                            </div>
                            <div class="price-main">
                                <div class="price-amount">免费</div>
                                <div class="price-period">3个月</div>
                            </div>
                            <ul class="price-list">
                                <li>单域名支持</li>
                                <li>DV验证</li>
                                <li>256位加密</li>
                            </ul>
                            <button class="price-action" data-plan="basic">选择</button>
                        </div>
                    </div>
                    <div class="grid-item col-5-8">
                        <div class="price-item featured page-element">
                            <div class="price-header">
                                <div class="price-level">专业</div>
                                <div class="price-mark">推荐</div>
                            </div>
                            <div class="price-main">
                                <div class="price-amount">299</div>
                                <div class="price-currency">CNY</div>
                                <div class="price-period">每年</div>
                            </div>
                            <ul class="price-list">
                                <li>多域名支持</li>
                                <li>OV验证</li>
                                <li>256位加密</li>
                                <li>优先支持</li>
                            </ul>
                            <button class="price-action" data-plan="pro">选择</button>
                        </div>
                    </div>
                    <div class="grid-item col-9-12">
                        <div class="price-item page-element">
                            <div class="price-header">
                                <div class="price-level">企业</div>
                            </div>
                            <div class="price-main">
                                <div class="price-amount">999</div>
                                <div class="price-currency">CNY</div>
                                <div class="price-period">每年</div>
                            </div>
                            <ul class="price-list">
                                <li>通配符支持</li>
                                <li>EV验证</li>
                                <li>256位加密</li>
                                <li>专属客服</li>
                            </ul>
                            <button class="price-action" data-plan="enterprise">选择</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,

    apply: () => `
        <section class="application">
            <div class="container">
                <div class="grid">
                    <div class="grid-item col-1-2">
                        <div class="section-label page-element">01</div>
                    </div>
                    <div class="grid-item col-3-12">
                        <h2 class="section-title page-element">证书申请</h2>
                    </div>
                </div>
                <div class="grid application-grid">
                    <div class="grid-item col-1-6">
                        <form class="application-form page-element" id="sslForm">
                            <div class="form-field">
                                <label class="form-label">域名</label>
                                <input type="text" id="domain" name="domain" placeholder="example.com" required>
                            </div>
                            <div class="form-field">
                                <label class="form-label">证书类型</label>
                                <select id="type" name="type" required>
                                    <option value="">请选择</option>
                                    <option value="dv">DV 域名验证</option>
                                    <option value="ov">OV 组织验证</option>
                                    <option value="ev">EV 扩展验证</option>
                                </select>
                            </div>
                            <div class="form-field">
                                <label class="form-label">联系邮箱</label>
                                <input type="email" id="email" name="email" placeholder="contact@example.com" required>
                            </div>
                            <div class="form-field">
                                <label class="form-label">组织名称</label>
                                <input type="text" id="organization" name="organization" placeholder="您的组织名称">
                            </div>
                            <div class="form-action">
                                <button type="submit" class="submit-button">提交申请</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `,

    mine: () => {
        const certificates = window.appState.certificates || [];
        return `
            <section class="mine">
                <div class="container">
                    <div class="grid">
                        <div class="grid-item col-1-2">
                            <div class="section-label page-element">01</div>
                        </div>
                        <div class="grid-item col-3-12">
                            <h2 class="section-title page-element">我的证书</h2>
                        </div>
                    </div>
                    ${certificates.length > 0 ? `
                        <div class="grid certificates-grid">
                            ${certificates.map((cert, index) => `
                                <div class="grid-item col-1-4">
                                    <div class="cert-item page-element">
                                        <div class="cert-header">
                                            <div class="cert-domain">${cert.domain}</div>
                                            <div class="cert-status ${cert.status}">${getStatusText(cert.status)}</div>
                                        </div>
                                        <div class="cert-info">
                                            <div class="cert-info-row">
                                                <span class="cert-label">类型</span>
                                                <span class="cert-value">${getTypeText(cert.type)}</span>
                                            </div>
                                            <div class="cert-info-row">
                                                <span class="cert-label">申请时间</span>
                                                <span class="cert-value">${cert.date}</span>
                                            </div>
                                            <div class="cert-info-row">
                                                <span class="cert-label">到期时间</span>
                                                <span class="cert-value">${cert.expiry}</span>
                                            </div>
                                        </div>
                                        <div class="cert-actions">
                                            <button class="cert-btn" data-action="download">下载</button>
                                            <button class="cert-btn" data-action="renew">续期</button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="empty-state">
                            <div class="empty-icon page-element"></div>
                            <p class="empty-text page-element">暂无证书</p>
                            <a href="#/apply" class="empty-btn page-element">去申请</a>
                        </div>
                    `}
                </div>
            </section>
        `;
    }
};

function getStatusText(status) {
    const map = {
        'active': '有效',
        'pending': '审核中',
        'expired': '已过期'
    };
    return map[status] || status;
}

function getTypeText(type) {
    const map = {
        'dv': 'DV域名验证',
        'ov': 'OV组织验证',
        'ev': 'EV扩展验证'
    };
    return map[type] || type;
}
