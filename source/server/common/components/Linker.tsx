import type { ReactElement, ReactNode } from 'react'
import {
  preconnect,
  prefetchDNS,
  preinit,
  preinitModule,
  preload,
  preloadModule,
  type PreinitModuleOptions,
  type PreinitOptions,
  type PreloadModuleOptions,
  type PreloadOptions
} from 'react-dom'

interface Props {
  preconnectList?: Array<{ href: string }>
  prefetchDNSList?: Array<{ href: string }>
  preinitList?: Array<{ href: string; options: PreinitOptions }>
  preinitModuleList?: Array<{ href: string; options: PreinitModuleOptions }>
  preloadList?: Array<{ href: string; options: PreloadOptions }>
  preloadModuleList?: Array<{ href: string; options: PreloadModuleOptions }>
  children?: ReactNode
}

export default function Linker(props: Props): ReactElement {
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

  return <>{props.children}</>
}
