import { hydrateRoot } from 'react-dom/client'

import { createElement } from '../shared/hyperscript.mjs'
import Clicker from './Clicker.mjs'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('No se encontró el elemento #root')
}

hydrateRoot(rootElement, createElement(Clicker, { initialCount: 0 }))
