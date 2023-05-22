import { UserRegisterDto } from './dto/user-register.dto.mjs'
import { UserLoginDto } from './dto/user-login.dto.mjs'
import { UserModel } from '@prisma/client'

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>
	validateUser: (dto: UserLoginDto) => Promise<boolean>
	getUserInfo: (email: string) => Promise<UserModel | null>
}
