import { h2, p, section } from '../shared/hyperscript.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function RouteThree() {
  return section(null, h2(null, 'Página 3'), p(null, 'Última ruta del ejemplo.'))
}
