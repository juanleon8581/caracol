
import { envConfig } from "./infrastructure/config/env";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";

(async () => {
    main();
})();

function main() {
    const server = new Server({
        port: envConfig.port,
        routes: AppRoutes.routes,
    });

    server.start();
}
