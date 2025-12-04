# Petshop Manager - Frontend

Interface web para o sistema de gerenciamento de petshop.

## Funcionalidades

- **Clientes**: Cadastro, edição, listagem e exclusão de clientes
- **Pets**: Gerenciamento de pets vinculados aos clientes
- **Serviços**: Registro de serviços realizados com preços e status

## Tecnologias

- **React 19** com TypeScript
- **Vite** para build e desenvolvimento
- **React Router** para navegação
- **Axios** para requisições HTTP
- **CSS moderno** com design responsivo

## Como executar

### Pré-requisitos

- Node.js 16+
- API do petshop rodando (porta 3000)

### Instalação

```bash
cd frontend
npm install
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## Estrutura do projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── services/      # Serviços de API
├── hooks/         # Hooks personalizados
├── types/         # Definições TypeScript
└── ...
```

## API Endpoints

A aplicação consome os seguintes endpoints da API:

- `GET/POST/PUT/DELETE /api/clientes`
- `GET/POST/PUT/DELETE /api/pets`
- `GET/POST/PUT/DELETE /api/servicos`