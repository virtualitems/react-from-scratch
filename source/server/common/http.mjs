import { createElement } from 'react'
import { renderToPipeableStream } from 'react-dom/server'

import { PassThrough, Readable } from 'node:stream'

import Linker from './components/linker.mjs'

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

/**
 * @param {import('react').ReactElement} element
 * @param {object} sources
 * @param {Array<{ href: string }>} [sources.preconnectList]
 * @param {Array<{ href: string }>} [sources.prefetchDNSList]
 * @param {Array<{ href: string, options: import('react-dom').PreinitOptions }>} [sources.preinitList]
 * @param {Array<{ href: string, options: import('react-dom').PreinitModuleOptions }>} [sources.preinitModuleList]
 * @param {Array<{ href: string, options: import('react-dom').PreloadOptions }>} [sources.preloadList]
 * @param {Array<{ href: string, options: import('react-dom').PreloadModuleOptions }>} [sources.preloadModuleList]
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} options
 */
export function renderElementToPipeableStream(element, sources, options) {
  return renderToPipeableStream(createElement(Linker, sources, element), options)
}
