import { lazy, useState } from 'react'

import { button, createElement, div, Suspense } from '../shared/hyperscript.mjs'
import ErrorBoundary from '../shared/ErrorBoundary.mjs'
import ErrorFallback from './ErrorFallback.mjs'
import SuspenseFallback from './SuspenseFallback.mjs'

const routes = {
  ONE: { label: 'Página 1', Component: lazy(() => import('./RouteOne.mjs')) },
  TWO: { label: 'Página 2', Component: lazy(() => import('./RouteTwo.mjs')) },
  THREE: { label: 'Página 3', Component: lazy(() => import('./RouteThree.mjs')) },
  BROKEN: { label: 'Ruta rota', Component: lazy(() => import('./RouteBroken.mjs')) }
}

/**
 * @typedef {object} Props
 * @property {string} [initialRoute]
 */

/**
 * @param {Props} props
 * @returns {import('react').ReactElement}
 */
export default function Router(props) {
  const { initialRoute = 'ONE' } = props
  const [route, setRoute] = useState(initialRoute)
  const { Component: CurrentRoute } = routes[route]

  const contents = createElement(
    ErrorBoundary,
    {
      key: route,
      fallback: ErrorFallback,
      onError: (error) => console.error('Error de ruta', route, error)
    },
    createElement(Suspense, { fallback: createElement(SuspenseFallback) }, createElement(CurrentRoute))
  )

  const buttons = Object.entries(routes).map(([key, { label }]) =>
    button({ key, onClick: () => setRoute(key), disabled: key === route }, label)
  )

  return div(null, contents, div(null, buttons))
}
