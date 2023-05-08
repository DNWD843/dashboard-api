import { Logger, ILogObj } from 'tslog'
import { ILogger } from './logger.interface.mjs'
import { injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
export class LoggerService implements ILogger {
	logger: Logger<ILogObj>

	constructor() {
		this.logger = new Logger<ILogObj>({
			prettyLogTemplate: '{{dd}}.{{mm}}.{{yyyy}} {{hh}}:{{MM}}:{{ss}}\t{{logLevelName}}\t',
			stylePrettyLogs: true,
			prettyLogStyles: {
				logLevelName: {
					INFO: ['bold', 'blue'],
					WARN: ['bold', 'yellow'],
					ERROR: ['bold', 'red'],
				},
			},
		})
	}

	logInfo(...args: unknown[]): void {
		this.logger.info(...args)
	}

	logError(...args: unknown[]): void {
		this.logger.error(...args)
	}

	logWarning(...args: unknown[]): void {
		this.logger.warn(...args)
	}
}
