// ── Painel de Gerenciamento de Temas (admin) ─────────
// Abre um modal para criar, renomear e excluir temas.
// Usado pelo buildNewsModal e openEditorArtigo para preencher
// o seletor de categoria dinamicamente.

async function carregarTemas() {
    try {
        const temas = await API.getTemas();
        AppState.temas = temas || [];
    } catch (e) {
        AppState.temas = ['Saneamento','Setor Elétrico','Rodovias','Gestão Pública','Concessões','Regulação','Infraestrutura','Geral'];
    }
    return AppState.temas;
}

function openTemasAdmin() {
    const ov = document.createElement('div');
    ov.className = 'modal-overlay active';
    ov.style.cssText = 'z-index:600;padding:2rem;align-items:flex-start;overflow-y:auto;background:rgba(0,0,0,.55);backdrop-filter:blur(4px)';
    ov.id = 'temasAdminModal';

    function buildHTML() {
        const lista = (AppState.temas || []).map((t, i) => `
            <div class="tema-row" data-tema="${escAttr(t)}">
                <span class="tema-row-nome">${escHtml2(t)}</span>
                <div class="tema-row-actions">
                    <button class="tema-btn-rename" title="Renomear" data-idx="${i}">✏️</button>
                    <button class="tema-btn-delete" title="Excluir" data-tema="${escAttr(t)}">🗑️</button>
                </div>
            </div>
        `).join('');

        return `
        <div class="temas-admin-box">
            <div class="temas-admin-header">
                <h2>🏷️ Gerenciar Temas</h2>
                <button class="modal-x" id="fecharTemasAdmin">×</button>
            </div>
            <p style="font-size:.82rem;color:var(--text-muted);margin-bottom:1.5rem">
                Crie, renomeie ou exclua temas. Ao renomear, todas as notícias vinculadas são atualizadas automaticamente.
            </p>
            <div class="tema-nova-row">
                <input class="ned-input" id="novoTemaInput" placeholder="Nome do novo tema..." style="flex:1" />
                <button class="ned-btn-publish" id="criarTemaBtn">+ Criar</button>
            </div>
            <div id="temasLista" style="margin-top:1rem">
                ${lista || '<p style="color:var(--text-muted);font-size:.85rem">Nenhum tema cadastrado.</p>'}
            </div>
        </div>`;
    }

    ov.innerHTML = buildHTML();
    document.body.appendChild(ov);

    function refresh() {
        ov.innerHTML = buildHTML();
        bindEvents();
    }

    function bindEvents() {
        document.getElementById('fecharTemasAdmin').addEventListener('click', () => {
            ov.remove();
            // Re-renderiza grid de notícias para refletir novos temas nos filtros
            if (typeof renderNoticiasGrid === 'function') renderNoticiasGrid(document.querySelector('.filter-btn.active')?.dataset.tag || 'todos');
        });
        ov.addEventListener('click', e => { if (e.target === ov) { ov.remove(); } });

        document.getElementById('criarTemaBtn').addEventListener('click', async () => {
            const input = document.getElementById('novoTemaInput');
            const nome = input.value.trim();
            if (!nome) return;
            const ok = await API.createTema(nome);
            if (ok) {
                AppState.temas = await API.getTemas();
                refresh();
            } else {
                alert('Erro ao criar tema (pode já existir).');
            }
        });

        ov.querySelectorAll('.tema-btn-rename').forEach(btn => {
            btn.addEventListener('click', async () => {
                const row = btn.closest('.tema-row');
                const antigo = row.dataset.tema;
                const novoNome = prompt(`Renomear "${antigo}" para:`, antigo);
                if (!novoNome || novoNome.trim() === antigo) return;
                const ok = await API.renameTema(antigo, novoNome.trim());
                if (ok) {
                    // Atualiza localmente também
                    AppState.noticias = AppState.noticias.map(n => n.tag === antigo ? { ...n, tag: novoNome.trim() } : n);
                    AppState.temas = await API.getTemas();
                    refresh();
                    if (typeof renderNoticiasGrid === 'function') renderNoticiasGrid(document.querySelector('.filter-btn.active')?.dataset.tag || 'todos');
                } else {
                    alert('Erro ao renomear tema.');
                }
            });
        });

        ov.querySelectorAll('.tema-btn-delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                const nome = btn.dataset.tema;
                const outros = (AppState.temas || []).filter(t => t !== nome);
                const reatribuir = outros.length
                    ? prompt(`Excluir o tema "${nome}"?\nAs notícias vinculadas serão reatribuídas para qual tema?\n(Deixe em branco para não reatribuir)\nOpções: ${outros.join(', ')}`)
                    : null;
                if (reatribuir === null) return; // cancelou
                const ok = await API.deleteTema(nome, reatribuir || undefined);
                if (ok) {
                    if (reatribuir) {
                        AppState.noticias = AppState.noticias.map(n => n.tag === nome ? { ...n, tag: reatribuir } : n);
                    }
                    AppState.temas = await API.getTemas();
                    refresh();
                } else {
                    alert('Erro ao excluir tema.');
                }
            });
        });
    }

    bindEvents();
}

// Pequenas funções utilitárias de escape
function escHtml2(str) { return (str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escAttr(str)  { return (str||'').replace(/"/g,'&quot;'); }
