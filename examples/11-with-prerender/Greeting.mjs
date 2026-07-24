import { use } from 'react'

import { h1 } from '../shared/hyperscript.mjs'

/**
 * @param {object} props
 * @param {Promise<string>} props.promise
 * @returns {import('react').ReactElement}
 */
export default function Greeting(props) {
  const name = use(props.promise)
  return h1(null, `Hola, ${name}`)
}
