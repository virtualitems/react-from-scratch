import { createElement, div, script } from '../shared/hyperscript.mjs'
import Document from '../shared/server/Document.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function Page() {
  const importMap =
    '{"imports":{"react":"https://esm.sh/react@19.2.7?dev","react-dom/client":"https://esm.sh/react-dom@19.2.7/client?dev"}}'

  return createElement(
    Document,
    {
      title: 'dom-server',
      headSlot: script({ type: 'importmap' }, importMap)
    },
    div({ id: 'root' }),
    script({ type: 'module', src: 'client.mjs' })
  )
}
