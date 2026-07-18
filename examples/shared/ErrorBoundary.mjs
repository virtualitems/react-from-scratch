import React from 'react'

/**
 * @typedef {object} Props
 * @property {import('react').ReactNode} [children]
 * @property {import('react').ComponentType<{ error: Error, resetErrorBoundary: () => void }>} fallback
 * @property {(error: Error, info: import('react').ErrorInfo) => void} [onError]
 */

/**
 * @typedef {object} State
 * @property {Error | null} error
 */

/** @type {State} */
const initialState = {
  error: null
}

/**
 * Error boundary component that renders a fallback UI when a child component throws.
 *
 * @extends {React.Component<Props, State>}
 */
export default class ErrorBoundary extends React.Component {
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

    /** @type {() => void} */
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

    const Fallback = this.props.fallback

    return React.createElement(Fallback, { error, resetErrorBoundary: this.resetErrorBoundary })
  }
}
