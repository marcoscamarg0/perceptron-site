# Como configurar o MongoDB Atlas (gratuito)

## 1. Criar conta e cluster

1. Acesse **mongodb.com/atlas** e crie uma conta grátis
2. Clique em **"Build a Database"**
3. Escolha **M0 Free** (512MB gratuito)
4. Escolha a região mais próxima (ex: São Paulo)
5. Clique em **"Create"**

## 2. Criar usuário do banco

1. Em **"Security > Database Access"**, clique em **"Add New Database User"**
2. Defina um usuário e senha (ex: `perceptron` / `sua-senha-aqui`)
3. Em "Database User Privileges" selecione **"Read and write to any database"**
4. Clique em **"Add User"**

## 3. Liberar acesso de qualquer IP

1. Em **"Security > Network Access"**, clique em **"Add IP Address"**
2. Clique em **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Clique em **"Confirm"**

## 4. Pegar a Connection String

1. Vá em **"Database > Connect"**
2. Escolha **"Drivers"**
3. Copie a string, que tem esse formato:
   ```
   mongodb+srv://perceptron:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Substitua `<password>` pela senha que você criou

## 5. Configurar no Koyeb

1. No painel do Koyeb, vá em **"Environment Variables"**
2. Adicione:
   - **Key:** `MONGODB_URI`
   - **Value:** sua connection string completa
3. Salve e faça redeploy

## Pronto!
Os dados agora ficam salvos no MongoDB Atlas.
Mesmo que o servidor reinicie, tudo persiste.
