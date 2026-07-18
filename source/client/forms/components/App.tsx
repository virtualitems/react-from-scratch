import { useActionState, type ReactElement } from 'react'
import { useFormStatus } from 'react-dom'

interface State {
  mensaje: string
  nombre: string | null
  envios: number
}

const initialState: State = Object.freeze({
  mensaje: 'Aun no envias nada',
  nombre: null,
  envios: 0
})

async function saveName(previousState: State, formData: FormData): Promise<State> {
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

function FormControls(): ReactElement {
  const { pending, data, method, action } = useFormStatus()

  const submittedName = data?.get('nombre') ?? 'ninguno'

  return (
    <section className="form-status__panel form-status__panel--controls">
      <h2 className="form-status__panel-title">useFormStatus</h2>
      <div className="form-status__meta-list">
        <p className="form-status__meta">pending: {String(pending)}</p>
        <p className="form-status__meta">data.nombre: {String(submittedName)}</p>
        <p className="form-status__meta">method: {method ?? 'ninguno'}</p>
        <p className="form-status__meta">
          action: {typeof action === 'function' ? 'funcion del formulario' : String(action)}
        </p>
      </div>
    </section>
  )
}

function SubmitButton(): ReactElement {
  const { pending } = useFormStatus()

  return (
    <div className="form-status__submit">
      <button type="submit" disabled={pending}>
        {pending ? 'Enviando...' : 'Enviar formulario'}
      </button>
    </div>
  )
}

export default function App(): ReactElement {
  const [state, formAction, isPending] = useActionState<State, FormData>(saveName, initialState)

  return (
    <main className="form-status">
      <section className="form-status__card">
        <header className="form-status__header">
          <h1 className="form-status__title">Hooks de formulario</h1>
        </header>
        <form className="form-status__form" action={formAction}>
          <div className="form-status__field">
            <label className="form-status__label" htmlFor="nombre">
              Nombre
            </label>
            <input
              id="nombre"
              className="form-status__input"
              name="nombre"
              placeholder="Escribe tu nombre"
            />
          </div>
          <SubmitButton />
          <div className="form-status__panels">
            <FormControls />
            <section className="form-status__panel form-status__panel--state">
              <h2 className="form-status__panel-title">useActionState</h2>
              <p className="form-status__text">mensaje: {state.mensaje}</p>
              <div className="form-status__meta-list">
                <p className="form-status__meta">ultimoNombre: {state.nombre ?? 'ninguno'}</p>
                <p className="form-status__meta">envios: {state.envios}</p>
                <p className="form-status__meta">isPending: {String(isPending)}</p>
              </div>
            </section>
          </div>
        </form>
      </section>
    </main>
  )
}
