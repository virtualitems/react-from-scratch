import { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { ClientSuspenseWrapper } from '../components/App.js'
import { identifierPrefixes } from '../../../shared/constants/react.mjs'

const rootElement = document.getElementById(identifierPrefixes.error)

if (rootElement === null) {
  throw new Error(`No se encontró el elemento #${identifierPrefixes.error}`)
}

hydrateRoot(rootElement, createElement(ClientSuspenseWrapper, { initialCount: 0 }), {
  identifierPrefix: identifierPrefixes.error,
  onRecoverableError: (error, { componentStack }) =>
    console.warn('onRecoverableError', error, componentStack),
  onCaughtError: (error, { componentStack }) =>
    console.warn('onCaughtError', error, componentStack),
  onUncaughtError: (error, { componentStack }) =>
    console.warn('onUncaughtError', error, componentStack)
})
