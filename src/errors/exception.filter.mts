import {NextFunction, Request, Response} from "express";
import {IExceptionFilter} from "./exception.filter.interface.mjs";
import {HttpError} from "./http-error.class.mjs";
import {ILogger} from "../logger/logger.interface.mjs";
import {inject, injectable} from "inversify";
import {DI_KEYS} from "../constants/diKeys.mjs";
import 'reflect-metadata'

@injectable()
export class ExceptionFilter implements IExceptionFilter{
    constructor(@inject(DI_KEYS.ILogger) private logger: ILogger) {
    }
    public catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HttpError) {
            this.logger.logError(`[${err.context}] Error ${err.statusCode}: ${err.message}`)
            res.status(err.statusCode).send({err: err.message})
        } else {
            this.logger.logError(`${err.message}`)

            res.status(500).send({err: err.message})
        }
    }
}
