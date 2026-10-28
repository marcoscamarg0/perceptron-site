// ── DADOS ESTÁTICOS (fallback sem servidor) ──────────────────────────────────

const _DB = {
    noticias: [
        { id:'1', title:'Marco Legal do Saneamento: desafios e oportunidades para municípios',              summary:'A Lei 14.026/2020 impõe novas exigências de universalização, equilíbrio tarifário e governança contratual.', date:'08/02/2025', tag:'Saneamento',    imageUrl:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80', content:'', slug:'marco-legal-do-saneamento-desafios-e-oportunidades-para-municipios' },
        { id:'2', title:'Revisões tarifárias no setor elétrico: o papel da análise regulatória',            summary:'Processos de revisão tarifária periódica exigem análise técnica robusta e monitoramento por indicadores.',   date:'01/02/2025', tag:'Setor Elétrico', imageUrl:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80', content:'', slug:'revisoes-tarifarias-no-setor-eletrico-o-papel-da-analise-regulatoria' },
        { id:'3', title:'Concessões rodoviárias: como garantir governança e previsibilidade contratual',    summary:'A gestão eficiente de concessões rodoviárias requer monitoramento contínuo de CAPEX, OPEX, tráfego.',         date:'25/01/2025', tag:'Rodovias',       imageUrl:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80', content:'', slug:'concessoes-rodoviarias-como-garantir-governanca-e-previsibilidade-contratual' },
        { id:'4', title:'Gestão pública municipal: como melhorar arrecadação e capacidade de investimento', summary:'Diagnósticos estruturados e planos de ação orientados por indicadores permitem que municípios melhorem.',    date:'15/01/2025', tag:'Gestão Pública', imageUrl:'', content:'', slug:'gestao-publica-municipal-como-melhorar-arrecadacao-e-capacidade-de-investimento' },
        { id:'5', title:'PPPs e concessões: do modelo ao contrato executável',                              summary:'A estruturação de PPPs e concessões envolve modelagem econômico-financeira, matriz de riscos.',             date:'10/01/2025', tag:'Concessões',     imageUrl:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80', content:'', slug:'ppps-e-concessoes-do-modelo-ao-contrato-executavel' },
    ],
    equipe: [
        { id:'1', name:'Igor Andrey Roselli',     role:'Especialista em Regulação',              bio:'Graduado em Gestão Pública pelo IFB. Experiência na ANEEL e ANM.',                              specialty:'Regulação · Setor Elétrico · Mineração'                    },
        { id:'2', name:'Rodrigo Alex Roselli',    role:'Engenheiro Civil — Infraestrutura',       bio:'Engenheiro Civil pela USP. +15 anos em concessões rodoviárias.',                                specialty:'Rodovias · Concessões · Infraestrutura'                    },
        { id:'3', name:'Marcos Vinicius Roselli', role:'Engenheiro Mecânico — Gestão Pública',    bio:'Engenheiro Mecânico e Mestre pela UNIFEI. Experiência em gestão pública municipal.',            specialty:'Gestão Pública · Saneamento · Financeiro'                  },
        { id:'4', name:'Renato Henrique Roselli', role:'Engenheiro Civil — Projetos',             bio:'Engenheiro Civil pela EESC-USP. +17 anos em análise de tráfego e projetos executivos.',         specialty:'Projetos Executivos · Tráfego · Estruturas'                },
    ],
    temas: ['Saneamento','Setor Elétrico','Rodovias','Gestão Pública','Concessões','Regulação','Infraestrutura','Geral'],
};

// ── Cabeçalho de autorização ─────────────────────────
function authHeaders() {
    const token = AppState.adminToken || sessionStorage.getItem('adminToken');
    return token
        ? { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        : { 'Content-Type': 'application/json' };
}

// ── API: tenta servidor, cai para dados estáticos ────
const API = {
    // ── Notícias ──────────────────────────────────────
    async getNoticias() {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias`);
            return r.ok ? await r.json() : _DB.noticias;
        } catch { return _DB.noticias; }
    },
    async createNoticia(data) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias`, {
                method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async updateNoticia(id, data) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias/${id}`, {
                method: 'PUT', headers: authHeaders(), body: JSON.stringify(data),
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async deleteNoticia(id) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias/${id}`, {
                method: 'DELETE', headers: authHeaders(),
            });
            return r.ok;
        } catch { return false; }
    },

    // ── Equipe ────────────────────────────────────────
    async getEquipe() {
        try {
            const r = await fetch(`${CONFIG.API_URL}/equipe`);
            return r.ok ? await r.json() : _DB.equipe;
        } catch { return _DB.equipe; }
    },
    async createMembro(data) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/equipe`, {
                method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async updateMembro(id, data) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/equipe/${id}`, {
                method: 'PUT', headers: authHeaders(), body: JSON.stringify(data),
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async deleteMembro(id) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/equipe/${id}`, {
                method: 'DELETE', headers: authHeaders(),
            });
            return r.ok;
        } catch { return false; }
    },

    // ── Temas ─────────────────────────────────────────
    async getTemas() {
        try {
            const r = await fetch(`${CONFIG.API_URL}/temas`);
            return r.ok ? await r.json() : _DB.temas;
        } catch { return _DB.temas; }
    },
    async createTema(nome) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/temas`, {
                method: 'POST', headers: authHeaders(), body: JSON.stringify({ nome }),
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async renameTema(antigo, novoNome) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/temas/${encodeURIComponent(antigo)}`, {
                method: 'PUT', headers: authHeaders(), body: JSON.stringify({ novoNome }),
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async deleteTema(nome, reatribuir) {
        try {
            const qs = reatribuir ? `?reatribuir=${encodeURIComponent(reatribuir)}` : '';
            const r  = await fetch(`${CONFIG.API_URL}/temas/${encodeURIComponent(nome)}${qs}`, {
                method: 'DELETE', headers: authHeaders(),
            });
            return r.ok;
        } catch { return false; }
    },

    // ── Contato ───────────────────────────────────────
    async enviarContato(data) {
        const r = await fetch(`${CONFIG.API_URL}/contato`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return r.json(); // pode ser { ok: true } ou { error: '...' }
    },
};
