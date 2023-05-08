import { App } from './app.mjs'
import { IUserService, UsersController, UserService } from './users/index.mjs'
import { ExceptionFilter } from './errors/exception.filter.mjs'
import { Container, ContainerModule, interfaces } from 'inversify'
import { ILogger } from './logger/logger.interface.mjs'
import { LoggerService } from './logger/logger.service.mjs'
import { DI_KEYS } from './constants/diKeys.mjs'
import { IExceptionFilter } from './errors/exception.filter.interface.mjs'
import 'reflect-metadata'
import { IUsersController } from './users/users.controller.interface.mjs'

export const appBindingsModule = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(DI_KEYS.ILogger).to(LoggerService)
	bind<IExceptionFilter>(DI_KEYS.ExceptionFilter).to(ExceptionFilter)
	bind<IUsersController>(DI_KEYS.UsersController).to(UsersController)
	bind<IUserService>(DI_KEYS.UserService).to(UserService)
	bind<App>(DI_KEYS.Application).to(App)
})

function bootstrap(): { app: App; appContainer: Container } {
	const appContainer = new Container()
	appContainer.load(appBindingsModule)
	const app = appContainer.get<App>(DI_KEYS.Application)
	app.start()

	return { app, appContainer }
}

export const { app, appContainer } = bootstrap()
