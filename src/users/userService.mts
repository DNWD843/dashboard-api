import { IUserService } from './users.service.interface.mjs'
import { UserRegisterDto } from './dto/user-register.dto.mjs'
import { User } from './user.entity.mjs'
import { injectable } from 'inversify'
import { UserLoginDto } from './dto/user-login.dto.mjs'

@injectable()
export class UserService implements IUserService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name)
		await newUser.setPassword(password)

		return null
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true
	}
}
