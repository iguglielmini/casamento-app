# 🎉 Casamento Ítalo & Daniely

Bem-vindo ao projeto oficial da landing page para o casamento de Ítalo & Daniely. Esta aplicação possui funcionalidades modernas para gerenciar convidados, confirmar presenças e facilitar a organização do evento.

---

## 🚀 Funcionalidades

- **Landing Page:** Página principal com contador regressivo para o casamento.
- **Confirmação de Presença:** Convidados confirmam sua presença através de nome e telefone.
- **Dashboard Administrativo:**
  - Cadastro e exclusão de convidados
  - Total de convidados, confirmados e não confirmados
  - Gerenciamento fácil e intuitivo

---

## 🛠️ Tecnologias utilizadas

- **Next.js 14** (App Router)
- **React**
- **Tailwind CSS**
- **TypeScript**
- **Prisma ORM**
- **SQLite** (facilmente substituível por PostgreSQL ou MySQL)
- **Bcrypt** (criptografia de senha)

---

## 📦 Como instalar e rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (Recomendado versão 18+)
- [Git](https://git-scm.com/)

### Passos de instalação

```bash
git clone https://github.com/seu-usuario/casamento-app.git
cd casamento-app
npm install
```

### Configuração do banco de dados

Copie e ajuste as variáveis no arquivo `.env.example` para `.env`:

```env
DATABASE_URL="file:./dev.db"
```

Gere as migrações e seed inicial:

```bash
npx prisma migrate dev
npm run prisma:seed
```

### Executar o projeto localmente

```bash
npm run dev
```

Acesse a aplicação:

- Landing Page: [http://localhost:3000](http://localhost:3000)
- Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

**Login admin padrão:**
- Usuário: `admin`
- Senha: `italoedaniely2025`

---

## 🧑‍💻 Estrutura do projeto

```bash
src/
├── app/
│   ├── components (componentes reutilizáveis)
│   ├── api (rotas backend)
│   └── dashboard (administração)
├── contexts/ (Context API)
├── prisma/ (Prisma schema e seed)
├── utils/ (funções auxiliares)
└── public/ (imagens estáticas)
```

---

## ✅ Boas práticas

- Código organizado em componentes e contextos reutilizáveis.
- Senhas criptografadas com bcrypt.
- Uso de localStorage para evitar duplicidade na confirmação.
- Máscara de telefone padrão brasileira.

---

## 🚨 Segurança

- Credenciais armazenadas de forma segura e criptografada.
- Dashboard protegido por autenticação.

---

## 📌 Licença

Este projeto está sob licença MIT. Para mais detalhes, consulte o arquivo `LICENSE`.

---

🎊 **Ítalo & Daniely desejam que você aproveite esta aplicação e agradecem pela sua presença nesse momento tão especial!**