import { PassThrough, Readable } from 'node:stream'

export class StreamResponse extends Response {
  /** @type {PassThrough} */
  #writable

  /**
   * @param {ResponseInit} init
   */
  constructor(init) {
    const writable = new PassThrough()
    const readable = Readable.toWeb(writable)
    super(readable, init)

    this.#writable = writable
  }

  get writable() {
    return this.#writable
  }
}
