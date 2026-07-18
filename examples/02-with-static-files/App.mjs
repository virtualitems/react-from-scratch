import { createElement, h1 } from '../shared/hyperscript.mjs'
import Document from '../shared/server/Document.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function App() {
  return createElement(Document, { title: 'dom-server' }, h1(null, 'Greetings!'))
}
