import { p } from '../shared/hyperscript.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function SuspenseFallback() {
  return p(null, 'Cargando página...')
}
