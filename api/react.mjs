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

  const output = new PassThrough()
  const { promise, resolve, reject } = Promise.withResolvers()

  const { pipe } = renderToPipeableStream(element, {
    bootstrapModules: ['/static/client.js'],

    onShellReady() {
      const body = Readable.toWeb(output)

      resolve(
        new Response(body, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8'
          }
        })
      )

      pipe(output)
    },

    onShellError(error) {
      reject(error)
    },

    onError(error) {
      console.error(error)
    }
  })

  return promise
}
