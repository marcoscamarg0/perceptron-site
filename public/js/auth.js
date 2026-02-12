const Auth = {
    login(password) {
        if (password === CONFIG.ADMIN_PASSWORD) {
            AppState.isAdminMode = true;
            localStorage.setItem('adminMode', 'true');
            this._dispatch();
            return true;
        }
        return false;
    },
    logout() {
        AppState.isAdminMode = false;
        localStorage.removeItem('adminMode');
        this._dispatch();
    },
    checkAuth() {
        if (localStorage.getItem('adminMode') === 'true') {
            AppState.isAdminMode = true;
            this._dispatch();
        }
    },
    _dispatch() {
        document.dispatchEvent(new CustomEvent('authChanged', { detail: { isAdmin: AppState.isAdminMode } }));
    }
};
