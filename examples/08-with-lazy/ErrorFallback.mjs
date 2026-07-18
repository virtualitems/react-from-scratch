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
    div(null, 'El límite de errores detectó que este fragmento no se pudo renderizar.')
  )
}
