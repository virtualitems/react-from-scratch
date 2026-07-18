import { h2, p, section } from '../shared/hyperscript.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function RouteOne() {
  return section(
    null,
    h2(null, 'Página 1'),
    p(null, 'Este fragmento se cargó de forma diferida con React.lazy.')
  )
}
