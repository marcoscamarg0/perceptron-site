// ── PÁGINA DE ARTIGO COM ROTEAMENTO ──────────────────

function slugify(text) {
    return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim().replace(/\s+/g, '-')
        .substring(0, 60);
}

function formatarConteudo(content) {
    if (!content || !content.trim()) return null;
    return content.split('\n\n').filter(p => p.trim()).map(p => {
        if (p.startsWith('## '))  return '<h2 class="artigo-h2">'  + p.replace('## ','')  + '</h2>';
        if (p.startsWith('### ')) return '<h3 class="artigo-h3">'  + p.replace('### ','') + '</h3>';
        if (p.startsWith('- '))   return '<ul class="artigo-list">' + p.split('\n').filter(l=>l.startsWith('- ')).map(l=>'<li>'+l.slice(2)+'</li>').join('') + '</ul>';
        return '<p class="artigo-paragrafo">' + p.replace(/\n/g,'<br>') + '</p>';
    }).join('');
}

function openArtigoPage(item) {
    const slug = item.slug || slugify(item.title);

    ['homePage','sobrePage','noticiasPage','contatoPage'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const old = document.getElementById('artigoPage');
    if (old) old.remove();

    const artigoPage = document.createElement('div');
    artigoPage.id = 'artigoPage';
    document.querySelector('.footer').insertAdjacentElement('beforebegin', artigoPage);

    renderArtigoContent(artigoPage, item);

    history.pushState({ page: 'artigo', id: item.id }, item.title, '/artigo/' + slug);
    document.title = item.title + ' — Perceptron Consultoria';
    document.getElementById('header').classList.add('page-mode');
    AppState.currentPage = 'artigo';
    AppState.artigoAtual = item;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelectorAll('[data-page]').forEach(btn =>
        btn.classList.toggle('active', btn.dataset.page === 'noticias')
    );
}

function renderArtigoContent(artigoPage, item) {
    const hasImg = item.imageUrl && item.imageUrl.trim() !== '';
    const conteudoHTML = formatarConteudo(item.content);
    const semConteudo = !conteudoHTML;

    artigoPage.innerHTML = `
        <div class="artigo-page">

            ${AppState.isAdminMode ? `
            <button class="artigo-edit-fab" id="artigoEditBtn" title="Editar artigo">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Editar artigo
            </button>` : ''}

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

                ${hasImg ? `
                <div class="artigo-img-wrap">
                    <img src="${item.imageUrl}" alt="${item.title}" class="artigo-img" />
                    ${AppState.isAdminMode ? `
                    <label class="artigo-img-trocar" title="Trocar imagem">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        Trocar imagem
                        <input type="file" class="upload-input" accept="image/*" id="artigoImgInput" style="display:none" />
                    </label>` : ''}
                </div>` : `
                ${AppState.isAdminMode ? `
                <div class="artigo-img-add">
                    <label class="artigo-img-trocar">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        Adicionar imagem de capa
                        <input type="file" class="upload-input" accept="image/*" id="artigoImgInput" style="display:none" />
                    </label>
                </div>` : ''}`}

                <div class="artigo-content">
                    ${semConteudo
                        ? `<div class="artigo-sem-conteudo">
                            <svg width="36" height="36" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="opacity:.2;margin-bottom:1rem">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                            </svg>
                            <p>Conteúdo completo não disponível ainda.</p>
                            ${AppState.isAdminMode ? '<p style="font-size:.8rem;margin-top:.5rem">Clique em "Editar artigo" para escrever o conteúdo.</p>' : ''}
                           </div>`
                        : conteudoHTML
                    }
                </div>
            </div>
        </div>
    `;

    // Voltar
    artigoPage.querySelector('#artigoBack').addEventListener('click', voltarParaNoticias);

    // Botão editar flutuante
    artigoPage.querySelector('#artigoEditBtn')?.addEventListener('click', () => {
        openEditorArtigo(item, (updated) => {
            // Atualiza e rerenderiza a página
            const ap = document.getElementById('artigoPage');
            if (ap) renderArtigoContent(ap, updated);
        });
    });

    // Upload de imagem — redimensiona automaticamente
    const imgInput = artigoPage.querySelector('#artigoImgInput');
    if (imgInput) {
        imgInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            resizeImage(file, 1200, 630, (dataUrl) => {
                const idx = AppState.noticias.findIndex(x => x.id === item.id);
                if (idx !== -1) {
                    AppState.noticias[idx] = { ...AppState.noticias[idx], imageUrl: dataUrl };
                    item = { ...item, imageUrl: dataUrl };
                    saveNoticiasToStorage();
                    const ap = document.getElementById('artigoPage');
                    if (ap) renderArtigoContent(ap, AppState.noticias[idx]);
                }
            });
        });
    }
}

// ── Redimensionar imagem automaticamente ─────────────
function resizeImage(file, maxW, maxH, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            let w = img.width, h = img.height;
            if (w > maxW || h > maxH) {
                const ratio = Math.min(maxW/w, maxH/h);
                w = Math.round(w * ratio);
                h = Math.round(h * ratio);
            }
            const canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            callback(canvas.toDataURL('image/jpeg', 0.88));
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
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
function openEditorArtigo(item, onUpdated) {
    const ov = document.createElement('div');
    ov.className = 'modal-overlay active editor-overlay';
    ov.style.cssText = 'z-index:500;align-items:flex-start;padding:0;overflow-y:auto;';

    const TAGS = ['Saneamento','Setor Elétrico','Rodovias','Gestão Pública','Concessões','Regulação','Infraestrutura','Geral'];

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
                    <button class="editor-btn-save" id="edSave">Salvar</button>
                </div>
            </div>

            <div class="editor-meta-row">
                <div class="form-group" style="flex:2;min-width:200px">
                    <label class="form-label">Título *</label>
                    <input class="form-input" id="edTitle" value="${item.title||''}" />
                </div>
                <div class="form-group" style="flex:1;min-width:140px">
                    <label class="form-label">Categoria</label>
                    <select class="form-select" id="edTag">
                        ${TAGS.map(t => '<option value="'+t+'" '+(item.tag===t?'selected':'')+'>'+t+'</option>').join('')}
                    </select>
                </div>
                <div class="form-group" style="flex:1;min-width:140px">
                    <label class="form-label">Imagem de capa</label>
                    <div style="display:flex;gap:.5rem;align-items:center">
                        <input class="form-input" id="edImg" value="${item.imageUrl&&!item.imageUrl.startsWith('data:') ? item.imageUrl : ''}" placeholder="https://... ou faça upload" style="flex:1" />
                        <label class="editor-btn-upload" title="Upload">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            <input type="file" id="edImgFile" accept="image/*" style="display:none" />
                        </label>
                    </div>
                    <div id="edImgPreview" style="margin-top:.4rem"></div>
                </div>
            </div>

            <div class="form-group" style="padding:0 2rem .75rem">
                <label class="form-label">Resumo *</label>
                <textarea class="form-textarea" id="edSummary" style="min-height:60px">${item.summary||''}</textarea>
            </div>

            <div class="editor-content-wrap">
                <div class="editor-format-bar">
                    <button class="efmt-btn" data-fmt="## ">H2</button>
                    <button class="efmt-btn" data-fmt="### ">H3</button>
                    <div class="efmt-sep"></div>
                    <button class="efmt-btn" data-fmt="**" data-wrap="true"><strong>N</strong></button>
                    <button class="efmt-btn efmt-italic" data-fmt="_" data-wrap="true"><em>I</em></button>
                    <div class="efmt-sep"></div>
                    <button class="efmt-btn" data-list="true">— Lista</button>
                    <div class="efmt-sep"></div>
                    <span class="efmt-hint">## Subtítulo &nbsp;|&nbsp; **negrito** &nbsp;|&nbsp; Linha em branco = parágrafo</span>
                </div>
                <div class="editor-split">
                    <textarea class="editor-textarea" id="edContent" placeholder="Escreva o artigo aqui...">${item.content||''}</textarea>
                    <div class="editor-split-preview">
                        <div class="editor-preview-label">Pré-visualização</div>
                        <div class="editor-preview" id="edPreview"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(ov);

    const textarea  = ov.querySelector('#edContent');
    const preview   = ov.querySelector('#edPreview');
    const imgInput  = ov.querySelector('#edImgFile');
    const imgUrlBox = ov.querySelector('#edImg');
    const imgPrev   = ov.querySelector('#edImgPreview');
    let uploadedImg = item.imageUrl && item.imageUrl.startsWith('data:') ? item.imageUrl : null;

    // Pré-visualização imagem existente
    if (uploadedImg) {
        imgPrev.innerHTML = '<img src="'+uploadedImg+'" style="height:48px;border-radius:4px;object-fit:cover" />';
    }

    // Upload de imagem no editor — redimensiona
    imgInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        resizeImage(file, 1200, 630, (dataUrl) => {
            uploadedImg = dataUrl;
            imgUrlBox.value = '';
            imgPrev.innerHTML = '<img src="'+dataUrl+'" style="height:48px;border-radius:4px;object-fit:cover;margin-top:.25rem" />';
        });
    });

    function renderPrev() {
        const text = textarea.value;
        if (!text.trim()) { preview.innerHTML = '<p style="color:var(--text-muted);font-style:italic;font-size:.85rem">Pré-visualização...</p>'; return; }
        const paras = text.split('\n\n').filter(p => p.trim());
        preview.innerHTML = paras.map(p => {
            if (p.startsWith('## '))  return '<h2 class="artigo-h2">'  + p.replace('## ','')  + '</h2>';
            if (p.startsWith('### ')) return '<h3 class="artigo-h3">'  + p.replace('### ','') + '</h3>';
            if (p.startsWith('- '))   return '<ul class="artigo-list">' + p.split('\n').filter(l=>l.startsWith('- ')).map(l=>'<li>'+l.slice(2)+'</li>').join('') + '</ul>';
            return '<p class="artigo-paragrafo">' + p.replace(/\n/g,'<br>') + '</p>';
        }).join('');
    }
    textarea.addEventListener('input', renderPrev);
    renderPrev();

    ov.querySelectorAll('.efmt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const fmt  = btn.dataset.fmt;
            const wrap = btn.dataset.wrap;
            const list = btn.dataset.list;
            const s = textarea.selectionStart, e2 = textarea.selectionEnd;
            const sel = textarea.value.substring(s, e2);
            let val = textarea.value;
            if (wrap && sel) { val = val.substring(0,s)+fmt+sel+fmt+val.substring(e2); }
            else if (list)   { val = val.substring(0,s)+'- '+val.substring(s); }
            else { const ls = val.lastIndexOf('\n', s-1)+1; val = val.substring(0,ls)+fmt+val.substring(ls); }
            textarea.value = val;
            textarea.focus();
            renderPrev();
        });
    });

    ov.querySelector('#edCancel').addEventListener('click', () => ov.remove());

    ov.querySelector('#edSave').addEventListener('click', () => {
        const title = ov.querySelector('#edTitle').value.trim();
        if (!title) return alert('Título é obrigatório');
        const imgFinal = uploadedImg || imgUrlBox.value.trim() || item.imageUrl || '';
        const updated = {
            ...item,
            title,
            tag:      ov.querySelector('#edTag').value,
            imageUrl: imgFinal,
            summary:  ov.querySelector('#edSummary').value.trim(),
            content:  textarea.value.trim(),
            slug:     slugify(title),
        };
        const idx = AppState.noticias.findIndex(x => x.id === item.id);
        if (idx !== -1) AppState.noticias[idx] = updated;
        saveNoticiasToStorage();
        ov.remove();
        if (typeof onUpdated === 'function') onUpdated(updated);
        else openArtigoPage(updated);
    });
}

// ── Roteamento por URL ────────────────────────────────
function handleRoute() {
    const path = window.location.pathname;
    if (path.startsWith('/artigo/')) {
        const slug = path.replace('/artigo/', '');
        const tryOpen = () => {
            if (!AppState.noticias || !AppState.noticias.length) { setTimeout(tryOpen, 100); return; }
            const item = AppState.noticias.find(n => (n.slug || slugify(n.title)) === slug);
            if (item) openArtigoPage(item);
            else Navigation.go('noticias');
        };
        tryOpen();
    } else if (path === '/noticias') {
        Navigation.go('noticias');
    }
}

window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    if (path.startsWith('/artigo/')) {
        const slug = path.replace('/artigo/', '');
        const item = AppState.noticias?.find(n => (n.slug || slugify(n.title)) === slug);
        if (item) openArtigoPage(item);
    } else {
        const ap = document.getElementById('artigoPage');
        if (ap) ap.remove();
        if (path === '/noticias') Navigation.go('noticias');
        else Navigation.go('home');
    }
});
