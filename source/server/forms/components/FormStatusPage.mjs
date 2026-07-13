import { createElement as ce } from 'react'

import App from '../../../client/forms/components/App.mjs'
import Document from '../../common/components/Document.mjs'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.identifierPrefix
 * @returns {React.ReactElement}
 */
export default function FormStatusPage(props) {
  const { title, identifierPrefix } = props

  if (typeof title !== 'string') throw new TypeError('title must be a string')

  if (typeof identifierPrefix !== 'string') throw new TypeError('identifierPrefix must be a string')

  return ce(Document, { title }, ce('div', { id: identifierPrefix }, ce(App)))
}
