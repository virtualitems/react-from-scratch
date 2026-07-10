import { createServer, IncomingMessage, ServerResponse } from 'node:http'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

/** @typedef {Record<string, (request: Request) => Promise<Response>>} HandlersModule */

const routes = new Map([['/health', () => import('./api/health.mjs')]])

const port = 3000

const host = 'localhost'

/**
 * @param {Response} response
 * @param {import('node:http').ServerResponse<IncomingMessage> & { req: IncomingMessage }} serverResponse
 */
async function send(response, serverResponse) {
  serverResponse.statusCode = response.status
  serverResponse.statusMessage = response.statusText

  for (const [name, value] of response.headers) {
    serverResponse.setHeader(name, value)
  }

  if (response.body === null) {
    return serverResponse.end()
  }

  await pipeline(Readable.fromWeb(response.body), serverResponse)

  serverResponse.end()
}

createServer(async (request, response) => {
  console.info(new Date().toUTCString(), request.method, request.url)

  if (request.method === undefined) {
    response.statusCode = 400
    return response.end()
  }

  const pathname = new URL(request.url, `http://${host}:${port}`).pathname

  const moduleLoader = routes.get(pathname)

  if (moduleLoader === undefined) {
    response.statusCode = 404
    return response.end()
  }

  /** @type {HandlersModule} */
  const module = await moduleLoader()

  const handler = module[request.method]

  if (typeof handler !== 'function') {
    response.statusCode = 405
    response.setHeader('Allow', Object.keys(module).join(', '))
    return response.end()
  }

  try {
    return send(await handler(request), response)
  } catch (error) {
    console.error(error)
    response.statusCode = 500
    response.end()
  }
}).listen(port, host, () => console.log(`http://${host}:${port}`))
