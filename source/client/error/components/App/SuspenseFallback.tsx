import type { ReactElement } from 'react'

export default function SuspenseFallback(): ReactElement {
  return (
    <main className="error">
      <h1 className="error__title">Error</h1>
      <p className="error__value">Esperando el chunk del servidor...</p>
    </main>
  )
}
