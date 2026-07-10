/**
 * Error thrown when a value does not satisfy a value-object contract.
 */
export class ValueError extends Error {
    /**
     * @param {string} received
     * @param {string} expected
     */
    constructor(received, expected) {
        super(`Invalid value ${received} for ${expected}.`)
    }
}
