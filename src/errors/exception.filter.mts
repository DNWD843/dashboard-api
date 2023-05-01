import {NextFunction, Request, Response} from "express";
import {LoggerService} from "../logger/logger.service.mjs";
import {IExceptionFilter} from "./exception.filter.interface.mjs";
import {HttpError} from "./http-error.class.mjs";

export class ExceptionFilter implements IExceptionFilter{
    private logger: LoggerService

    constructor(logger: LoggerService) {
        this.logger = logger
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
