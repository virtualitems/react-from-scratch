import type { ReactElement } from 'react'

export default function App(): ReactElement {
  throw new Error('Error durante el renderizado incremental del cliente.')

  return (
    <main className="error error--recovered">
      <h1 className="error__title">Error</h1>
      <p className="error__value">El cliente recuperó el segmento correctamente.</p>
    </main>
  )
}
