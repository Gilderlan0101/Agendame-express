require('dotenv').config();
const express = require('express');

// Importar as rotas
const router = require('./src/routes/registerUser')
const listCompanyRoutes = require('./src/routes/list_company');

class Server {
  /*
    Server: Responsável por =>
    Responsável por:
        - criar a instância do Express
        - configurar middlewares
        - configurar arquivos estáticos
        - registrar rotas
        - iniciar o servidor
    */

  constructor() {
    this.title = 'Agendame';
    this.description = 'Sistema de agendamento para salões e serviços';
    this.version = '1.0.0';
    this.docsPath = '/docs';
    this.port = process.env.PORT || 3000;
    this.app = express();

    // Inicializar configurações
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupDocumentation();
  }

  // Setup de middlewares
  setupMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  // Setup de rotas
  setupRoutes() {
    // Rota de health check
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        service: this.title,
        version: this.version,
      });
    });

    // Rota principal
    this.app.get('/', (req, res) => {
      res.json({
        service: this.title,
        description: this.description,
        version: this.version,
        documentation: this.docsPath,
        endpoints: ['/', '/health', '/docs'],
      });
    });

    // Listar todas as empresas
    this.app.use('/api/register/user', router)
    this.app.use('/api/companies', listCompanyRoutes);


  }

  // Documentação
  setupDocumentation() {
    // Rota para visualizar documentação da API
    this.app.get(this.docsPath, (req, res) => {
      res.json({
        title: this.title,
        description: this.description,
        version: this.version,
        endpoints: [
          { path: '/', method: 'GET', description: 'Informações da API' },
          {
            path: '/health',
            method: 'GET',
            description: 'Health check da aplicação',
          },
          {
            path: this.docsPath,
            method: 'GET',
            description: 'Documentação da API',
          },
        ],
        status: 'Em desenvolvimento',
      });
    });
  }

  // Iniciar servidor
  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 ${this.title} v${this.version}`);
      console.log(
        `📖 Documentação: http://localhost:${this.port}${this.docsPath}`,
      );
      console.log(`✅ Servidor rodando na porta ${this.port}`);
      console.log(`📝 ${this.description}`);
    });
  }
}

// Instanciar e iniciar o servidor
const server = new Server();
server.start();

// Exportar para testes ou outros usos
module.exports = server;
