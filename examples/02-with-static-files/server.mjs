import { createServer } from 'node:http'
import { Readable } from 'node:stream'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { renderToReadableStream } from 'react-dom/server'

import Document from '../shared/server/Document.mjs'
import Linker from '../shared/server/Linker.mjs'
import { createElement, h1 } from '../shared/hyperscript.mjs'

function App() {
  return createElement(Document, { title: 'dom-server' }, h1(null, 'Greetings!'))
}

/**
 * @returns {import('../shared/server/Linker.mjs').ResourcesCollection}
 */
function resources() {
  return {
    preinitList: [{ href: 'global.css', options: { as: 'style' } }]
  }
}

/**
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 */
async function listener(request, response) {
  console.info(new Date().toISOString(), request.method, request.url)

  const encoding = 'utf-8'

  if (request.url === '/global.css') {
    const content = await readFile(resolve(import.meta.dirname, 'global.css'), encoding)
    response.writeHead(200, { 'Content-Type': 'text/css' })
    return response.end(content, encoding)
  }

  try {
    const stream = await renderToReadableStream(createElement(Linker, resources(), App()))
    response.writeHead(200, { 'Content-Type': 'text/html' })
    Readable.fromWeb(stream, { encoding }).pipe(response)
  } catch (error) {
    console.error(error)

    if (response.headersSent) {
      return
    }

    response.writeHead(500, {
      'Content-Type': 'text/plain; charset=utf-8'
    })

    response.end('Internal Server Error', encoding)
  }
}

createServer(listener).listen(3000, () => console.log('http://localhost:3000'))
