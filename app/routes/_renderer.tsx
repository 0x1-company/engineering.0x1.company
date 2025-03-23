import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'
import { Footer } from '../components/footer'
import { Header } from '../components/header'

export default jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>one-engineering</title>
        <meta name="description" content="ONE Inc." />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="indexfollow" />
        <link rel="canonical" href="https://engineering.0x1.company" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="one-engineering" />
        <meta property="og:description" content="ONE Inc." />
        <meta property="og:url" content="https://engineering.0x1.company/" />
        <meta property="og:image" content="https://cdn-images-1.medium.com/max/1200/1*b5OHmpAPuxH-XvBxmSIl8w.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="one-engineering" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="one-engineering" />
        <meta name="twitter:description" content="ONE Inc." />
        <meta name="twitter:image" content="https://cdn-images-1.medium.com/max/1200/1*b5OHmpAPuxH-XvBxmSIl8w.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0x1company" />
        
        <link rel="icon" href="/favicon.ico" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
      </head>
      <body>
        <Header />
        <main class='items-center justify-center flex'>
          <div class='max-w-[780px] w-screen'>
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
})
