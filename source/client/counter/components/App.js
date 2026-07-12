import { Suspense, createElement as ce, use, useState } from 'react'

/**
 * Suspends for 4 seconds before rendering App, simulating a slow data fetch.
 * This gives the SSR streaming pipeline something to demonstrate: the server
 * sends the fallback shell immediately, then streams the resolved content once
 * the delay settles. The promise is stable across re-renders because it is
 * initialized inside useState.
 *
 * Only used on the server — never passed to hydrateRoot.
 *
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
 * Shown by the Suspense boundary while the content is not yet ready.
 * Mirrors the structure of App so the layout does not shift when the real
 * content streams in.
 *
 * @returns {React.ReactElement}
 */
function SuspenseFallback() {
  return ce(
    'main',
    { className: 'counter' },
    ce('h1', { className: 'counter__title' }, 'Contador'),
    ce('p', { className: 'counter__value' }, 'Cargando contador...')
  )
}

/**
 * Used exclusively during SSR. Wraps App in a Suspense boundary with an
 * artificial delay (via DelayReason) to demonstrate server-side streaming:
 * the server flushes the fallback immediately, waits for the delay to resolve,
 * then streams the final content to the client.
 *
 * Must NOT be used with hydrateRoot — re-suspending on the client causes React
 * to stall hydration indefinitely, leaving event handlers unattached.
 *
 * @param {object} props
 * @param {undefined | number} props.initialCount
 * @returns {React.ReactElement}
 */
export function ServerSuspenseWrapper(props) {
  return ce(Suspense, { fallback: ce(SuspenseFallback) }, ce(DelayReason, props))
}

/**
 * Used exclusively on the client with hydrateRoot. Wraps App in a Suspense
 * boundary to match the server-rendered tree structure (which also had a
 * Suspense boundary), but renders App directly without any delay.
 *
 * Skipping the delay is required: if the client re-suspends a boundary that
 * was already resolved in the server HTML, React cannot reconcile the pending
 * promise with the existing DOM nodes and never completes hydration.
 *
 * @param {object} props
 * @param {undefined | number} props.initialCount
 * @returns {React.ReactElement}
 */
export function ClientSuspenseWrapper(props) {
  return ce(Suspense, { fallback: ce(SuspenseFallback) }, ce(App, props))
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
