import { useState } from 'react'

import { button } from '../shared/hyperscript.mjs'

/**
 * @typedef {object} Props
 * @property {number} [initialCount]
 */

/**
 * @param {Props} props
 * @returns {import('react').ReactElement}
 */
export default function Clicker(props) {
  const { initialCount = 0 } = props
  const [count, setCount] = useState(initialCount)

  const onClick = setCount.bind(null, (prev) => prev + 1)

  return button({ onClick }, `Clicked ${count} times`)
}
