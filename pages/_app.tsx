import { NextComponentType } from 'next'
import Head from 'next/head'
import '../public/assets/css/prism-twilight-mod.css'
import '../public/assets/css/style.css'

function MyApp({
  Component,
  pageProps
}: {
  Component: NextComponentType
  pageProps: { [key: string]: any }
}) {
  return (
    <>
      <Head>
        <link href="/favicon.ico" rel="icon" type="image/ico" />
        <meta name="author" content="Mudit" />
        <meta name="description" content="Mudit’s blog." />
        <meta
          name="keywords"
          content="mudit, programming, javascript, web developer, web development, css, html, functional programming, lambda, serverless, mental health"
        />

        <meta property="og:title" content="Mudit’s blog." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog.mudit.xyz" />
        <meta property="og:description" content="My thought dump." />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://blog.mudit.xyz" />
        <meta name="twitter:title" content="Mudit’s blog.." />
        <meta name="twitter:description" content="My thought dump." />
        <script defer src="https://www.googletagmanager.com/gtag/js?id=UA-59474035-2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-59474035-2');
`
          }}
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp

export const config = { unstable_runtimeJS: false }
