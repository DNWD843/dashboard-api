import express, { Express } from 'express'
import {PORT, routes} from "./constants/index.mjs";
import { Server } from 'http'
import {usersRouter} from "./users/index.mjs";
import dotenv from "dotenv";

export class App {
    app: Express
    port: number
    server: Server
    constructor(port: number) {
        dotenv.config()
        this.app = express()
        this.port = process.env.PORT ? parseInt(process.env.PORT) : port
    }

    private useRoutes(): void {
        this.app.use(routes.USERS, usersRouter)
    }

    public async start(): Promise<void> {
        this.useRoutes()
        this.server = this.app.listen(this.port)
        console.log(`Server is listening on port: ${this.port}`)
    }
}
