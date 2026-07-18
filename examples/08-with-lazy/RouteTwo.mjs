import { h2, p, section } from '../shared/hyperscript.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function RouteTwo() {
  return section(
    null,
    h2(null, 'Página 2'),
    p(null, 'Cada ruta vive en su propio chunk, pedido solo cuando se navega hacia ella.')
  )
}
