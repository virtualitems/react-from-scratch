import { createServer } from 'node:http'
import { join } from 'node:path'
import connect from 'connect'
import serveStatic from 'serve-static'
import { toNodeHandler } from 'srvx/node'

/**
 * @typedef {
 *   (request: Request) => Response | Promise<Response>
 * } Handler
 */

/** @typedef {Record<string, unknown>} HandlersModule */
/** @typedef {() => Promise<HandlersModule>} ModuleLoader */

/** @type {Map<string, ModuleLoader>} */
const routes = new Map([
  ['/health', () => import('./source/api/health.mjs')],
  ['/react', () => import('./source/api/react.mjs')]
])

const port = 3000
const host = 'localhost'

/**
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function fetchHandler(request) {
  console.info(new Date().toUTCString(), request.method, request.url)

  try {
    const pathname = new URL(request.url).pathname
    const moduleLoader = routes.get(pathname)

    if (moduleLoader === undefined) {
      return new Response(null, {
        status: 404
      })
    }

    const module = await moduleLoader()

    const handler = /** @type {Handler | undefined} */ (module[request.method])

    if (typeof handler !== 'function') {
      const allowedMethods = Object.entries(module)
        .filter(([, exportedValue]) => {
          return typeof exportedValue === 'function'
        })
        .map(([method]) => method)

      return new Response(null, {
        status: 405,
        headers: {
          Allow: allowedMethods.join(', ')
        }
      })
    }

    return await handler(request)
  } catch (error) {
    console.error(error)

    return new Response(null, {
      status: 500
    })
  }
}

const app = connect()

app.use(
  '/static',
  serveStatic(join(import.meta.dirname, 'source', 'client'), {
    index: false
  })
)

app.use(toNodeHandler(fetchHandler))

createServer(app).listen(port, host, () => console.log(`http://${host}:${port}`))
