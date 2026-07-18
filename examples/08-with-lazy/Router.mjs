import { lazy, useState } from 'react'

import { button, createElement, div, Suspense } from '../shared/hyperscript.mjs'
import SuspenseFallback from './SuspenseFallback.mjs'

const routes = {
  ONE: { label: 'Página 1', Component: lazy(() => import('./RouteOne.mjs')) },
  TWO: { label: 'Página 2', Component: lazy(() => import('./RouteTwo.mjs')) },
  THREE: { label: 'Página 3', Component: lazy(() => import('./RouteThree.mjs')) }
}

/**
 * @typedef {object} Props
 * @property {string} [initialRoute]
 */

/**
 * Pagination driven by local state: navigation jumps straight to whichever
 * route was clicked (no prev/next stepping), and each route's component is
 * fetched on demand via React.lazy the first time it's shown.
 *
 * @param {Props} props
 * @returns {import('react').ReactElement}
 */
export default function Router(props) {
  const { initialRoute = 'ONE' } = props
  const [route, setRoute] = useState(initialRoute)
  const { Component: CurrentRoute } = routes[route]

  return div(
    null,
    createElement(Suspense, { fallback: createElement(SuspenseFallback) }, createElement(CurrentRoute)),
    div(
      null,
      Object.entries(routes).map(([key, { label }]) =>
        button({ key, onClick: () => setRoute(key), disabled: key === route }, label)
      )
    )
  )
}
