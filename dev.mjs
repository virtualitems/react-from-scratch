import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { join } from 'node:path'
import connect from 'connect'
import serveStatic from 'serve-static'
import { toNodeHandler } from 'srvx/node'
import ts from 'typescript'

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
  ['/counter', () => import('./source/api/counter.mjs')],
  ['/error', () => import('./source/api/error.mjs')],
  ['/forms/form-status', () => import('./source/api/forms/form-status.mjs')],
  ['/forms/form-array', () => import('./source/api/forms/form-array.mjs')]
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

/** @type {Map<string, string>} */
const tsxMounts = new Map([
  ['/static', join(import.meta.dirname, 'source', 'client')],
  ['/shared', join(import.meta.dirname, 'source', 'shared')]
])

/**
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 * @param {(error?: unknown) => void} next
 */
async function tsxMiddleware(request, response, next) {
  const pathname = new URL(request.url, 'http://localhost').pathname

  if (pathname.endsWith('.tsx') === false && pathname.endsWith('.ts') === false) {
    next()
    return
  }

  const mount = [...tsxMounts.entries()].find(([prefix]) => pathname.startsWith(`${prefix}/`))

  if (mount === undefined) {
    next()
    return
  }

  const [prefix, basePath] = mount

  try {
    const filePath = join(basePath, decodeURIComponent(pathname.slice(prefix.length)))
    const source = await readFile(filePath, 'utf8')

    const result = ts.transpileModule(source, {
      fileName: filePath,
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2023
      }
    })

    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.end(result.outputText)
  } catch (error) {
    next(error)
  }
}

const app = connect()

app.use(tsxMiddleware)

app.use(
  '/static',
  serveStatic(join(import.meta.dirname, 'source', 'client'), {
    index: false
  })
)

app.use(
  '/shared',
  serveStatic(join(import.meta.dirname, 'source', 'shared'), {
    index: false
  })
)

app.use(toNodeHandler(fetchHandler))

createServer(app).listen(port, host, () => console.log(`http://${host}:${port}`))
