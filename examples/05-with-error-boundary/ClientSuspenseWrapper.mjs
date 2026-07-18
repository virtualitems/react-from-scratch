import { createElement } from 'react'

import { Suspense } from '../shared/hyperscript.mjs'
import Content from './Content.mjs'
import ErrorBoundary from '../shared/ErrorBoundary.mjs'
import ErrorFallback from './ErrorFallback.mjs'
import SuspenseFallback from './SuspenseFallback.mjs'

/**
 * @returns {import('react').ReactElement}
 */
export default function ClientSuspenseWrapper() {
  return createElement(
    ErrorBoundary,
    {
      fallback: ErrorFallback,
      onError: (error) => console.error('Error de hidratacion del chunk del cliente', error)
    },
    createElement(Suspense, { fallback: createElement(SuspenseFallback) }, createElement(Content))
  )
}
