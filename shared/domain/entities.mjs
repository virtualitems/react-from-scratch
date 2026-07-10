/**
 * Entity abstraction for identifiable domain concepts.
 * @abstract
 */
export class Entity {
    constructor() {
        if (new.target === Entity) {
            throw new TypeError('Entity is abstract and cannot be instantiated directly.')
        }
    }

    /**
     * @param {Entity} other
     * @returns {boolean}
     */
    equals(other) {
        throw new Error('Not implemented: Entity.equals')
    }

    /**
     * @returns {Record<string, unknown>}
     */
    toJSON() {
        throw new Error('Not implemented: Entity.toJSON')
    }
}
