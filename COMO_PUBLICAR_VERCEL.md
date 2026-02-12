# 🚀 Como Colocar o Site no Vercel — Grátis

Tempo estimado: **10 minutos**
Custo: **R$ 0,00**

---

## O que você vai precisar

- [ ] Uma conta no **GitHub** (gratuita) → https://github.com
- [ ] Uma conta na **Vercel** (gratuita) → https://vercel.com
- [ ] O **Node.js** instalado no seu computador → https://nodejs.org (versão LTS)
- [ ] O **Git** instalado → https://git-scm.com

---

## ETAPA 1 — Preparar o projeto localmente

### 1.1 — Extraia o arquivo do projeto
Descompacte o arquivo `.rar` ou `.tar.gz` em uma pasta no seu computador.
Você deve ter esta estrutura:
```
perceptron-site/
├── public/
├── server/
│   └── index.js
├── package.json
└── vercel.json   ← esse arquivo é essencial!
```

### 1.2 — Teste localmente (opcional, mas recomendado)
```bash
# Abra o terminal na pasta do projeto
cd perceptron-site

# Instale as dependências
npm install

# Rode o servidor
npm start

# Abra no navegador: http://localhost:3000
```
Se o site abrir, está pronto para o deploy. ✅

---

## ETAPA 2 — Subir o código para o GitHub

### 2.1 — Crie um repositório no GitHub
1. Acesse **https://github.com/new**
2. Preencha:
   - **Repository name:** `perceptron-site`
   - **Visibility:** Public (ou Private — ambos funcionam com Vercel grátis)
3. Clique em **"Create repository"**

### 2.2 — Envie o código
```bash
# No terminal, dentro da pasta perceptron-site:

git init
git add .
git commit -m "Primeiro deploy do site Perceptron"
git branch -M main

# Substitua SEU-USUARIO pelo seu usuário do GitHub:
git remote add origin https://github.com/SEU-USUARIO/perceptron-site.git

git push -u origin main
```

> 💡 Se o Git pedir usuário e senha, use seu login do GitHub.
> Se pedir um "personal access token", crie em: https://github.com/settings/tokens

---

## ETAPA 3 — Deploy na Vercel

### 3.1 — Criar conta na Vercel
1. Acesse **https://vercel.com**
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"** (é mais fácil — conecta automaticamente)
4. Autorize o acesso

### 3.2 — Importar o projeto
1. No painel da Vercel, clique em **"Add New... → Project"**
2. Você verá a lista de repositórios do seu GitHub
3. Encontre **"perceptron-site"** e clique em **"Import"**

### 3.3 — Configurar o projeto
Na tela de configuração, preencha:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Other |
| **Root Directory** | ./ (deixe padrão) |
| **Build Command** | *(deixe vazio)* |
| **Output Directory** | public |
| **Install Command** | npm install |

> ⚠️ O arquivo `vercel.json` já está configurado no projeto.
> Ele diz à Vercel como rotear as requisições entre o frontend e a API.

### 3.4 — Deploy!
Clique em **"Deploy"**.

Aguarde 1-2 minutos. Você verá uma animação de foguete 🚀

Quando terminar, você receberá uma URL como:
```
https://perceptron-site-seu-usuario.vercel.app
```

**Pronto! Seu site está no ar!** 🎉

---

## ETAPA 4 — Após o deploy

### Atualizando o site
Sempre que fizer alterações no código:
```bash
git add .
git commit -m "Descrição da mudança"
git push
```
A Vercel detecta automaticamente e faz novo deploy. ✅

### Adicionar domínio personalizado (opcional)
1. No painel Vercel → seu projeto → **"Settings → Domains"**
2. Clique em **"Add"**
3. Digite seu domínio: `www.perceptronconsultoria.com.br`
4. Configure o DNS no seu registrador conforme as instruções da Vercel

---

## ⚠️ Atenção: Dados não persistem no plano grátis

O servidor backend usa **memória RAM** para guardar os dados.
Isso significa que quando o servidor "dorme" (inatividade no Vercel free), 
os dados adicionados pelo painel admin são perdidos.

### Solução para dados permanentes:

**Opção A — MongoDB Atlas (Grátis até 512MB)**
1. Crie conta: https://mongodb.com/atlas
2. Crie um cluster gratuito (M0)
3. Copie a connection string
4. Adicione no Vercel: Settings → Environment Variables
   - Nome: `MONGODB_URI`
   - Valor: `mongodb+srv://...`

**Opção B — Vercel KV (Chave-Valor simples, grátis)**
1. No painel Vercel → Storage → Create Database → KV
2. Conecte ao seu projeto
3. As variáveis de ambiente são adicionadas automaticamente

---

## Limites do Plano Gratuito da Vercel

| Recurso | Limite Free |
|---------|-------------|
| Projetos | Ilimitados |
| Deploys por mês | 100 |
| Banda por mês | 100 GB |
| Serverless Functions | 100 GB/h de computação |
| Domínio customizado | ✅ Grátis |
| SSL (HTTPS) | ✅ Automático |

Para um site institucional com tráfego normal, o plano grátis é **mais do que suficiente**.

---

## Problemas comuns

### "404 Not Found" na API
**Causa:** `vercel.json` não está configurado corretamente.
**Solução:** Confirme que o arquivo `vercel.json` existe na raiz do projeto com o conteúdo:
```json
{
  "version": 2,
  "builds": [{ "src": "server/index.js", "use": "@vercel/node" }],
  "routes": [
    { "src": "/api/(.*)", "dest": "server/index.js" },
    { "src": "/(.*)", "dest": "/public/$1" }
  ]
}
```

### "Module not found: cors"
**Causa:** Dependências não instaladas.
**Solução:** Confira se `cors` e `express` estão no `package.json`:
```json
"dependencies": {
  "express": "^4.18.2",
  "cors": "^2.8.5"
}
```
Rode `npm install` e faça um novo `git push`.

### Imagens não carregam
**Causa:** URLs de imagens externas com CORS bloqueado.
**Solução:** Use imagens do Unsplash (`images.unsplash.com`) ou hospede no Cloudinary (grátis até 25GB).

### O site abre mas o admin não salva
**Causa:** Dados em memória não persistem entre deploys.
**Solução normal para MVP:** Use o painel admin apenas para gerenciar os dados que você quer exibir, e edite diretamente o arquivo `server/index.js` com os dados fixos.
**Solução definitiva:** Integre um banco de dados (MongoDB Atlas ou Supabase, ambos gratuitos).

---

## Checklist final antes do deploy

- [ ] `npm start` roda sem erros localmente
- [ ] O arquivo `vercel.json` existe na raiz
- [ ] O `package.json` tem `express` e `cors` nas dependências
- [ ] A pasta `public/` tem o `index.html`
- [ ] O código está commitado e enviado ao GitHub
- [ ] A URL da API foi verificada em `public/js/config.js`

---

## Resumo em 5 comandos

```bash
# 1. Instale as dependências
npm install

# 2. Inicialize o Git
git init && git add . && git commit -m "Deploy inicial"

# 3. Conecte ao GitHub (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/perceptron-site.git
git push -u origin main

# 4. Instale a CLI da Vercel
npm install -g vercel

# 5. Faça o deploy
vercel --prod
```

Pronto. Site no ar. ✅

---

*Dúvidas? Documentação completa da Vercel: https://vercel.com/docs*
*Suporte da Vercel: https://vercel.com/help*
