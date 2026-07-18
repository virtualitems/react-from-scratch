import { createElement, div } from '../shared/hyperscript.mjs'
import Document from '../shared/server/Document.mjs'
import Clicker from './Clicker.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function Page() {
  return createElement(
    Document,
    { title: 'dom-server' },
    div({ id: 'root' }, createElement(Clicker, { initialCount: 0 }))
  )
}
