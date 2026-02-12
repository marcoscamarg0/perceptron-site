function renderHeader() {
    const el = document.getElementById('header');
    el.className = 'header';
    el.innerHTML = `
        <div class="header-inner">
            <div class="logo-wrap" onclick="Navigation.go('home')">
                <img src="/logo.png" alt="Perceptron Consultoria" class="logo-img" />
            </div>
            <button class="nav-toggle" id="navToggle" aria-label="Abrir menu" aria-expanded="false">
                <div class="nav-toggle-lines" aria-hidden="true">
                    <span></span><span></span><span></span>
                </div>
            </button>
            <div class="nav-links">
                <button class="nav-link active" data-page="home">Início</button>
                <button class="nav-link" data-page="sobre">Quem Somos</button>
                <button class="nav-link" data-page="noticias">Notícias & Artigos</button>
                <button class="nav-cta" data-page="contato">Contato</button>
            </div>
        </div>

        <div class="mobile-menu-overlay" id="mobileMenuOverlay" aria-hidden="true"></div>
        <div class="mobile-menu" id="mobileMenu" aria-label="Menu">
            <div class="mobile-menu-inner">
                <button class="mobile-link active" data-page="home">Início</button>
                <button class="mobile-link" data-page="sobre">Quem Somos</button>
                <button class="mobile-link" data-page="noticias">Notícias & Artigos</button>
                <button class="mobile-link mobile-cta" data-page="contato">Contato</button>
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
        }

        window.scrollTo({ top:0, behavior:'smooth' });
        document.querySelectorAll('[data-page]').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.page === page)
        );
    }
};
