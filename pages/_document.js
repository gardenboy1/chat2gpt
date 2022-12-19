import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Pun w/ GPT" key="title"/>
        <meta property="og:description" content="Who'll have the last laugh?" key="description"/>
        <meta
          property="og:image"
          content="http://cdn.onlinewebfonts.com/svg/img_182217.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
