import { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'

import ClientSuspenseWrapper from './ClientSuspenseWrapper.mjs'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('No se encontró el elemento #root')
}

hydrateRoot(rootElement, createElement(ClientSuspenseWrapper, { initialCount: 0 }))
