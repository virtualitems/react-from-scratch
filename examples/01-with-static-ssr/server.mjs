import { createServer } from 'node:http'

import { renderToStaticMarkup } from 'react-dom/server'

import { createElement } from '../shared/hyperscript.mjs'
import Page from './Page.mjs'

/**
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 */
async function listener(request, response) {
  console.info(new Date().toISOString(), request.method, request.url)

  const encoding = 'utf-8'

  const element = createElement(Page)

  try {
    const html = renderToStaticMarkup(element)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(html, encoding)
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
