import express, { Express } from 'express'
import {routes} from "./constants/index.mjs";
import { Server } from 'http'
import dotenv from "dotenv";
import { Logger, ILogObj } from "tslog";
import { LoggerService } from './logger/logger.service.mjs'
import {UsersController} from "./users/index.mjs";
import {ExceptionFilter} from "./errors/exception.filter.mjs";

export class App {
    private app: Express
    private readonly port: number
    private server: Server

    private logger: LoggerService

    private usersController: UsersController
    private exceptionFilter: ExceptionFilter
    constructor({ port, logger, userController, exceptionFilter }: { port: number, logger: LoggerService, userController: UsersController, exceptionFilter: ExceptionFilter }) {
        dotenv.config()
        this.app = express()
        this.port = process.env.PORT ? parseInt(process.env.PORT) : port
        this.logger = logger
        this.usersController = userController
        this.exceptionFilter = exceptionFilter
    }

    private useRoutes(): void {
        this.app.use(routes.USERS, this.usersController.router)
    }
    private useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async start(): Promise<void> {
        this.useRoutes()
        this.useExceptionFilters()
        this.server = this.app.listen(this.port)
        this.logger.logInfo(`Server is listening on port: ${this.port}`)
    }
}
