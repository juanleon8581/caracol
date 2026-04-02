import { Router, IRouter } from 'express';
import { healthRouter } from '@/presentation/health/health.routes';


export class AppRoutes {
    static get routes(): IRouter {
        const router: IRouter = Router();


        // Example feature routes
        // router.use("/users", UserRoutes.routes);
        router.use('/health', healthRouter);


        return router;
    }
}
