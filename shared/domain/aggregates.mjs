/**
 * Aggregate root abstraction for domain logic spanning multiple entities.
 * @abstract
 */
export class Aggregate {
	constructor() {
		if (new.target === Aggregate) {
			throw new TypeError('Aggregate is abstract and cannot be instantiated directly.')
		}
	}
}
