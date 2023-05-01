import { Logger, ILogObj, ISettingsParam } from 'tslog'

export class LoggerService {
    private logger: Logger<ILogObj>

    constructor() {
        this.logger = new Logger<ILogObj>({
            prettyLogTemplate: "{{dd}}.{{mm}}.{{yyyy}} {{hh}}:{{MM}}:{{ss}}\t{{logLevelName}}\t",
            stylePrettyLogs: true,
            prettyLogStyles: {
                logLevelName: {
                    INFO: ['bold', 'blue'],
                    WARN: ["bold", "yellow"],
                    ERROR: ["bold", "red"],
                },
            },
        })
    }

    logInfo(...args: unknown[]) {
        this.logger.info(...args)
    }

    logError(...args: unknown[]) {
        this.logger.error(...args)
    }

    logWarning(...args: unknown[]) {
        this.logger.warn(...args)
    }
}

export const loggerService = new LoggerService()
