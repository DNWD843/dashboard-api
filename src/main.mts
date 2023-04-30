import {App} from "./app.mjs";
import {PORT} from "./constants/index.mjs";
import {loggerService} from "./logger/logger.service.mjs";

async function bootstrap() {
    const app = new App({port: PORT, logger: loggerService})
    await app.start()
}

bootstrap()
