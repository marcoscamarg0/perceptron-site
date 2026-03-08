// Equipe fixa no frontend — imagens via EQUIPE_IMAGES (equipeImages.js)
const EQUIPE_FIXA = [
    { id:'1', name:'Igor Andrey Roselli',     role:'Especialista em Regulação',              bio:'Graduado em Gestão Pública pelo IFB e graduando em Direito pelo UniCEUB. Pós-graduando em Direito e Regulação do Setor Elétrico. Experiência na ANEEL e ANM.',                                                                                            specialty:'Regulação · Setor Elétrico · Mineração',               imageKey:'igor'    },
    { id:'2', name:'Rodrigo Alex Roselli',    role:'Engenheiro Civil — Infraestrutura',       bio:'Engenheiro Civil pela USP. Consultor com mais de 15 anos de experiência em concessões rodoviárias e engenharia de infraestrutura, com atuação em implantação, conservação e gestão contratual.',                                                           specialty:'Rodovias · Concessões · Infraestrutura',                imageKey:'rodrigo' },
    { id:'3', name:'Marcos Vinicius Roselli', role:'Engenheiro Mecânico — Gestão Pública',    bio:'Engenheiro Mecânico e Mestre pela UNIFEI. Experiência em gestão pública municipal, financeira, saúde e gestão territorial censitária.',                                                                                                                    specialty:'Gestão Pública · Saneamento · Financeiro',              imageKey:'marcos'  },
    { id:'4', name:'Renato Henrique Roselli', role:'Engenheiro Civil — Projetos',             bio:'Engenheiro Civil pela EESC-USP. Consultor com mais de 17 anos de experiência em análise de tráfego, coordenação de projetos executivos, estruturas e usinas hidrelétricas.',                                                                              specialty:'Projetos Executivos · Tráfego · Estruturas',            imageKey:'renato'  },
    { id:'5', name:'Luísa Simei',             role:'Engenheira Eletricista — Setor Elétrico', bio:'Engenheira Eletricista pela UnB. Pós-graduada em Gestão de Riscos na Comercialização de Energia pela USP. Experiência na ANEEL, CCEE e em consultorias especializadas no mercado de energia.',                                                           specialty:'Regulação · Comercialização de Energia · Gestão de Riscos', imageKey:'luisa' }
];

async function renderSobrePage() {
    const el = document.getElementById('sobrePage');

    // Carrega membros fixos + eventuais extras adicionados pelo admin no backend
    let extras = [];
    try { extras = (await API.getEquipe()).filter(m => !['1','2','3','4','5'].includes(m.id)); } catch(e) {}
    AppState.equipe = [...EQUIPE_FIXA, ...extras];

    el.innerHTML = `
        <div class="page-hero">
            <div class="page-hero-inner">
                <div class="page-hero-label">
                    <div class="page-hero-label-line"></div>
                    <span class="page-hero-label-text">Nossa história</span>
                </div>
                <h1 class="page-hero-title">Quem<br><em>Somos</em> Nós</h1>
                <p class="page-hero-sub">Equipe multidisciplinar que integra regulação, gestão pública, direito e diferentes ramos da engenharia para construir soluções que funcionem na prática.</p>
            </div>
        </div>

        <div class="sobre-content">
            <div class="sobre-grid">
                <div>
                    <p class="sobre-text-big">
                        A <strong>Perceptron Consultoria</strong> é especializada em regulação e infraestrutura, com foco em apoio técnico e estratégico para planejar, regular, contratar, operar e melhorar serviços públicos e concessões.
                    </p>
                    <p class="sobre-text-body">
                        Nosso foco é sempre a excelência. Na Perceptron, a busca pela excelência orienta cada entrega, do diagnóstico à recomendação final. Atuamos com rigor técnico, clareza e compromisso com resultados, transformando complexidade em decisões seguras e aplicáveis no setor de infraestrutura.
                    </p>
                    <p class="sobre-text-body">
                        Somos uma equipe multidisciplinar que integra regulação, gestão pública, direito e diferentes ramos da engenharia. Essa combinação amplia a capacidade de compreender o problema por inteiro, alinhar visão institucional e operacional, e construir soluções que funcionem na prática.
                    </p>
                    <p class="sobre-text-body">
                        Atuamos com governança, previsibilidade e qualidade, sempre com entregas claras, auditáveis e aplicáveis. Apoiamos tanto órgãos públicos quanto empresas que atuam com o poder público, organizando materiais técnicos, planos de execução e rotinas de acompanhamento.
                    </p>
                </div>

                <div class="sobre-values">
                    <div class="sobre-value-item">
                        <span class="sobre-value-num">01</span>
                        <div>
                            <div class="sobre-value-title">Rigor Técnico</div>
                            <div class="sobre-value-desc">Cada análise é fundamentada em premissas explícitas, metodologia clara e rastreabilidade de dados, garantindo credibilidade e confiança nas entregas.</div>
                        </div>
                    </div>
                    <div class="sobre-value-item">
                        <span class="sobre-value-num">02</span>
                        <div>
                            <div class="sobre-value-title">Clareza e Objetividade</div>
                            <div class="sobre-value-desc">Transformamos complexidade regulatória e técnica em informação acessível, com recomendações objetivas prontas para subsidiar decisões.</div>
                        </div>
                    </div>
                    <div class="sobre-value-item">
                        <span class="sobre-value-num">03</span>
                        <div>
                            <div class="sobre-value-title">Visão Multidisciplinar</div>
                            <div class="sobre-value-desc">A integração de regulação, direito, engenharia e gestão pública permite compreender o problema por inteiro e construir soluções mais robustas.</div>
                        </div>
                    </div>
                    <div class="sobre-value-item">
                        <span class="sobre-value-num">04</span>
                        <div>
                            <div class="sobre-value-title">Compromisso com Resultados</div>
                            <div class="sobre-value-desc">Atuamos com foco em previsibilidade e governança, garantindo que as entregas gerem impacto real e sejam aplicáveis no ciclo de vida dos contratos e projetos.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sobre-timeline">
                <div class="section-label" style="margin-bottom:2.5rem">
                    <div class="section-label-line"></div>
                    <span class="section-label-text">Nossos Escritórios</span>
                </div>
                <div class="timeline-grid">
                    <div class="timeline-item">
                        <div class="timeline-year">Sede</div>
                        <div class="timeline-desc">Ribeirão Preto — SP. Av. Dr. Plínio de Castro Prado, nº 288, Sala 23, Paulista Office, Jardim Palma Travassos. CEP: 14.091-170.</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">Brasília</div>
                        <div class="timeline-desc">Brasília — DF. SHI/S QI 7 Comércio Local, BL B, SL 201, Setor de Habitações Individuais. CEP: 71615-720.</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">Contato</div>
                        <div class="timeline-desc">+55 61 8180-2825. Atendimento presencial e remoto para todo o Brasil, com foco em setores regulados e infraestrutura pública.</div>
                    </div>
                </div>
            </div>

            <div class="sobre-timeline" style="margin-top:0">
                <div class="section-label" style="margin-bottom:2.5rem">
                    <div class="section-label-line"></div>
                    <span class="section-label-text">Parceiros</span>
                </div>
                <div style="padding:2rem 0;">
                    <p style="font-family:var(--font-body);font-size:1rem;color:var(--text-secondary);line-height:1.7;">
                        <strong>Fundação Instituto de Administração (FIA)</strong> — parceiro estratégico da Perceptron Consultoria no desenvolvimento de soluções para gestão pública, regulação e infraestrutura.
                    </p>
                </div>
            </div>

            <div class="equipe-section">
                <div class="section-label">
                    <div class="section-label-line"></div>
                    <span class="section-label-text">Time</span>
                </div>
                <h2 class="section-title-serif" style="margin-top:.5rem;margin-bottom:.5rem">Nossa <em>Equipe</em></h2>
                <p style="font-family:var(--font-body);font-size:.88rem;color:var(--text-muted);max-width:480px;line-height:1.7">
                    Especialistas com formação e experiência complementares em regulação, engenharia, gestão pública e direito, unidos pela busca da excelência técnica.
                </p>
                <div class="equipe-grid" id="equipeGrid"></div>
            </div>
        </div>
    `;

    renderEquipeGrid();
    document.addEventListener('authChanged', () => renderEquipeGrid());
}

function renderEquipeGrid() {
    const grid = document.getElementById('equipeGrid');
    if (!grid) return;
    grid.innerHTML = '';

    AppState.equipe.forEach(m => {
        const card = document.createElement('div');
        card.className = `equipe-card ${AppState.isAdminMode ? 'admin-border' : ''}`;
        const imgSrc = m.imageKey
            ? (typeof EQUIPE_IMAGES !== 'undefined' ? EQUIPE_IMAGES[m.imageKey] : '')
            : (m.imageUrl || '');
        const hasImg = imgSrc && imgSrc.trim() !== '';
        
        card.innerHTML = `
            <div class="equipe-card-top">
                <div class="equipe-avatar-wrap">
                    ${hasImg
                        ? `<img class="equipe-avatar-img" src="${imgSrc}" alt="${m.name}" />`
                        : `<div class="equipe-avatar">
                            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                           </div>`
                    }
                    ${AppState.isAdminMode ? `
                    <div class="equipe-avatar-upload-overlay">
                        <label class="upload-label">
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            Trocar foto
                            <input type="file" class="upload-input" accept="image/*" />
                        </label>
                    </div>` : ''}
                </div>
            </div>
            <div class="equipe-card-body">
                <div class="equipe-role">${m.role}</div>
                <h3 class="equipe-name">${m.name}</h3>
                <p class="equipe-bio">"${m.bio}"</p>
                <span class="equipe-specialty">${m.specialty}</span>
            </div>
            <div class="card-admin-actions ${AppState.isAdminMode ? 'active' : ''}">
                <button class="action-btn delete-btn" data-id="${m.id}">
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        `;
        
        // Upload de imagem — salva localmente no AppState
        const fileInput = card.querySelector('.upload-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const idx = AppState.equipe.findIndex(x => x.id === m.id);
                    if (idx !== -1) {
                        AppState.equipe[idx] = { ...AppState.equipe[idx], imageUrl: ev.target.result, imageKey: null };
                    }
                    // Tenta salvar no backend também (melhor esforço)
                    API.updateMembro(m.id, { imageUrl: ev.target.result }).catch(() => {});
                    renderEquipeGrid();
                };
                reader.readAsDataURL(file);
            });
        }

        // Editar campos ao clicar no card (modo admin)
        card.querySelector('.equipe-card-body')?.addEventListener('click', () => {
            if (!AppState.isAdminMode) return;
            const idx = AppState.equipe.findIndex(x => x.id === m.id);
            if (idx === -1) return;
            const name = prompt('Nome:', m.name); if (name === null) return;
            const role = prompt('Cargo:', m.role) ?? m.role;
            const bio  = prompt('Bio:', m.bio)   ?? m.bio;
            const spec = prompt('Especialidade:', m.specialty) ?? m.specialty;
            AppState.equipe[idx] = { ...AppState.equipe[idx], name, role, bio, specialty: spec };
            // Tenta salvar no backend (melhor esforço)
            API.updateMembro(m.id, { name, role, bio, specialty: spec }).catch(() => {});
            renderEquipeGrid();
        });
        
        card.querySelector('.delete-btn')?.addEventListener('click', async () => {
            if (!AppState.isAdminMode) return;
            if (confirm(`Remover ${m.name}?`)) {
                AppState.equipe = AppState.equipe.filter(x => x.id !== m.id);
                API.deleteMembro(m.id).catch(() => {});
                renderEquipeGrid();
            }
        });
        grid.appendChild(card);
    });

    if (AppState.isAdminMode) {
        const add = document.createElement('div');
        add.className = 'add-member-card';
        add.innerHTML = `
            <svg width="34" height="34" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span style="font-family:var(--font-aux);font-size:.68rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase">Adicionar Membro</span>
        `;
        add.addEventListener('click', async () => {
            const name = prompt('Nome completo:'); if (!name) return;
            const role = prompt('Cargo:') || 'Consultor';
            const bio  = prompt('Bio:')  || '';
            const spec = prompt('Especialidade:') || '';
            const novo = { id: Date.now().toString(), name, role, bio, specialty: spec, imageUrl: '' };
            AppState.equipe.push(novo);
            // Tenta salvar no backend (melhor esforço)
            API.createMembro({ name, role, bio, specialty: spec }).catch(() => {});
            renderEquipeGrid();
        });
        grid.appendChild(add);
    }
}
