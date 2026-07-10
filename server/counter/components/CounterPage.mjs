import { createElement as ce } from 'react'

import { App } from '../../../client/counter/components/App.js'
import { Document } from '../../common/components/Document.mjs'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {undefined | number} props.initialCount
 * @returns {React.ReactElement}
 */
export function CounterPage(props) {
  const { title, initialCount } = props

  return ce(Document, { title }, ce('div', { id: 'root' }, ce(App, { initialCount })))
}
