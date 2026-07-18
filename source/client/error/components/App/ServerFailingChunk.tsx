import { use, useState, type ReactElement } from 'react'

import App from './App.tsx'

export default function ServerFailingChunk(): ReactElement {
  const [delay] = useState(() => new Promise((resolve) => setTimeout(resolve, 1200)))
  use(delay)

  throw new Error('Error durante el renderizado incremental del servidor.')

  return <App />
}
