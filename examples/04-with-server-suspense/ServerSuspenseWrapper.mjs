import { createElement } from 'react'

import { Suspense } from '../shared/hyperscript.mjs'
import DelayReason from './DelayReason.mjs'
import SuspenseFallback from './SuspenseFallback.mjs'

/**
 * @typedef {object} Props
 * @property {number} [initialCount]
 */

/**
 * @param {Props} props
 * @returns {import('react').ReactElement}
 */
export default function ServerSuspenseWrapper(props) {
  return createElement(Suspense, { fallback: createElement(SuspenseFallback) }, createElement(DelayReason, props))
}
