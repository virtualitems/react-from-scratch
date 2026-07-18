import { Suspense, type ReactElement } from 'react'

import DelayReason from './DelayReason.tsx'
import SuspenseFallback from './SuspenseFallback.tsx'

interface Props {
  initialCount?: number
}

export default function ServerSuspenseWrapper(props: Props): ReactElement {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <DelayReason {...props} />
    </Suspense>
  )
}
