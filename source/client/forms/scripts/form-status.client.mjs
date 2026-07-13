import { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { ClientSuspenseWrapper } from '../components/App.mjs'
import { identifierPrefixes } from '../../../shared/constants/react.mjs'

const rootElement = document.getElementById(identifierPrefixes.formStatus)

if (rootElement === null) {
	throw new Error(`No se encontro el elemento #${identifierPrefixes.formStatus}`)
}

hydrateRoot(rootElement, createElement(ClientSuspenseWrapper), {
	identifierPrefix: identifierPrefixes.formStatus
})
