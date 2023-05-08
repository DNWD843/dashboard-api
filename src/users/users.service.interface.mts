import { UserRegisterDto } from './dto/user-register.dto.mjs'
import { User } from './user.entity.mjs'
import { UserLoginDto } from './dto/user-login.dto.mjs'

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<User | null>
	validateUser: (dto: UserLoginDto) => Promise<boolean>
}
