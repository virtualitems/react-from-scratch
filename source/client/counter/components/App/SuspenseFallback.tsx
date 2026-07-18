import type { ReactElement } from 'react'

export default function SuspenseFallback(): ReactElement {
  return (
    <main className="counter">
      <h1 className="counter__title">Contador</h1>
      <p className="counter__value">Cargando contador...</p>
    </main>
  )
}
