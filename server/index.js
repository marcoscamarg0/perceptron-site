const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const nodemailer = require('nodemailer');

// ── Configuração de E-mail ────────────────────────────
// Configure via variáveis de ambiente:
//   EMAIL_USER     → conta de envio (ex: smtp-user@provedor.com)
//   EMAIL_PASS     → senha ou app password
//   EMAIL_HOST     → servidor SMTP (padrão: smtp.gmail.com)
//   EMAIL_PORT     → porta SMTP (padrão: 587)
//   CONTACT_EMAIL  → destino (padrão: contato@perceptronconsult.com)
const emailTransport = nodemailer.createTransport({
    host:   process.env.EMAIL_HOST || 'smtp.gmail.com',
    port:   parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
    },
});

const app  = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || null;

let colNoticias = null;
let colEquipe   = null;

// ── Dados em memória (fallback) ──────────────────────
let memNoticias = [
    { id:'1', title:'Marco Legal do Saneamento: desafios e oportunidades para municípios', summary:'A Lei 14.026/2020 impõe novas exigências de universalização, equilíbrio tarifário e governança contratual.', date:'08/02/2025', tag:'Saneamento', imageUrl:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80' },
    { id:'2', title:'Revisões tarifárias no setor elétrico: o papel da análise regulatória', summary:'Processos de revisão tarifária periódica exigem análise técnica robusta e monitoramento por indicadores.', date:'01/02/2025', tag:'Setor Elétrico', imageUrl:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80' },
    { id:'3', title:'Concessões rodoviárias: como garantir governança e previsibilidade contratual', summary:'A gestão eficiente de concessões rodoviárias requer monitoramento contínuo de CAPEX, OPEX, tráfego e níveis de serviço.', date:'25/01/2025', tag:'Rodovias', imageUrl:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80' },
    { id:'4', title:'Gestão pública municipal: como melhorar arrecadação e capacidade de investimento', summary:'Diagnósticos estruturados e planos de ação orientados por indicadores permitem que municípios melhorem a saúde financeira.', date:'15/01/2025', tag:'Gestão Pública', imageUrl:'' },
    { id:'5', title:'PPPs e concessões: do modelo ao contrato executável', summary:'A estruturação de PPPs e concessões envolve modelagem econômico-financeira, matriz de riscos e mecanismos de remuneração adequados.', date:'10/01/2025', tag:'Concessões', imageUrl:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80' }
];
let memEquipe = [
    { id:'1', name:'Igor Andrey Roselli',     role:'Especialista em Regulação',               bio:'Graduado em Gestão Pública pelo IFB e graduando em Direito pelo UniCEUB. Pós-graduando em Direito e Regulação do Setor Elétrico. Experiência na ANEEL e ANM.',                                                                                            specialty:'Regulação · Setor Elétrico · Mineração',               imageKey:'igor'    },
    { id:'2', name:'Rodrigo Alex Roselli',    role:'Engenheiro Civil — Infraestrutura',        bio:'Engenheiro Civil pela USP. Consultor com mais de 15 anos de experiência em concessões rodoviárias e engenharia de infraestrutura.',                                                                                                                          specialty:'Rodovias · Concessões · Infraestrutura',                imageKey:'rodrigo' },
    { id:'3', name:'Marcos Vinicius Roselli', role:'Engenheiro Mecânico — Gestão Pública',     bio:'Engenheiro Mecânico e Mestre pela UNIFEI. Experiência em gestão pública municipal, financeira, saúde e gestão territorial censitária.',                                                                                                                       specialty:'Gestão Pública · Saneamento · Financeiro',              imageKey:'marcos'  },
    { id:'4', name:'Renato Henrique Roselli', role:'Engenheiro Civil — Projetos',              bio:'Engenheiro Civil pela EESC-USP. Consultor com mais de 17 anos de experiência em análise de tráfego e coordenação de projetos executivos.',                                                                                                                    specialty:'Projetos Executivos · Tráfego · Estruturas',            imageKey:'renato'  },
    { id:'5', name:'Luísa Simei',             role:'Engenheira Eletricista — Setor Elétrico',  bio:'Engenheira Eletricista pela UnB. Pós-graduada em Gestão de Riscos na Comercialização de Energia pela USP. Experiência na ANEEL e CCEE.',                                                                                                                    specialty:'Regulação · Comercialização de Energia · Gestão de Riscos', imageKey:'luisa' }
];

// ── Conexão MongoDB ──────────────────────────────────
async function connectDB() {
    const { MongoClient } = require('mongodb');

    // Tenta conexão com diferentes configurações SSL
    const configs = [
        { tls: true, tlsAllowInvalidCertificates: false },
        { tls: true, tlsAllowInvalidCertificates: true  },
        { ssl: true  },
        {}
    ];

    for (const opts of configs) {
        try {
            const client = new MongoClient(MONGO_URI, {
                ...opts,
                serverSelectionTimeoutMS: 8000,
                connectTimeoutMS: 8000,
            });
            await client.connect();
            const db = client.db();
            colNoticias = db.collection('noticias');
            colEquipe   = db.collection('equipe');
            console.log('✅ MongoDB conectado com opções:', JSON.stringify(opts));
            await seedDB();
            return;
        } catch (err) {
            console.warn('Tentativa falhou:', JSON.stringify(opts), '-', err.message.substring(0, 80));
        }
    }
    throw new Error('Todas as tentativas de conexão falharam');
}

async function seedDB() {
    if (await colNoticias.countDocuments() === 0) {
        await colNoticias.insertMany(memNoticias.map(n => ({ _id: n.id, ...n })));
        console.log('✅ Notícias seed inseridas');
    }
    if (await colEquipe.countDocuments() === 0) {
        await colEquipe.insertMany(memEquipe.map(m => ({ _id: m.id, ...m })));
        console.log('✅ Equipe seed inserida');
    }
}

function fmt(doc) {
    const { _id, ...rest } = doc;
    return { id: String(_id), ...rest };
}

// ── Middleware ───────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../public')));

// ── NOTÍCIAS ─────────────────────────────────────────
app.get('/api/noticias', async (req, res) => {
    if (colNoticias) return res.json((await colNoticias.find().toArray()).map(fmt));
    res.json(memNoticias);
});
app.get('/api/noticias/:id', async (req, res) => {
    if (colNoticias) {
        const doc = await colNoticias.findOne({ _id: req.params.id });
        return doc ? res.json(fmt(doc)) : res.status(404).json({ error: 'Não encontrado' });
    }
    const item = memNoticias.find(n => n.id === req.params.id);
    return item ? res.json(item) : res.status(404).json({ error: 'Não encontrado' });
});
app.post('/api/noticias', async (req, res) => {
    const { title, summary, tag, imageUrl, content, slug } = req.body;
    if (!title) return res.status(400).json({ error: 'Título obrigatório' });
    const nova = { id: Date.now().toString(), title, summary: summary||'', date: new Date().toLocaleDateString('pt-BR'), tag: tag||'Geral', imageUrl: imageUrl||'', content: content||'', slug: slug||'' };
    if (colNoticias) await colNoticias.insertOne({ _id: nova.id, ...nova });
    else memNoticias = [nova, ...memNoticias];
    res.status(201).json(nova);
});
app.put('/api/noticias/:id', async (req, res) => {
    const upd = {};
    ['title','summary','tag','imageUrl','content','slug'].forEach(k => { if (req.body[k] !== undefined) upd[k] = req.body[k]; });
    if (colNoticias) {
        const r = await colNoticias.findOneAndUpdate({ _id: req.params.id }, { $set: upd }, { returnDocument:'after' });
        return r ? res.json(fmt(r)) : res.status(404).json({ error: 'Não encontrado' });
    }
    const idx = memNoticias.findIndex(n => n.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });
    memNoticias[idx] = { ...memNoticias[idx], ...upd };
    res.json(memNoticias[idx]);
});
app.delete('/api/noticias/:id', async (req, res) => {
    if (colNoticias) {
        const r = await colNoticias.deleteOne({ _id: req.params.id });
        return r.deletedCount ? res.status(204).send() : res.status(404).json({ error: 'Não encontrado' });
    }
    if (!memNoticias.find(n => n.id === req.params.id)) return res.status(404).json({ error: 'Não encontrado' });
    memNoticias = memNoticias.filter(n => n.id !== req.params.id);
    res.status(204).send();
});

// ── EQUIPE ────────────────────────────────────────────
app.get('/api/equipe', async (req, res) => {
    if (colEquipe) return res.json((await colEquipe.find().toArray()).map(fmt));
    res.json(memEquipe);
});
app.post('/api/equipe', async (req, res) => {
    const { name, role, bio, specialty, imageUrl, formacao, experiencia, publicacoes, idiomas, linkedin } = req.body;
    if (!name) return res.status(400).json({ error: 'Nome obrigatório' });
    const novo = { id: Date.now().toString(), name, role: role||'Consultor', bio: bio||'', specialty: specialty||'', imageUrl: imageUrl||'', formacao: formacao||'', experiencia: experiencia||'', publicacoes: publicacoes||'', idiomas: idiomas||'', linkedin: linkedin||'' };
    if (colEquipe) await colEquipe.insertOne({ _id: novo.id, ...novo });
    else memEquipe = [...memEquipe, novo];
    res.status(201).json(novo);
});
app.put('/api/equipe/:id', async (req, res) => {
    const upd = {};
    ['name','role','bio','specialty','imageUrl','imageKey','formacao','experiencia','publicacoes','idiomas','linkedin'].forEach(k => { if (req.body[k] !== undefined) upd[k] = req.body[k]; });
    if (colEquipe) {
        const r = await colEquipe.findOneAndUpdate({ _id: req.params.id }, { $set: upd }, { returnDocument:'after' });
        return r ? res.json(fmt(r)) : res.status(404).json({ error: 'Não encontrado' });
    }
    const idx = memEquipe.findIndex(m => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });
    memEquipe[idx] = { ...memEquipe[idx], ...upd };
    res.json(memEquipe[idx]);
});
app.delete('/api/equipe/:id', async (req, res) => {
    if (colEquipe) {
        const r = await colEquipe.deleteOne({ _id: req.params.id });
        return r.deletedCount ? res.status(204).send() : res.status(404).json({ error: 'Não encontrado' });
    }
    if (!memEquipe.find(m => m.id === req.params.id)) return res.status(404).json({ error: 'Não encontrado' });
    memEquipe = memEquipe.filter(m => m.id !== req.params.id);
    res.status(204).send();
});

// ── CONTATO (envio de e-mail) ─────────────────────────
app.post('/api/contato', async (req, res) => {
    const { nome, empresa, email, telefone, area, mensagem } = req.body;
    if (!nome || !email || !mensagem) {
        return res.status(400).json({ error: 'Campos obrigatórios: nome, email, mensagem' });
    }

    const DEST = process.env.CONTACT_EMAIL || 'contato@perceptronconsult.com';

    const htmlBody = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;border-radius:8px;overflow:hidden">
            <div style="background:#0a4555;padding:24px 32px">
                <h2 style="color:#fff;margin:0;font-size:20px">📩 Nova mensagem via site — Perceptron Consultoria</h2>
            </div>
            <div style="padding:28px 32px;background:#fff">
                <table style="width:100%;border-collapse:collapse;font-size:14px">
                    <tr><td style="padding:8px 0;color:#666;width:160px"><strong>Nome</strong></td><td style="padding:8px 0;color:#222">${nome}</td></tr>
                    ${empresa ? `<tr><td style="padding:8px 0;color:#666"><strong>Empresa / Órgão</strong></td><td style="padding:8px 0;color:#222">${empresa}</td></tr>` : ''}
                    <tr><td style="padding:8px 0;color:#666"><strong>E-mail</strong></td><td style="padding:8px 0;color:#222"><a href="mailto:${email}" style="color:#0a4555">${email}</a></td></tr>
                    ${telefone ? `<tr><td style="padding:8px 0;color:#666"><strong>Telefone</strong></td><td style="padding:8px 0;color:#222">${telefone}</td></tr>` : ''}
                    ${area ? `<tr><td style="padding:8px 0;color:#666"><strong>Área de Interesse</strong></td><td style="padding:8px 0;color:#222">${area}</td></tr>` : ''}
                </table>
                <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
                <p style="color:#666;font-size:13px;margin:0 0 8px"><strong>Mensagem:</strong></p>
                <div style="background:#f5f5f5;border-radius:6px;padding:16px;color:#333;font-size:14px;line-height:1.6;white-space:pre-wrap">${mensagem}</div>
            </div>
            <div style="padding:16px 32px;background:#f0f0f0;font-size:12px;color:#999;text-align:center">
                Enviado automaticamente pelo site perceptronconsult.com
            </div>
        </div>
    `;

    try {
        await emailTransport.sendMail({
            from:    `"Site Perceptron" <${process.env.EMAIL_USER || DEST}>`,
            to:      DEST,
            replyTo: email,
            subject: `[Site] Nova consulta de ${nome}${area ? ` — ${area}` : ''}`,
            html:    htmlBody,
        });
        res.json({ ok: true, message: 'Mensagem enviada com sucesso!' });
    } catch (err) {
        console.error('Erro ao enviar e-mail:', err.message);
        res.status(500).json({ error: 'Falha ao enviar mensagem. Tente novamente.' });
    }
});

// ── Rotas SPA ─────────────────────────────────────────
app.get('/artigo/*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/noticias',  (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('*',          (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

// ── Start ─────────────────────────────────────────────
async function start() {
    if (MONGO_URI) {
        try {
            await connectDB();
        } catch (err) {
            console.error('❌ MongoDB não conectou, usando memória:', err.message);
        }
    } else {
        console.log('ℹ️  Sem MONGODB_URI — usando memória');
    }
    app.listen(PORT, () => console.log('🚀 http://localhost:' + PORT));
}

start();
