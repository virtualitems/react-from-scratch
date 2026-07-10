import { createElement as ce } from 'react'

import { App } from '../../../client/counter/components/App.js'
import { Document } from '../../common/components/Document.mjs'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.identifierPrefix
 * @param {undefined | number} props.initialCount
 * @returns {React.ReactElement}
 */
export function CounterPage(props) {
  const { title, initialCount, identifierPrefix } = props

  if (typeof title !== 'string') throw new TypeError('title must be a string')

  if (typeof identifierPrefix !== 'string') throw new TypeError('identifierPrefix must be a string')

  return ce(Document, { title }, ce('div', { id: identifierPrefix }, ce(App, { initialCount })))
}
