import { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from './App.js'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('No se encontró el elemento #root')
}

hydrateRoot(rootElement, createElement(App))
