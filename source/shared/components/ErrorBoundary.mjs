import React from 'react'

/**
 * @typedef Props
 * @type {import('react').PropsWithChildren<{
 *   fallback: import('react').ComponentType<{
 *     error: Error,
 *     resetErrorBoundary: () => void
 *   }>,
 *   onError?: (error: Error, info: import('react').ErrorInfo) => void
 * }}
 */

/**
 * @typedef State
 * @type {object}
 * @property {Error | null} error
 */

/**
 * @description Initial state of the ErrorBoundary component
 */
const initialState = {
  error: null
}

/**
 * @description React Error Boundary Component
 */
export class ErrorBoundary extends React.Component {
  /** @type {Props} */
  props

  /** @type {State} */
  state

  /**
   * @param {Props} props
   */
  constructor(props) {
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

  /**
   * @param {Error} error
   * @returns {State}
   */
  static getDerivedStateFromError(error) {
    return { error }
  }

  /**
   * @param {Error} error
   * @param {import('react').ErrorInfo} info
   */
  componentDidCatch(error, info) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, info)
    }
  }

  /**
   * @returns {import('react').ReactNode}
   */
  render() {
    const { error } = this.state

    if (error === null) {
      return this.props.children
    }

    return React.createElement(this.props.fallback, {
      error: error,
      resetErrorBoundary: this.resetErrorBoundary
    })
  }
}
