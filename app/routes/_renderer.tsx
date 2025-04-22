import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { getEntryNameFromPath } from '../utils'
import { getArticleByEntryName } from '../lib/articles'

export default jsxRenderer(({ children }) => {
  const c = useRequestContext();
  const pagePath = c.req.path;
  const paths = pagePath.split('/');
  const entryName = paths[paths.length - 1];
  // const entryName = getEntryNameFromPath(pagePath);
  const article = getArticleByEntryName(entryName);

  const title = article?.frontmatter.title
  const pageTitle = title ? `${title} - ONE Engineering` : 'ONE Engineering';
  const description = article?.frontmatter.description ?? 'ONE, Inc.';
  const ogpPath = entryName ? `/ogps/${entryName}.png` : "/ogp.png";

  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="indexfollow" />
        {import.meta.env.VITE_ENV === "production" ? (
          <>
            <meta
              property="og:url"
              content={`https://engineering.0x1.company${ogpPath}`}
            />
            <meta
              property="og:image"
              content={`https://engineering.0x1.company${ogpPath}`}
            />
            <meta
              name="twitter:image"
              content={`https://engineering.0x1.company${ogpPath}`}
            />
            <link rel="icon" href="https://engineering.0x1.company/favicon.ico" />
          </>
        ) : (
          <>
            <meta property="og:url" content={ogpPath} />
            <meta property="og:image" content={ogpPath} />
            <meta name="twitter:image" content={ogpPath} />
            <link rel="icon" href="/favicon.ico" />
          </>
        )}
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="ONE Engineering" />
        <meta property="og:description" content="ONE Inc." />
        <meta property="og:url" content="https://engineering.0x1.company/" />
        <meta property="og:image" content="https://engineering.0x1.company/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ONE Engineering" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="ONE Engineering" />
        <meta name="twitter:description" content="ONE Inc." />
        <meta name="twitter:image" content="https://engineering.0x1.company/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0x1company" />
        
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
      </head>
      <body class="flex flex-col min-h-screen">
        <Header />
        <main class='items-center justify-center flex flex-grow'>
          <div class='max-w-[780px] w-screen'>
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
})
