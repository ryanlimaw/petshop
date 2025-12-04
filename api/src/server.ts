import express from 'express';
import cors from 'cors';
import routes from './routes';
import { setupSwagger } from './config/swagger';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configurar Swagger
setupSwagger(app);

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API Petshop',
    docs: 'http://localhost:3000/api-docs'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação: http://localhost:${PORT}/api-docs`);
});

export default app;
