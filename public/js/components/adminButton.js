// Admin Floating Button
function renderAdminButton() {
    const el = document.getElementById('adminFloating');
    el.innerHTML = `
        <button class="admin-btn admin-btn-logout hidden" id="logoutBtn">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="18" height="11" x="3" y="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Encerrar Sessão
        </button>
        <button class="admin-btn admin-btn-login" id="loginBtn">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
            Acesso Restrito
        </button>
    `;

    document.getElementById('loginBtn').addEventListener('click', () => {
        document.getElementById('loginModal').classList.add('active');
    });

    document.getElementById('logoutBtn').addEventListener('click', () => Auth.logout());

    // Banner de admin
    document.body.insertAdjacentHTML('beforeend', '<div class="admin-banner" id="adminBanner">✦ &nbsp; Modo de Edição Ativo — alterações são salvas automaticamente</div>');

    document.addEventListener('authChanged', (e) => {
        const loginBtn  = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const banner    = document.getElementById('adminBanner');
        if (e.detail.isAdmin) {
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            banner.classList.add('active');
        } else {
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
            banner.classList.remove('active');
        }
    });
}
