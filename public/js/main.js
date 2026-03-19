const ThemeManager = {
    init() {
        const saved = localStorage.getItem('theme');
        const isDark = saved === 'dark'; // padrão sempre claro, a não ser que o usuário tenha escolhido escuro
        this.apply(isDark);
    },
    toggle() {
        const isDark = document.documentElement.classList.contains('dark');
        this.apply(!isDark);
        localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    },
    apply(isDark) {
        document.documentElement.classList.toggle('dark', isDark);
        // Update toggle label
        const labels = document.querySelectorAll('.theme-toggle-label');
        labels.forEach(l => l.textContent = isDark ? 'Modo Claro' : 'Modo Escuro');
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    // Renderiza componentes estruturais
    renderAdminButton();
    renderLoginModal();
    renderHeader();

    // Renderiza seções da home
    renderHeroSection();
    renderAreasSection();

    // Renderiza páginas (em background)
    await renderSobrePage();
    await renderNoticiasPage();
    renderContatoPage();

    // Renderiza footer
    renderFooter();

    // Checa autenticação salva
    Auth.checkAuth();

    // Roteamento por URL
    handleRoute();

    console.log('✅ Perceptron — pronto.');
});
