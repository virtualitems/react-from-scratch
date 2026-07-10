import { createElement as ce } from 'react'
import { preconnect, preinit } from 'react-dom'

import { App } from '../client/App.js'
import { Document } from './Document.js'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.importMap
 * @param {undefined | number} props.initialCount
 * @returns {React.ReactElement}
 */
export function HomePage(props) {
  const { title, importMap, initialCount } = props

  preconnect('https://esm.sh')
  preinit('/static/global.css', { as: 'style' })
  preinit('/static/app.css', { as: 'style' })

  return ce(Document, { title, importMap }, ce('div', { id: 'root' }, ce(App, { initialCount })))
}
