import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Petshop',
      version: '1.0.0',
      description: 'API simples para petshop'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Cliente: {
          type: 'object',
          required: ['nome', 'email', 'telefone'],
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'João Silva' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            telefone: { type: 'string', example: '11999999999' }
          }
        },
        Pet: {
          type: 'object',
          required: ['nome', 'especie', 'clienteId'],
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Rex' },
            especie: { type: 'string', example: 'Cachorro' },
            clienteId: { type: 'integer', example: 1 }
          }
        },
        Servico: {
          type: 'object',
          required: ['tipo', 'preco', 'clienteId'],
          properties: {
            id: { type: 'integer', example: 1 },
            tipo: { type: 'string', example: 'Banho' },
            preco: { type: 'number', example: 50.00 },
            realizado: { type: 'boolean', example: false },
            clienteId: { type: 'integer', example: 1 },
            petId: { type: 'integer', example: 1 }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Mensagem de erro' }
          }
        }
      }
    },
    tags: [
      { name: 'Clientes', description: 'Operações com clientes' },
      { name: 'Pets', description: 'Operações com pets' },
      { name: 'Serviços', description: 'Operações com serviços' }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/docs/*.ts']
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default specs;
