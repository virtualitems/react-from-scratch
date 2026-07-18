import { createElement } from 'react'

import ErrorPage from '../server/error/components/ErrorPage.mjs'
import { renderElementToReadableStream } from '../server/common/http.mjs'
import { identifierPrefixes } from '../shared/constants/react.mjs'

const importMap = {
  imports: {
    react: 'https://esm.sh/react@19.2.7?dev',
    'react-dom/client': 'https://esm.sh/react-dom@19.2.7/client?dev'
  }
}

/**
 * @param {Request} request
 * @returns {Response}
 */
export async function GET() {
  const element = createElement(ErrorPage, {
    identifierPrefix: identifierPrefixes.error,
    title: 'dom-server'
  })

  const linkerProps = {
    preconnectList: [{ href: 'https://esm.sh' }],
    preinitList: [
      { href: '/static/global.css', options: { as: 'style' } },
      { href: '/static/error/styles/app.css', options: { as: 'style' } }
    ]
  }

  const stream = await renderElementToReadableStream(element, linkerProps, {
    bootstrapModules: ['/static/error/scripts/error.client.mjs'],
    importMap,
    onError(error) {
      console.log('onError', error)
    }
  })

  return new Response(stream, {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  })
}
