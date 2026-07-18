import { use, useState } from 'react'

/**
 * Suspends for a bit to mimic a slow server chunk, then throws so the
 * ErrorBoundary around it has to catch a failure that happens mid-stream.
 *
 * @returns {import('react').ReactElement}
 */
export default function ServerFailingChunk() {
  const [delay] = useState(() => new Promise((resolve) => setTimeout(resolve, 1200)))
  use(delay)

  throw new Error('Error durante el renderizado incremental del servidor.')
}
