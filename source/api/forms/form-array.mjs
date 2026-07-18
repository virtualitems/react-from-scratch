import { createElement } from 'react'

import { renderElementToReadableStream } from '../../server/common/http.mjs'
import { identifierPrefixes } from '../../shared/constants/react.mjs'

import FormArrayPage from '../../server/forms/components/FormArrayPage.mjs'

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
  const element = createElement(FormArrayPage, {
    identifierPrefix: identifierPrefixes.formArray,
    title: 'Form Array'
  })

  const linkerProps = {
    preconnectList: [{ href: 'https://esm.sh' }],
    preinitList: [
      { href: '/static/global.css', options: { as: 'style' } },
      { href: '/static/forms/styles/app-array.css', options: { as: 'style' } }
    ]
  }

  const stream = await renderElementToReadableStream(element, linkerProps, {
    bootstrapModules: ['/static/forms/scripts/form-array.client.mjs'],
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
