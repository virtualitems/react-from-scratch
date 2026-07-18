import { Suspense, type ReactElement } from 'react'

import ErrorBoundary from '../../../../shared/components/ErrorBoundary.tsx'
import ErrorFallback from './ErrorFallback.tsx'
import ServerFailingChunk from './ServerFailingChunk.tsx'
import SuspenseFallback from './SuspenseFallback.tsx'

export default function ServerSuspenseWrapper(): ReactElement {
  return (
    <ErrorBoundary
      fallback={ErrorFallback}
      onError={(error) => console.error('Error de hidratacion del chunk del servidor', error)}
    >
      <Suspense fallback={<SuspenseFallback />}>
        <ServerFailingChunk />
      </Suspense>
    </ErrorBoundary>
  )
}
