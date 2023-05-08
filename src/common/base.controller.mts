import { Response, Router } from 'express'
import { ExpressReturnType, IBaseControllerRoute } from './route.interface.mjs'
import { ILogger } from '../logger/logger.interface.mjs'
import { injectable } from 'inversify'
export { Router } from 'express'
import 'reflect-metadata'

@injectable()
export abstract class BaseController {
	private readonly _router: Router

	private logger: ILogger

	constructor(logger: ILogger) {
		this.logger = logger
		this._router = Router()
	}

	get router(): Router {
		return this._router
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json')

		return res.status(code).json(message)
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send(res, 200, message)
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201)
	}

	protected bindRoutes(routes: IBaseControllerRoute[]): void {
		for (const route of routes) {
			const routeHandler = route.func.bind(this)
			this.logger.logInfo(`[${route.method}] ${route.path}`)
			this.router[route.method](route.path, routeHandler)
		}
	}
}
