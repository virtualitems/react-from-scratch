import { createServer } from 'node:http'
import { Readable } from 'node:stream'

import { renderToReadableStream } from 'react-dom/server'

import { createElement } from '../shared/hyperscript.mjs'
import { read } from '../shared/server/files.mjs'
import Page from './Page.mjs'
import Linker from '../shared/server/Linker.mjs'

/**
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 */
async function listener(request, response) {
  console.info(new Date().toISOString(), request.method, request.url)

  if (request.url === '/client.mjs') {
    const content = await read('03-with-create-root', 'client.mjs')
    response.writeHead(200, { 'Content-Type': 'application/javascript' })
    return response.end(content)
  }

  if (request.url === '/Clicker.mjs') {
    const content = await read('03-with-create-root', 'Clicker.mjs')
    response.writeHead(200, { 'Content-Type': 'application/javascript' })
    return response.end(content)
  }

  const encoding = 'utf-8'

  const element = createElement(Linker, null, createElement(Page))

  try {
    const stream = await renderToReadableStream(element, {
      bootstrapModules: ['client.mjs'],
      importMap: {
        imports: {
          react: 'https://esm.sh/react@19.2.7?dev',
          'react-dom/client': 'https://esm.sh/react-dom@19.2.7/client?dev'
        }
      }
    })
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
