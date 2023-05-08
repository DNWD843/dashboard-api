import { BaseController } from '../common/base.controller.mjs'
import { NextFunction, Request, Response } from 'express'
import { routes } from '../constants/index.mjs'
import { HttpError } from '../errors/http-error.class.mjs'
import { inject, injectable } from 'inversify'
import { DI_KEYS } from '../constants/diKeys.mjs'
import { ILogger } from '../logger/logger.interface.mjs'
import 'reflect-metadata'
import { IUsersController } from './users.controller.interface.mjs'
import { UserLoginDto } from './dto/user-login.dto.mjs'
import { UserRegisterDto } from './dto/user-register.dto.mjs'
import { UserService } from './userService.mjs'
import { ValidateMiddleware } from '../common/validate.middleware.mjs'

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(DI_KEYS.ILogger) private loggerService: ILogger, @inject(DI_KEYS.UserService) private userService: UserService) {
		super(loggerService)
		this.bindRoutes([
			{ path: routes.REGISTER, method: 'post', func: this.register, middlewares: [new ValidateMiddleware(UserRegisterDto)] },
			{ path: routes.LOGIN, method: 'post', func: this.login },
		])
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		// this.ok(res, 'logged in')
		console.log('login dto:', req.body)
		next(new HttpError(401, 'Unauthorized', 'login'))
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const user = await this.userService.createUser(body)

		if (!user) {
			return next(new HttpError(422, 'User already exists'))
		}
		this.ok(res, { email: user.email })
	}
}
