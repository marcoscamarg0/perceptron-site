function renderAreasSection() {
    const el = document.getElementById('areasSection');
    const areas = [
        {
            num: '01',
            title: 'Lorem Ipsum Dolor',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
        },
        {
            num: '02',
            title: 'Sit Amet Consectetur',
            desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`
        },
        {
            num: '03',
            title: 'Adipiscing Elit Sed',
            desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nemo enim ipsam voluptatem quia voluptas sit.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`
        },
        {
            num: '04',
            title: 'Eiusmod Tempor',
            desc: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`
        }
    ];

    el.innerHTML = `
        <div class="areas-section" id="areasSection">
            <div class="section-container">
                <div class="section-header-row">
                    <div>
                        <div class="section-label">
                            <div class="section-label-line"></div>
                            <span class="section-label-text">Especialidades</span>
                        </div>
                        <h2 class="section-title-serif">Áreas de<br><em>Atuação</em></h2>
                    </div>
                    <p class="section-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore magna aliqua.
                    </p>
                </div>

                <div class="areas-grid">
                    ${areas.map(a => `
                        <div class="area-card">
                            <div class="area-num">${a.num}</div>
                            ${a.icon}
                            <h3 class="area-title">${a.title}</h3>
                            <p class="area-desc">${a.desc}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="areas-quote-block">
                    <div class="areas-quote-line"></div>
                    <blockquote class="areas-quote">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam."
                    </blockquote>
                    <div class="areas-quote-author">Dra. Lorem Ipsum — Sócia-Fundadora</div>
                </div>

                <div class="areas-numbers-bar">
                    <div class="number-stat">
                        <div class="number-stat-value">15+</div>
                        <div class="number-stat-label">Anos de Mercado</div>
                    </div>
                    <div class="number-stat">
                        <div class="number-stat-value">320+</div>
                        <div class="number-stat-label">Clientes Atendidos</div>
                    </div>
                    <div class="number-stat">
                        <div class="number-stat-value">98%</div>
                        <div class="number-stat-label">Taxa de Satisfação</div>
                    </div>
                    <div class="number-stat">
                        <div class="number-stat-value">4</div>
                        <div class="number-stat-label">Especialidades</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
