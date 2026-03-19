const CONFIG = {
    API_URL: window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '/api',
    ADMIN_PASSWORD: 'admin_perceptron'
};

const AppState = {
    isAdminMode:  false,
    currentPage: 'home',
    noticias:     [],
    equipe:       []
};
