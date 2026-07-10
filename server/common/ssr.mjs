import { renderToPipeableStream } from 'react-dom/server'
import { StreamResponse } from './http.mjs'

/**
 * @param {import('react').ReactElement} element
 * @param {string[]} bootstrapModules
 * @param {ResponseInit} responseInit
 * @returns
 */
export function render(element, bootstrapModules, responseInit) {
  const { promise, resolve, reject } = Promise.withResolvers()
  const { pipe } = renderToPipeableStream(element, {
    bootstrapModules,

    onShellReady() {
      const response = new StreamResponse(responseInit)
      resolve(response)
      pipe(response.writable)
    },

    onShellError(error) {
      reject(error)
    }
  })
  return promise
}
