import { h1, main, p } from '../shared/hyperscript.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function SuspenseFallback() {
  return main(null, h1(null, 'Error'), p(null, 'Esperando el chunk del servidor...'))
}
