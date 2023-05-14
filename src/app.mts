import express, { Express } from 'express'
import { ENV_PORT_KEY, PORT_DEFAULT_VALUE, routes } from './constants/index.mjs'
import { Server } from 'http'
import { UsersController } from './users/index.mjs'
import { ILogger } from './logger/logger.interface.mjs'
import { inject, injectable } from 'inversify'
import { DI_KEYS } from './constants/diKeys.mjs'
import 'reflect-metadata'
import { IConfigService } from './config/config.service.interface.mjs'
import { IExceptionFilter } from './errors/exception.filter.interface.mjs'
import { PrismaService } from './common/database/prisma.service.mjs'

@injectable()
export class App {
	private app: Express
	private readonly port: number
	private server: Server

	constructor(
		@inject(DI_KEYS.ILogger) private logger: ILogger,
		@inject(DI_KEYS.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(DI_KEYS.UsersController) private usersController: UsersController,
		@inject(DI_KEYS.ConfigService) private configService: IConfigService,
		@inject(DI_KEYS.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express()
		const port = this.configService.get(ENV_PORT_KEY)
		this.port = port ? Number(port) : PORT_DEFAULT_VALUE
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
		await this.prismaService.connect()
		this.server = this.app.listen(this.port)
		this.logger.logInfo(`Server is listening on port: ${this.port}`)
	}
}
