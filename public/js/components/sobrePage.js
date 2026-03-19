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

    // Carrega equipe do Firebase
    try {
        AppState.equipe = await FirebaseDB.getEquipe();
        // Garante imageKey nos membros fixos
        AppState.equipe = AppState.equipe.map(m => {
            const fixo = EQUIPE_FIXA.find(f => f.id === m.id);
            return fixo ? { ...fixo, ...m } : m;
        });
    } catch(e) {
        console.warn('Firebase indisponível, usando dados fixos:', e);
        AppState.equipe = [...EQUIPE_FIXA];
    }

    el.innerHTML = `
        <div class="page-hero">
            <div class="page-hero-inner">
                <div class="page-hero-label">
                    <div class="page-hero-label-line"></div>
                    <span class="page-hero-label-text">Nossa história</span>
                </div>
                <h1 class="page-hero-title">Quem<br><em>Somos</em></h1>
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
                <div class="parceiros-grid">
                    <a href="https://www.fia.com.br" target="_blank" rel="noopener" class="parceiro-card">
                        <div class="parceiro-badge">Parceiro Estratégico</div>
                        <img src="/fia_logo.png" alt="FIA Business School" class="parceiro-logo" />
                        <div class="parceiro-divider"></div>
                        <div class="parceiro-name">Fundação Instituto de Administração</div>
                        <div class="parceiro-desc">Gestão pública · Regulação · Infraestrutura</div>
                    </a>
                </div>
            </div>

            <div class="equipe-section">
                <div class="section-label">
                    <div class="section-label-line"></div>
                    <span class="section-label-text">Time</span>
                </div>
                <h2 class="section-title-serif" style="margin-top:.5rem;margin-bottom:.5rem">Nossa <em>Equipe</em></h2>
                <p style="font-family:var(--font-body);font-size:.88rem;color:var(--text-muted);max-width:540px;line-height:1.7">
                    Especialistas com formação e experiência complementares em regulação, engenharia, gestão pública e direito, unidos pela busca da excelência técnica. A Perceptron conta com outros consultores temporários para projetos específicos.
                </p>
                <div class="equipe-grid" id="equipeGrid"></div>
            </div>
        </div>
    `;

    renderEquipeGrid();
    document.addEventListener('authChanged', () => renderEquipeGrid());
}

async function saveEquipeToStorage() {
    // Não precisa fazer nada — Firebase já salva em tempo real
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
            <div class="equipe-card-top" style="cursor:pointer">
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
                        <label class="upload-label" onclick="event.stopPropagation()">
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
            <div class="equipe-card-body" style="cursor:pointer">
                <div class="equipe-role">${m.role}</div>
                <h3 class="equipe-name">${m.name}</h3>
                <p class="equipe-bio">"${m.bio}"</p>
                <span class="equipe-specialty">${m.specialty}</span>
                ${!AppState.isAdminMode ? '<div class="equipe-ver-mais">Ver currículo →</div>' : ''}
            </div>
            ${AppState.isAdminMode ? `
            <div class="card-admin-actions active">
                <button class="action-btn edit-btn" data-id="${m.id}" title="Editar">
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="action-btn delete-btn" data-id="${m.id}" title="Remover">
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>` : ''}
        `;

        // Clique no card — abre currículo (modo normal) ou edita (modo admin)
        const cardTop  = card.querySelector('.equipe-card-top');
        const cardBody = card.querySelector('.equipe-card-body');
        [cardTop, cardBody].forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.closest('.upload-label') || e.target.closest('.upload-input')) return;
                if (AppState.isAdminMode) return;
                openCurriculoModal(m, imgSrc);
            });
        });

        // Upload de imagem
        const fileInput = card.querySelector('.upload-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const idx = AppState.equipe.findIndex(x => x.id === m.id);
                    if (idx !== -1) AppState.equipe[idx] = { ...AppState.equipe[idx], imageUrl: ev.target.result, imageKey: null };
                    const updated = { ...AppState.equipe.find(x => x.id === m.id) };
                    saveEquipeToStorage();
                    renderEquipeGrid();
                };
                reader.readAsDataURL(file);
            });
        }

        // Editar (botão lápis)
        card.querySelector('.edit-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!AppState.isAdminMode) return;
            openEditMembroModal(m);
        });

        // Deletar
        card.querySelector('.delete-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!AppState.isAdminMode) return;
            if (confirm(`Remover ${m.name}?`)) {
                AppState.equipe = AppState.equipe.filter(x => x.id !== m.id);
                saveEquipeToStorage();
                renderEquipeGrid();
            }
        });

        grid.appendChild(card);
    });

    if (AppState.isAdminMode) {
        const add = document.createElement('div');
        add.className = 'add-member-card';
        add.innerHTML = `
            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span style="font-family:var(--font-aux);font-size:.68rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase">Adicionar Consultor</span>
        `;
        add.addEventListener('click', () => openAddMembroModal());
        grid.appendChild(add);
    }
}

// ── Modal currículo (clique no card, modo normal) ─────
function openCurriculoModal(m, imgSrc) {
    const hasImg = imgSrc && imgSrc.trim() !== '';
    const ov = document.createElement('div');
    ov.className = 'modal-overlay active';
    ov.style.zIndex = '400';
    ov.innerHTML = `
        <div class="modal-box curriculo-modal" style="max-width:560px;padding:0;overflow:hidden;max-height:90vh;display:flex;flex-direction:column;">
            <button class="modal-x" id="cvClose" style="position:absolute;top:1rem;right:1rem;z-index:2">&times;</button>
            <div class="curriculo-header">
                ${hasImg ? `<img src="${imgSrc}" alt="${m.name}" class="curriculo-foto" />` : `<div class="curriculo-foto-placeholder"><svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`}
                <div class="curriculo-header-info">
                    <div class="curriculo-role">${m.role}</div>
                    <h2 class="curriculo-name">${m.name}</h2>
                    <span class="equipe-specialty" style="margin-top:.5rem;display:inline-block">${m.specialty}</span>
                </div>
            </div>
            <div class="curriculo-body" style="overflow-y:auto;flex:1;">
                <div class="curriculo-section-label">Sobre</div>
                <p class="curriculo-bio">${m.bio}</p>
                ${m.formacao ? `
                <div class="curriculo-section-label" style="margin-top:1.5rem">Formação Acadêmica</div>
                <p class="curriculo-bio">${m.formacao}</p>` : ''}
                ${m.experiencia ? `
                <div class="curriculo-section-label" style="margin-top:1.5rem">Experiência Profissional</div>
                <p class="curriculo-bio">${m.experiencia}</p>` : ''}
                ${m.publicacoes ? `
                <div class="curriculo-section-label" style="margin-top:1.5rem">Publicações e Projetos</div>
                <p class="curriculo-bio">${m.publicacoes}</p>` : ''}
                ${m.idiomas ? `
                <div class="curriculo-section-label" style="margin-top:1.5rem">Idiomas</div>
                <p class="curriculo-bio">${m.idiomas}</p>` : ''}
                ${m.linkedin ? `
                <div class="curriculo-section-label" style="margin-top:1.5rem">LinkedIn</div>
                <a href="${m.linkedin}" target="_blank" rel="noopener" class="curriculo-bio" style="color:var(--blue);text-decoration:none;">${m.linkedin}</a>` : ''}
            </div>
        </div>
    `;
    ov.querySelector('#cvClose').addEventListener('click', () => ov.remove());
    ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
    document.body.appendChild(ov);
}

// ── Modal adicionar consultor ─────────────────────────
function openAddMembroModal() {
    openMembroModal({ title: 'Novo Consultor', data: {},
        onSave: (d) => {
            const novo = { id: Date.now().toString(), ...d };
            AppState.equipe.push(novo);
            saveEquipeToStorage();
            renderEquipeGrid();
        }
    });
}

// ── Modal editar consultor ────────────────────────────
function openEditMembroModal(m) {
    openMembroModal({ title: 'Editar Consultor', data: m,
        onSave: (d) => {
            const idx = AppState.equipe.findIndex(x => x.id === m.id);
            if (idx !== -1) AppState.equipe[idx] = { ...AppState.equipe[idx], ...d };
            saveEquipeToStorage();
            renderEquipeGrid();
        }
    });
}

// ── Builder do modal de consultor ────────────────────
function openMembroModal({ title, data = {}, onSave }) {
    const ov = document.createElement('div');
    ov.className = 'modal-overlay active';
    ov.style.zIndex = '400';
    ov.innerHTML = `
        <div class="modal-box" style="max-width:640px;max-height:90vh;overflow-y:auto;">
            <button class="modal-x" id="mbClose">&times;</button>
            <div class="modal-icon-wrap">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            </div>
            <h2 class="modal-title">${title}</h2>
            <p class="modal-sub">Preencha as informações do consultor. Os campos marcados com * são obrigatórios.</p>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="form-group" style="grid-column:1/-1">
                    <label class="form-label">Nome completo *</label>
                    <input class="form-input" id="mbName" value="${data.name||''}" placeholder="Ex: João Silva" />
                </div>
                <div class="form-group">
                    <label class="form-label">Cargo *</label>
                    <input class="form-input" id="mbRole" value="${data.role||''}" placeholder="Ex: Engenheiro Civil" />
                </div>
                <div class="form-group">
                    <label class="form-label">Especialidade *</label>
                    <input class="form-input" id="mbSpec" value="${data.specialty||''}" placeholder="Ex: Rodovias · Concessões" />
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Resumo / Bio *</label>
                <textarea class="form-textarea" id="mbBio" style="min-height:90px" placeholder="Breve descrição do consultor para o card...">${data.bio||''}</textarea>
            </div>

            <div style="border-top:1px solid var(--border);margin:1.25rem 0 1rem;padding-top:1.25rem;">
                <p style="font-family:var(--font-aux);font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--blue);margin-bottom:1rem;">Currículo Completo (visível ao clicar no card)</p>
            </div>

            <div class="form-group">
                <label class="form-label">Formação Acadêmica</label>
                <textarea class="form-textarea" id="mbFormacao" style="min-height:80px" placeholder="Ex: Graduação em Engenharia Civil pela USP (2005). Mestrado em Transportes pela UNICAMP (2008). Especialização em Regulação pela FGV (2012).">${data.formacao||''}</textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Experiência Profissional</label>
                <textarea class="form-textarea" id="mbExp" style="min-height:100px" placeholder="Ex: 15 anos de atuação em concessões rodoviárias. Atuou na ANTT como especialista regulatório (2010-2015). Consultor sênior na XYZ Consultoria (2015-2020)...">${data.experiencia||''}</textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Publicações e Projetos (opcional)</label>
                <textarea class="form-textarea" id="mbPublicacoes" style="min-height:70px" placeholder="Ex: Co-autor do manual de regulação tarifária (ANEEL, 2018). Participou da estruturação da concessão da BR-163...">${data.publicacoes||''}</textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Idiomas (opcional)</label>
                <input class="form-input" id="mbIdiomas" value="${data.idiomas||''}" placeholder="Ex: Português (nativo), Inglês (avançado), Espanhol (intermediário)" />
            </div>

            <div class="form-group">
                <label class="form-label">LinkedIn (opcional)</label>
                <input class="form-input" id="mbLinkedin" value="${data.linkedin||''}" placeholder="https://linkedin.com/in/..." />
            </div>

            <button class="form-submit" id="mbSave">Salvar Consultor</button>
        </div>
    `;
    ov.querySelector('#mbClose').addEventListener('click', () => ov.remove());
    ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
    ov.querySelector('#mbSave').addEventListener('click', () => {
        const name = ov.querySelector('#mbName').value.trim();
        if (!name) return alert('Nome é obrigatório');
        onSave({
            name,
            role:        ov.querySelector('#mbRole').value.trim() || 'Consultor',
            specialty:   ov.querySelector('#mbSpec').value.trim(),
            bio:         ov.querySelector('#mbBio').value.trim(),
            formacao:    ov.querySelector('#mbFormacao').value.trim(),
            experiencia: ov.querySelector('#mbExp').value.trim(),
            publicacoes: ov.querySelector('#mbPublicacoes').value.trim(),
            idiomas:     ov.querySelector('#mbIdiomas').value.trim(),
            linkedin:    ov.querySelector('#mbLinkedin').value.trim(),
            imageUrl:    data.imageUrl || '',
            imageKey:    data.imageKey || null,
        });
        ov.remove();
    });
    document.body.appendChild(ov);
}
