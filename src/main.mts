import {App} from "./app.mjs";
import {PORT} from "./constants/index.mjs";
import {loggerService} from "./logger/logger.service.mjs";
import {UsersController} from "./users/index.mjs";
import {ExceptionFilter} from "./errors/exception.filter.mjs";

async function bootstrap() {
    const app = new App({
        port: PORT,
        logger: loggerService,
        userController: new UsersController(loggerService),
        exceptionFilter: new ExceptionFilter(loggerService),
    })
    await app.start()
}

bootstrap()
