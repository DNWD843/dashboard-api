export interface ILogger {
    logger: unknown;
    logInfo: (...args: unknown[]) => void;
    logError: (...args: unknown[]) => void;
    logWarning: (...args: unknown[]) => void;
}
