const Pages = {
    home: () => `
        <section class="hero-simple">
            <div class="container">
                <div class="hero-center">
                    <div class="logo-large page-element">SSL</div>
                    <div class="domain-form page-element">
                        <div class="domain-input-wrapper">
                            <input type="text" id="homeDomain" class="domain-input" placeholder="example.com" />
                            <button id="getCertBtn" class="get-cert-btn">获取证书</button>
                        </div>
                    </div>
                    
                    <div class="pricing-simple page-element">
                        <div class="price-card">
                            <div class="price-card-title">单域名</div>
                            <div class="price-card-price">¥5</div>
                            <div class="price-card-period">/3个月</div>
                        </div>
                        <div class="price-divider">
                            <span>或</span>
                        </div>
                        <div class="price-card">
                            <div class="price-card-title">泛域名</div>
                            <div class="price-card-price">¥10</div>
                            <div class="price-card-period">/3个月</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <nav class="mobile-float-nav">
            <a href="#/" class="float-nav-item active">首页</a>
            <a href="#/apply" class="float-nav-item">申请</a>
            <a href="#/mine" class="float-nav-item">我的</a>
        </nav>
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
