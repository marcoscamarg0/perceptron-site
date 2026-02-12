// Login Modal
function renderLoginModal() {
    const el = document.getElementById('loginModal');
    el.innerHTML = `
        <div class="modal-box">
            <button class="modal-x" id="closeModal">&times;</button>
            <div class="modal-icon-wrap">
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect width="18" height="11" x="3" y="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
            </div>
            <h2 class="modal-title">Painel de Manutenção</h2>
            <p class="modal-sub">Insira sua chave de acesso para editar o conteúdo do site.</p>
            <form id="loginForm">
                <div class="modal-field">
                    <input type="password" id="pwInput" class="modal-input" placeholder="Chave de Acesso" autocomplete="off" />
                    <button type="button" class="modal-eye" id="togglePw">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-error" id="loginError">Chave inválida. Tente novamente.</div>
                <button type="submit" class="modal-submit">Entrar no Modo Edição</button>
                <p class="modal-hint">Dica: a senha é admin_perceptron</p>
            </form>
        </div>
    `;

    const closeBtn   = el.querySelector('#closeModal');
    const form       = el.querySelector('#loginForm');
    const pwInput    = el.querySelector('#pwInput');
    const toggleBtn  = el.querySelector('#togglePw');
    const errorMsg   = el.querySelector('#loginError');

    const close = () => {
        el.classList.remove('active');
        pwInput.value = '';
        errorMsg.classList.remove('show');
        pwInput.classList.remove('error');
    };

    closeBtn.addEventListener('click', close);
    el.addEventListener('click', e => { if (e.target === el) close(); });

    toggleBtn.addEventListener('click', () => {
        pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (Auth.login(pwInput.value)) {
            close();
        } else {
            errorMsg.classList.add('show');
            pwInput.classList.add('error');
        }
    });
}
