import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createElement } from 'react'

import { CounterPage } from '../server/counter/components/CounterPage.mjs'
import { render } from '../server/common/ssr.mjs'

/**
 * @param {Request} request
 * @returns {Response}
 */
export async function GET() {
  const __dirname = import.meta.dirname

  const importMap = await readFile(
    join(__dirname, '..', 'server', 'counter', 'imports', 'counter.json'),
    'utf-8'
  )

  const element = createElement(CounterPage, {
    title: 'dom-server',
    importMap,
    initialCount: 0
  })

  const bootstrapModules = ['/static/counter/scripts/client.js']

  const responseInit = {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  }

  return await render(element, bootstrapModules, responseInit)
}
