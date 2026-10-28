// ── Autenticação via backend ──────────────────────────
// A senha NÃO está mais no frontend. O login é validado pelo servidor,
// que devolve um token temporário (válido por 8h).
// O token é armazenado em sessionStorage (some ao fechar o navegador).

const Auth = {
    async login(password) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (!r.ok) return false;
            const { token } = await r.json();
            AppState.adminToken = token;
            AppState.isAdminMode = true;
            sessionStorage.setItem('adminToken', token);
            this._dispatch();
            return true;
        } catch (e) {
            console.error('Erro no login:', e);
            return false;
        }
    },
    async logout() {
        const token = AppState.adminToken || sessionStorage.getItem('adminToken');
        if (token) {
            fetch(`${CONFIG.API_URL}/auth/logout`, {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + token },
            }).catch(() => {});
        }
        AppState.adminToken = null;
        AppState.isAdminMode = false;
        sessionStorage.removeItem('adminToken');
        this._dispatch();
    },
    checkAuth() {
        const token = sessionStorage.getItem('adminToken');
        if (token) {
            AppState.adminToken = token;
            AppState.isAdminMode = true;
            this._dispatch();
        }
    },
    _dispatch() {
        document.dispatchEvent(new CustomEvent('authChanged', { detail: { isAdmin: AppState.isAdminMode } }));
    }
};
