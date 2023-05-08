import {App} from "./app.mjs";
import {UsersController} from "./users/index.mjs";
import {ExceptionFilter} from "./errors/exception.filter.mjs";
import {Container} from "inversify";
import {ILogger} from "./logger/logger.interface.mjs";
import {LoggerService} from "./logger/logger.service.mjs";
import {DI_KEYS} from "./constants/diKeys.mjs";
import {IExceptionFilter} from "./errors/exception.filter.interface.mjs";
import 'reflect-metadata'

const appContainer = new Container()
appContainer.bind<ILogger>(DI_KEYS.ILogger).to(LoggerService)
appContainer.bind<IExceptionFilter>(DI_KEYS.ExceptionFilter).to(ExceptionFilter)
appContainer.bind<UsersController>(DI_KEYS.UsersController).to(UsersController)
appContainer.bind<App>(DI_KEYS.Application).to(App)

const app = appContainer.get<App>(DI_KEYS.Application)
app.start()

export { app, appContainer }
