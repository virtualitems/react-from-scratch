/**
 * Debug level for verbose, development-focused logs.
 */
export const DEBUG = 10

/**
 * Informational level for standard runtime events.
 */
export const INFO = 20

/**
 * Warning level for non-fatal but suspicious situations.
 */
export const WARNING = 30

/**
 * Error level for recoverable failures.
 */
export const ERROR = 40

/**
 * Critical level for severe failures requiring immediate attention.
 */
export const CRITICAL = 50

/**
 * Logger contract that exposes methods per severity level.
 * @abstract
 */
export class Logger {
    constructor() {
        if (new.target === Logger) {
            throw new TypeError('Logger is abstract and cannot be instantiated directly.')
        }
    }

    /**
     * @param {unknown} data
     * @returns {void}
     */
    debug(data) {
        throw new Error('Not implemented: Logger.debug')
    }

    /**
     * @param {unknown} data
     * @returns {void}
     */
    info(data) {
        throw new Error('Not implemented: Logger.info')
    }

    /**
     * @param {unknown} data
     * @returns {void}
     */
    warning(data) {
        throw new Error('Not implemented: Logger.warning')
    }

    /**
     * @param {unknown} data
     * @returns {void}
     */
    error(data) {
        throw new Error('Not implemented: Logger.error')
    }

    /**
     * @param {unknown} data
     * @returns {void}
     */
    critical(data) {
        throw new Error('Not implemented: Logger.critical')
    }
}
