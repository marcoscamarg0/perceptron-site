# ⚡ Início Rápido

## 🚀 Em 3 Passos

### 1️⃣ Instalar
```bash
npm install
```

### 2️⃣ Rodar
```bash
npm start
```

### 3️⃣ Acessar
```
http://localhost:3000
```

---

## 🔑 Acesso Admin

**Senha:** `admin_perceptron`

1. Clique no botão "Acesso Restrito" (canto inferior direito)
2. Digite a senha
3. Edite o conteúdo!

---

## 📂 Onde Está Cada Coisa?

| Item | Localização |
|------|-------------|
| 🎨 **Estilos** | `public/css/styles.css` |
| ⚙️ **Configurações** | `public/js/config.js` |
| 🔌 **API** | `server/index.js` |
| 🏠 **Página Principal** | `public/index.html` |
| 🖼️ **Logo** | `public/perceptron (1).svg` |

---

## 🛠️ Comandos Úteis

```bash
# Rodar em desenvolvimento (com auto-reload)
npm run dev

# Rodar em produção
npm start

# Fazer deploy na Vercel
vercel
```

---

## 🔧 Personalizar

### Mudar Cores
Edite `public/css/styles.css`:
```css
:root {
    --primary: #1C4456;    /* Sua cor primária */
    --secondary: #2E84AF;  /* Sua cor secundária */
    --accent: #FFC85B;     /* Cor de destaque */
}
```

### Mudar Logo
Substitua `public/perceptron (1).svg` pela sua logo.

### Mudar Senha Admin
Edite `public/js/config.js`:
```javascript
ADMIN_PASSWORD: 'sua_nova_senha'
```

---

## 🌐 Colocar no Ar

### Opção Mais Fácil (Vercel - GRÁTIS):
```bash
npm install -g vercel
vercel
```

### Outras Opções:
- Render: https://render.com
- Railway: https://railway.app
- Hostinger/cPanel: Upload da pasta `public/`

Veja o guia completo em **[DEPLOY.md](DEPLOY.md)**

---

## ❓ Problemas?

### Site não abre?
- Certifique-se que instalou: `npm install`
- Verifique se a porta 3000 está livre

### Senha não funciona?
- Senha padrão: `admin_perceptron`
- Verifique em `public/js/config.js`

### API não funciona?
- Verifique `API_URL` em `public/js/config.js`
- Deve ser `http://localhost:3000/api` localmente

---

## 📚 Mais Informações

- **README completo:** [README.md](README.md)
- **Guia de Deploy:** [DEPLOY.md](DEPLOY.md)
- **Estrutura completa:** Veja o README

---

**🎉 Tudo pronto! Boa sorte com seu projeto!**
