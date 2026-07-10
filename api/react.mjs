import React, { createElement } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { preconnect, prefetchDNS, preinit, preinitModule, preload, preloadModule } from 'react-dom'

import { CounterPage } from '../server/counter/components/CounterPage.mjs'
import { StreamResponse } from '../server/common/http.mjs'

const importMap = {
  imports: {
    react: 'https://esm.sh/react@19.2.7',
    'react-dom/client': 'https://esm.sh/react-dom@19.2.7/client'
  }
}

/**
 * @param {object} props
 * @param {Array<{ href: string }>} [props.preconnectList]
 * @param {Array<{ href: string }>} [props.prefetchDNSList]
 * @param {Array<{ href: string, options: import('react-dom').PreinitOptions }>} [props.preinitList]
 * @param {Array<{ href: string, options: import('react-dom').PreinitModuleOptions }>} [props.preinitModuleList]
 * @param {Array<{ href: string, options: import('react-dom').PreloadOptions }>} [props.preloadList]
 * @param {Array<{ href: string, options: import('react-dom').PreloadModuleOptions }>} [props.preloadModuleList]
 * @param {import('react').ReactNode} [props.children]
 */
function Linker(props) {
  const {
    preconnectList,
    prefetchDNSList,
    preinitList,
    preinitModuleList,
    preloadList,
    preloadModuleList
  } = props

  const isArrayPreconnect = Array.isArray(preconnectList)
  const isArrayPrefetchDNS = Array.isArray(prefetchDNSList)
  const isArrayPreinit = Array.isArray(preinitList)
  const isArrayPreinitModule = Array.isArray(preinitModuleList)
  const isArrayPreload = Array.isArray(preloadList)
  const isArrayPreloadModule = Array.isArray(preloadModuleList)

  if (preconnectList !== undefined && isArrayPreconnect === false)
    throw new TypeError('preconnectList must be an array of { href } objects')

  if (prefetchDNSList !== undefined && isArrayPrefetchDNS === false)
    throw new TypeError('prefetchDNSList must be an array of { href } objects')

  if (preinitList !== undefined && isArrayPreinit === false)
    throw new TypeError('preinitList must be an array of { href, options } objects')

  if (preinitModuleList !== undefined && isArrayPreinitModule === false)
    throw new TypeError('preinitModuleList must be an array of { href, options } objects')

  if (preloadList !== undefined && isArrayPreload === false)
    throw new TypeError('preloadList must be an array of { href, options } objects')

  if (preloadModuleList !== undefined && isArrayPreloadModule === false)
    throw new TypeError('preloadModuleList must be an array of { href, options } objects')

  if (isArrayPreconnect) {
    for (const resource of preconnectList) preconnect(resource.href)
  }

  if (isArrayPrefetchDNS) {
    for (const resource of prefetchDNSList) prefetchDNS(resource.href)
  }

  if (isArrayPreinit) {
    for (const resource of preinitList) preinit(resource.href, resource.options)
  }

  if (isArrayPreinitModule) {
    for (const resource of preinitModuleList) preinitModule(resource.href, resource.options)
  }

  if (isArrayPreload) {
    for (const resource of preloadList) preload(resource.href, resource.options)
  }

  if (isArrayPreloadModule) {
    for (const resource of preloadModuleList) preloadModule(resource.href, resource.options)
  }

  return React.createElement(React.Fragment, null, props.children)
}

/**
 * @param {import('react').ReactElement} element
 * @param {object} props
 * @param {Array<{ href: string }>} [props.preconnectList]
 * @param {Array<{ href: string }>} [props.prefetchDNSList]
 * @param {Array<{ href: string, options: import('react-dom').PreinitOptions }>} [props.preinitList]
 * @param {Array<{ href: string, options: import('react-dom').PreinitModuleOptions }>} [props.preinitModuleList]
 * @param {Array<{ href: string, options: import('react-dom').PreloadOptions }>} [props.preloadList]
 * @param {Array<{ href: string, options: import('react-dom').PreloadModuleOptions }>} [props.preloadModuleList]
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} options
 */
function reactRenderToPipeableStream(element, props, options) {
  return renderToPipeableStream(createElement(Linker, props, element), options)
}

/**
 * @param {Request} request
 * @returns {Response}
 */
export async function GET() {
  const element = createElement(CounterPage, {
    title: 'dom-server',
    importMap,
    initialCount: 0
  })

  const linkerProps = {
    preconnectList: [{ href: 'https://esm.sh' }],
    preinitList: [
      { href: '/static/global.css', options: { as: 'style' } },
      { href: '/static/counter/styles/app.css', options: { as: 'style' } }
    ]
  }

  const promise = new Promise((resolve, reject) => {
    const { pipe } = reactRenderToPipeableStream(element, linkerProps, {
      bootstrapModules: ['/static/counter/scripts/client.js'],
      importMap,
      onShellReady() {
        const response = new StreamResponse({
          status: 200,
          headers: { 'Content-Type': 'text/html' }
        })
        pipe(response.writable)
        resolve(response)
      },
      onShellError(error) {
        console.error(error)
        reject(new Response(error.message, { status: 500 }))
      },
      onAllReady() {
        console.log('onAllReady')
      },
      onError(error) {
        console.log('onError', error)
      },
      onHeaders() {
        console.log('onHeaders')
      }
    })
  })

  return await promise
}
