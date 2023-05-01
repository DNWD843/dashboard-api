import express, { Express } from 'express'
import {routes} from "./constants/index.mjs";
import { Server } from 'http'
import dotenv from "dotenv";
import { Logger, ILogObj } from "tslog";
import { LoggerService } from './logger/logger.service.mjs'
import {UsersController} from "./users/index.mjs";

export class App {
    private app: Express
    private readonly port: number
    private server: Server

    private logger: LoggerService

    private usersController: UsersController
    constructor({ port, logger, userController }: { port: number, logger: LoggerService, userController: UsersController }) {
        dotenv.config()
        this.app = express()
        this.port = process.env.PORT ? parseInt(process.env.PORT) : port
        this.logger = logger
        this.usersController = userController
    }

    private useRoutes(): void {
        this.app.use(routes.USERS, this.usersController.router)
    }

    public async start(): Promise<void> {
        this.useRoutes()
        this.server = this.app.listen(this.port)
        this.logger.logInfo(`Server is listening on port: ${this.port}`)
    }
}
