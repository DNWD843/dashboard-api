import express, { Express } from 'express'
import {PORT, routes} from "./constants/index.mjs";
import { Server } from 'http'
import {usersRouter} from "./users/index.mjs";
import dotenv from "dotenv";
import { Logger, ILogObj } from "tslog";
import { LoggerService } from './logger/logger.service.mjs'

export class App {
    app: Express
    port: number
    server: Server

    logger: LoggerService
    constructor({ port, logger }: { port: number, logger: LoggerService }) {
        dotenv.config()
        this.app = express()
        this.port = process.env.PORT ? parseInt(process.env.PORT) : port
        this.logger = logger
    }

    private useRoutes(): void {
        this.app.use(routes.USERS, usersRouter)
    }

    public async start(): Promise<void> {
        this.useRoutes()
        this.server = this.app.listen(this.port)
        this.logger.info(`Server is listening on port: ${this.port}`)
    }
}
