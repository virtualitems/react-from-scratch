import { use, useState, type ReactElement } from 'react'

import App from './App.tsx'

interface Props {
  initialCount?: number
}

export default function DelayReason(props: Props): ReactElement {
  const [delay] = useState(() => new Promise((resolve) => setTimeout(resolve, 1200)))
  use(delay)
  return <App {...props} />
}
