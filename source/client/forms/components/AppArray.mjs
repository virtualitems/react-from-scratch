import { createElement as ce, useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'

const initialState = Object.freeze({
  mensaje: 'Aun no envias nada',
  nombres: [],
  envios: 0
})

/**
 * @param {object} previousState
 * @param {string} previousState.mensaje
 * @param {string[]} previousState.nombres
 * @param {number} previousState.envios
 * @param {FormData} formData
 * @returns {Promise<{ mensaje: string, nombres: string[], envios: number }>}
 */
async function saveNames(previousState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 4000))

  try {
    const names = formData
      .getAll('nombres')
      .map((value) => String(value ?? '').trim())
      .filter((value) => value.length > 0)

    if (names.length === 0) {
      return {
        ...previousState,
        mensaje: 'Agrega al menos un nombre antes de enviar'
      }
    }

    return {
      mensaje: `Nombres recibidos: ${names.join(', ')}`,
      nombres: names,
      envios: previousState.envios + 1
    }
  } catch (error) {
    console.error(error)

    return {
      ...previousState,
      mensaje: 'No se pudo leer el arreglo del formulario'
    }
  }
}

/**
 * @returns {React.ReactElement}
 */
function FormControls() {
  const { pending, data, method, action } = useFormStatus()

  const submittedNames = data?.getAll('nombres') ?? []
  const namesPreview =
    submittedNames.length === 0
      ? 'ninguno'
      : submittedNames
          .map((value) => String(value ?? '').trim())
          .filter((value) => value.length > 0)
          .join(', ')

  return ce(
    'section',
    { className: 'form-array__panel form-array__panel--controls' },
    ce('h2', { className: 'form-array__panel-title' }, 'useFormStatus'),
    ce(
      'div',
      { className: 'form-array__meta-list' },
      ce('p', { className: 'form-array__meta' }, `pending: ${String(pending)}`),
      ce('p', { className: 'form-array__meta' }, `data.nombres.length: ${submittedNames.length}`),
      ce('p', { className: 'form-array__meta' }, `data.nombres: ${namesPreview}`),
      ce('p', { className: 'form-array__meta' }, `method: ${method ?? 'ninguno'}`),
      ce(
        'p',
        { className: 'form-array__meta' },
        `action: ${typeof action === 'function' ? 'funcion del formulario' : String(action)}`
      )
    )
  )
}

/**
 * @param {object} props
 * @param {number[]} props.fieldIds
 * @param {(id: number) => void} props.onRemoveField
 * @param {boolean} props.isPending
 * @returns {React.ReactElement}
 */
function DynamicNameFields(props) {
  const { fieldIds, onRemoveField, isPending } = props

  return ce(
    'section',
    { className: 'form-array__field-group' },
    ce('p', { className: 'form-array__text' }, 'Campos dinamicos (array):'),
    ...fieldIds.map((fieldId, index) => {
      const inputId = `nombres-${fieldId}`

      return ce(
        'div',
        { className: 'form-array__field-row', key: fieldId },
        ce('label', { className: 'form-array__label', htmlFor: inputId }, `Nombre ${index + 1}`),
        ce('input', {
          id: inputId,
          className: 'form-array__input',
          name: 'nombres',
          placeholder: `Escribe el nombre ${index + 1}`,
          disabled: isPending
        }),
        ce(
          'button',
          {
            type: 'button',
            className: 'form-array__remove-button',
            onClick: () => onRemoveField(fieldId),
            disabled: isPending || fieldIds.length === 1
          },
          'Quitar'
        )
      )
    })
  )
}

/**
 * @returns {React.ReactElement}
 */
function SubmitButton() {
  const { pending } = useFormStatus()

  return ce(
    'div',
    { className: 'form-array__submit' },
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
export default function AppArray() {
  const [state, formAction, isPending] = useActionState(saveNames, initialState)
  const [fieldIds, setFieldIds] = useState([0])
  const [nextFieldId, setNextFieldId] = useState(1)

  function handleAddField() {
    if (isPending === true) return

    setFieldIds((previous) => [...previous, nextFieldId])
    setNextFieldId((previous) => previous + 1)
  }

  /**
   * @param {number} fieldId
   */
  function handleRemoveField(fieldId) {
    if (isPending === true) return

    setFieldIds((previous) => {
      if (previous.length === 1) return previous

      return previous.filter((currentId) => currentId !== fieldId)
    })
  }

  return ce(
    'main',
    { className: 'form-array' },
    ce(
      'section',
      { className: 'form-array__card' },
      ce(
        'header',
        { className: 'form-array__header' },
        ce('h1', { className: 'form-array__title' }, 'Form Array con hooks nativos de React'),
        ce(
          'p',
          { className: 'form-array__text' },
          'Ejemplo academico: agrega o quita inputs con name="nombres" y envia todo como arreglo.'
        )
      ),
      ce(
        'form',
        { className: 'form-array__form', action: formAction },
        ce(DynamicNameFields, {
          fieldIds,
          onRemoveField: handleRemoveField,
          isPending
        }),
        ce(
          'div',
          { className: 'form-array__actions' },
          ce(
            'button',
            {
              type: 'button',
              onClick: handleAddField,
              disabled: isPending
            },
            'Agregar campo'
          )
        ),
        ce(SubmitButton),
        ce(
          'div',
          { className: 'form-array__panels' },
          ce(FormControls),
          ce(
            'section',
            { className: 'form-array__panel form-array__panel--state' },
            ce('h2', { className: 'form-array__panel-title' }, 'useActionState'),
            ce('p', { className: 'form-array__text' }, `mensaje: ${state.mensaje}`),
            ce(
              'div',
              { className: 'form-array__meta-list' },
              ce(
                'p',
                { className: 'form-array__meta' },
                `nombres: ${state.nombres.length === 0 ? 'ninguno' : state.nombres.join(', ')}`
              ),
              ce('p', { className: 'form-array__meta' }, `totalCamposActuales: ${fieldIds.length}`),
              ce('p', { className: 'form-array__meta' }, `envios: ${state.envios}`),
              ce('p', { className: 'form-array__meta' }, `isPending: ${String(isPending)}`)
            )
          )
        )
      )
    )
  )
}
