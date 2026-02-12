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
        title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
        summary: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit.',
        date: '08/02/2025',
        tag: 'IA',
        imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80'
    },
    {
        id: '2',
        title: 'Ut enim ad minim veniam quis nostrud exercitation',
        summary: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: '01/02/2025',
        tag: 'LGPD',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80'
    },
    {
        id: '3',
        title: 'Duis aute irure dolor reprehenderit in voluptate',
        summary: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia.',
        date: '25/01/2025',
        tag: 'Tecnologia',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80'
    },
    {
        id: '4',
        title: 'Nemo enim ipsam voluptatem quia voluptas sit amet',
        summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.',
        date: '15/01/2025',
        tag: 'Institucional',
        imageUrl: ''
    },
    {
        id: '5',
        title: 'Quis autem vel eum iure reprehenderit qui dolore',
        summary: 'Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.',
        date: '10/01/2025',
        tag: 'Tecnologia',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80'
    }
];

let equipe = [
    {
        id: '1',
        name: 'Dra. Lorem Ipsum Silva',
        role: 'Sócia-Fundadora',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim.',
        specialty: 'Lorem Ipsum Dolor'
    },
    {
        id: '2',
        name: 'Dr. Amet Consectetur',
        role: 'Sócio & Head de Compliance',
        bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.',
        specialty: 'Sit Amet Consectetur'
    },
    {
        id: '3',
        name: 'Dra. Adipiscing Elit',
        role: 'Consultora Sênior',
        bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.',
        specialty: 'Adipiscing Elit Sed'
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
    const { name, role, bio, specialty } = req.body;
    equipe[idx] = { ...equipe[idx],
        ...(name      !== undefined && { name }),
        ...(role      !== undefined && { role }),
        ...(bio       !== undefined && { bio }),
        ...(specialty !== undefined && { specialty })
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

app.listen(PORT, () => {
    console.log(`🚀 http://localhost:${PORT}`);
});
