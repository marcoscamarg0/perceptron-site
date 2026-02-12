async function renderNoticiasPage() {
    const el = document.getElementById('noticiasPage');
    AppState.noticias = await API.getNoticias();

    el.innerHTML = `
        <div class="page-hero">
            <div class="page-hero-inner">
                <div class="page-hero-label">
                    <div class="page-hero-label-line"></div>
                    <span class="page-hero-label-text">Publicações & Análises</span>
                </div>
                <h1 class="page-hero-title">Notícias &<br><em>Artigos</em></h1>
                <p class="page-hero-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>

        <div class="noticias-content">
            <div class="noticias-toolbar">
                <div class="noticias-filters">
                    <button class="filter-btn active" data-tag="todos">Todos</button>
                    <button class="filter-btn" data-tag="Tecnologia">Tecnologia</button>
                    <button class="filter-btn" data-tag="LGPD">LGPD</button>
                    <button class="filter-btn" data-tag="IA">Inteligência Artificial</button>
                    <button class="filter-btn" data-tag="Institucional">Institucional</button>
                </div>
                <button class="add-news-btn ${AppState.isAdminMode ? 'active' : ''}" id="addNewsBtn">
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Nova Publicação
                </button>
            </div>
            <div class="noticias-grid" id="noticiasGrid"></div>
        </div>
    `;

    document.querySelectorAll('.filter-btn').forEach(btn =>
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderNoticiasGrid(btn.dataset.tag);
        })
    );

    document.getElementById('addNewsBtn').addEventListener('click', openAddNewsModal);

    document.addEventListener('authChanged', () => {
        const b = document.getElementById('addNewsBtn');
        if (b) b.classList.toggle('active', AppState.isAdminMode);
        renderNoticiasGrid();
    });

    renderNoticiasGrid();
}

function renderNoticiasGrid(tag = 'todos') {
    const grid = document.getElementById('noticiasGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const lista = tag === 'todos'
        ? AppState.noticias
        : AppState.noticias.filter(n => n.tag === tag);

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

        card.innerHTML = `
            <div class="noticia-img-wrap">
                ${hasImg
                    ? `<img class="noticia-img" src="${item.imageUrl}" alt="${item.title}" />`
                    : `<div class="noticia-img-placeholder">
                        <svg width="30" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="opacity:.2">
                            <rect width="18" height="18" x="3" y="3" rx="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <path d="m21 15-5-5L5 21"/>
                        </svg>
                        <span>Sem imagem</span>
                       </div>`
                }
                <span class="noticia-tag-float">${item.tag}</span>
                ${AppState.isAdminMode ? `
                <div class="noticia-img-upload-overlay">
                    <label class="upload-label">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
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
                <div class="noticia-read-more">
                    Ler artigo completo
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </div>
            </div>
            <div class="noticia-admin-actions ${AppState.isAdminMode ? 'active' : ''}">
                <button class="action-btn edit-btn">
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="action-btn delete-btn">
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        `;

        // upload imagem
        const fi = card.querySelector('.upload-input');
        if (fi) {
            fi.addEventListener('change', async (e) => {
                const f = e.target.files[0]; if (!f) return;
                const reader = new FileReader();
                reader.onload = async (ev) => {
                    await API.updateNoticia(item.id, { ...item, imageUrl: ev.target.result });
                    AppState.noticias = await API.getNoticias();
                    renderNoticiasGrid(document.querySelector('.filter-btn.active')?.dataset.tag || 'todos');
                };
                reader.readAsDataURL(f);
            });
        }

        card.querySelector('.edit-btn')?.addEventListener('click', () => openEditNewsModal(item));
        card.querySelector('.delete-btn')?.addEventListener('click', async () => {
            if (!AppState.isAdminMode || !confirm('Excluir esta publicação?')) return;
            await API.deleteNoticia(item.id);
            AppState.noticias = await API.getNoticias();
            renderNoticiasGrid(document.querySelector('.filter-btn.active')?.dataset.tag || 'todos');
        });

        grid.appendChild(card);
    });
}

function openAddNewsModal() {
    const ov = buildNewsModal({ title: 'Nova Publicação',
        onSave: async (d) => {
            const r = await API.createNoticia(d);
            if (r) { AppState.noticias = await API.getNoticias(); renderNoticiasGrid(); ov.remove(); }
        }
    });
    document.body.appendChild(ov);
}

function openEditNewsModal(item) {
    const ov = buildNewsModal({ title: 'Editar Publicação', data: item,
        onSave: async (d) => {
            const r = await API.updateNoticia(item.id, d);
            if (r) { AppState.noticias = await API.getNoticias(); renderNoticiasGrid(); ov.remove(); }
        }
    });
    document.body.appendChild(ov);
}

function buildNewsModal({ title, data = {}, onSave }) {
    const ov = document.createElement('div');
    ov.className = 'modal-overlay active';
    ov.style.zIndex = '400';
    ov.innerHTML = `
        <div class="modal-box" style="max-width:560px">
            <button class="modal-x" id="nmClose">&times;</button>
            <div class="modal-icon-wrap">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                </svg>
            </div>
            <h2 class="modal-title">${title}</h2>
            <p class="modal-sub">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
            <div class="form-group">
                <label class="form-label">Título</label>
                <input class="form-input" id="nmTitle" value="${data.title||''}" placeholder="Lorem ipsum dolor sit amet..." />
            </div>
            <div class="form-group">
                <label class="form-label">Resumo</label>
                <textarea class="form-textarea" id="nmSummary" style="min-height:85px" placeholder="Consectetur adipiscing elit...">${data.summary||''}</textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Categoria</label>
                    <select class="form-select" id="nmTag">
                        <option value="Tecnologia"    ${data.tag==='Tecnologia'   ?'selected':''}>Tecnologia</option>
                        <option value="LGPD"          ${data.tag==='LGPD'         ?'selected':''}>LGPD</option>
                        <option value="IA"            ${data.tag==='IA'           ?'selected':''}>Inteligência Artificial</option>
                        <option value="Institucional" ${data.tag==='Institucional'?'selected':''}>Institucional</option>
                        <option value="Geral"         ${data.tag==='Geral'        ?'selected':''}>Geral</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">URL da Imagem</label>
                    <input class="form-input" id="nmImg" value="${data.imageUrl||''}" placeholder="https://..." />
                </div>
            </div>
            <button class="form-submit" id="nmSave">Publicar</button>
        </div>
    `;
    ov.querySelector('#nmClose').addEventListener('click', () => ov.remove());
    ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
    ov.querySelector('#nmSave').addEventListener('click', async () => {
        const t = ov.querySelector('#nmTitle').value.trim();
        if (!t) return alert('Título é obrigatório');
        await onSave({
            title: t,
            summary: ov.querySelector('#nmSummary').value.trim(),
            tag:      ov.querySelector('#nmTag').value,
            imageUrl: ov.querySelector('#nmImg').value.trim(),
            date: data.date || new Date().toLocaleDateString('pt-BR')
        });
    });
    return ov;
}
