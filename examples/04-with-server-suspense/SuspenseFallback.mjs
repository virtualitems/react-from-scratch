import { button } from '../shared/hyperscript.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function SuspenseFallback() {
  return button({ disabled: true }, 'Cargando...')
}
