import { Request, Response, NextFunction, Router } from 'express'
import { IMiddleware } from './middleware.interface.mjs'

export interface IBaseControllerRoute {
	path: string
	func: (req: Request, res: Response, next: NextFunction) => void
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
	middlewares?: IMiddleware[]
}

export type ExpressReturnType = Response<any, Record<string, any>>
