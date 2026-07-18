import { useActionState, useState, type ReactElement } from 'react'
import { useFormStatus } from 'react-dom'

interface State {
  mensaje: string
  nombres: string[]
  envios: number
}

const initialState: State = Object.freeze({
  mensaje: 'Aun no envias nada',
  nombres: [],
  envios: 0
})

async function saveNames(previousState: State, formData: FormData): Promise<State> {
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

function FormControls(): ReactElement {
  const { pending, data, method, action } = useFormStatus()

  const submittedNames = data?.getAll('nombres') ?? []
  const namesPreview =
    submittedNames.length === 0
      ? 'ninguno'
      : submittedNames
          .map((value) => String(value ?? '').trim())
          .filter((value) => value.length > 0)
          .join(', ')

  return (
    <section className="form-array__panel form-array__panel--controls">
      <h2 className="form-array__panel-title">useFormStatus</h2>
      <div className="form-array__meta-list">
        <p className="form-array__meta">pending: {String(pending)}</p>
        <p className="form-array__meta">data.nombres.length: {submittedNames.length}</p>
        <p className="form-array__meta">data.nombres: {namesPreview}</p>
        <p className="form-array__meta">method: {method ?? 'ninguno'}</p>
        <p className="form-array__meta">
          action: {typeof action === 'function' ? 'funcion del formulario' : String(action)}
        </p>
      </div>
    </section>
  )
}

interface DynamicNameFieldsProps {
  fieldIds: number[]
  onRemoveField: (id: number) => void
  isPending: boolean
}

function DynamicNameFields(props: DynamicNameFieldsProps): ReactElement {
  const { fieldIds, onRemoveField, isPending } = props

  return (
    <section className="form-array__field-group">
      <p className="form-array__text">Campos dinamicos (array):</p>
      {fieldIds.map((fieldId, index) => {
        const inputId = `nombres-${fieldId}`

        return (
          <div className="form-array__field-row" key={fieldId}>
            <label className="form-array__label" htmlFor={inputId}>
              Nombre {index + 1}
            </label>
            <input
              id={inputId}
              className="form-array__input"
              name="nombres"
              placeholder={`Escribe el nombre ${index + 1}`}
              disabled={isPending}
            />
            <button
              type="button"
              className="form-array__remove-button"
              onClick={() => onRemoveField(fieldId)}
              disabled={isPending || fieldIds.length === 1}
            >
              Quitar
            </button>
          </div>
        )
      })}
    </section>
  )
}

function SubmitButton(): ReactElement {
  const { pending } = useFormStatus()

  return (
    <div className="form-array__submit">
      <button type="submit" disabled={pending}>
        {pending ? 'Enviando...' : 'Enviar formulario'}
      </button>
    </div>
  )
}

export default function AppArray(): ReactElement {
  const [state, formAction, isPending] = useActionState<State, FormData>(saveNames, initialState)
  const [fieldIds, setFieldIds] = useState<number[]>([0])
  const [nextFieldId, setNextFieldId] = useState(1)

  function handleAddField() {
    if (isPending === true) return

    setFieldIds((previous) => [...previous, nextFieldId])
    setNextFieldId((previous) => previous + 1)
  }

  function handleRemoveField(fieldId: number) {
    if (isPending === true) return

    setFieldIds((previous) => {
      if (previous.length === 1) return previous

      return previous.filter((currentId) => currentId !== fieldId)
    })
  }

  return (
    <main className="form-array">
      <section className="form-array__card">
        <header className="form-array__header">
          <h1 className="form-array__title">Form Array con hooks nativos de React</h1>
          <p className="form-array__text">
            Ejemplo academico: agrega o quita inputs con name="nombres" y envia todo como arreglo.
          </p>
        </header>
        <form className="form-array__form" action={formAction}>
          <DynamicNameFields
            fieldIds={fieldIds}
            onRemoveField={handleRemoveField}
            isPending={isPending}
          />
          <div className="form-array__actions">
            <button type="button" onClick={handleAddField} disabled={isPending}>
              Agregar campo
            </button>
          </div>
          <SubmitButton />
          <div className="form-array__panels">
            <FormControls />
            <section className="form-array__panel form-array__panel--state">
              <h2 className="form-array__panel-title">useActionState</h2>
              <p className="form-array__text">mensaje: {state.mensaje}</p>
              <div className="form-array__meta-list">
                <p className="form-array__meta">
                  nombres: {state.nombres.length === 0 ? 'ninguno' : state.nombres.join(', ')}
                </p>
                <p className="form-array__meta">totalCamposActuales: {fieldIds.length}</p>
                <p className="form-array__meta">envios: {state.envios}</p>
                <p className="form-array__meta">isPending: {String(isPending)}</p>
              </div>
            </section>
          </div>
        </form>
      </section>
    </main>
  )
}
