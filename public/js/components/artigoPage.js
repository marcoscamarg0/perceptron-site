// ── PÁGINA DE ARTIGO COM ROTEAMENTO ──────────────────

function slugify(text) {
    return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim().replace(/\s+/g, '-')
        .substring(0, 60);
}

function openArtigoPage(item) {
    const slug = item.slug || slugify(item.title);

    // Esconde todas as páginas
    ['homePage','sobrePage','noticiasPage','contatoPage'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const artigoExistente = document.getElementById('artigoPage');
    if (artigoExistente) artigoExistente.remove();

    // Cria página
    const artigoPage = document.createElement('div');
    artigoPage.id = 'artigoPage';
    document.querySelector('.footer').insertAdjacentElement('beforebegin', artigoPage);

    // Formata conteúdo
    const paragrafos = (item.content || '')
        .split(/\n\n+/)
        .filter(p => p.trim())
        .map(p => {
            if (p.startsWith('## ')) return `<h2 class="artigo-h2">${p.replace('## ','')}</h2>`;
            if (p.startsWith('### ')) return `<h3 class="artigo-h3">${p.replace('### ','')}</h3>`;
            if (p.startsWith('- ')) return `<ul class="artigo-list">${p.split('\n').filter(l=>l.startsWith('- ')).map(l=>`<li>${l.slice(2)}</li>`).join('')}</ul>`;
            return `<p class="artigo-paragrafo">${p.replace(/\n/g,'<br>')}</p>`;
        }).join('');

    const hasImg = item.imageUrl && item.imageUrl.trim() !== '';
    const semConteudo = !item.content || !item.content.trim();

    artigoPage.innerHTML = `
        <div class="artigo-page">
            <div class="artigo-back" id="artigoBack">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Voltar para Conteúdos
            </div>
            <div class="artigo-container">
                <div class="artigo-header">
                    <span class="artigo-tag">${item.tag}</span>
                    <div class="artigo-meta">${item.date}</div>
                    <h1 class="artigo-titulo">${item.title}</h1>
                    <p class="artigo-resumo">${item.summary}</p>
                </div>
                ${hasImg ? `<div class="artigo-img-wrap"><img src="${item.imageUrl}" alt="${item.title}" class="artigo-img" /></div>` : ''}
                <div class="artigo-content">
                    ${semConteudo
                        ? `<div class="artigo-sem-conteudo">
                            <svg width="36" height="36" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="opacity:.2;margin-bottom:1rem">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                            </svg>
                            <p>Artigo completo não disponível ainda.</p>
                            ${AppState.isAdminMode ? `<button class="btn-escrever-artigo" id="btnEscreverArtigo">Escrever artigo agora</button>` : ''}
                           </div>`
                        : paragrafos
                    }
                </div>
                ${!semConteudo && AppState.isAdminMode ? `
                <div style="margin-top:2rem;padding-top:2rem;border-top:1px solid var(--border)">
                    <button class="btn-escrever-artigo" id="btnEscreverArtigo">Editar artigo</button>
                </div>` : ''}
            </div>
        </div>
    `;

    // Atualiza URL
    history.pushState({ page: 'artigo', id: item.id }, item.title, `/artigo/${slug}`);
    document.title = `${item.title} — Perceptron Consultoria`;

    document.getElementById('header').classList.add('page-mode');
    AppState.currentPage = 'artigo';
    AppState.artigoAtual = item;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelectorAll('[data-page]').forEach(btn =>
        btn.classList.toggle('active', btn.dataset.page === 'noticias')
    );

    document.getElementById('artigoBack').addEventListener('click', () => {
        voltarParaNoticias();
    });

    document.getElementById('btnEscreverArtigo')?.addEventListener('click', () => {
        openEditorArtigo(item);
    });
}

function voltarParaNoticias() {
    const artigoPage = document.getElementById('artigoPage');
    if (artigoPage) artigoPage.remove();
    document.getElementById('noticiasPage').classList.remove('hidden');
    AppState.currentPage = 'noticias';
    history.pushState({ page: 'noticias' }, 'Conteúdos', '/noticias');
    document.title = 'Perceptron Consultoria';
    document.getElementById('header').classList.add('page-mode');
    document.querySelectorAll('[data-page]').forEach(btn =>
        btn.classList.toggle('active', btn.dataset.page === 'noticias')
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Editor de artigo ──────────────────────────────────
function openEditorArtigo(item) {
    const ov = document.createElement('div');
    ov.className = 'modal-overlay active editor-overlay';
    ov.style.cssText = 'z-index:500;align-items:flex-start;padding:0;overflow-y:auto;';
    ov.innerHTML = `
        <div class="editor-box">
            <div class="editor-toolbar">
                <span class="editor-title-bar">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Editar Artigo
                </span>
                <div class="editor-actions">
                    <button class="editor-btn-cancel" id="edCancel">Cancelar</button>
                    <button class="editor-btn-save" id="edSave">Salvar artigo</button>
                </div>
            </div>

            <div class="editor-meta-row">
                <div class="form-group" style="flex:2">
                    <label class="form-label">Título *</label>
                    <input class="form-input" id="edTitle" value="${item.title||''}" placeholder="Título do artigo" />
                </div>
                <div class="form-group" style="flex:1">
                    <label class="form-label">Categoria</label>
                    <select class="form-select" id="edTag">
                        ${['Saneamento','Setor Elétrico','Rodovias','Gestão Pública','Concessões','Regulação','Infraestrutura','Geral'].map(t =>
                            `<option value="${t}" ${item.tag===t?'selected':''}>${t}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group" style="flex:1">
                    <label class="form-label">URL da Imagem</label>
                    <input class="form-input" id="edImg" value="${item.imageUrl||''}" placeholder="https://..." />
                </div>
            </div>

            <div class="form-group" style="padding:0 2rem">
                <label class="form-label">Resumo *</label>
                <textarea class="form-textarea" id="edSummary" style="min-height:70px">${item.summary||''}</textarea>
            </div>

            <div class="editor-content-wrap">
                <div class="editor-format-bar">
                    <button class="efmt-btn" data-fmt="## ">H2</button>
                    <button class="efmt-btn" data-fmt="### ">H3</button>
                    <div class="efmt-sep"></div>
                    <button class="efmt-btn" data-fmt="**" data-wrap="true">N</button>
                    <button class="efmt-btn efmt-italic" data-fmt="_" data-wrap="true">I</button>
                    <div class="efmt-sep"></div>
                    <button class="efmt-btn" data-fmt="- " data-list="true">Lista</button>
                    <div class="efmt-sep"></div>
                    <span class="efmt-hint">Separe parágrafos com linha em branco · ## para subtítulo · **negrito**</span>
                </div>
                <textarea class="editor-textarea" id="edContent" placeholder="Escreva o artigo completo aqui...

Use ## para subtítulos
Use ### para subtítulos menores
Use **texto** para negrito
Use - item para listas

Separe parágrafos com uma linha em branco.">${item.content||''}</textarea>
            </div>

            <div class="editor-preview-wrap">
                <div class="editor-preview-label">Pré-visualização</div>
                <div class="editor-preview" id="edPreview"></div>
            </div>
        </div>
    `;

    document.body.appendChild(ov);
    const textarea = ov.querySelector('#edContent');
    const preview  = ov.querySelector('#edPreview');

    function renderPreview() {
        const text = textarea.value;
        if (!text.trim()) { preview.innerHTML = '<p style="color:var(--text-muted);font-style:italic">A pré-visualização aparece aqui...</p>'; return; }
        preview.innerHTML = text.split(/\n\n+/).filter(p=>p.trim()).map(p => {
            if (p.startsWith('## '))  return `<h2 class="artigo-h2">${p.replace('## ','')}</h2>`;
            if (p.startsWith('### ')) return `<h3 class="artigo-h3">${p.replace('### ','')}</h3>`;
            if (p.startsWith('- '))   return `<ul class="artigo-list">${p.split('\n').filter(l=>l.startsWith('- ')).map(l=>`<li>${l.slice(2)}</li>`).join('')}</ul>`;
            return `<p class="artigo-paragrafo">${p.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/_(.*?)_/g,'<em>$1</em>').replace(/\n/g,'<br>')}</p>`;
        }).join('');
    }

    textarea.addEventListener('input', renderPreview);
    renderPreview();

    // Format buttons
    ov.querySelectorAll('.efmt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const fmt  = btn.dataset.fmt;
            const wrap = btn.dataset.wrap;
            const list = btn.dataset.list;
            const start = textarea.selectionStart;
            const end   = textarea.selectionEnd;
            const sel   = textarea.value.substring(start, end);
            let newText;
            if (wrap && sel) {
                newText = textarea.value.substring(0,start) + fmt + sel + fmt + textarea.value.substring(end);
            } else if (list) {
                newText = textarea.value.substring(0,start) + '- ' + textarea.value.substring(start);
            } else {
                const lineStart = textarea.value.lastIndexOf('\n', start-1) + 1;
                newText = textarea.value.substring(0,lineStart) + fmt + textarea.value.substring(lineStart);
            }
            textarea.value = newText;
            textarea.focus();
            renderPreview();
        });
    });

    ov.querySelector('#edCancel').addEventListener('click', () => ov.remove());

    ov.querySelector('#edSave').addEventListener('click', () => {
        const title = ov.querySelector('#edTitle').value.trim();
        if (!title) return alert('Título é obrigatório');
        const updated = {
            ...item,
            title,
            tag:      ov.querySelector('#edTag').value,
            imageUrl: ov.querySelector('#edImg').value.trim(),
            summary:  ov.querySelector('#edSummary').value.trim(),
            content:  textarea.value.trim(),
            slug:     slugify(title),
        };
        // Salva no AppState
        const idx = AppState.noticias.findIndex(x => x.id === item.id);
        if (idx !== -1) AppState.noticias[idx] = updated;
        else AppState.noticias.unshift(updated);
        saveNoticiasToStorage();
        ov.remove();
        // Reabre a página do artigo atualizado
        openArtigoPage(updated);
    });
}

// ── Roteamento por URL ────────────────────────────────
function handleRoute() {
    const path = window.location.pathname;
    if (path.startsWith('/artigo/')) {
        const slug = path.replace('/artigo/', '');
        // Aguarda noticias carregarem
        const tryOpen = () => {
            if (!AppState.noticias || !AppState.noticias.length) {
                setTimeout(tryOpen, 100); return;
            }
            const item = AppState.noticias.find(n => (n.slug || slugify(n.title)) === slug);
            if (item) openArtigoPage(item);
            else Navigation.go('noticias');
        };
        tryOpen();
    } else if (path === '/noticias') {
        Navigation.go('noticias');
    }
}

window.addEventListener('popstate', (e) => {
    const path = window.location.pathname;
    if (path.startsWith('/artigo/')) {
        const slug = path.replace('/artigo/', '');
        const item = AppState.noticias?.find(n => (n.slug || slugify(n.title)) === slug);
        if (item) openArtigoPage(item);
    } else if (path === '/noticias' || path === '/') {
        const artigoPage = document.getElementById('artigoPage');
        if (artigoPage) artigoPage.remove();
        if (path === '/noticias') Navigation.go('noticias');
        else Navigation.go('home');
    }
});
