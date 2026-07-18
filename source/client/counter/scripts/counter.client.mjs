import { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'
import ClientSuspenseWrapper from '../components/App/ClientSuspenseWrapper.tsx'
import { identifierPrefixes } from '../../../shared/constants/react.mjs'

const rootElement = document.getElementById(identifierPrefixes.counter)

if (rootElement === null) {
  throw new Error(`No se encontró el elemento #${identifierPrefixes.counter}`)
}

hydrateRoot(rootElement, createElement(ClientSuspenseWrapper, { initialCount: 0 }), {
  identifierPrefix: identifierPrefixes.counter
})
