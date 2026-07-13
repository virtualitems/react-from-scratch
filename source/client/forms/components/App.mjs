import { Suspense, createElement as ce } from 'react'

/**
 * @returns {React.ReactElement}
 */
function App() {
  return ce(
    'main',
    { className: 'form-status' },
    ce('h1', { className: 'form-status__title' }, 'Form status'),
    ce('p', { className: 'form-status__text' }, 'Mensaje inicial de la nueva ruta')
  )
}

/**
 * @returns {React.ReactElement}
 */
function SuspenseFallback() {
  return ce(
    'main',
    { className: 'form-status' },
    ce('h1', { className: 'form-status__title' }, 'Form status'),
    ce('p', { className: 'form-status__text' }, 'Cargando estado inicial...')
  )
}

/**
 * @returns {React.ReactElement}
 */
export function ServerSuspenseWrapper() {
  return ce(Suspense, { fallback: ce(SuspenseFallback) }, ce(App))
}

/**
 * @returns {React.ReactElement}
 */
export function ClientSuspenseWrapper() {
  return ce(Suspense, { fallback: ce(SuspenseFallback) }, ce(App))
}
