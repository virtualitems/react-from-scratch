import { createElement as ce, useActionState } from 'react'
import { useFormStatus } from 'react-dom'

const initialState = Object.freeze({
  mensaje: 'Aun no envias nada',
  nombre: null,
  envios: 0
})

/**
 * @param {object} previousState
 * @param {string} previousState.mensaje
 * @param {null | string} previousState.nombre
 * @param {number} previousState.envios
 * @param {FormData} formData
 * @returns {Promise<{ mensaje: string, nombre: null | string, envios: number }>}
 */
async function saveName(previousState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 4000))

  const name = String(formData.get('nombre') ?? '').trim()

  if (name.length === 0) {
    return {
      ...previousState,
      mensaje: 'Escribe un nombre antes de enviar'
    }
  }

  return {
    mensaje: `Nombre recibido: ${name}`,
    nombre: name,
    envios: previousState.envios + 1
  }
}

/**
 * @returns {React.ReactElement}
 */
function FormControls() {
  const { pending, data, method, action } = useFormStatus()

  const submittedName = data?.get('nombre') ?? 'ninguno'

  return ce(
    'section',
    { className: 'form-status__panel form-status__panel--controls' },
    ce('h2', { className: 'form-status__panel-title' }, 'useFormStatus'),
    ce(
      'div',
      { className: 'form-status__meta-list' },
      ce('p', { className: 'form-status__meta' }, `pending: ${String(pending)}`),
      ce('p', { className: 'form-status__meta' }, `data.nombre: ${String(submittedName)}`),
      ce('p', { className: 'form-status__meta' }, `method: ${method ?? 'ninguno'}`),
      ce(
        'p',
        { className: 'form-status__meta' },
        `action: ${typeof action === 'function' ? 'funcion del formulario' : String(action)}`
      )
    )
  )
}

/**
 * @returns {React.ReactElement}
 */
function SubmitButton() {
  const { pending } = useFormStatus()

  return ce(
    'div',
    { className: 'form-status__submit' },
    ce(
      'button',
      {
        type: 'submit',
        disabled: pending
      },
      pending ? 'Enviando...' : 'Enviar formulario'
    )
  )
}

/**
 * @returns {React.ReactElement}
 */
export default function App() {
  const [state, formAction, isPending] = useActionState(saveName, initialState)

  return ce(
    'main',
    { className: 'form-status' },
    ce(
      'section',
      { className: 'form-status__card' },
      ce(
        'header',
        { className: 'form-status__header' },
        ce('h1', { className: 'form-status__title' }, 'Hooks de formulario')
      ),
      ce(
        'form',
        { className: 'form-status__form', action: formAction },
        ce(
          'div',
          { className: 'form-status__field' },
          ce('label', { className: 'form-status__label', htmlFor: 'nombre' }, 'Nombre'),
          ce('input', {
            id: 'nombre',
            className: 'form-status__input',
            name: 'nombre',
            placeholder: 'Escribe tu nombre'
          })
        ),
        ce(SubmitButton),
        ce(
          'div',
          { className: 'form-status__panels' },
          ce(FormControls),
          ce(
            'section',
            { className: 'form-status__panel form-status__panel--state' },
            ce('h2', { className: 'form-status__panel-title' }, 'useActionState'),
            ce('p', { className: 'form-status__text' }, `mensaje: ${state.mensaje}`),
            ce(
              'div',
              { className: 'form-status__meta-list' },
              ce('p', { className: 'form-status__meta' }, `ultimoNombre: ${state.nombre ?? 'ninguno'}`),
              ce('p', { className: 'form-status__meta' }, `envios: ${state.envios}`),
              ce('p', { className: 'form-status__meta' }, `isPending: ${String(isPending)}`)
            )
          )
        )
      )
    )
  )
}
