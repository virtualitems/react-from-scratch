import { createElement } from 'react'

import { renderElementToReadableStream } from '../../server/common/http.mjs'
import { identifierPrefixes } from '../../shared/constants/react.mjs'

import FormStatusPage from '../../server/forms/components/FormStatusPage.mjs'

const importMap = {
  imports: {
    react: 'https://esm.sh/react@19.2.7?dev',
    'react-dom': 'https://esm.sh/react-dom@19.2.7?dev',
    'react-dom/client': 'https://esm.sh/react-dom@19.2.7/client?dev'
  }
}

/**
 * @param {Request} request
 * @returns {Response}
 */
export async function GET() {
  const element = createElement(FormStatusPage, {
    identifierPrefix: identifierPrefixes.formStatus,
    title: 'Form Status'
  })

  const linkerProps = {
    preconnectList: [{ href: 'https://esm.sh' }],
    preinitList: [
      { href: '/static/global.css', options: { as: 'style' } },
      { href: '/static/forms/styles/app.css', options: { as: 'style' } }
    ]
  }

  const stream = await renderElementToReadableStream(element, linkerProps, {
    bootstrapModules: ['/static/forms/scripts/form-status.client.mjs'],
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
