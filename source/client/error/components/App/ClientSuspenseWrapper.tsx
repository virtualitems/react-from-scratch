import { Suspense, type ReactElement } from 'react'

import ErrorBoundary from '../../../../shared/components/ErrorBoundary.tsx'
import App from './App.tsx'
import ErrorFallback from './ErrorFallback.tsx'
import SuspenseFallback from './SuspenseFallback.tsx'

export default function ClientSuspenseWrapper(): ReactElement {
  return (
    <ErrorBoundary
      fallback={ErrorFallback}
      onError={(error) => console.error('Error de hidratacion del chunk del cliente', error)}
    >
      <Suspense fallback={<SuspenseFallback />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  )
}
