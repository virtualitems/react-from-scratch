import { createServer } from 'node:http'

import { renderToString } from 'react-dom/server'

import { createElement } from '../shared/hyperscript.mjs'
import { read } from '../shared/server/files.mjs'
import Page from './Page.mjs'

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

  const element = createElement(Page)

  try {
    const html = renderToString(element)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(html, encoding)
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
