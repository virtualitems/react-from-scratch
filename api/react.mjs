import { createElement } from 'react'
import { renderToPipeableStream } from 'react-dom/server'

import { CounterPage } from '../server/counter/components/CounterPage.mjs'
import { StreamResponse } from '../server/common/http.mjs'

const importMap = {
  imports: {
    react: 'https://esm.sh/react@19.2.7',
    'react-dom/client': 'https://esm.sh/react-dom@19.2.7/client'
  }
}

/**
 * @param {Request} request
 * @returns {Response}
 */
export async function GET() {
  const element = createElement(CounterPage, {
    title: 'dom-server',
    importMap,
    initialCount: 0
  })

  const promise = new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(element, {
      bootstrapModules: ['/static/counter/scripts/client.js'],
      importMap,
      onShellReady() {
        const response = new StreamResponse({
          status: 200,
          headers: { 'Content-Type': 'text/html' }
        })
        pipe(response.writable)
        resolve(response)
      },
      onShellError(error) {
        console.error(error)
        reject(new Response(error.message, { status: 500 }))
      },
      onAllReady() {
        console.log('onAllReady')
      },
      onError(error) {
        console.log('onError', error)
      },
      onHeaders() {
        console.log('onHeaders')
      }
    })
  })

  return await promise
}
