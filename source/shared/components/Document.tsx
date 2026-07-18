import type { ReactElement, ReactNode } from 'react'

interface Props {
  title: string
  lang?: string
  children?: ReactNode
  headSlot?: ReactNode
  bodySlot?: ReactNode
}

export default function Document(props: Props): ReactElement {
  const { title: documentTitle, lang, children, headSlot, bodySlot } = props
  const charSet = 'UTF-8'
  const viewport = 'width=device-width, initial-scale=1.0'

  return (
    <html lang={lang}>
      <head>
        <meta charSet={charSet} />
        <meta name="viewport" content={viewport} />
        <title>{documentTitle}</title>
        {headSlot}
      </head>
      <body>
        {children}
        {bodySlot}
      </body>
    </html>
  )
}
