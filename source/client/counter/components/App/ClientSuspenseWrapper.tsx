import { Suspense, type ReactElement } from 'react'

import App from './App.tsx'
import SuspenseFallback from './SuspenseFallback.tsx'

interface Props {
  initialCount?: number
}

export default function ClientSuspenseWrapper(props: Props): ReactElement {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <App {...props} />
    </Suspense>
  )
}
