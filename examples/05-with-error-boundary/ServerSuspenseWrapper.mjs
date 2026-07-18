import { Suspense, createElement } from '../shared/hyperscript.mjs'
import ErrorBoundary from '../shared/ErrorBoundary.mjs'
import ErrorFallback from './ErrorFallback.mjs'
import ServerFailingChunk from './ServerFailingChunk.mjs'
import SuspenseFallback from './SuspenseFallback.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function ServerSuspenseWrapper() {
  return createElement(
    ErrorBoundary,
    {
      fallback: ErrorFallback,
      onError: (error) => console.error('Error de hidratacion del chunk del servidor', error)
    },
    createElement(
      Suspense,
      { fallback: createElement(SuspenseFallback) },
      createElement(ServerFailingChunk)
    )
  )
}
