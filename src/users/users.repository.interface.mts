import { User } from './user.entity.mjs'
import { UserModel } from '@prisma/client'

export interface IUsersRepository {
	create(user: User): Promise<UserModel>
	find(email: string): Promise<UserModel | null>
}
