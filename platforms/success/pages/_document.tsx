import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import React from 'react'

export default function Document(next: DocumentProps) {
  return (
    <Html data-sid="-1024996646">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
