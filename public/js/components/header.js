function renderHeader() {
    const el = document.getElementById('header');
    el.className = 'header';
    el.innerHTML = `
        <div class="header-inner">
            <div class="logo-wrap" onclick="Navigation.go('home')">
                <img src="/logo.png" alt="Perceptron Consultoria" class="logo-img" />
            </div>
            <button class="nav-toggle" id="navToggle" aria-label="Abrir menu" aria-expanded="false">
                <svg class="burger-icon burger-open" width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <rect x="0" y="0"  width="18" height="2" rx="1" fill="white"/>
                    <rect x="3" y="6"  width="15" height="2" rx="1" fill="white"/>
                    <rect x="0" y="12" width="18" height="2" rx="1" fill="white"/>
                </svg>
                <svg class="burger-icon burger-close" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <line x1="1" y1="1" x2="15" y2="15" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <line x1="15" y1="1" x2="1"  y2="15" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            <div class="nav-links">
                <button class="nav-link active" data-page="home">Início</button>
                <button class="nav-link" data-page="sobre">Empresa</button>
                <button class="nav-link" data-page="noticias">Conteúdos</button>
                <div class="nav-divider"></div>
                <button class="nav-cta" data-page="contato">Contato</button>
                <button class="theme-toggle" id="themeToggle" aria-label="Alternar modo escuro">
                    <span class="theme-icon theme-icon-sun">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="5"/>
                            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                    </span>
                    <span class="theme-icon theme-icon-moon">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    </span>
                </button>
            </div>
        </div>

        <div class="mobile-menu-overlay" id="mobileMenuOverlay" aria-hidden="true"></div>
        <div class="mobile-menu" id="mobileMenu" aria-label="Menu">
            <div class="mobile-menu-inner">
                <button class="mobile-link active" data-page="home">Início</button>
                <button class="mobile-link" data-page="sobre">Empresa</button>
                <button class="mobile-link" data-page="noticias">Conteúdos</button>
                <button class="mobile-link mobile-cta" data-page="contato">Contato</button>
                <button class="theme-toggle theme-toggle-mobile" id="themeToggleMobile" aria-label="Alternar modo">
                    <span class="theme-icon theme-icon-sun">
                        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="5"/>
                            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                    </span>
                    <span class="theme-icon theme-icon-moon">
                        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    </span>
                    <span class="theme-toggle-label">Modo Escuro</span>
                </button>
            </div>
        </div>
    `;

    // Navegação (desktop + mobile)
    document.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            Navigation.go(btn.dataset.page);
            Navigation.closeMobile();
        });
    });

    // Toggle mobile
    const toggleBtn = document.getElementById('navToggle');
    const overlay = document.getElementById('mobileMenuOverlay');
    toggleBtn.addEventListener('click', () => Navigation.toggleMobile());
    overlay.addEventListener('click', () => Navigation.closeMobile());

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') Navigation.closeMobile();
    });

    window.addEventListener('scroll', () => {
        const h = document.getElementById('header');
        if (AppState.currentPage !== 'home') return;
        h.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Dark mode
    ThemeManager.init();
    document.getElementById('themeToggle').addEventListener('click', () => ThemeManager.toggle());
    document.getElementById('themeToggleMobile').addEventListener('click', () => ThemeManager.toggle());
}

const Navigation = {
    isMobileOpen: false,
    toggleMobile() {
        this.isMobileOpen = !this.isMobileOpen;
        const header = document.getElementById('header');
        const toggleBtn = document.getElementById('navToggle');
        header.classList.toggle('mobile-open', this.isMobileOpen);
        toggleBtn?.setAttribute('aria-expanded', String(this.isMobileOpen));
    },
    closeMobile() {
        this.isMobileOpen = false;
        const header = document.getElementById('header');
        const toggleBtn = document.getElementById('navToggle');
        header.classList.remove('mobile-open');
        toggleBtn?.setAttribute('aria-expanded', 'false');
    },
    go(page) {
        AppState.currentPage = page;
        const ids = ['homePage','sobrePage','noticiasPage','contatoPage'];
        ids.forEach(id => document.getElementById(id).classList.add('hidden'));
        const header = document.getElementById('header');

        if (page === 'home') {
            document.getElementById('homePage').classList.remove('hidden');
            header.classList.remove('page-mode','scrolled');
        } else {
            header.classList.add('page-mode');
            header.classList.remove('scrolled');
            const map = { sobre:'sobrePage', noticias:'noticiasPage', contato:'contatoPage' };
            if (map[page]) document.getElementById(map[page]).classList.remove('hidden');

            // Recarrega dados do banco toda vez que navega para a página
            if (page === 'noticias') {
                API.getNoticias().then(dados => {
                    if (dados && dados.length) {
                        AppState.noticias = dados;
                        const activeTag = document.querySelector('.filter-btn.active')?.dataset.tag || 'todos';
                        renderNoticiasGrid(activeTag);
                    }
                }).catch(e => console.warn('Noticias API:', e));
            }
            if (page === 'sobre') {
                API.getEquipe().then(dados => {
                    if (dados && dados.length) {
                        AppState.equipe = dados.map(m => {
                            const fixo = (typeof EQUIPE_FIXA !== 'undefined')
                                ? EQUIPE_FIXA.find(f => f.id === m.id)
                                : null;
                            return fixo ? { ...fixo, ...m } : m;
                        });
                        renderEquipeGrid();
                    }
                }).catch(() => {});
            }
        }

        window.scrollTo({ top:0, behavior:'smooth' });
        document.querySelectorAll('[data-page]').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.page === page)
        );
    }
};
