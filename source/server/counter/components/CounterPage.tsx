import type { ReactElement } from 'react'

import ServerSuspenseWrapper from '../../../client/counter/components/App/ServerSuspenseWrapper.tsx'
import Document from '../../common/components/Document.tsx'

interface Props {
  title: string
  identifierPrefix: string
  initialCount?: number
}

export default function CounterPage(props: Props): ReactElement {
  const { title, identifierPrefix } = props

  if (typeof title !== 'string') throw new TypeError('title must be a string')

  if (typeof identifierPrefix !== 'string') throw new TypeError('identifierPrefix must be a string')

  return (
    <Document title={title}>
      <div id={identifierPrefix}>
        <ServerSuspenseWrapper initialCount={0} />
      </div>
    </Document>
  )
}
