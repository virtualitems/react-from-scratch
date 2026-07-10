/**
 * @typedef {Record<string, unknown>} GenericRecord
 */

/**
 * Contract for objects that can filter records using a selector.
 * @template [S=GenericRecord]
 * @typedef {object} Filterable
 * @property {(selector: S) => Promise<Array<S>>} filter
 */

/**
 * Contract for objects that can sort records using a selector.
 * @template [S=GenericRecord]
 * @typedef {object} Sortable
 * @property {(selector: S) => Promise<Array<S>>} sort
 */

/**
 * Contract for objects that can create a record.
 * @template [D=GenericRecord]
 * @typedef {object} Creatable
 * @property {(data: D) => Promise<unknown>} create
 */

/**
 * Contract for objects that can update records.
 * @template [S=GenericRecord]
 * @template [D=GenericRecord]
 * @typedef {object} Updatable
 * @property {(selector: S, data: D) => Promise<unknown>} update
 */

/**
 * Contract for objects that can delete records.
 * @template [S=GenericRecord]
 * @typedef {object} Deletable
 * @property {(selector: S) => Promise<unknown>} delete
 */

/**
 * Contract for objects that can aggregate records.
 * @template [S=GenericRecord]
 * @typedef {object} Aggregatable
 * @property {(selector: S) => Promise<S>} aggregate
 */

/**
 * Contract for objects that can resolve related data.
 * @typedef {object} Relatable
 * @property {(...args: Array<unknown>) => unknown} selectRelated
 * @property {(...args: Array<unknown>) => unknown} prefetchRelated
 */

/**
 * Base manager for in-memory or remote data collections.
 * @abstract
 * @template [T=GenericRecord]
 */
export class DataManager {
    constructor() {
        if (new.target === DataManager) {
            throw new TypeError('DataManager is abstract and cannot be instantiated directly.')
        }
    }

    /**
     * @returns {Promise<Array<T>>}
     */
    async all() {
        throw new Error('Not implemented: DataManager.all')
    }

    /**
     * @returns {Array<T>}
     */
    none() {
        throw new Error('Not implemented: DataManager.none')
    }
}

/**
 * Set-oriented manager with operations over datasets.
 * @abstract
 * @template [T=GenericRecord]
 * @extends {DataManager<T>}
 */
export class DatasetManager extends DataManager {
    constructor() {
        super()

        if (new.target === DatasetManager) {
            throw new TypeError('DatasetManager is abstract and cannot be instantiated directly.')
        }
    }

    /**
     * @param {Array<T>} other
     * @returns {Promise<Array<T>>}
     */
    async union(other) {
        throw new Error('Not implemented: DatasetManager.union')
    }

    /**
     * @param {Array<T>} other
     * @returns {Promise<Array<T>>}
     */
    async intersection(other) {
        throw new Error('Not implemented: DatasetManager.intersection')
    }

    /**
     * @param {Array<T>} other
     * @returns {Promise<Array<T>>}
     */
    async difference(other) {
        throw new Error('Not implemented: DatasetManager.difference')
    }

    /**
     * @param {Array<T>} other
     * @returns {Promise<Array<T>>}
     */
    async symmetric_difference(other) {
        throw new Error('Not implemented: DatasetManager.symmetric_difference')
    }

    /**
     * @param {Array<T>} other
     * @returns {Promise<Array<T>>}
     */
    async complement(other) {
        throw new Error('Not implemented: DatasetManager.complement')
    }
}

/**
 * Driver abstraction that opens and closes a data connection.
 * @abstract
 * @template {DataManager} [M=DataManager]
 */
export class DriverManager {
    constructor() {
        if (new.target === DriverManager) {
            throw new TypeError('DriverManager is abstract and cannot be instantiated directly.')
        }
    }

    /**
     * @param {...unknown} args
     * @returns {Promise<M>}
     */
    async connect(...args) {
        throw new Error('Not implemented: DriverManager.connect')
    }

    /**
     * @returns {Promise<unknown>}
     */
    async disconnect() {
        throw new Error('Not implemented: DriverManager.disconnect')
    }
}

/**
 * Base repository that delegates low-level operations to a driver manager.
 * @abstract
 * @template {DriverManager} [M=DriverManager]
 */
export class Repository {
    /**
     * @param {M} manager
     */
    constructor(manager) {
        if (new.target === Repository) {
            throw new TypeError('Repository is abstract and cannot be instantiated directly.')
        }

        this.manager = manager
    }

    /**
     * @template [T=GenericRecord]
     * @param {GenericRecord} data
     * @returns {T}
     */
    transform(data) {
        throw new Error('Not implemented: Repository.transform')
    }
}