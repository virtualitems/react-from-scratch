import { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from '../components/App.js'
import { identifierPrefixes } from '../../../shared/constants/react.mjs'

const rootElement = document.getElementById(identifierPrefixes.counter)

if (rootElement === null) {
  throw new Error(`No se encontró el elemento #${identifierPrefixes.counter}`)
}

hydrateRoot(rootElement, createElement(App), {
  identifierPrefix: identifierPrefixes.counter
})
