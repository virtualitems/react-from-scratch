// src/main.jsx
import { useState } from 'react'

/**
 * @param {import('react').PropsWithChildren<{
 *  initialCount?: number
 * }>} props
 * @returns {import{'react'}.ReactElement}
 */
export default function Counter(props) {
  const { initialCount = 0 } = props

  const [count, setCount] = useState(initialCount)

  const onClick = () => {
    setCount((prev) => prev + 1)
  }

  return <button onClick={onClick}>Contador: {count}</button>
}
