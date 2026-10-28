const express      = require('express');
const cors         = require('cors');
const path         = require('path');
const nodemailer   = require('nodemailer');
const sanitizeHtml = require('sanitize-html');
const rateLimit    = require('express-rate-limit');
const crypto       = require('crypto');
const fs           = require('fs');

// ── Configuração de E-mail ────────────────────────────
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

// ADMIN_PASSWORD deve vir do .env / painel da Vercel.
// Se não estiver configurado, bloqueia o acesso admin completamente.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || null;

// Tokens de sessão em memória (simples, funciona na Vercel serverless com caveat de reinício)
const activeSessions = new Set();

let colNoticias = null;
let colEquipe   = null;
let colTemas    = null;
let colContatos = null;

// Tags HTML permitidas no conteúdo de notícias
const ALLOWED_TAGS  = ['b','strong','i','em','p','br','ul','ol','li','a','h2','h3','span','blockquote'];
const ALLOWED_ATTRS = { a: ['href','target','rel'] };

function sanitize(html) {
    if (!html) return '';
    return sanitizeHtml(html, {
        allowedTags:       ALLOWED_TAGS,
        allowedAttributes: ALLOWED_ATTRS,
        allowedSchemes:    ['http','https','mailto'],
    });
}

// ── Dados em memória (fallback sem MongoDB) ──────────
let memNoticias = [
    { id:'1', title:'Marco Legal do Saneamento: desafios e oportunidades para municípios', summary:'A Lei 14.026/2020 impõe novas exigências de universalização, equilíbrio tarifário e governança contratual.', date:'08/02/2025', tag:'Saneamento', imageUrl:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80', content:'', slug:'marco-legal-do-saneamento-desafios-e-oportunidades-para-municipios' },
    { id:'2', title:'Revisões tarifárias no setor elétrico: o papel da análise regulatória', summary:'Processos de revisão tarifária periódica exigem análise técnica robusta e monitoramento por indicadores.', date:'01/02/2025', tag:'Setor Elétrico', imageUrl:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80', content:'', slug:'revisoes-tarifarias-no-setor-eletrico-o-papel-da-analise-regulatoria' },
    { id:'3', title:'Concessões rodoviárias: como garantir governança e previsibilidade contratual', summary:'A gestão eficiente de concessões rodoviárias requer monitoramento contínuo de CAPEX, OPEX, tráfego e níveis de serviço.', date:'25/01/2025', tag:'Rodovias', imageUrl:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80', content:'', slug:'concessoes-rodoviarias-como-garantir-governanca-e-previsibilidade-contratual' },
    { id:'4', title:'Gestão pública municipal: como melhorar arrecadação e capacidade de investimento', summary:'Diagnósticos estruturados e planos de ação orientados por indicadores permitem que municípios melhorem a saúde financeira.', date:'15/01/2025', tag:'Gestão Pública', imageUrl:'', content:'', slug:'gestao-publica-municipal-como-melhorar-arrecadacao-e-capacidade-de-investimento' },
    { id:'5', title:'PPPs e concessões: do modelo ao contrato executável', summary:'A estruturação de PPPs e concessões envolve modelagem econômico-financeira, matriz de riscos e mecanismos de remuneração adequados.', date:'10/01/2025', tag:'Concessões', imageUrl:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80', content:'', slug:'ppps-e-concessoes-do-modelo-ao-contrato-executavel' },
];
let memEquipe = [
    { id:'1', name:'Igor Andrey Roselli',     role:'Especialista em Regulação',               bio:'Graduado em Gestão Pública pelo IFB e graduando em Direito pelo UniCEUB. Pós-graduando em Direito e Regulação do Setor Elétrico. Experiência na ANEEL e ANM.',                                              specialty:'Regulação · Setor Elétrico · Mineração',                    imageKey:'igor'    },
    { id:'2', name:'Rodrigo Alex Roselli',    role:'Engenheiro Civil — Infraestrutura',        bio:'Engenheiro Civil pela USP. Consultor com mais de 15 anos de experiência em concessões rodoviárias e engenharia de infraestrutura.',                                                                       specialty:'Rodovias · Concessões · Infraestrutura',                    imageKey:'rodrigo' },
    { id:'3', name:'Marcos Vinicius Roselli', role:'Engenheiro Mecânico — Gestão Pública',     bio:'Engenheiro Mecânico e Mestre pela UNIFEI. Experiência em gestão pública municipal, financeira, saúde e gestão territorial censitária.',                                                                    specialty:'Gestão Pública · Saneamento · Financeiro',                  imageKey:'marcos'  },
    { id:'4', name:'Renato Henrique Roselli', role:'Engenheiro Civil — Projetos',              bio:'Engenheiro Civil pela EESC-USP. Consultor com mais de 17 anos de experiência em análise de tráfego e coordenação de projetos executivos.',                                                                  specialty:'Projetos Executivos · Tráfego · Estruturas',                imageKey:'renato'  },
    { id:'5', name:'Luísa Simei',             role:'Engenheira Eletricista — Setor Elétrico',  bio:'Engenheira Eletricista pela UnB. Pós-graduada em Gestão de Riscos na Comercialização de Energia pela USP. Experiência na ANEEL e CCEE.',                                                                   specialty:'Regulação · Comercialização de Energia · Gestão de Riscos', imageKey:'luisa'   },
];
let memTemas    = ['Saneamento','Setor Elétrico','Rodovias','Gestão Pública','Concessões','Regulação','Infraestrutura','Geral'];
let memContatos = [];

// ── Conexão MongoDB ──────────────────────────────────
async function connectDB() {
    const { MongoClient } = require('mongodb');
    const configs = [
        { tls: true, tlsAllowInvalidCertificates: false },
        { tls: true, tlsAllowInvalidCertificates: true  },
        { ssl: true  },
        {}
    ];
    for (const opts of configs) {
        try {
            const client = new MongoClient(MONGO_URI, { ...opts, serverSelectionTimeoutMS: 8000, connectTimeoutMS: 8000 });
            await client.connect();
            const db = client.db();
            colNoticias = db.collection('noticias');
            colEquipe   = db.collection('equipe');
            colTemas    = db.collection('temas');
            colContatos = db.collection('contatos');
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
    if (await colTemas.countDocuments() === 0) {
        await colTemas.insertMany(memTemas.map(t => ({ _id: t, nome: t })));
        console.log('✅ Temas seed inseridos');
    }
}

function fmt(doc) {
    const { _id, ...rest } = doc;
    return { id: String(_id), ...rest };
}

// ── Middleware ───────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ── Autenticação Admin ───────────────────────────────
// Middleware que verifica token Bearer no header Authorization
function requireAdmin(req, res, next) {
    if (!ADMIN_PASSWORD) {
        return res.status(503).json({ error: 'Painel admin não configurado. Defina ADMIN_PASSWORD no ambiente.' });
    }
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token || !activeSessions.has(token)) {
        return res.status(401).json({ error: 'Não autorizado' });
    }
    next();
}

// POST /api/auth/login — recebe senha, devolve token
app.post('/api/auth/login', (req, res) => {
    if (!ADMIN_PASSWORD) {
        return res.status(503).json({ error: 'ADMIN_PASSWORD não configurada no servidor.' });
    }
    const { password } = req.body;
    if (!password || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Senha incorreta' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    activeSessions.add(token);
    // Expira em 8h (limpeza manual simples)
    setTimeout(() => activeSessions.delete(token), 8 * 60 * 60 * 1000);
    res.json({ token });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (token) activeSessions.delete(token);
    res.json({ ok: true });
});

// ── Rate Limit para contato ──────────────────────────
const contatoLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5,
    message: { error: 'Muitas tentativas. Aguarde 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// ── Servir arquivos estáticos ────────────────────────
app.use(express.static(path.join(__dirname, '../public')));

// ── TEMAS ─────────────────────────────────────────────
app.get('/api/temas', async (req, res) => {
    if (colTemas) return res.json((await colTemas.find().toArray()).map(t => t.nome));
    res.json(memTemas);
});

// Criar tema — requer admin
app.post('/api/temas', requireAdmin, async (req, res) => {
    const { nome } = req.body;
    if (!nome || !nome.trim()) return res.status(400).json({ error: 'Nome obrigatório' });
    const n = nome.trim();
    if (colTemas) {
        const exists = await colTemas.findOne({ _id: n });
        if (exists) return res.status(409).json({ error: 'Tema já existe' });
        await colTemas.insertOne({ _id: n, nome: n });
        return res.status(201).json({ nome: n });
    }
    if (memTemas.includes(n)) return res.status(409).json({ error: 'Tema já existe' });
    memTemas.push(n);
    res.status(201).json({ nome: n });
});

// Renomear tema — requer admin — atualiza notícias vinculadas
app.put('/api/temas/:nome', requireAdmin, async (req, res) => {
    const antigo = decodeURIComponent(req.params.nome);
    const { novoNome } = req.body;
    if (!novoNome || !novoNome.trim()) return res.status(400).json({ error: 'novoNome obrigatório' });
    const novo = novoNome.trim();
    if (colTemas) {
        const exists = await colTemas.findOne({ _id: antigo });
        if (!exists) return res.status(404).json({ error: 'Tema não encontrado' });
        await colTemas.deleteOne({ _id: antigo });
        await colTemas.insertOne({ _id: novo, nome: novo });
        // Atualiza notícias vinculadas
        await colNoticias.updateMany({ tag: antigo }, { $set: { tag: novo } });
        return res.json({ ok: true, antigo, novo });
    }
    const idx = memTemas.indexOf(antigo);
    if (idx === -1) return res.status(404).json({ error: 'Tema não encontrado' });
    memTemas[idx] = novo;
    memNoticias = memNoticias.map(n => n.tag === antigo ? { ...n, tag: novo } : n);
    res.json({ ok: true, antigo, novo });
});

// Excluir tema — requer admin — opcionalmente reatribui notícias
app.delete('/api/temas/:nome', requireAdmin, async (req, res) => {
    const nome = decodeURIComponent(req.params.nome);
    const { reatribuir } = req.query; // ?reatribuir=Geral
    if (colTemas) {
        const exists = await colTemas.findOne({ _id: nome });
        if (!exists) return res.status(404).json({ error: 'Tema não encontrado' });
        await colTemas.deleteOne({ _id: nome });
        if (reatribuir) {
            await colNoticias.updateMany({ tag: nome }, { $set: { tag: reatribuir } });
        }
        return res.status(204).send();
    }
    const idx = memTemas.indexOf(nome);
    if (idx === -1) return res.status(404).json({ error: 'Tema não encontrado' });
    memTemas.splice(idx, 1);
    if (reatribuir) {
        memNoticias = memNoticias.map(n => n.tag === nome ? { ...n, tag: reatribuir } : n);
    }
    res.status(204).send();
});

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
// Criar notícia — requer admin
app.post('/api/noticias', requireAdmin, async (req, res) => {
    const { title, summary, tag, imageUrl, content, slug } = req.body;
    if (!title) return res.status(400).json({ error: 'Título obrigatório' });
    const nova = {
        id:       Date.now().toString(),
        title:    title,
        summary:  sanitize(summary || ''),
        date:     new Date().toLocaleDateString('pt-BR'),
        tag:      tag || 'Geral',
        imageUrl: imageUrl || '',
        content:  sanitize(content || ''),
        slug:     slug || slugify(title),
    };
    if (colNoticias) await colNoticias.insertOne({ _id: nova.id, ...nova });
    else memNoticias = [nova, ...memNoticias];
    res.status(201).json(nova);
});
// Atualizar notícia — requer admin
app.put('/api/noticias/:id', requireAdmin, async (req, res) => {
    const upd = {};
    ['title','summary','tag','imageUrl','content','slug'].forEach(k => {
        if (req.body[k] !== undefined) {
            upd[k] = (k === 'content' || k === 'summary') ? sanitize(req.body[k]) : req.body[k];
        }
    });
    if (colNoticias) {
        const r = await colNoticias.findOneAndUpdate({ _id: req.params.id }, { $set: upd }, { returnDocument: 'after' });
        return r ? res.json(fmt(r)) : res.status(404).json({ error: 'Não encontrado' });
    }
    const idx = memNoticias.findIndex(n => n.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });
    memNoticias[idx] = { ...memNoticias[idx], ...upd };
    res.json(memNoticias[idx]);
});
// Excluir notícia — requer admin
app.delete('/api/noticias/:id', requireAdmin, async (req, res) => {
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
app.post('/api/equipe', requireAdmin, async (req, res) => {
    const { name, role, bio, specialty, imageUrl, formacao, experiencia, publicacoes, idiomas, linkedin } = req.body;
    if (!name) return res.status(400).json({ error: 'Nome obrigatório' });
    const novo = { id: Date.now().toString(), name, role: role||'Consultor', bio: bio||'', specialty: specialty||'', imageUrl: imageUrl||'', formacao: formacao||'', experiencia: experiencia||'', publicacoes: publicacoes||'', idiomas: idiomas||'', linkedin: linkedin||'' };
    if (colEquipe) await colEquipe.insertOne({ _id: novo.id, ...novo });
    else memEquipe = [...memEquipe, novo];
    res.status(201).json(novo);
});
app.put('/api/equipe/:id', requireAdmin, async (req, res) => {
    const upd = {};
    ['name','role','bio','specialty','imageUrl','imageKey','formacao','experiencia','publicacoes','idiomas','linkedin'].forEach(k => { if (req.body[k] !== undefined) upd[k] = req.body[k]; });
    if (colEquipe) {
        const r = await colEquipe.findOneAndUpdate({ _id: req.params.id }, { $set: upd }, { returnDocument: 'after' });
        return r ? res.json(fmt(r)) : res.status(404).json({ error: 'Não encontrado' });
    }
    const idx = memEquipe.findIndex(m => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });
    memEquipe[idx] = { ...memEquipe[idx], ...upd };
    res.json(memEquipe[idx]);
});
app.delete('/api/equipe/:id', requireAdmin, async (req, res) => {
    if (colEquipe) {
        const r = await colEquipe.deleteOne({ _id: req.params.id });
        return r.deletedCount ? res.status(204).send() : res.status(404).json({ error: 'Não encontrado' });
    }
    if (!memEquipe.find(m => m.id === req.params.id)) return res.status(404).json({ error: 'Não encontrado' });
    memEquipe = memEquipe.filter(m => m.id !== req.params.id);
    res.status(204).send();
});

// ── CONTATO ───────────────────────────────────────────
app.post('/api/contato', contatoLimiter, async (req, res) => {
    const { nome, empresa, email, telefone, area, mensagem, _honeypot } = req.body;

    // Anti-spam: campo honeypot deve estar vazio
    if (_honeypot && _honeypot.trim()) {
        return res.json({ ok: true }); // retorna sucesso falso para bots
    }

    if (!nome || (!email && !telefone) || !mensagem) {
        return res.status(400).json({ error: 'Campos obrigatórios: nome, email ou telefone, mensagem' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'E-mail inválido' });
    }
    if (mensagem.length > 5000) {
        return res.status(400).json({ error: 'Mensagem muito longa (máx 5000 caracteres)' });
    }

    const contatoData = {
        id:        Date.now().toString(),
        nome, empresa: empresa || '', email: email || '', telefone: telefone || '',
        area: area || '', mensagem,
        data: new Date().toISOString(),
        ip: req.ip,
    };

    // 1. Salvar no banco (garantia mesmo que e-mail falhe)
    try {
        if (colContatos) await colContatos.insertOne({ _id: contatoData.id, ...contatoData });
        else memContatos.push(contatoData);
    } catch(dbErr) {
        console.error('Erro ao salvar contato no banco:', dbErr.message);
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
                    ${email    ? `<tr><td style="padding:8px 0;color:#666"><strong>E-mail</strong></td><td style="padding:8px 0;color:#222"><a href="mailto:${email}" style="color:#0a4555">${email}</a></td></tr>` : ''}
                    ${telefone ? `<tr><td style="padding:8px 0;color:#666"><strong>Telefone</strong></td><td style="padding:8px 0;color:#222">${telefone}</td></tr>` : ''}
                    ${area     ? `<tr><td style="padding:8px 0;color:#666"><strong>Área de Interesse</strong></td><td style="padding:8px 0;color:#222">${area}</td></tr>` : ''}
                </table>
                <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
                <p style="color:#666;font-size:13px;margin:0 0 8px"><strong>Mensagem:</strong></p>
                <div style="background:#f5f5f5;border-radius:6px;padding:16px;color:#333;font-size:14px;line-height:1.6;white-space:pre-wrap">${mensagem}</div>
            </div>
            <div style="padding:16px 32px;background:#f0f0f0;font-size:12px;color:#999;text-align:center">
                Enviado automaticamente pelo site percep.com.br
            </div>
        </div>
    `;

    let emailOk = false;
    // 2. Tentar enviar e-mail
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
            await emailTransport.sendMail({
                from:    `"Site Perceptron" <${process.env.EMAIL_USER}>`,
                to:      DEST,
                replyTo: email || undefined,
                subject: `[Site] Nova consulta de ${nome}${area ? ` — ${area}` : ''}`,
                html:    htmlBody,
            });
            emailOk = true;
        } catch (err) {
            console.error('Erro ao enviar e-mail:', err.message);
        }
    }

    // 3. Notificar WhatsApp via CallMeBot (opcional — requer CALLMEBOT_PHONE + CALLMEBOT_APIKEY)
    const cbPhone  = process.env.CALLMEBOT_PHONE;
    const cbApiKey = process.env.CALLMEBOT_APIKEY;
    if (cbPhone && cbApiKey) {
        const msgWA = `📩 Novo contato via site\n\nNome: ${nome}\n${email ? 'E-mail: '+email+'\n' : ''}${telefone ? 'Tel: '+telefone+'\n' : ''}${area ? 'Área: '+area+'\n' : ''}\nMensagem:\n${mensagem.substring(0, 300)}${mensagem.length > 300 ? '...' : ''}`;
        const url   = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(cbPhone)}&text=${encodeURIComponent(msgWA)}&apikey=${encodeURIComponent(cbApiKey)}`;
        fetch(url).catch(e => console.warn('CallMeBot falhou:', e.message));
    }

    res.json({ ok: true, message: 'Mensagem recebida! Retornaremos em breve.', emailEnviado: emailOk });
});

// ── Open Graph — rota de artigo com meta tags SSR ────
// O WhatsApp raspa este HTML gerado no servidor.
app.get('/artigo/:slug', async (req, res) => {
    const slug = req.params.slug;
    let item = null;
    try {
        if (colNoticias) {
            item = fmt(await colNoticias.findOne({ slug }) || await colNoticias.findOne({ _id: slug }) || {});
            if (!item.id) item = null;
        }
        if (!item) {
            item = memNoticias.find(n => n.slug === slug || n.id === slug) || null;
        }
    } catch(e) {}

    // Lê o index.html base
    const indexPath = path.join(__dirname, '../public/index.html');
    let html = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';

    if (item) {
        const title       = escHtml(item.title || 'Perceptron Consultoria');
        const description = escHtml((item.summary || '').substring(0, 200));
        const image       = item.imageUrl && item.imageUrl.startsWith('http') ? item.imageUrl : 'https://percep.com.br/logo.png';
        const url         = `https://percep.com.br/artigo/${slug}`;

        const ogTags = `
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Perceptron Consultoria" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <title>${title} — Perceptron Consultoria</title>`;

        // Injeta antes do </head>
        html = html.replace(/<title>.*?<\/title>/i, '').replace('</head>', ogTags + '\n</head>');
    }

    res.set('Content-Type', 'text/html').send(html);
});

// Rotas SPA
app.get('/noticias', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('*',         (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

// ── Utilitários ───────────────────────────────────────
function slugify(text) {
    return (text || '').toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim().replace(/\s+/g, '-')
        .substring(0, 80);
}
function escHtml(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

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
    if (!ADMIN_PASSWORD) {
        console.warn('⚠️  ADMIN_PASSWORD não definida! Rotas admin estarão bloqueadas. Defina no .env');
    }
    app.listen(PORT, () => console.log('🚀 http://localhost:' + PORT));
}

start();
