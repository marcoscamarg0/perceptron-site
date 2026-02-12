# 🚀 Guia de Deploy - Perceptron Consultoria

Este guia mostra como colocar o site no ar usando diferentes serviços de hospedagem.

---

## 📋 Pré-requisitos

1. **Node.js** instalado (versão 16 ou superior)
2. **Git** instalado
3. Conta em um serviço de hospedagem (escolha uma opção abaixo)

---

## 🏃 Testando Localmente

Antes de fazer o deploy, teste o site localmente:

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor
npm start

# 3. Acessar no navegador
http://localhost:3000
```

---

## 🌐 Opção 1: Deploy na Vercel (RECOMENDADO - GRÁTIS)

A Vercel é perfeita para projetos Node.js e oferece deploy grátis.

### Passo a Passo:

1. **Criar conta na Vercel**
   - Acesse: https://vercel.com
   - Faça login com GitHub

2. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Fazer Deploy**
   ```bash
   # Na pasta do projeto
   vercel
   
   # Seguir as instruções:
   # - Set up and deploy? Yes
   # - Which scope? (sua conta)
   # - Link to existing project? No
   # - Project name? perceptron-consultoria
   # - Directory? ./
   # - Build command? (deixe vazio)
   # - Output directory? public
   ```

4. **Seu site estará no ar!**
   - URL: `https://perceptron-consultoria.vercel.app`

### Configuração Extra (vercel.json):

Crie um arquivo `vercel.json` na raiz:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

---

## 🔷 Opção 2: Deploy no Render (GRÁTIS)

O Render é excelente para aplicações Node.js com backend.

### Passo a Passo:

1. **Criar conta no Render**
   - Acesse: https://render.com
   - Faça login com GitHub

2. **Criar repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/perceptron-site.git
   git push -u origin main
   ```

3. **Criar Web Service no Render**
   - Dashboard → New → Web Service
   - Conectar seu repositório GitHub
   - Configurações:
     - **Name**: perceptron-consultoria
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

4. **Deploy automático**
   - Render fará deploy automaticamente
   - URL: `https://perceptron-consultoria.onrender.com`

---

## 🟦 Opção 3: Deploy no Railway (GRÁTIS)

Railway oferece $5 de crédito grátis por mês.

### Passo a Passo:

1. **Criar conta no Railway**
   - Acesse: https://railway.app
   - Login com GitHub

2. **Criar projeto**
   - New Project → Deploy from GitHub repo
   - Selecionar seu repositório

3. **Configurações automáticas**
   - Railway detecta Node.js automaticamente
   - Deploy inicia automaticamente

4. **Gerar domínio**
   - Settings → Generate Domain
   - URL: `https://perceptron-consultoria.up.railway.app`

---

## 🟧 Opção 4: Deploy no Heroku

Heroku é robusto mas pago (planos a partir de $7/mês).

### Passo a Passo:

1. **Criar conta no Heroku**
   - Acesse: https://heroku.com

2. **Instalar Heroku CLI**
   ```bash
   # Mac
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Baixe em: https://devcenter.heroku.com/articles/heroku-cli
   ```

3. **Login e Deploy**
   ```bash
   heroku login
   heroku create perceptron-consultoria
   git push heroku main
   ```

4. **Abrir o site**
   ```bash
   heroku open
   ```

---

## 🌍 Opção 5: Hospedagem Tradicional (cPanel/Hostinger)

Para hospedagem compartilhada tradicional:

### Passo a Passo:

1. **Preparar arquivos**
   - Fazer upload da pasta `public/` via FTP
   - Não precisa do backend para versão estática

2. **Configuração**
   - Apontar o domínio para a pasta `public`
   - Configurar SSL (Let's Encrypt gratuito)

3. **Limitações**
   - Não terá o backend funcionando
   - Dados serão estáticos (sem API)

---

## 🔧 Configurações Importantes

### Variáveis de Ambiente

Se usar banco de dados real, adicione no `.env`:

```env
PORT=3000
DATABASE_URL=sua_url_do_banco
NODE_ENV=production
```

### Atualizar API_URL no Frontend

Em `public/js/config.js`, ajuste a URL da API:

```javascript
const CONFIG = {
    // Desenvolvimento
    // API_URL: 'http://localhost:3000/api',
    
    // Produção (ajuste conforme seu serviço)
    API_URL: 'https://seu-site.vercel.app/api',
    
    // ... resto do código
};
```

---

## 📊 Banco de Dados (Opcional)

O projeto atual usa dados em memória. Para produção, considere:

### MongoDB Atlas (Grátis até 512MB)

1. Criar conta: https://mongodb.com/atlas
2. Criar cluster gratuito
3. Instalar mongoose:
   ```bash
   npm install mongoose
   ```
4. Conectar no servidor

### PostgreSQL (Supabase - Grátis)

1. Criar conta: https://supabase.com
2. Criar projeto
3. Instalar pg:
   ```bash
   npm install pg
   ```

---

## 🔒 Domínio Personalizado

Após o deploy, você pode adicionar um domínio próprio:

### Vercel:
- Settings → Domains → Add Domain
- Configurar DNS no seu registrador

### Render/Railway/Heroku:
- Similar: Settings → Custom Domains

---

## 📈 Monitoramento

Todos os serviços oferecem:
- ✅ Logs em tempo real
- ✅ Métricas de uso
- ✅ Alertas de erro
- ✅ SSL automático

---

## 🆘 Problemas Comuns

### "Cannot GET /"
- Verificar se o arquivo `index.html` está em `public/`

### API retorna 404
- Verificar se `API_URL` no `config.js` está correto

### Estilos não carregam
- Verificar caminhos no `index.html`
- Certifique-se que `css/styles.css` existe

---

## 📞 Suporte

- **Documentação Vercel**: https://vercel.com/docs
- **Documentação Render**: https://render.com/docs
- **Documentação Railway**: https://docs.railway.app

---

## ✅ Checklist Final

Antes de fazer deploy:

- [ ] Testar localmente com `npm start`
- [ ] Verificar todas as rotas funcionando
- [ ] Testar modo admin
- [ ] Verificar responsividade mobile
- [ ] Atualizar `API_URL` para produção
- [ ] Adicionar logo SVG (`perceptron (1).svg`)
- [ ] Testar em diferentes navegadores
- [ ] Configurar SSL (automático na maioria)
- [ ] Adicionar Google Analytics (opcional)
- [ ] Configurar domínio personalizado (opcional)

---

**🎉 Pronto! Seu site estará no ar!**
