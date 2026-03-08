const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const { MongoClient } = require('mongodb');

const app  = express();
const PORT = process.env.PORT || 3000;

// Defina MONGODB_URI nas variáveis de ambiente do Koyeb
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/perceptron';

let colNoticias;
let colEquipe;

async function connectDB() {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db();
    colNoticias = db.collection('noticias');
    colEquipe   = db.collection('equipe');
    console.log('✅ MongoDB conectado');
    await seedDB();
}

async function seedDB() {
    if (await colNoticias.countDocuments() === 0) {
        await colNoticias.insertMany([
            { _id:'1', title:'Marco Legal do Saneamento: desafios e oportunidades para municípios', summary:'A Lei 14.026/2020 impõe novas exigências de universalização, equilíbrio tarifário e governança contratual. Entenda como estruturar contratos sustentáveis e mitigar riscos na prestação dos serviços.', date:'08/02/2025', tag:'Saneamento', imageUrl:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80' },
            { _id:'2', title:'Revisões tarifárias no setor elétrico: o papel da análise regulatória', summary:'Processos de revisão tarifária periódica exigem análise técnica robusta e monitoramento por indicadores. A assimetria de informação entre regulador e regulado pode ser reduzida com dados bem estruturados e modelos econômico-financeiros.', date:'01/02/2025', tag:'Setor Elétrico', imageUrl:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80' },
            { _id:'3', title:'Concessões rodoviárias: como garantir governança e previsibilidade contratual', summary:'A gestão eficiente de concessões rodoviárias requer monitoramento contínuo de CAPEX, OPEX, tráfego e níveis de serviço. Modelos e painéis de dados são fundamentais para decisões em fiscalização, revisões e reequilíbrios.', date:'25/01/2025', tag:'Rodovias', imageUrl:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80' },
            { _id:'4', title:'Gestão pública municipal: como melhorar arrecadação e capacidade de investimento', summary:'Diagnósticos estruturados e planos de ação orientados por indicadores permitem que municípios melhorem a saúde financeira e ampliem a capacidade de entrega de infraestrutura e serviços à população.', date:'15/01/2025', tag:'Gestão Pública', imageUrl:'' },
            { _id:'5', title:'PPPs e concessões: do modelo ao contrato executável', summary:'A estruturação de PPPs e concessões envolve modelagem econômico-financeira, matriz de riscos e mecanismos de remuneração adequados. Contratos bem desenhados reduzem disputas e aumentam a previsibilidade ao longo do ciclo de vida.', date:'10/01/2025', tag:'Concessões', imageUrl:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80' }
        ]);
        console.log('✅ Notícias iniciais inseridas');
    }

    if (await colEquipe.countDocuments() === 0) {
        await colEquipe.insertMany([
            { _id:'1', name:'Igor Andrey Roselli',     role:'Especialista em Regulação',              bio:'Graduado em Gestão Pública pelo IFB e graduando em Direito pelo UniCEUB. Pós-graduando em Direito e Regulação do Setor Elétrico. Experiência na ANEEL e ANM.',                                                                                            specialty:'Regulação · Setor Elétrico · Mineração',               imageKey:'igor'    },
            { _id:'2', name:'Rodrigo Alex Roselli',    role:'Engenheiro Civil — Infraestrutura',       bio:'Engenheiro Civil pela USP. Consultor com mais de 15 anos de experiência em concessões rodoviárias e engenharia de infraestrutura, com atuação em implantação, conservação e gestão contratual.',                                                           specialty:'Rodovias · Concessões · Infraestrutura',                imageKey:'rodrigo' },
            { _id:'3', name:'Marcos Vinicius Roselli', role:'Engenheiro Mecânico — Gestão Pública',    bio:'Engenheiro Mecânico e Mestre pela UNIFEI. Experiência em gestão pública municipal, financeira, saúde e gestão territorial censitária.',                                                                                                                    specialty:'Gestão Pública · Saneamento · Financeiro',              imageKey:'marcos'  },
            { _id:'4', name:'Renato Henrique Roselli', role:'Engenheiro Civil — Projetos',             bio:'Engenheiro Civil pela EESC-USP. Consultor com mais de 17 anos de experiência em análise de tráfego, coordenação de projetos executivos, estruturas e usinas hidrelétricas.',                                                                              specialty:'Projetos Executivos · Tráfego · Estruturas',            imageKey:'renato'  },
            { _id:'5', name:'Luísa Simei',             role:'Engenheira Eletricista — Setor Elétrico', bio:'Engenheira Eletricista pela UnB. Pós-graduada em Gestão de Riscos na Comercialização de Energia pela USP. Experiência na ANEEL, CCEE e em consultorias especializadas no mercado de energia.',                                                           specialty:'Regulação · Comercialização de Energia · Gestão de Riscos', imageKey:'luisa' }
        ]);
        console.log('✅ Equipe inicial inserida');
    }
}

function fmt(doc) {
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return { id: String(_id), ...rest };
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../public')));

// ── NOTÍCIAS ─────────────────────────────────────────
app.get('/api/noticias', async (req, res) => {
    const docs = await colNoticias.find().toArray();
    res.json(docs.map(fmt));
});

app.get('/api/noticias/:id', async (req, res) => {
    const doc = await colNoticias.findOne({ _id: req.params.id });
    return doc ? res.json(fmt(doc)) : res.status(404).json({ error: 'Não encontrado' });
});

app.post('/api/noticias', async (req, res) => {
    const { title, summary, tag, imageUrl } = req.body;
    if (!title) return res.status(400).json({ error: 'Título obrigatório' });
    const nova = { _id: Date.now().toString(), title, summary: summary||'', date: new Date().toLocaleDateString('pt-BR'), tag: tag||'Geral', imageUrl: imageUrl||'' };
    await colNoticias.insertOne(nova);
    res.status(201).json(fmt(nova));
});

app.put('/api/noticias/:id', async (req, res) => {
    const { title, summary, tag, imageUrl } = req.body;
    const upd = {};
    if (title    !== undefined) upd.title    = title;
    if (summary  !== undefined) upd.summary  = summary;
    if (tag      !== undefined) upd.tag      = tag;
    if (imageUrl !== undefined) upd.imageUrl = imageUrl;
    const r = await colNoticias.findOneAndUpdate({ _id: req.params.id }, { $set: upd }, { returnDocument:'after' });
    return r ? res.json(fmt(r)) : res.status(404).json({ error: 'Não encontrado' });
});

app.delete('/api/noticias/:id', async (req, res) => {
    const r = await colNoticias.deleteOne({ _id: req.params.id });
    return r.deletedCount ? res.status(204).send() : res.status(404).json({ error: 'Não encontrado' });
});

// ── EQUIPE ────────────────────────────────────────────
app.get('/api/equipe', async (req, res) => {
    const docs = await colEquipe.find().toArray();
    res.json(docs.map(fmt));
});

app.post('/api/equipe', async (req, res) => {
    const { name, role, bio, specialty, imageUrl } = req.body;
    if (!name) return res.status(400).json({ error: 'Nome obrigatório' });
    const novo = { _id: Date.now().toString(), name, role: role||'Consultor', bio: bio||'', specialty: specialty||'', imageUrl: imageUrl||'' };
    await colEquipe.insertOne(novo);
    res.status(201).json(fmt(novo));
});

app.put('/api/equipe/:id', async (req, res) => {
    const { name, role, bio, specialty, imageUrl } = req.body;
    const upd = {};
    if (name      !== undefined) upd.name      = name;
    if (role      !== undefined) upd.role      = role;
    if (bio       !== undefined) upd.bio       = bio;
    if (specialty !== undefined) upd.specialty = specialty;
    if (imageUrl  !== undefined) upd.imageUrl  = imageUrl;
    const r = await colEquipe.findOneAndUpdate({ _id: req.params.id }, { $set: upd }, { returnDocument:'after' });
    return r ? res.json(fmt(r)) : res.status(404).json({ error: 'Não encontrado' });
});

app.delete('/api/equipe/:id', async (req, res) => {
    const r = await colEquipe.deleteOne({ _id: req.params.id });
    return r.deletedCount ? res.status(204).send() : res.status(404).json({ error: 'Não encontrado' });
});

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

connectDB().then(() => {
    if (!process.env.VERCEL) {
        app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
    }
}).catch(err => {
    console.error('❌ MongoDB:', err.message);
    process.exit(1);
});

if (process.env.VERCEL) module.exports = app;
