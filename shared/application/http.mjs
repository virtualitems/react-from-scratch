/**
 * Standard HTTP response envelope for API responses.
 */
export class HttpResponseBody {
    /**
     * @param {Record<string, unknown> | null} [data=null]
     * @param {Array<string> | null} [errors=null]
     * @param {Record<string, URL> | null} [links=null]
     */
    constructor(data = null, errors = null, links = null) {
        this.data = data
        this.errors = errors
        this.links = links
    }
}
