/**
 * Base domain event with timestamp and optional details payload.
 * @abstract
 * @template {Record<string, unknown>} [D=Record<string, unknown>]
 */
export class Event {
    /**
     * @param {number} [timestamp=Date.now()]
     * @param {D} [details={}]
     */
    constructor(timestamp = Date.now(), details = {}) {
        if (new.target === Event) {
            throw new TypeError('Event is abstract and cannot be instantiated directly.')
        }

        this.timestamp = timestamp
        this.details = details
    }
}

/**
 * Event handler contract used by dispatchers to process events.
 * @abstract
 * @template {Event} [E=Event]
 */
export class EventHandler {
    constructor() {
        if (new.target === EventHandler) {
            throw new TypeError('EventHandler is abstract and cannot be instantiated directly.')
        }
    }

    /**
     * @param {E} event
     * @returns {Promise<void>}
     */
    async handle(event) {
        throw new Error('Not implemented: EventHandler.handle')
    }
}

/**
 * Dispatcher contract to subscribe, unsubscribe and emit events.
 * @abstract
 * @template {Event} [E=Event]
 * @template {EventHandler<E>} [H=EventHandler<E>]
 */
export class EventDispatcher {
    constructor() {
        if (new.target === EventDispatcher) {
            throw new TypeError('EventDispatcher is abstract and cannot be instantiated directly.')
        }
    }

    /**
     * @param {unknown} key
     * @param {H} handler
     * @returns {void}
     */
    subscribe(key, handler) {
        throw new Error('Not implemented: EventDispatcher.subscribe')
    }

    /**
     * @param {unknown} key
     * @param {H} handler
     * @returns {void}
     */
    unsubscribe(key, handler) {
        throw new Error('Not implemented: EventDispatcher.unsubscribe')
    }

    /**
     * @param {E} event
     * @returns {void}
     */
    dispatch(event) {
        throw new Error('Not implemented: EventDispatcher.dispatch')
    }
}