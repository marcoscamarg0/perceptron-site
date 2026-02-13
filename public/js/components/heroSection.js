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
                        <span class="hero-eyebrow-text">Regulação & Infraestrutura · Consultoria Especializada</span>
                    </div>
                    <h1 class="hero-title anim-up anim-d2">
                        <em>Consultoria especializada</em>
                        <strong>em regulação e infraestrutura</strong>
                    </h1>
                    <p class="hero-desc anim-up anim-d3">
                        Apoio técnico e estratégico para planejar, regular, contratar, operar
                        e melhorar serviços públicos e concessões, com entregas claras,
                        auditáveis e aplicáveis.
                    </p>
                    <div class="hero-actions anim-up anim-d4">
                        <button class="btn-primary" onclick="Navigation.go('contato')">
                            Fale Conosco
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                        <button class="btn-outline" onclick="Navigation.go('sobre')">
                            Conheça a Equipe
                        </button>
                    </div>
                    <div class="hero-badges anim-up anim-d4">
                        <div class="hero-badge">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Rigor Técnico
                        </div>
                        <div class="hero-badge">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                            Entregas Auditáveis
                        </div>
                        <div class="hero-badge">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                            Equipe Multidisciplinar
                        </div>
                    </div>
                </div>

                <div class="hero-visual anim-up anim-d2">
                    <div class="hero-card-stack">
                        <div class="hero-card hero-card-1">
                            <div class="hero-stat">
                                <div class="hero-stat-num">17+</div>
                                <div class="hero-stat-label">Anos de experiência</div>
                            </div>
                            <div class="hero-divider"></div>
                            <div class="hero-stat">
                                <div class="hero-stat-num">6</div>
                                <div class="hero-stat-label">Áreas de atuação</div>
                            </div>
                            <div class="hero-divider"></div>
                            <span class="hero-tag">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>
                                Projetos em andamento
                            </span>
                        </div>
                        <div class="hero-card hero-card-2">
                            <div class="hero-stat">
                                <div class="hero-stat-num">100%</div>
                                <div class="hero-stat-label">Foco em excelência</div>
                            </div>
                            <div class="hero-divider"></div>
                            <div class="hero-tag">Regulação · Infraestrutura · Gestão Pública</div>
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
