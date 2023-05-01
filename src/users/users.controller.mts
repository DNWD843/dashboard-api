import {BaseController, Router} from '../common/base.controller.mjs'
import {NextFunction, Request, Response} from "express";
import {LoggerService} from "../logger/logger.service.mjs";
import {routes} from "../constants/index.mjs";
import {HttpError} from "../errors/http-error.class.mjs";

export class UsersController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            { path: routes.REGISTER, method: 'post', func: this.register },
            { path: routes.LOGIN, method: 'post', func: this.login },
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        // this.ok(res, 'logged in')
        next(new HttpError(401, 'Unauthorized', 'login'))
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'registered')
    }
}
