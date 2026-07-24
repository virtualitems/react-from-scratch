import Document from '../shared/server/Document.mjs'
import { createElement, p } from '../shared/hyperscript.mjs'

import Greeting from './Greeting.mjs'

/**
 * @param {object} props
 * @param {Promise<string>} props.promise
 * @returns {import('react').ReactElement}
 */
export default function Page(props) {
  return createElement(
    Document,
    { title: 'dom-server' },
    createElement(
      Suspense,
      { fallback: p(null, 'Cargando usuario…') },
      createElement(Greeting, { promise: props.promise })
    )
  )
}
