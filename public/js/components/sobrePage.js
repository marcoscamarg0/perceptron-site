async function renderSobrePage() {
    const el = document.getElementById('sobrePage');
    AppState.equipe = await API.getEquipe();

    el.innerHTML = `
        <div class="page-hero">
            <div class="page-hero-inner">
                <div class="page-hero-label">
                    <div class="page-hero-label-line"></div>
                    <span class="page-hero-label-text">Nossa história</span>
                </div>
                <h1 class="page-hero-title">Quem<br><em>Somos</em> Nós</h1>
                <p class="page-hero-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>

        <div class="sobre-content">
            <div class="sobre-grid">
                <div>
                    <p class="sobre-text-big">
                        A <strong>Perceptron Consultoria</strong> lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim veniam.
                    </p>
                    <p class="sobre-text-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p class="sobre-text-body">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p class="sobre-text-body">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam.
                    </p>
                </div>

                <div class="sobre-values">
                    <div class="sobre-value-item">
                        <span class="sobre-value-num">01</span>
                        <div>
                            <div class="sobre-value-title">Lorem Ipsum Dolor</div>
                            <div class="sobre-value-desc">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.</div>
                        </div>
                    </div>
                    <div class="sobre-value-item">
                        <span class="sobre-value-num">02</span>
                        <div>
                            <div class="sobre-value-title">Consectetur Adipiscing</div>
                            <div class="sobre-value-desc">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</div>
                        </div>
                    </div>
                    <div class="sobre-value-item">
                        <span class="sobre-value-num">03</span>
                        <div>
                            <div class="sobre-value-title">Eiusmod Tempor</div>
                            <div class="sobre-value-desc">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur quis autem vel eum.</div>
                        </div>
                    </div>
                    <div class="sobre-value-item">
                        <span class="sobre-value-num">04</span>
                        <div>
                            <div class="sobre-value-title">Magna Aliqua Veniam</div>
                            <div class="sobre-value-desc">Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sobre-timeline">
                <div class="section-label" style="margin-bottom:2.5rem">
                    <div class="section-label-line"></div>
                    <span class="section-label-text">Nossa Trajetória</span>
                </div>
                <div class="timeline-grid">
                    <div class="timeline-item"><div class="timeline-year">2009</div><div class="timeline-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.</div></div>
                    <div class="timeline-item"><div class="timeline-year">2013</div><div class="timeline-desc">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</div></div>
                    <div class="timeline-item"><div class="timeline-year">2017</div><div class="timeline-desc">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore pariatur.</div></div>
                    <div class="timeline-item"><div class="timeline-year">2021</div><div class="timeline-desc">Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt.</div></div>
                    <div class="timeline-item"><div class="timeline-year">2025</div><div class="timeline-desc">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sequi.</div></div>
                </div>
            </div>

            <div class="equipe-section">
                <div class="section-label">
                    <div class="section-label-line"></div>
                    <span class="section-label-text">Time</span>
                </div>
                <h2 class="section-title-serif" style="margin-top:.5rem;margin-bottom:.5rem">Nossa <em>Equipe</em></h2>
                <p style="font-family:var(--font-body);font-size:.88rem;color:var(--text-muted);max-width:480px;line-height:1.7">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.
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
        card.innerHTML = `
            <div class="equipe-card-top">
                <div class="equipe-avatar">
                    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
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
        card.querySelector('.delete-btn')?.addEventListener('click', async () => {
            if (!AppState.isAdminMode) return;
            if (confirm(`Remover ${m.name}?`)) {
                await API.deleteMembro(m.id);
                AppState.equipe = await API.getEquipe();
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
            const bio  = prompt('Bio:')  || 'Lorem ipsum dolor sit amet.';
            const spec = prompt('Especialidade:') || 'Lorem Ipsum';
            const res  = await API.createMembro({ name, role, bio, specialty: spec });
            if (res) { AppState.equipe = await API.getEquipe(); renderEquipeGrid(); }
        });
        grid.appendChild(add);
    }
}
