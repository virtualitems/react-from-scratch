import { createElement } from 'react'
import { renderToReadableStream } from 'react-dom/server.edge'

import Linker from './components/Linker.tsx'

/**
 * @param {import('react').ReactElement} element
 * @param {object} sources
 * @param {Array<{ href: string }>} [sources.preconnectList]
 * @param {Array<{ href: string }>} [sources.prefetchDNSList]
 * @param {Array<{ href: string, options: import('react-dom').PreinitOptions }>} [sources.preinitList]
 * @param {Array<{ href: string, options: import('react-dom').PreinitModuleOptions }>} [sources.preinitModuleList]
 * @param {Array<{ href: string, options: import('react-dom').PreloadOptions }>} [sources.preloadList]
 * @param {Array<{ href: string, options: import('react-dom').PreloadModuleOptions }>} [sources.preloadModuleList]
 * @param {import('react-dom/server').RenderToReadableStreamOptions} options
 * @returns {Promise<ReadableStream>}
 */
export function renderElementToReadableStream(element, sources, options) {
  return renderToReadableStream(createElement(Linker, sources, element), options)
}
