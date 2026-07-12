import { Suspense, createElement as ce, use, useState } from 'react'

/**
 * @param {object} props
 * @param {undefined | number} props.initialCount
 * @returns {React.ReactElement}
 */
function DelayReason(props) {
  const [delay] = useState(() => new Promise((resolve) => setTimeout(resolve, 4000)))
  use(delay)
  return ce(App, props)
}

/**
 * @param {object} props
 * @param {undefined | number} props.initialCount
 * @returns {React.ReactElement}
 */
export function SuspenseWrapper(props) {
  return ce(
    Suspense,
    {
      fallback: ce(
        'main',
        { className: 'counter' },
        ce('h1', { className: 'counter__title' }, 'Contador'),
        ce('p', { className: 'counter__value' }, 'Cargando contador...')
      )
    },
    ce(DelayReason, props)
  )
}

/**
 *
 * @param {object} props
 * @param {undefined | number} props.initialCount
 * @returns {React.ReactElement}
 */
export function App(props) {
  const { initialCount = 0 } = props
  const [count, setCount] = useState(initialCount)

  return ce(
    'main',
    { className: 'counter' },
    ce('h1', { className: 'counter__title' }, 'Contador'),
    ce('p', { className: 'counter__value' }, `Valor actual: ${count}`),
    ce(
      'div',
      { className: 'counter__actions' },
      ce(
        'button',
        {
          type: 'button',
          className: 'counter__button',
          onClick: () => setCount((current) => current + 1)
        },
        '+1'
      ),
      ce(
        'button',
        {
          type: 'button',
          className: 'counter__button',
          onClick: () => setCount((current) => current - 1)
        },
        '-1'
      ),
      ce(
        'button',
        {
          type: 'button',
          className: 'counter__button counter__button--reset',
          onClick: () => setCount(initialCount)
        },
        'Reset'
      )
    )
  )
}
