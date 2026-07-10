import { ValueError } from './errors.mjs'

/**
 * @see https://emailregex.com/
 */
const VALID_EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * Base value object abstraction.
 * @abstract
 * @template [T=unknown]
 */
export class ValueObject {
    constructor() {
        if (new.target === ValueObject) {
            throw new TypeError('ValueObject is abstract and cannot be instantiated directly.')
        }
    }

    /**
     * @returns {T}
     */
    get value() {
        throw new Error('Not implemented: ValueObject.value')
    }

    /**
     * @returns {string}
     */
    toString() {
        return String(this.value)
    }

    /**
     * @param {ValueObject<T> | null | undefined} other
     * @returns {boolean}
     */
    equals(other) {
        throw new Error('Not implemented: ValueObject.equals')
    }

    /**
     * @param {unknown} value
     * @returns {boolean}
     */
    static isValid(value) {
        return (
            value !== null &&
            value !== undefined &&
            Object.is(value, NaN) === false
        )
    }
}

/**
 * Nullable boolean value object.
 * @extends {ValueObject<boolean | null>}
 */
export class NullableBoolean extends ValueObject {
    /**
     * @param {boolean | null} value
     */
    constructor(value) {
        super()
        this.value = value
    }

    /**
     * @param {NullableBoolean | null | undefined} other
     * @returns {boolean}
     */
    equals(other) {
        if (other === null || other === undefined) return false
        return this.value === other.value
    }

    /**
     * @returns {boolean}
     */
    isIndeterminate() {
        return this.value === null
    }

    /**
     * @param {boolean | null} value
     * @returns {NullableBoolean}
     */
    static from(value) {
        return new this(value)
    }
}

/**
 * Email value object.
 * @extends {ValueObject<string>}
 */
export class Email extends ValueObject {
    /**
     * @param {string} value
     */
    constructor(value) {
        super()
        this.value = value
    }

    /**
     * @returns {string | undefined}
     */
    get username() {
        return this.value.split('@').shift()
    }

    /**
     * @returns {string | undefined}
     */
    get domain() {
        return this.value.split('@').pop()
    }

    /**
     * @returns {string | undefined}
     */
    get tld() {
        return this.domain?.split('.').pop()
    }

    /**
     * @param {Email | null | undefined} other
     * @returns {boolean}
     */
    equals(other) {
        if (other === null || other === undefined) {
            return false
        }

        return this.value === other.value
    }

    /**
     * @param {unknown} value
     * @returns {boolean}
     */
    static isValid(value) {
        if (super.isValid(value) === false) return false

        return 'string' === typeof value && VALID_EMAIL_REGEX.test(value)
    }

    /**
     * @param {string} value
     * @returns {Email}
     */
    static from(value) {
        if (this.isValid(value) === false) throw new ValueError(value, this.name)

        return new this(value)
    }
}
