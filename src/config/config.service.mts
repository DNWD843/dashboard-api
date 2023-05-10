import { IConfigService } from './config.service.interface.mjs'
import { config, DotenvConfigOutput } from 'dotenv'
import { inject, injectable } from 'inversify'
import { DI_KEYS } from '../constants/diKeys.mjs'
import { ILogger } from '../logger/logger.interface.mjs'

@injectable()
export class ConfigService implements IConfigService {
	private readonly config: DotenvConfigOutput['parsed']
	constructor(@inject(DI_KEYS.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config()

		if (result.error) {
			this.logger.logError('[ConfigService] Error reading .env or .env file does not exists.')
		} else {
			this.logger.logInfo('[ConfigService] Configuration is successfully read from .env file.')
			this.config = result.parsed
		}
	}
	get(key: string): string | null {
		return this.config ? this.config[key] : null
	}
}
