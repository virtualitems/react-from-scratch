import type { ReactElement } from 'react'

import App from '../../../client/forms/components/App.tsx'
import Document from '../../common/components/Document.tsx'

interface Props {
  title: string
  identifierPrefix: string
}

export default function FormStatusPage(props: Props): ReactElement {
  const { title, identifierPrefix } = props

  if (typeof title !== 'string') throw new TypeError('title must be a string')

  if (typeof identifierPrefix !== 'string') throw new TypeError('identifierPrefix must be a string')

  return (
    <Document title={title}>
      <div id={identifierPrefix}>
        <App />
      </div>
    </Document>
  )
}
