import type { ReactElement } from 'react'

interface Props {
  error: Error
}

export default function ErrorFallback(props: Props): ReactElement {
  const { error } = props

  return (
    <main className="error error--failed">
      <h1 className="error__title">Error</h1>
      <p className="error__value">{error.message}</p>
      <div className="error__panel">
        La hidratacion incremental detecto que el servidor no pudo completar ese fragmento.
      </div>
    </main>
  )
}
