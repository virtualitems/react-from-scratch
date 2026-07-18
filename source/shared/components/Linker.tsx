import type { PropsWithChildren, ReactElement } from 'react'
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

interface ResourcesCollection {
  preconnectList?: Array<{ href: string }>
  prefetchDNSList?: Array<{ href: string }>
  preinitList?: Array<{ href: string; options: PreinitOptions }>
  preinitModuleList?: Array<{ href: string; options: PreinitModuleOptions }>
  preloadList?: Array<{ href: string; options: PreloadOptions }>
  preloadModuleList?: Array<{ href: string; options: PreloadModuleOptions }>
}

type Props = PropsWithChildren<ResourcesCollection>

export default function Linker(props: Props): ReactElement {
  const {
    children,
    preconnectList = [],
    prefetchDNSList = [],
    preinitList = [],
    preinitModuleList = [],
    preloadList = [],
    preloadModuleList = []
  } = props

  for (const resource of preconnectList) preconnect(resource.href)
  for (const resource of prefetchDNSList) prefetchDNS(resource.href)
  for (const resource of preinitList) preinit(resource.href, resource.options)
  for (const resource of preinitModuleList) preinitModule(resource.href, resource.options)
  for (const resource of preloadList) preload(resource.href, resource.options)
  for (const resource of preloadModuleList) preloadModule(resource.href, resource.options)

  return <>{children}</>
}
