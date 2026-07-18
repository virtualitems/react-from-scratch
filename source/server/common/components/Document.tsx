import type { ReactElement, ReactNode } from 'react'

interface Props {
  title: string
  lang?: string
  linkedDataScript?: string
  children?: ReactNode
}

export default function Document(props: Props): ReactElement {
  const { title, lang, linkedDataScript, children } = props
  const charSet = 'UTF-8'
  const viewport = 'width=device-width, initial-scale=1.0'

  return (
    <html lang={lang}>
      <head>
        <meta charSet={charSet} />
        <meta name="viewport" content={viewport} />
        <title>{title}</title>
        <script type="application/ld+json">{linkedDataScript}</script>
      </head>
      <body>{children}</body>
    </html>
  )
}
