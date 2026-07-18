import { html, head, body, meta, title } from '../hyperscript.mjs'

/**
 * @typedef {object} Props
 * @property {string} title
 * @property {string} [lang]
 * @property {import('react').ReactNode} [children]
 * @property {import('react').ReactNode} [headSlot]
 * @property {import('react').ReactNode} [bodySlot]
 */

/**
 * @param {Props} props
 * @returns {import('react').ReactElement}
 */
export default function Document(props) {
  const { title: documentTitle, lang, children, headSlot, bodySlot } = props
  const charSet = 'UTF-8'
  const viewport = 'width=device-width, initial-scale=1.0'

  return html(
    { lang },
    head(
      null,
      meta({ charSet }),
      meta({ name: 'viewport', content: viewport }),
      title(null, documentTitle),
      headSlot
    ),
    body(null, children, bodySlot)
  )
}
