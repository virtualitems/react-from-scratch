import { createElement, Suspense } from '../shared/hyperscript.mjs'
import Clicker from './Clicker.mjs'
import SuspenseFallback from './SuspenseFallback.mjs'

/**
 * @typedef {object} Props
 * @property {number} [initialCount]
 */

/**
 * @param {Props} props
 * @returns {import('react').ReactElement}
 */
export default function ClientSuspenseWrapper(props) {
  return createElement(Suspense, { fallback: createElement(SuspenseFallback) }, createElement(Clicker, props))
}
