/**
 * Base service abstraction for application use-cases.
 * @abstract
 */
export class Service {
	constructor() {
		if (new.target === Service) {
			throw new TypeError('Service is abstract and cannot be instantiated directly.')
		}
	}
}
