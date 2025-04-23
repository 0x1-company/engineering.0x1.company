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
  const description = article?.frontmatter.description ?? 'ONE株式会社のプロダクト開発のブログです。';
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
        <link rel="icon" href="https://engineering.0x1.company/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ONE Engineering" />
        <meta property="og:url" content={`https://engineering.0x1.company${ogpPath}`} />
        <meta property="og:image" content={`https://engineering.0x1.company${ogpPath}`} />
        <meta name="twitter:image" content={`https://engineering.0x1.company${ogpPath}`} />        
        {/* Twitter */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
      </head>
      <body class="flex flex-col min-h-screen">
        <Header />
        <main class='items-center justify-center flex flex-grow'>
          <div class='w-screen'>
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
})
