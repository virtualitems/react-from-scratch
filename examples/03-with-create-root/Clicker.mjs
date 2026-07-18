import { createElement, useState } from 'react'

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

  return createElement('button', { onClick }, `Clicked ${count} times`)
}
