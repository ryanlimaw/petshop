# Petshop Manager

Sistema completo de gerenciamento de petshop com API REST e interface web separada.

## 📁 Estrutura do Projeto

```
petshop-manager/
├── api/                    # 🖥️ Backend (API Node.js/Express)
│   ├── src/                # Código fonte da API
│   ├── prisma/            # Banco de dados
│   └── package.json       # Dependências da API
├── frontend/              # 🎨 Frontend (React/TypeScript)
│   ├── src/               # Código fonte React
│   └── package.json       # Dependências do frontend
└── package.json           # Scripts para gerenciar ambos
```

## 🚀 Como executar

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Configuração Inicial

```bash
# 1. Instalar todas as dependências
npm run install:all

# 2. Configurar banco de dados
npm run api:db:generate
npm run api:db:push

# Comando único para tudo acima
npm run setup
```

### Desenvolvimento

#### Executar API + Frontend simultaneamente
```bash
npm run dev
```

#### Executar apenas API
```bash
npm run api:dev
```

#### Executar apenas Frontend
```bash
npm run frontend:dev
```

### Acesso aos serviços

- **API (Backend):** `http://localhost:3000`
- **Interface Web (Frontend):** `http://localhost:5173`
- **Documentação API:** `http://localhost:3000/api-docs`
- **Prisma Studio:** `npm run api:db:studio`

## 📖 Funcionalidades

### API (Backend)
- ✅ **Clientes**: CRUD completo
- ✅ **Pets**: CRUD com relacionamento cliente
- ✅ **Serviços**: CRUD com relacionamentos cliente/pet
- ✅ **Swagger**: Documentação automática
- ✅ **Prisma ORM**: Gerenciamento do banco SQLite
- ✅ **CORS**: Configurado para desenvolvimento

### Frontend (React)
- ✅ **Interface responsiva** moderna
- ✅ **CRUD completo** para todas as entidades
- ✅ **Navegação** entre módulos
- ✅ **Formulários modais** com validação
- ✅ **Estados de loading** e tratamento de erros
- ✅ **Relacionamentos** automáticos entre entidades

## 🛠️ Tecnologias

### Backend
- **Node.js** + **TypeScript**
- **Express.js** (API REST)
- **Prisma ORM** (Banco de dados)
- **SQLite** (Banco local)
- **Zod** (Validação)
- **Swagger** (Documentação)

### Frontend
- **React 19** + **TypeScript**
- **Vite** (Build tool)
- **React Router** (Navegação)
- **Axios** (HTTP client)
- **CSS moderno** (Interface responsiva)

## 📚 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # API + Frontend simultaneamente
npm run api:dev          # Apenas API
npm run frontend:dev     # Apenas Frontend

# Instalação
npm run install:all      # Instalar dependências de ambos
npm run api:install      # Apenas API
npm run frontend:install # Apenas Frontend

# Banco de dados
npm run api:db:generate  # Gerar cliente Prisma
npm run api:db:push      # Aplicar schema no banco
npm run api:db:studio    # Abrir Prisma Studio

# Setup completo
npm run setup           # Instalar tudo + configurar BD
```

## 🌟 Características

- **Arquitetura separada**: Backend e frontend independentes
- **Desenvolvimento paralelo**: Equipes podem trabalhar separadamente
- **Deploy independente**: Cada parte pode ser implantada separadamente
- **Tecnologias modernas**: Stack atual e performática
- **Documentação completa**: API documentada com Swagger
- **Interface intuitiva**: UX moderna e responsiva

## 📝 Desenvolvimento

### Adicionando novos endpoints

1. Criar controller em `api/src/controllers/`
2. Criar service em `api/src/services/`
3. Adicionar rotas em `api/src/routes/`
4. Criar validação em `api/src/validations/`
5. Atualizar schema Prisma se necessário

### Adicionando novas páginas

1. Criar componente em `frontend/src/pages/`
2. Adicionar rota em `frontend/src/App.tsx`
3. Criar service em `frontend/src/services/`
4. Adicionar tipos em `frontend/src/types/`

---

**🎉 Pronto para desenvolvimento!**
