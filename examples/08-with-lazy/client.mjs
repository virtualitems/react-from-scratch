import { hydrateRoot } from 'react-dom/client'

import { createElement } from '../shared/hyperscript.mjs'
import Router from './Router.mjs'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('No se encontró el elemento #root')
}

hydrateRoot(rootElement, createElement(Router), {
  onRecoverableError: (error, errorInfo) => console.warn('onRecoverableError', error, errorInfo),
  onCaughtError: (error, errorInfo) => console.warn('onCaughtError', error, errorInfo),
  onUncaughtError: (error, errorInfo) => console.warn('onUncaughtError', error, errorInfo)
})
