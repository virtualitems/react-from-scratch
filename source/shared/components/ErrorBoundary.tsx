import { Component, type ComponentType, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
  fallback: ComponentType<{ error: Error; resetErrorBoundary: () => void }>
  onError?: (error: Error, info: ErrorInfo) => void
}

interface State {
  error: Error | null
}

const initialState: State = {
  error: null
}

/**
 * Error boundary component that renders a fallback UI when a child component throws.
 */
export default class ErrorBoundary extends Component<Props, State> {
  resetErrorBoundary: () => void

  constructor(props: Props) {
    super(props)
    const self = this

    const { fallback, onError } = props

    if (typeof fallback !== 'function') {
      throw new TypeError('Fallback must be a function')
    }

    if (onError !== undefined && typeof onError !== 'function') {
      throw new TypeError('onError must be a function')
    }

    this.state = initialState

    this.resetErrorBoundary = () => {
      self.setState(initialState)
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, info)
    }
  }

  override render(): ReactNode {
    const { error } = this.state

    if (error === null) {
      return this.props.children
    }

    const Fallback = this.props.fallback

    return <Fallback error={error} resetErrorBoundary={this.resetErrorBoundary} />
  }
}
