import {Response, Router} from "express";
import {IBaseControllerRoute} from "./route.interface.mjs";
import {LoggerService} from "../logger/logger.service.mjs";
export { Router } from 'express'

export abstract class BaseController {
    private readonly _router: Router

    private logger: LoggerService

    protected constructor(logger: LoggerService) {
        this.logger = logger
        this._router = Router()
    }

    get router() {
        return this._router
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type('application/json')

        return res.status(code).json(message)
    }

    public ok<T>(res: Response, message: T) {
        return this.send(res, 200, message)
    }

    public created(res: Response) {
        return res.sendStatus(201)
    }

    protected bindRoutes(routes: IBaseControllerRoute[]) {
        for (const route of routes) {
            const routeHandler = route.func.bind(this)
            this.logger.logInfo(`[${route.method}] ${route.path}`)
            this.router[route.method](route.path, routeHandler)
        }
    }
}