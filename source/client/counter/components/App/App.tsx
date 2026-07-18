import { useState, type ReactElement } from 'react'

interface Props {
  initialCount?: number
}

export default function App(props: Props): ReactElement {
  const { initialCount = 0 } = props
  const [count, setCount] = useState(initialCount)

  return (
    <main className="counter">
      <h1 className="counter__title">Contador</h1>
      <p className="counter__value">Valor actual: {count}</p>
      <div className="counter__actions">
        <button
          type="button"
          className="counter__button"
          onClick={() => setCount((current) => current + 1)}
        >
          +1
        </button>
        <button
          type="button"
          className="counter__button"
          onClick={() => setCount((current) => current - 1)}
        >
          -1
        </button>
        <button
          type="button"
          className="counter__button counter__button--reset"
          onClick={() => setCount(initialCount)}
        >
          Reset
        </button>
      </div>
    </main>
  )
}
