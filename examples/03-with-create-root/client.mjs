import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

import Clicker from './Clicker.mjs'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('No se encontró el elemento #root')
}

createRoot(rootElement).render(createElement(Clicker, { initialCount: 0 }))
