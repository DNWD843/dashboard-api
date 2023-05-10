import { IUserService } from './users.service.interface.mjs'
import { UserRegisterDto } from './dto/user-register.dto.mjs'
import { User } from './user.entity.mjs'
import { inject, injectable } from 'inversify'
import { UserLoginDto } from './dto/user-login.dto.mjs'
import { DI_KEYS } from '../constants/diKeys.mjs'
import { IConfigService } from '../config/config.service.interface.mjs'
import { ENV_SALT_KEY, SALT_DEFAULT_VALUE } from '../constants/index.mjs'

@injectable()
export class UserService implements IUserService {
	constructor(@inject(DI_KEYS.ConfigService) private configService: IConfigService) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name)
		const salt = this.configService.get(ENV_SALT_KEY) || SALT_DEFAULT_VALUE
		await newUser.setPassword(password, Number(salt))

		return null
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true
	}
}
