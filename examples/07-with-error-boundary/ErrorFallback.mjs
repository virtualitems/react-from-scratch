import { div, h1, main, p } from '../shared/hyperscript.mjs'

/**
 * @typedef {object} Props
 * @property {Error} error
 */

/**
 * @param {Props} props
 * @returns {import('react').ReactElement}
 */
export default function ErrorFallback(props) {
  const { error } = props

  return main(
    null,
    h1(null, 'Error'),
    p(null, error.message),
    div(null, 'La hidratacion incremental detecto que el servidor no pudo completar ese fragmento.')
  )
}
