// Notícias fixas no frontend (fallback sem API)
const NOTICIAS_FIXAS = [
    { id:'1', title:'Marco Legal do Saneamento: desafios e oportunidades para municípios',               summary:'A Lei 14.026/2020 impõe novas exigências de universalização, equilíbrio tarifário e governança contratual.', date:'08/02/2025', tag:'Saneamento',    imageUrl:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80', content:'', slug:'marco-legal-do-saneamento-desafios-e-oportunidades-para-municipios' },
    { id:'2', title:'Revisões tarifárias no setor elétrico: o papel da análise regulatória',             summary:'Processos de revisão tarifária periódica exigem análise técnica robusta e monitoramento por indicadores.',   date:'01/02/2025', tag:'Setor Elétrico', imageUrl:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80', content:'', slug:'revisoes-tarifarias-no-setor-eletrico-o-papel-da-analise-regulatoria' },
    { id:'3', title:'Concessões rodoviárias: como garantir governança e previsibilidade contratual',     summary:'A gestão eficiente de concessões rodoviárias requer monitoramento contínuo de CAPEX, OPEX, tráfego.',         date:'25/01/2025', tag:'Rodovias',       imageUrl:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80', content:'', slug:'concessoes-rodoviarias-como-garantir-governanca-e-previsibilidade-contratual' },
    { id:'4', title:'Gestão pública municipal: como melhorar arrecadação e capacidade de investimento',  summary:'Diagnósticos estruturados e planos de ação orientados por indicadores permitem que municípios melhorem.',    date:'15/01/2025', tag:'Gestão Pública', imageUrl:'', content:'', slug:'gestao-publica-municipal-como-melhorar-arrecadacao-e-capacidade-de-investimento' },
    { id:'5', title:'PPPs e concessões: do modelo ao contrato executável',                               summary:'A estruturação de PPPs e concessões envolve modelagem econômico-financeira, matriz de riscos.',             date:'10/01/2025', tag:'Concessões',     imageUrl:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80', content:'', slug:'ppps-e-concessoes-do-modelo-ao-contrato-executavel' },
];

async function renderNoticiasPage() {
    const el = document.getElementById('noticiasPage');

    // Carrega notícias e temas do backend em paralelo
    try {
        const [dados, temas] = await Promise.all([API.getNoticias(), API.getTemas()]);
        if (dados && dados.length) {
            AppState.noticias = dados.sort((a, b) => (parseInt(b.id)||0) - (parseInt(a.id)||0));
        } else {
            AppState.noticias = [...NOTICIAS_FIXAS];
        }
        AppState.temas = temas || [];
    } catch(e) {
        // Fallback para localStorage se API indisponível
        const savedEdits  = JSON.parse(localStorage.getItem('noticias_edits')   || '{}');
        const savedExtras = JSON.parse(localStorage.getItem('noticias_extras')  || '[]');
        const deletedIds  = JSON.parse(localStorage.getItem('noticias_deleted') || '[]');
        AppState.noticias = NOTICIAS_FIXAS
            .filter(n => !deletedIds.includes(n.id))
            .map(n => ({ ...n, ...(savedEdits[n.id] || {}) }));
        AppState.noticias = [...AppState.noticias, ...savedExtras];
        AppState.temas = ['Saneamento','Setor Elétrico','Rodovias','Gestão Pública','Concessões','Regulação','Infraestrutura','Geral'];
    }

    renderNoticiasShell(el);
    renderFiltrosTemas();
    renderNoticiasGrid();
}

function renderNoticiasShell(el) {
    el.innerHTML = `
        <div class="page-hero">
            <div class="page-hero-inner">
                <div class="page-hero-label">
                    <div class="page-hero-label-line"></div>
                    <span class="page-hero-label-text">Publicações &amp; Análises</span>
                </div>
                <h1 class="page-hero-title">Notícias &<br><em>Artigos</em></h1>
                <p class="page-hero-sub">Análises, artigos e publicações técnicas sobre regulação, infraestrutura, gestão pública e concessões.</p>
            </div>
        </div>

        <div class="noticias-content">
            <div class="noticias-toolbar">
                <div class="noticias-filters" id="noticiasFilters">
                    <button class="filter-btn active" data-tag="todos">Todos</button>
                </div>
                <div style="display:flex;gap:.5rem;align-items:center">
                    ${AppState.isAdminMode ? `<button class="tema-mgr-btn" id="temasAdminBtn" title="Gerenciar temas">🏷️ Temas</button>` : ''}
                    <button class="add-news-btn ${AppState.isAdminMode ? 'active' : ''}" id="addNewsBtn">
                        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Nova Publicação
                    </button>
                </div>
            </div>
            <div class="noticias-grid" id="noticiasGrid"></div>
        </div>
    `;

    document.getElementById('addNewsBtn').addEventListener('click', openAddNewsModal);
    document.getElementById('temasAdminBtn')?.addEventListener('click', openTemasAdmin);

    document.addEventListener('authChanged', () => {
        const b = document.getElementById('addNewsBtn');
        if (b) b.classList.toggle('active', AppState.isAdminMode);
        // Recarrega temas e atualiza botão gerenciar temas
        renderNoticiasShell(document.getElementById('noticiasPage'));
        renderFiltrosTemas();
        renderNoticiasGrid();
    });
}

function renderFiltrosTemas() {
    const container = document.getElementById('noticiasFilters');
    if (!container) return;
    const temas = AppState.temas || [];
    container.innerHTML = `<button class="filter-btn active" data-tag="todos">Todos</button>` +
        temas.map(t => `<button class="filter-btn" data-tag="${t}">${t}</button>`).join('');

    container.querySelectorAll('.filter-btn').forEach(btn =>
        btn.addEventListener('click', () => {
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderNoticiasGrid(btn.dataset.tag);
        })
    );
}

function renderNoticiasGrid(tag = 'todos') {
    const grid = document.getElementById('noticiasGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const sorted = [...AppState.noticias].sort((a, b) => (parseInt(b.id)||0) - (parseInt(a.id)||0));
    const lista = tag === 'todos' ? sorted : sorted.filter(n => n.tag === tag);

    if (lista.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:5rem 0;color:var(--text-muted)">
                <svg width="38" height="38" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="opacity:.22;display:block;margin:0 auto 1rem">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <p style="font-family:var(--font-aux);font-size:.7rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase">Nenhum artigo nesta categoria</p>
            </div>`;
        return;
    }

    lista.forEach((item, index) => {
        const isFeatured = (index === 0 && tag === 'todos');
        const card = document.createElement('div');
        card.className = `noticia-card${isFeatured ? ' featured' : ''}${AppState.isAdminMode ? ' admin-border' : ''}`;
        const hasImg = item.imageUrl && item.imageUrl.trim() !== '';
        const slug   = item.slug || slugify(item.title);

        card.innerHTML = `
            <div class="noticia-img-wrap">
                ${hasImg
                    ? `<img class="noticia-img" src="${item.imageUrl}" alt="${item.title}" />`
                    : `<div class="noticia-img-placeholder">
                        <svg width="30" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="opacity:.2">
                            <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
                        </svg>
                        <span>Sem imagem</span>
                       </div>`
                }
                <span class="noticia-tag-float">${item.tag}</span>
                ${AppState.isAdminMode ? `
                <div class="noticia-img-upload-overlay">
                    <label class="upload-label">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        Trocar imagem
                        <input type="file" class="upload-input" accept="image/*" />
                    </label>
                </div>` : ''}
            </div>
            <div class="noticia-body">
                <div class="noticia-meta">
                    <span>${item.date}</span>
                    <span class="noticia-meta-dot"></span>
                    <span>${item.tag}</span>
                    ${isFeatured ? '<span class="noticia-meta-dot"></span><span style="color:var(--yellow)">Destaque</span>' : ''}
                </div>
                <h2 class="noticia-title">${item.title}</h2>
                <p class="noticia-summary">${item.summary}</p>
                <div style="display:flex;align-items:center;gap:.75rem;margin-top:auto">
                    <div class="noticia-read-more">
                        Ler artigo completo
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </div>
                    <button class="noticia-copy-link" title="Copiar link do artigo" data-slug="${slug}" aria-label="Copiar link">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="noticia-admin-actions ${AppState.isAdminMode ? 'active' : ''}">
                <button class="action-btn edit-btn">
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="action-btn delete-btn">
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        `;

        // Upload de imagem
        const fi = card.querySelector('.upload-input');
        if (fi) {
            fi.addEventListener('change', (e) => {
                const f = e.target.files[0]; if (!f) return;
                resizeImage(f, 1200, 630, (url) => {
                    const idx = AppState.noticias.findIndex(x => x.id === item.id);
                    if (idx !== -1) AppState.noticias[idx] = { ...AppState.noticias[idx], imageUrl: url };
                    saveNoticiasToStorage();
                    renderNoticiasGrid(document.querySelector('.filter-btn.active')?.dataset.tag || 'todos');
                });
            });
        }

        // Ler artigo
        card.querySelector('.noticia-read-more')?.addEventListener('click', () => {
            if (!AppState.isAdminMode) openArtigoPage(item);
        });

        // Copiar link
        card.querySelector('.noticia-copy-link')?.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = `${window.location.origin}/artigo/${slug}`;
            navigator.clipboard.writeText(url).then(() => {
                const btn = e.currentTarget;
                const orig = btn.innerHTML;
                btn.innerHTML = '✅';
                btn.title = 'Link copiado!';
                setTimeout(() => { btn.innerHTML = orig; btn.title = 'Copiar link do artigo'; }, 2000);
            }).catch(() => {
                prompt('Copie o link:', `${window.location.origin}/artigo/${slug}`);
            });
        });

        card.querySelector('.edit-btn')?.addEventListener('click', () => openEditNewsModal(item));
        card.querySelector('.delete-btn')?.addEventListener('click', () => {
            if (!AppState.isAdminMode || !confirm('Excluir esta publicação?')) return;
            API.deleteNoticia(item.id).catch(e => console.warn('API delete:', e));
            AppState.noticias = AppState.noticias.filter(x => x.id !== item.id);
            renderNoticiasGrid(document.querySelector('.filter-btn.active')?.dataset.tag || 'todos');
        });

        grid.appendChild(card);
    });
}

function saveNoticiasToStorage(noticia, isDelete) {
    if (noticia && !isDelete) {
        const jaExiste = AppState.noticias.some(n => n.id === noticia.id);
        if (jaExiste) {
            API.updateNoticia(noticia.id, noticia).catch(e => console.warn('API update:', e));
        } else {
            API.createNoticia(noticia).catch(e => console.warn('API create:', e));
        }
    }
    // Backup localStorage
    const edits = {};
    AppState.noticias.filter(n => ['1','2','3','4','5'].includes(n.id)).forEach(n => { edits[n.id] = n; });
    localStorage.setItem('noticias_edits', JSON.stringify(edits));
    const extras = AppState.noticias.filter(n => !['1','2','3','4','5'].includes(n.id));
    localStorage.setItem('noticias_extras', JSON.stringify(extras));
}

function openAddNewsModal() {
    let ov;
    ov = buildNewsModal({
        title: 'Nova Publicação',
        onSave: async (d) => {
            const nova = { id: Date.now().toString(), ...d, date: d.date || new Date().toLocaleDateString('pt-BR') };
            try {
                const criada = await API.createNoticia(nova);
                if (criada) nova.id = criada.id; // usa o id do servidor
                console.log('✅ Notícia criada no banco');
            } catch(e) { console.warn('API createNoticia falhou:', e); }
            AppState.noticias = [nova, ...AppState.noticias];
            if (ov) ov.remove();
            renderFiltrosTemas();
            renderNoticiasGrid();
        }
    });
    document.body.appendChild(ov);
}

function openEditNewsModal(item) {
    let ov;
    ov = buildNewsModal({
        title: 'Editar Publicação', data: item,
        onSave: async (d) => {
            const atualizado = { ...item, ...d };
            try {
                await API.updateNoticia(item.id, atualizado);
                console.log('✅ Notícia atualizada no banco');
            } catch(e) { console.warn('API updateNoticia falhou:', e); }
            const idx = AppState.noticias.findIndex(x => x.id === item.id);
            if (idx !== -1) AppState.noticias[idx] = atualizado;
            if (ov) ov.remove();
            renderNoticiasGrid();
        }
    });
    document.body.appendChild(ov);
}

function buildNewsModal({ title, data = {}, onSave }) {
    const ov = document.createElement('div');
    ov.className = 'modal-overlay active';
    ov.style.cssText = 'z-index:500;padding:0;align-items:flex-start;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);';

    // Temas dinâmicos — usa AppState.temas carregados do banco
    const TAGS = (AppState.temas && AppState.temas.length)
        ? AppState.temas
        : ['Saneamento','Setor Elétrico','Rodovias','Gestão Pública','Concessões','Regulação','Infraestrutura','Geral'];
    const isEdit = !!data.id;

    ov.innerHTML = `
    <div class="ned-wrap">
        <!-- Sidebar -->
        <div class="ned-sidebar">
            <div class="ned-logo">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>${isEdit ? 'Editar' : 'Nova publicação'}</span>
            </div>

            <div class="ned-field">
                <label class="ned-label">Categoria</label>
                <div class="ned-tags-grid" id="nmTagGrid">
                    ${TAGS.map(t => `<button class="ned-tag-btn ${data.tag===t?'active':''}" data-tag="${t}">${t}</button>`).join('')}
                </div>
                <div style="margin-top:.5rem">
                    <button class="ned-tag-btn" id="nmNovoTemaBtn" style="width:100%;border-style:dashed">+ Novo tema</button>
                </div>
            </div>

            <div class="ned-field">
                <label class="ned-label">Imagem de capa</label>
                <div class="ned-img-area" id="nmImgArea">
                    ${data.imageUrl ? `<img src="${data.imageUrl}" class="ned-img-preview" id="nmImgPreview" />` : `<div class="ned-img-placeholder" id="nmImgPreview"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>Sem imagem</span></div>`}
                </div>
                <input class="ned-input" id="nmImg" value="${data.imageUrl&&!data.imageUrl.startsWith('data:')?data.imageUrl:''}" placeholder="Cole uma URL de imagem..." style="margin-top:8px" />
                <div style="display:flex;align-items:center;gap:8px;margin-top:6px">
                    <span class="ned-label" style="margin:0">ou</span>
                    <label class="ned-upload-btn">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        Upload
                        <input type="file" id="nmImgFile" accept="image/*" style="display:none">
                    </label>
                </div>
            </div>

            <div class="ned-field">
                <label class="ned-label">Resumo</label>
                <textarea class="ned-textarea" id="nmSummary" placeholder="Breve descrição do artigo...">${data.summary||''}</textarea>
            </div>

            <div class="ned-sidebar-actions">
                <button class="ned-btn-cancel" id="nmCancel">Cancelar</button>
                <button class="ned-btn-publish" id="nmSave">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                    ${isEdit ? 'Salvar' : 'Publicar'}
                </button>
            </div>
        </div>

        <!-- Editor area -->
        <div class="ned-editor-area">
            <input class="ned-title-input" id="nmTitle" value="${data.title||''}" placeholder="Título do artigo..." />

            <div class="ned-toolbar">
                <button class="ned-tb-btn" data-fmt="## " title="Subtítulo H2">H2</button>
                <button class="ned-tb-btn" data-fmt="### " title="Subtítulo H3">H3</button>
                <div class="ned-tb-sep"></div>
                <button class="ned-tb-btn ned-tb-bold" data-fmt="**" data-wrap="true" title="Negrito"><strong>B</strong></button>
                <button class="ned-tb-btn ned-tb-italic" data-fmt="_" data-wrap="true" title="Itálico"><em>I</em></button>
                <div class="ned-tb-sep"></div>
                <button class="ned-tb-btn" data-list="true" title="Lista">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </button>
                <div class="ned-tb-sep"></div>
                <span class="ned-tb-hint">## subtítulo · **negrito** · _itálico_ · linha em branco = parágrafo</span>
                <button class="ned-preview-toggle" id="nmPreviewToggle">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    Prévia
                </button>
            </div>

            <div class="ned-content-area">
                <textarea class="ned-content" id="nmContent" placeholder="Escreva o conteúdo do artigo aqui...

Use ## para subtítulos, **negrito**, _itálico_ e - para listas.

Separe os parágrafos com uma linha em branco.">${data.content||''}</textarea>
                <div class="ned-preview" id="nmPreview" style="display:none"></div>
            </div>
        </div>
    </div>`;

    // Tag selection
    ov.querySelectorAll('.ned-tag-btn').forEach(btn => {
        if (btn.id === 'nmNovoTemaBtn') return;
        btn.addEventListener('click', () => {
            ov.querySelectorAll('.ned-tag-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Criar novo tema inline
    ov.querySelector('#nmNovoTemaBtn').addEventListener('click', async () => {
        const nome = prompt('Nome do novo tema:');
        if (!nome || !nome.trim()) return;
        await API.createTema(nome.trim());
        AppState.temas = await API.getTemas();
        // Adiciona o botão dinamicamente
        const grid = ov.querySelector('#nmTagGrid');
        const nb   = document.createElement('button');
        nb.className     = 'ned-tag-btn active';
        nb.dataset.tag   = nome.trim();
        nb.textContent   = nome.trim();
        grid.querySelectorAll('.ned-tag-btn').forEach(b => b.classList.remove('active'));
        nb.addEventListener('click', () => {
            grid.querySelectorAll('.ned-tag-btn').forEach(b => b.classList.remove('active'));
            nb.classList.add('active');
        });
        grid.appendChild(nb);
    });

    // Image URL preview
    const imgInput = ov.querySelector('#nmImg');
    imgInput.addEventListener('input', () => updateImgPreview(imgInput.value));

    // Image upload
    ov.querySelector('#nmImgFile').addEventListener('change', (e) => {
        const file = e.target.files[0]; if (!file) return;
        resizeImage(file, 1200, 630, (url) => {
            updateImgPreview(url);
            imgInput.value = '';
            imgInput.dataset.upload = url;
        });
    });

    function updateImgPreview(url) {
        const area = ov.querySelector('#nmImgArea');
        if (url && url.trim()) {
            area.innerHTML = `<img src="${url}" class="ned-img-preview" />`;
        } else {
            area.innerHTML = `<div class="ned-img-placeholder"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>Sem imagem</span></div>`;
        }
    }

    // Preview toggle
    const textarea   = ov.querySelector('#nmContent');
    const previewEl  = ov.querySelector('#nmPreview');
    const previewBtn = ov.querySelector('#nmPreviewToggle');
    let previewing   = false;

    previewBtn.addEventListener('click', () => {
        previewing = !previewing;
        textarea.style.display   = previewing ? 'none'  : 'block';
        previewEl.style.display  = previewing ? 'block' : 'none';
        previewBtn.classList.toggle('active', previewing);
        if (previewing) renderPreview();
    });

    function renderPreview() {
        const text = textarea.value;
        if (!text.trim()) { previewEl.innerHTML = '<p style="color:var(--text-muted);font-style:italic">Nenhum conteúdo ainda...</p>'; return; }
        previewEl.innerHTML = markdownToHtml(text);
    }

    // Format buttons
    ov.querySelectorAll('.ned-tb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const fmt  = btn.dataset.fmt;
            const wrap = btn.dataset.wrap;
            const list = btn.dataset.list;
            if (!fmt && !wrap && !list) return;
            const s = textarea.selectionStart, e2 = textarea.selectionEnd;
            const sel = textarea.value.substring(s, e2);
            let val = textarea.value;
            if (wrap && sel) { val = val.substring(0,s)+fmt+sel+fmt+val.substring(e2); }
            else if (list)   { val = val.substring(0,s)+'- '+val.substring(s); }
            else if (fmt)    { const ls = val.lastIndexOf('\n',s-1)+1; val = val.substring(0,ls)+fmt+val.substring(ls); }
            textarea.value = val; textarea.focus();
        });
    });

    ov.querySelector('#nmCancel').addEventListener('click', () => ov.remove());
    ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });

    ov.querySelector('#nmSave').addEventListener('click', () => {
        const t = ov.querySelector('#nmTitle').value.trim();
        if (!t) { ov.querySelector('#nmTitle').focus(); ov.querySelector('#nmTitle').style.borderColor='var(--blue)'; return; }
        const activeTag = ov.querySelector('.ned-tag-btn.active:not(#nmNovoTemaBtn)');
        const tag = activeTag ? activeTag.dataset.tag : (data.tag || 'Geral');
        const imgUrl = imgInput.dataset.upload || imgInput.value.trim() || data.imageUrl || '';
        const rawContent = textarea.value.trim();
        onSave({
            title:    t,
            summary:  ov.querySelector('#nmSummary').value.trim(),
            tag,
            imageUrl: imgUrl,
            content:  rawContent,          // texto markdown — salvo no banco e renderizado no frontend
            slug:     slugify(t),
            date:     data.date || new Date().toLocaleDateString('pt-BR')
        });
        setTimeout(() => {
            const filterBtn = document.querySelector(`.filter-btn[data-tag="${tag}"]`);
            if (filterBtn) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                filterBtn.classList.add('active');
                renderNoticiasGrid(tag);
            }
        }, 100);
    });

    return ov;
}

// ── Markdown leve → HTML (usado no preview e na exibição) ──
function markdownToHtml(text) {
    const paras = text.split('\n\n').filter(p => p.trim());
    return paras.map(p => {
        if (p.startsWith('## '))  return '<h2 class="artigo-h2">'  + inlineMarkdown(p.replace(/^## /,''))  + '</h2>';
        if (p.startsWith('### ')) return '<h3 class="artigo-h3">'  + inlineMarkdown(p.replace(/^### /,'')) + '</h3>';
        if (p.startsWith('- '))   return '<ul class="artigo-list">' + p.split('\n').filter(l=>l.startsWith('- ')).map(l=>'<li>'+inlineMarkdown(l.slice(2))+'</li>').join('') + '</ul>';
        return '<p class="artigo-paragrafo">' + p.split('\n').map(inlineMarkdown).join('<br>') + '</p>';
    }).join('');
}

function inlineMarkdown(line) {
    return line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')  // **negrito**
        .replace(/_(.+?)_/g, '<em>$1</em>');                // _itálico_
}
