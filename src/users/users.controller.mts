import { BaseController } from '../common/base.controller.mjs'
import { NextFunction, Request, Response } from 'express'
import { ENV_SECRET_KEY, routes, SECRET_DEFAULT_VALUE } from '../constants/index.mjs'
import { HttpError } from '../errors/http-error.class.mjs'
import { inject, injectable } from 'inversify'
import { DI_KEYS } from '../constants/diKeys.mjs'
import { ILogger } from '../logger/logger.interface.mjs'
import 'reflect-metadata'
import { IUsersController } from './users.controller.interface.mjs'
import { UserLoginDto } from './dto/user-login.dto.mjs'
import { UserRegisterDto } from './dto/user-register.dto.mjs'
import { UserService } from './users.service.mjs'
import { ValidateMiddleware } from '../common/validate.middleware.mjs'
import jsonwebtoken from 'jsonwebtoken'
import { IConfigService } from '../config/config.service.interface.mjs'
import { AuthGuard } from '../common/auth.guard.mjs'

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(DI_KEYS.ILogger) private loggerService: ILogger,
		@inject(DI_KEYS.UserService) private userService: UserService,
		@inject(DI_KEYS.ConfigService) private configService: IConfigService,
	) {
		super(loggerService)
		this.bindRoutes([
			{ path: routes.REGISTER, method: 'post', func: this.register, middlewares: [new ValidateMiddleware(UserRegisterDto)] },
			{ path: routes.LOGIN, method: 'post', func: this.login, middlewares: [new ValidateMiddleware(UserLoginDto)] },
			{ path: routes.INFO, method: 'get', func: this.info, middlewares: [new AuthGuard()] },
		])
	}

	async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const validationResult = await this.userService.validateUser(req.body)
		if (!validationResult) {
			return next(new HttpError(401, 'Authorization error', 'login'))
		}

		const jwt = await this.signJWT(req.body.email, this.configService.get(ENV_SECRET_KEY) || SECRET_DEFAULT_VALUE)
		this.ok(res, { jwt })
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const user = await this.userService.createUser(body)

		if (!user) {
			return next(new HttpError(422, 'User already exists'))
		}
		this.ok(res, { email: user.email, id: user.id })
	}

	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user)
		this.ok(res, { email: userInfo?.email, id: userInfo?.id })
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			jsonwebtoken.sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err)
					}

					resolve(token as string)
				},
			)
		})
	}
}
