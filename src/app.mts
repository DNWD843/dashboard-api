import express, { Express } from 'express'
import {PORT, routes} from "./constants/index.mjs";
import { Server } from 'http'
import {usersRouter} from "./users/index.mjs";

export class App {
    app: Express
    port: number
    server: Server
    constructor() {
        this.app = express()
        this.port = PORT
    }

    private useRoutes() {
        this.app.use(routes.USERS, usersRouter)
    }

    public async init() {
        this.useRoutes()
        this.server = this.app.listen(this.port)
        console.log(`Server is listening on port: ${this.port}`)
    }
}
