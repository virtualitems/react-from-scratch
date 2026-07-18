import { createServer } from 'node:http'
import { Readable } from 'node:stream'

import { renderToReadableStream } from 'react-dom/server'

import Document from '../shared/server/Document.mjs'
import { createElement, h1 } from '../shared/hyperscript.mjs'

function App() {
  return createElement(
    Document,
    { title: 'dom-server' },
    h1(null, 'Greetings!'),
  )
}

/**
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 */
async function listener(request, response) {
  console.info(new Date().toISOString(), request.method, request.url)

  const encoding = 'utf-8'

  const element = createElement(App)

  try {
    const stream = await renderToReadableStream(element)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    Readable.fromWeb(stream, { encoding }).pipe(response)
  } catch (error) {
    console.error(error)

    if (response.headersSent === false) {
      response.writeHead(500, {
        'Content-Type': 'text/plain; charset=utf-8'
      })
    }

    response.end('Internal Server Error', encoding)
  }
}

createServer(listener).listen(3000, () => console.log('http://localhost:3000'))
