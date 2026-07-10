import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createElement } from 'react'

import { HomePage } from '../server/HomePage.js'
import { render } from '../server/ssr.js'

/**
 * @param {Request} request
 * @returns {Response}
 */
export async function GET() {
  const __dirname = import.meta.dirname

  const importMap = await readFile(join(__dirname, '..', 'server', 'importmap.json'), 'utf-8')

  const element = createElement(HomePage, {
    title: 'dom-server',
    importMap
  })

  const bootstrapModules = ['/static/client.js']

  const responseInit = {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  }

  return await render(element, bootstrapModules, responseInit)
}
