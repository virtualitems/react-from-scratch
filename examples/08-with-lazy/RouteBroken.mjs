import { h2, p, section } from '../shared/hyperscript.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function RouteBroken() {
  if (typeof window === 'undefined') {
    throw new Error('Error durante el renderizado de esta ruta en el servidor.')
  }

  return section(null, h2(null, 'Ruta rota'), p(null, 'El cliente recuperó este segmento correctamente.'))
}
