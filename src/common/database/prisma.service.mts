import { PrismaClient, UserModel } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { DI_KEYS } from '../../constants/diKeys.mjs'
import { ILogger } from '../../logger/logger.interface.mjs'

@injectable()
export class PrismaService {
	client: PrismaClient

	constructor(@inject(DI_KEYS.ILogger) private logger: ILogger) {
		this.client = new PrismaClient()
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect()
			this.logger.logInfo('[PrismaService] Database connected successfully')
		} catch (err) {
			if (err instanceof Error) {
				this.logger.logError('[PrismaService] Connection to database failed: ' + err.message)
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect()
	}
}
