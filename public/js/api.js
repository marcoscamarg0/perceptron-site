// ── DADOS ESTÁTICOS (funcionam sem servidor) ────────────────────────────────

const _DB = {
    noticias: [
        {
            id: '1',
            title: 'Marco Legal do Saneamento: desafios e oportunidades para municípios',
            summary: 'A Lei 14.026/2020 impõe novas exigências de universalização, equilíbrio tarifário e governança contratual. Entenda como estruturar contratos sustentáveis e mitigar riscos na prestação dos serviços.',
            date: '08/02/2025',
            tag: 'Saneamento',
            imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80'
        },
        {
            id: '2',
            title: 'Revisões tarifárias no setor elétrico: o papel da análise regulatória',
            summary: 'Processos de revisão tarifária periódica exigem análise técnica robusta e monitoramento por indicadores. A assimetria de informação entre regulador e regulado pode ser reduzida com dados bem estruturados e modelos econômico-financeiros.',
            date: '01/02/2025',
            tag: 'Setor Elétrico',
            imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80'
        },
        {
            id: '3',
            title: 'Concessões rodoviárias: como garantir governança e previsibilidade contratual',
            summary: 'A gestão eficiente de concessões rodoviárias requer monitoramento contínuo de CAPEX, OPEX, tráfego e níveis de serviço. Modelos e painéis de dados são fundamentais para decisões em fiscalização, revisões e reequilíbrios.',
            date: '25/01/2025',
            tag: 'Rodovias',
            imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80'
        },
        {
            id: '4',
            title: 'Gestão pública municipal: como melhorar arrecadação e capacidade de investimento',
            summary: 'Diagnósticos estruturados e planos de ação orientados por indicadores permitem que municípios melhorem a saúde financeira e ampliem a capacidade de entrega de infraestrutura e serviços à população.',
            date: '15/01/2025',
            tag: 'Gestão Pública',
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80'
        },
        {
            id: '5',
            title: 'PPPs e concessões: do modelo ao contrato executável',
            summary: 'A estruturação de PPPs e concessões envolve modelagem econômico-financeira, matriz de riscos e mecanismos de remuneração adequados. Contratos bem desenhados reduzem disputas e aumentam a previsibilidade ao longo do ciclo de vida.',
            date: '10/01/2025',
            tag: 'Concessões',
            imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80'
        }
    ],
    equipe: [
        {
            id: '1',
            name: 'Igor Andrey Roselli',
            role: 'Especialista em Regulação',
            bio: 'Graduado em Gestão Pública pelo IFB e graduando em Direito pelo UniCEUB. Pós-graduando em Direito e Regulação do Setor Elétrico. Experiência na ANEEL e ANM.',
            specialty: 'Regulação · Setor Elétrico · Mineração'
        },
        {
            id: '2',
            name: 'Rodrigo Alex Roselli',
            role: 'Engenheiro Civil — Infraestrutura',
            bio: 'Engenheiro Civil pela USP. Mais de 15 anos de experiência em concessões rodoviárias e engenharia de infraestrutura, com atuação em implantação, conservação e gestão contratual.',
            specialty: 'Rodovias · Concessões · Infraestrutura'
        },
        {
            id: '3',
            name: 'Marcos Vinicius Roselli',
            role: 'Engenheiro Mecânico — Gestão Pública',
            bio: 'Engenheiro Mecânico e Mestre pela UNIFEI. Experiência em gestão pública municipal, financeira, saúde e gestão territorial censitária.',
            specialty: 'Gestão Pública · Saneamento · Financeiro'
        },
        {
            id: '4',
            name: 'Renato Henrique Roselli',
            role: 'Engenheiro Civil — Projetos',
            bio: 'Engenheiro Civil pela EESC-USP. Mais de 17 anos de experiência em análise de tráfego, coordenação de projetos executivos, estruturas e usinas hidrelétricas.',
            specialty: 'Projetos Executivos · Tráfego · Estruturas'
        }
    ]
};

// ── API: tenta servidor, cai para dados estáticos ───────────────────────────

const API = {
    async getNoticias() {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias`);
            return r.ok ? await r.json() : _DB.noticias;
        } catch { return _DB.noticias; }
    },
    async createNoticia(data) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async updateNoticia(id, data) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async deleteNoticia(id) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias/${id}`, { method: 'DELETE' });
            return r.ok;
        } catch { return false; }
    },
    async getEquipe() {
        try {
            const r = await fetch(`${CONFIG.API_URL}/equipe`);
            return r.ok ? await r.json() : _DB.equipe;
        } catch { return _DB.equipe; }
    },
    async createMembro(data) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/equipe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async updateMembro(id, data) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/equipe/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async deleteMembro(id) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/equipe/${id}`, { method: 'DELETE' });
            return r.ok;
        } catch { return false; }
    }
};
