import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createElement } from 'react'
import { renderToPipeableStream } from 'react-dom/server'

import { StreamResponse } from '../server/http.js'
import { HomePage } from '../server/HomePage.js'

/**
 * @param {Request} request
 * @returns {Response}
 */
export async function GET() {
  const __dirname = import.meta.dirname

  const importMap = await readFile(join(__dirname, '..', 'server', 'importmap.json'), 'utf-8')

  const element = createElement(HomePage, {
    title: 'dom-server',
    importMap
  })

  const { promise, resolve, reject } = Promise.withResolvers()

  const { pipe } = renderToPipeableStream(element, {
    bootstrapModules: ['/static/client.js'],

    onShellReady() {
      const response = new StreamResponse({
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
      resolve(response)
      pipe(response.writable)
    },

    onShellError(error) {
      reject(error)
    }
  })

  return await promise
}
