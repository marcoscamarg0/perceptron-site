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

    console.log('✅ Perceptron — pronto.');
});
