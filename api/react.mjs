import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { PassThrough, Readable } from 'node:stream'
import { createElement } from 'react'
import { renderToPipeableStream } from 'react-dom/server'

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

  const writable = new PassThrough()
  const { promise, resolve, reject } = Promise.withResolvers()

  const { pipe } = renderToPipeableStream(element, {
    bootstrapModules: ['/static/client.js'],

    onShellReady() {
      const readable = Readable.toWeb(writable)

      resolve(
        new Response(readable, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8'
          }
        })
      )

      pipe(writable)
    },

    onShellError: console.error,

    onError(error) {
      reject(error)
    }
  })

  return promise
}
