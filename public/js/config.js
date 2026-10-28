const CONFIG = {
    API_URL: window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '/api',
};

const AppState = {
    isAdminMode:  false,
    adminToken:   null,   // token JWT/aleatório recebido do backend após login
    currentPage: 'home',
    noticias:     [],
    equipe:       [],
    temas:        [],
};
