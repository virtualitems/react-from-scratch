import { h1, main, p } from '../shared/hyperscript.mjs'

/**
 * The app's actual content. Unlike ServerFailingChunk, this never throws —
 * only the server-rendered chunk fails, so once the client takes over the
 * ErrorBoundary around it has nothing left to catch.
 *
 * @returns {import('react').ReactElement}
 */
export default function Content() {
  return main(null, h1(null, 'Error'), p(null, 'El cliente recuperó el segmento correctamente.'))
}
