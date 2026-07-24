import { createServer } from 'node:http'
import { Readable } from 'node:stream'
import { createElement, Suspense, h1, p } from '../shared/hyperscript.mjs'
import { use } from 'react'
import { prerender } from 'react-dom/static'
import { resume } from 'react-dom/server'
import Page from './Page.mjs'

/**
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 */
async function listener(request, response) {
  const { promise, resolve } = Promise.withResolvers()
  const controller = new AbortController()

  const element = createElement(Page, { promise })
  const task = prerender(element, { signal: controller.signal })

  queueMicrotask(() => controller.abort('Aborted prerendering'))

  const { prelude, postponed } = await task

  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  Readable.fromWeb(prelude).pipe(response, { end: false })

  setTimeout(() => resolve('Alejandro'), 2000)

  if (postponed === null) {
    response.end()
  }

  const resumed = await resume(createElement(Page, { promise }), postponed)
  Readable.fromWeb(resumed).pipe(response)
}

createServer(listener).listen(3000, () => console.log('http://localhost:3000'))
