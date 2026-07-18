import { createElement, use, useState } from 'react'

import Clicker from './Clicker.mjs'

/**
 * @typedef {object} Props
 * @property {number} [initialCount]
 */

/**
 * Suspends the render for a bit so the Suspense boundary around it has time
 * to flush its fallback before the real markup streams in behind it.
 *
 * @param {Props} props
 * @returns {import('react').ReactElement}
 */
export default function DelayReason(props) {
  const [delay] = useState(() => new Promise((resolve) => setTimeout(resolve, 1200)))
  use(delay)
  return createElement(Clicker, props)
}
