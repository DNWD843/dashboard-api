import express, { Express } from 'express'
import { routes } from './constants/index.mjs'
import { Server } from 'http'
import dotenv from 'dotenv'
import { UsersController } from './users/index.mjs'
import { ExceptionFilter } from './errors/exception.filter.mjs'
import { ILogger } from './logger/logger.interface.mjs'
import { inject, injectable } from 'inversify'
import { DI_KEYS } from './constants/diKeys.mjs'
import 'reflect-metadata'

@injectable()
export class App {
	private app: Express
	private readonly port: number
	private server: Server

	constructor(
		@inject(DI_KEYS.ILogger) private logger: ILogger,
		@inject(DI_KEYS.ExceptionFilter) private exceptionFilter: ExceptionFilter,
		@inject(DI_KEYS.UsersController) private usersController: UsersController,
	) {
		dotenv.config()
		this.app = express()
		this.port = process.env.PORT ? parseInt(process.env.PORT) : 8080
	}

	useMiddlewares(): void {
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: false }))
	}

	private useRoutes(): void {
		this.app.use(routes.USERS, this.usersController.router)
	}
	private useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	public async start(): Promise<void> {
		this.useMiddlewares()
		this.useRoutes()
		this.useExceptionFilters()
		this.server = this.app.listen(this.port)
		this.logger.logInfo(`Server is listening on port: ${this.port}`)
	}
}
