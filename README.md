# 🔷 Perceptron Consultoria - Site Institucional

Site institucional da **Perceptron Consultoria Jurídica**, especializada em Direito Digital, IA e Tecnologia.

![Status](https://img.shields.io/badge/status-active-success)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📋 Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [API Endpoints](#api-endpoints)
- [Deploy](#deploy)
- [Tecnologias](#tecnologias)

---

## 📖 Sobre

Site moderno e responsivo para consultoria jurídica, com:
- ✨ Design profissional e clean
- 🔐 Painel administrativo protegido por senha
- 📱 Totalmente responsivo
- 🚀 Backend REST API
- 💾 CRUD completo (Notícias e Equipe)

---

## ⚡ Funcionalidades

### 🌐 Frontend
- Navegação entre páginas (Início, Sobre, Pessoas, Serviços)
- Exibição de notícias com tags e datas
- Apresentação da equipe com bios
- Informações sobre serviços jurídicos
- Design responsivo para mobile/tablet/desktop

### 🔒 Painel Admin
- Login com senha (admin_perceptron)
- Adicionar/Remover notícias
- Adicionar membros da equipe
- Indicadores visuais do modo de edição
- Persistência com localStorage

### 🔌 Backend API
- GET, POST, PUT, DELETE para notícias
- GET, POST, PUT, DELETE para equipe
- CORS habilitado
- Validação de dados
- Respostas JSON padronizadas

---

## 📁 Estrutura do Projeto

```
perceptron-site/
├── public/                 # Frontend (servido estaticamente)
│   ├── index.html         # HTML principal
│   ├── css/
│   │   └── styles.css     # Estilos globais
│   ├── js/
│   │   ├── config.js      # Configurações
│   │   ├── api.js         # Comunicação com backend
│   │   ├── auth.js        # Autenticação
│   │   ├── main.js        # Entry point
│   │   └── components/    # Componentes JS
│   │       ├── adminButton.js
│   │       ├── loginModal.js
│   │       ├── header.js
│   │       ├── adminBanner.js
│   │       ├── newsTab.js
│   │       ├── aboutTab.js
│   │       ├── teamTab.js
│   │       ├── servicesTab.js
│   │       └── footer.js
│   └── perceptron (1).svg # Logo
├── server/
│   └── index.js           # Servidor Express
├── package.json           # Dependências
├── DEPLOY.md             # Guia de deploy
└── README.md             # Este arquivo
```

---

## 🛠️ Instalação

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/perceptron-site.git
cd perceptron-site

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
npm start

# 4. Acesse no navegador
http://localhost:3000
```

---

## 🎯 Como Usar

### Modo Visitante
1. Acesse o site
2. Navegue entre as abas: Início, Sobre, Pessoas, Serviços
3. Visualize notícias e informações da equipe

### Modo Administrador
1. Clique em "Acesso Restrito" (canto inferior direito)
2. Digite a senha: `admin_perceptron`
3. Você verá:
   - Banner amarelo indicando modo de edição
   - Botão "Nova Notícia"
   - Botões de edição/exclusão em cada card
   - Opção de adicionar membros na equipe

### Sair do Modo Admin
- Clique em "Encerrar Sessão" (canto inferior direito)

---

## 🔌 API Endpoints

Base URL: `http://localhost:3000/api`

### Notícias

```http
GET    /api/noticias           # Listar todas
GET    /api/noticias/:id       # Buscar por ID
POST   /api/noticias           # Criar nova
PUT    /api/noticias/:id       # Atualizar
DELETE /api/noticias/:id       # Excluir
```

**Exemplo de Request (POST):**
```json
{
  "title": "Nova Notícia",
  "summary": "Resumo da notícia",
  "tag": "Tecnologia"
}
```

### Equipe

```http
GET    /api/equipe             # Listar todos
GET    /api/equipe/:id         # Buscar por ID
POST   /api/equipe             # Criar novo
PUT    /api/equipe/:id         # Atualizar
DELETE /api/equipe/:id         # Excluir
```

**Exemplo de Request (POST):**
```json
{
  "name": "Dr. João Silva",
  "role": "Advogado Sênior",
  "bio": "Especialista em direito digital",
  "specialty": "LGPD"
}
```

---

## 🚀 Deploy

Veja o guia completo em **[DEPLOY.md](DEPLOY.md)** com instruções para:

- ✅ Vercel (Recomendado - Grátis)
- ✅ Render (Grátis)
- ✅ Railway (Grátis)
- ✅ Heroku (Pago)
- ✅ Hospedagem tradicional

**Deploy rápido na Vercel:**
```bash
npm install -g vercel
vercel
```

---

## 💻 Tecnologias

### Frontend
- HTML5
- CSS3 (Grid, Flexbox, Animações)
- JavaScript Vanilla (ES6+)
- Google Fonts (Sofia Sans, Montserrat, Ubuntu Sans)

### Backend
- Node.js
- Express.js
- CORS

### Ferramentas
- Git
- npm
- Vercel/Render (Deploy)

---

## 🎨 Paleta de Cores

```css
--bg:         #FFFFF3  /* Creme claro */
--dark:       #021A1B  /* Azul escuro */
--primary:    #1C4456  /* Azul primário */
--secondary:  #2E84AF  /* Azul secundário */
--light-blue: #9EDFFF  /* Azul claro */
--accent:     #FFC85B  /* Dourado */
```

---

## 📝 Próximos Passos

- [ ] Integrar banco de dados (MongoDB/PostgreSQL)
- [ ] Adicionar sistema de blog completo
- [ ] Implementar busca de notícias
- [ ] Adicionar newsletter
- [ ] Criar página de contato funcional
- [ ] Implementar Google Analytics
- [ ] Adicionar testes automatizados
- [ ] Criar painel admin completo

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 Autores

- **Perceptron Consultoria** - *Projeto inicial*

---

## 📞 Contato

- 📧 Email: consultoria@perceptron.com.br
- 📱 Telefone: +55 (11) 3300-4400
- 📍 Endereço: Av. Brigadeiro Faria Lima, 4500 - SP

---

⭐ Se este projeto foi útil, considere dar uma estrela!

**Desenvolvido com ❤️ para o futuro do Direito Digital**
