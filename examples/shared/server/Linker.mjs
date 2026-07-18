import { Children, createElement, Fragment } from 'react'
import { preconnect, prefetchDNS, preinit, preinitModule, preload, preloadModule } from 'react-dom'

/**
 * @typedef {object} ResourcesCollection
 * @property {Array<{ href: string }>} [preconnectList]
 * @property {Array<{ href: string }>} [prefetchDNSList]
 * @property {Array<{ href: string, options: import('react-dom').PreinitOptions }>} [preinitList]
 * @property {Array<{ href: string, options: import('react-dom').PreinitModuleOptions }>} [preinitModuleList]
 * @property {Array<{ href: string, options: import('react-dom').PreloadOptions }>} [preloadList]
 * @property {Array<{ href: string, options: import('react-dom').PreloadModuleOptions }>} [preloadModuleList]
 */

/**
 * @typedef {import('react').PropsWithChildren<ResourcesCollection>} Props
 */

/**
 * @param {Props} props
 * @returns {import('react').ReactElement}
 */
export default function Linker(props) {
  const {
    children,
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

  return createElement(Fragment, null, children)
}
