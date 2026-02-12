function renderHeroSection() {
    const el = document.getElementById('heroSection');
    el.innerHTML = `
        <div class="hero">
            <div class="hero-bg"></div>
            <div class="hero-grid"></div>
            <div class="hero-inner">
                <div class="hero-content">
                    <div class="hero-eyebrow anim-up anim-d1">
                        <div class="hero-eyebrow-line"></div>
                        <span class="hero-eyebrow-text">Consultoria Jurídica & Tecnologia · Est. 2009</span>
                    </div>
                    <h1 class="hero-title anim-up anim-d2">
                        <em>Lorem ipsum dolor</em>
                        <strong>Sit amet consectetur</strong>
                    </h1>
                    <p class="hero-desc anim-up anim-d3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                    </p>
                    <div class="hero-actions anim-up anim-d4">
                        <button class="btn-primary" onclick="Navigation.go('contato')">
                            Consultar Agora
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                        <button class="btn-outline" onclick="Navigation.go('sobre')">
                            Conheça o Escritório
                        </button>
                    </div>
                    <div class="hero-badges anim-up anim-d4">
                        <div class="hero-badge">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            OAB/DF Certificado
                        </div>
                        <div class="hero-badge">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                            ISO 27001
                        </div>
                        <div class="hero-badge">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                            ANPD Compliance
                        </div>
                    </div>
                </div>

                <div class="hero-visual anim-up anim-d2">
                    <div class="hero-card-stack">
                        <div class="hero-card hero-card-1">
                            <div class="hero-stat">
                                <div class="hero-stat-num">15+</div>
                                <div class="hero-stat-label">Anos de experiência</div>
                            </div>
                            <div class="hero-divider"></div>
                            <div class="hero-stat">
                                <div class="hero-stat-num">320+</div>
                                <div class="hero-stat-label">Clientes atendidos</div>
                            </div>
                            <div class="hero-divider"></div>
                            <span class="hero-tag">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>
                                Atendimentos em andamento
                            </span>
                        </div>
                        <div class="hero-card hero-card-2">
                            <div class="hero-stat">
                                <div class="hero-stat-num">98%</div>
                                <div class="hero-stat-label">Taxa de satisfação — NPS</div>
                            </div>
                            <div class="hero-divider"></div>
                            <div class="hero-tag">Lorem · Ipsum · Dolor · Sit</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hero-scroll" onclick="document.getElementById('areasSection').scrollIntoView({behavior:'smooth'})">
                <span class="hero-scroll-text">Ver áreas de atuação</span>
                <div class="hero-scroll-line"></div>
            </div>
        </div>
    `;
}
