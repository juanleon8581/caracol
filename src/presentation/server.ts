import express, { Application, IRouter } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@/infrastructure/config/swagger';

interface ServerOptions {
  port: number;
  routes: IRouter;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly router: IRouter;

  constructor({ port, routes }: ServerOptions) {
    this.port = port;
    this.router = routes;
    this.configure();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Swagger docs
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // API routes
    this.app.use('/api', this.router);
  }

  start(): void {
    this.app.listen(this.port, () => {
      console.info(`🚀 Server running on http://localhost:${this.port}`);
      console.info(`📑 Swagger docs at http://localhost:${this.port}/api-docs`);
    });
  }

  // Exposed for testing purposes
  getApp(): Application {
    return this.app;
  }
}
