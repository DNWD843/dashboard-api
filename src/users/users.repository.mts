import { IUsersRepository } from './users.repository.interface.mjs'
import { User } from './user.entity.mjs'
import { UserModel } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { DI_KEYS } from '../constants/diKeys.mjs'
import { PrismaService } from '../common/database/prisma.service.mjs'

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(DI_KEYS.PrismaService) private prismaService: PrismaService) {}

	public async create({ email, password, name }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		})
	}
	public async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		})
	}
}
