import { createServer } from 'node:http'
import { Readable } from 'node:stream'

import { renderToReadableStream } from 'react-dom/server'

import { createElement, div } from '../shared/hyperscript.mjs'
import Document from '../shared/server/Document.mjs'
import Linker from '../shared/server/Linker.mjs'
import ServerSuspenseWrapper from './ServerSuspenseWrapper.mjs'
import { read } from '../shared/server/files.mjs'

/**
 * @returns {import('react').ReactElement}
 */
function App() {
  return createElement(
    Document,
    { title: 'dom-server' },
    div({ id: 'root' }, createElement(ServerSuspenseWrapper, { initialCount: 0 }))
  )
}

/**
 * @returns {import('../shared/server/Linker.mjs').ResourcesCollection}
 */
function resources() {
  return {
    preconnectList: [{ href: 'https://esm.sh' }],
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
    const content = await read('shared', 'client', 'global.css')
    response.writeHead(200, { 'Content-Type': 'text/css' })
    return response.end(content)
  }

  if (request.url === '/Clicker.mjs') {
    const content = await read('04-with-server-suspense', 'Clicker.mjs')
    response.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' })
    return response.end(content)
  }

  if (request.url === '/SuspenseFallback.mjs') {
    const content = await read('04-with-server-suspense', 'SuspenseFallback.mjs')
    response.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' })
    return response.end(content)
  }

  if (request.url === '/ClientSuspenseWrapper.mjs') {
    const content = await read('04-with-server-suspense', 'ClientSuspenseWrapper.mjs')
    response.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' })
    return response.end(content)
  }

  if (request.url === '/client.mjs') {
    const content = await read('04-with-server-suspense', 'client.mjs')
    response.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' })
    return response.end(content)
  }

  if (request.url === '/shared/hyperscript.mjs') {
    const content = await read('shared', 'hyperscript.mjs')
    response.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' })
    return response.end(content)
  }

  const element = createElement(Linker, resources(), createElement(App))

  try {
    const stream = await renderToReadableStream(element, {
      bootstrapModules: ['/client.mjs'],
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
