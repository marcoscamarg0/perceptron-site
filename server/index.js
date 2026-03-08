const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../public')));

// ── DADOS INICIAIS ──────────────────────────────────

let noticias = [
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
        imageUrl: ''
    },
    {
        id: '5',
        title: 'PPPs e concessões: do modelo ao contrato executável',
        summary: 'A estruturação de PPPs e concessões envolve modelagem econômico-financeira, matriz de riscos e mecanismos de remuneração adequados. Contratos bem desenhados reduzem disputas e aumentam a previsibilidade ao longo do ciclo de vida.',
        date: '10/01/2025',
        tag: 'Concessões',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80'
    }
];

// Membros fixos — imagens embutidas no frontend (equipeImages.js)
// Novos membros adicionados pelo admin salvam imageUrl no backend normalmente
let equipe = [
    {
        id: '1',
        name: 'Igor Andrey Roselli',
        role: 'Especialista em Regulação',
        bio: 'Graduado em Gestão Pública pelo IFB e graduando em Direito pelo UniCEUB. Pós-graduando em Direito e Regulação do Setor Elétrico. Experiência na ANEEL e ANM.',
        specialty: 'Regulação · Setor Elétrico · Mineração',
        imageKey: 'igor'
    },
    {
        id: '2',
        name: 'Rodrigo Alex Roselli',
        role: 'Engenheiro Civil — Infraestrutura',
        bio: 'Engenheiro Civil pela USP. Consultor com mais de 15 anos de experiência em concessões rodoviárias e engenharia de infraestrutura, com atuação em implantação, conservação e gestão contratual.',
        specialty: 'Rodovias · Concessões · Infraestrutura',
        imageKey: 'rodrigo'
    },
    {
        id: '3',
        name: 'Marcos Vinicius Roselli',
        role: 'Engenheiro Mecânico — Gestão Pública',
        bio: 'Engenheiro Mecânico e Mestre pela UNIFEI. Experiência em gestão pública municipal, financeira, saúde e gestão territorial censitária.',
        specialty: 'Gestão Pública · Saneamento · Financeiro',
        imageKey: 'marcos'
    },
    {
        id: '4',
        name: 'Renato Henrique Roselli',
        role: 'Engenheiro Civil — Projetos',
        bio: 'Engenheiro Civil pela EESC-USP. Consultor com mais de 17 anos de experiência em análise de tráfego, coordenação de projetos executivos, estruturas e usinas hidrelétricas.',
        specialty: 'Projetos Executivos · Tráfego · Estruturas',
        imageKey: 'renato'
    },
    {
        id: '5',
        name: 'Luísa Simei',
        role: 'Engenheira Eletricista — Setor Elétrico',
        bio: 'Engenheira Eletricista pela UnB. Pós-graduada em Gestão de Riscos na Comercialização de Energia pela USP. Experiência na ANEEL, CCEE e em consultorias especializadas no mercado de energia.',
        specialty: 'Regulação · Comercialização de Energia · Gestão de Riscos',
        imageKey: 'luisa'
    }
];

// ── ROTAS: NOTÍCIAS ─────────────────────────────────

app.get('/api/noticias', (req, res) => res.json(noticias));

app.get('/api/noticias/:id', (req, res) => {
    const item = noticias.find(n => n.id === req.params.id);
    return item ? res.json(item) : res.status(404).json({ error: 'Não encontrado' });
});

app.post('/api/noticias', (req, res) => {
    const { title, summary, tag, imageUrl } = req.body;
    if (!title) return res.status(400).json({ error: 'Título obrigatório' });
    const nova = {
        id: Date.now().toString(), title,
        summary: summary || '',
        date: new Date().toLocaleDateString('pt-BR'),
        tag: tag || 'Geral',
        imageUrl: imageUrl || ''
    };
    noticias = [nova, ...noticias];
    res.status(201).json(nova);
});

app.put('/api/noticias/:id', (req, res) => {
    const idx = noticias.findIndex(n => n.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });
    const { title, summary, tag, imageUrl } = req.body;
    noticias[idx] = {
        ...noticias[idx],
        ...(title    !== undefined && { title }),
        ...(summary  !== undefined && { summary }),
        ...(tag      !== undefined && { tag }),
        ...(imageUrl !== undefined && { imageUrl })
    };
    res.json(noticias[idx]);
});

app.delete('/api/noticias/:id', (req, res) => {
    if (!noticias.find(n => n.id === req.params.id))
        return res.status(404).json({ error: 'Não encontrado' });
    noticias = noticias.filter(n => n.id !== req.params.id);
    res.status(204).send();
});

// ── ROTAS: EQUIPE ───────────────────────────────────

app.get('/api/equipe', (req, res) => res.json(equipe));

app.post('/api/equipe', (req, res) => {
    const { name, role, bio, specialty } = req.body;
    if (!name) return res.status(400).json({ error: 'Nome obrigatório' });
    const novo = { id: Date.now().toString(), name, role: role || 'Consultor', bio: bio || '', specialty: specialty || 'Lorem Ipsum' };
    equipe = [...equipe, novo];
    res.status(201).json(novo);
});

app.put('/api/equipe/:id', (req, res) => {
    const idx = equipe.findIndex(m => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });
    const { name, role, bio, specialty, imageUrl } = req.body;
    equipe[idx] = { ...equipe[idx],
        ...(name      !== undefined && { name }),
        ...(role      !== undefined && { role }),
        ...(bio       !== undefined && { bio }),
        ...(specialty !== undefined && { specialty }),
        ...(imageUrl  !== undefined && { imageUrl })
    };
    res.json(equipe[idx]);
});

app.delete('/api/equipe/:id', (req, res) => {
    if (!equipe.find(m => m.id === req.params.id))
        return res.status(404).json({ error: 'Não encontrado' });
    equipe = equipe.filter(m => m.id !== req.params.id);
    res.status(204).send();
});

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// --------------------------------------------------
// Vercel: a função serverless NÃO deve abrir porta.
// Local: mantém o app.listen() para desenvolvimento.
// --------------------------------------------------

if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(PORT, () => {
        console.log(`🚀 http://localhost:${PORT}`);
    });
}
