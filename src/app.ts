import { envConfig } from './infrastructure/config/env';
import { Server } from './presentation/server';
import { AppRoutes } from './presentation/routes';

(async (): Promise<void> => {
  main();
})();

function main(): void {
  const server = new Server({
    port: envConfig.port,
    routes: AppRoutes.routes,
  });

  server.start();
}
