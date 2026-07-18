import Document from '../shared/server/Document.mjs'
import { createElement, h1 } from '../shared/hyperscript.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function Page() {
  return createElement(Document, { title: 'dom-server' }, h1(null, 'Greetings!'))
}
