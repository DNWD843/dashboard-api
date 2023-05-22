import { IUserService } from './users.service.interface.mjs'
import { UserRegisterDto } from './dto/user-register.dto.mjs'
import { User } from './user.entity.mjs'
import { inject, injectable } from 'inversify'
import { UserLoginDto } from './dto/user-login.dto.mjs'
import { DI_KEYS } from '../constants/diKeys.mjs'
import { IConfigService } from '../config/config.service.interface.mjs'
import { ENV_SALT_KEY, SALT_DEFAULT_VALUE } from '../constants/index.mjs'
import { IUsersRepository } from './users.repository.interface.mjs'
import { UserModel } from '@prisma/client'

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(DI_KEYS.ConfigService) private configService: IConfigService,
		@inject(DI_KEYS.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const isUserExists = await this.usersRepository.find(email)

		if (isUserExists) {
			return null
		}

		const newUser = new User(email, name)
		const salt = this.configService.get(ENV_SALT_KEY) || SALT_DEFAULT_VALUE
		await newUser.setPassword(password, Number(salt))

		return this.usersRepository.create(newUser)
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email)

		if (!existedUser) {
			return false
		}

		const foundUser = new User(existedUser.email, existedUser.name, existedUser.password)
		return foundUser.comparePassword(password)
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email)
	}
}
