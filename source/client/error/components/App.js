import { Suspense, createElement as ce, use, useState } from 'react'

import { ErrorBoundary } from '../../../shared/components/ErrorBoundary.mjs'

/**
 * The final content shown when the client successfully retries the failed
 * server segment.
 *
 * @returns {React.ReactElement}
 */
function App() {
  return ce(
    'main',
    { className: 'error error--recovered' },
    ce('h1', { className: 'error__title' }, 'Error'),
    ce('p', { className: 'error__value' }, 'El cliente recuperó el segmento correctamente.')
  )
}

/**
 * Used exclusively during SSR. Suspends on the provided promise, then throws
 * to simulate an incremental segment that could not be completed on the server.
 * Never rendered on the client.
 *
 * @returns {React.ReactElement}
 */
function ServerFailingChunk() {
  const [incrementalPromise] = useState(
    () => new Promise((resolve) => setTimeout(resolve, 1200))
  )

  use(incrementalPromise)

  throw new Error('Error durante el renderizado incremental del servidor.')
}

/**
 * Shown by the Suspense boundary while the content is not yet ready.
 * Mirrors the structure of App so the layout does not shift when the real
 * content streams in.
 *
 * @returns {React.ReactElement}
 */
function SuspenseFallback() {
  return ce(
    'main',
    { className: 'error' },
    ce('h1', { className: 'error__title' }, 'Error'),
    ce('p', { className: 'error__value' }, 'Esperando el chunk del servidor...')
  )
}

function ErrorFallback(props) {
  const { error } = props

  return ce(
    'main',
    { className: 'error error--failed' },
    ce('h1', { className: 'error__title' }, 'Error'),
    ce('p', { className: 'error__value' }, error.message),
    ce('div', { className: 'error__panel' }, 'La hidratacion incremental detecto que el servidor no pudo completar ese fragmento.')
  )
}

/**
 * Used exclusively during SSR. Wraps ServerFailingChunk in a Suspense boundary
 * to flush the fallback shell while the incremental promise is pending, then
 * lets React abandon the segment when the chunk throws.
 *
 * Must NOT be used with hydrateRoot.
 *
 * @returns {React.ReactElement}
 */
export function ServerSuspenseWrapper() {
  return ce(
    ErrorBoundary,
    {
      fallback: ErrorFallback,
      onError(error) {
        console.error('Chunk hydration error', error)
      }
    },
    ce(Suspense, { fallback: ce(SuspenseFallback) }, ce(ServerFailingChunk))
  )
}

/**
 * Used exclusively on the client with hydrateRoot. Renders App directly so
 * React replaces the Suspense fallback without re-suspending.
 *
 * @returns {React.ReactElement}
 */
export function ClientSuspenseWrapper() {
  return ce(
    ErrorBoundary,
    {
      fallback: ErrorFallback,
      onError(error) {
        console.error('Chunk hydration error', error)
      }
    },
    ce(Suspense, { fallback: ce(SuspenseFallback) }, ce(App))
  )
}
