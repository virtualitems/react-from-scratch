import { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'
import AppArray from '../components/AppArray.tsx'
import { identifierPrefixes } from '../../../shared/constants/react.mjs'

const rootElement = document.getElementById(identifierPrefixes.formArray)

if (rootElement === null) {
  throw new Error(`No se encontro el elemento #${identifierPrefixes.formArray}`)
}

hydrateRoot(rootElement, createElement(AppArray), {
  identifierPrefix: identifierPrefixes.formArray
})
