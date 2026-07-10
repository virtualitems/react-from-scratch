import { createElement as ce } from 'react'

/**
 * Builds the full HTML document wrapper used by the server renderer.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {undefined | string} props.lang
 * @param {undefined | string} props.linkedDataScript
 * @param {undefined | string} props.importMap
 * @param {undefined | React.ReactNode} props.children
 * @returns {React.ReactElement}
 */
export function Document(props) {
  const { title, lang, linkedDataScript, importMap, children } = props
  const charSet = 'UTF-8'
  const viewport = 'width=device-width, initial-scale=1.0'

  return ce(
    'html',
    { lang },
    ce(
      'head',
      null,
      ce('meta', { charSet }),
      ce('meta', { name: 'viewport', content: viewport }),
      ce('title', null, title),
      ce('script', { type: 'importmap' }, importMap),
      ce('script', { type: 'application/ld+json' }, linkedDataScript)
    ),
    ce('body', null, children)
  )
}
