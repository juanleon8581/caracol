import { Router, IRouter } from 'express';
import { healthRouter } from '@/presentation/health/health.routes';
import { caracolRouter } from '@/presentation/caracol/caracol.routes';

export class AppRoutes {
  static get routes(): IRouter {
    const router: IRouter = Router();

    router.use('/health', healthRouter);
    router.use('/caracol', caracolRouter);

    return router;
  }
}
