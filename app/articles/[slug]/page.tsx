import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import theme from '../../../assets/theme.json';
import { ArticleList, ErrorBoundary } from '../../components/organisms';
import { getArticles } from '../../lib/articles';
import { getAuthor } from '../../lib/authors';
import mdxComponents from '../../lib/mdx-components';

/**
 * 静的パラメータを生成（SSG用）
 * @returns {Promise<Array<{ slug: string }>>} 全記事のスラッグ配列
 * @description Next.jsの静的生成のために、全ての記事スラッグを事前に生成
 */
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.entryName,
  }));
}

/**
 * 記事のコンテンツを取得
 * @param {string} slug - 記事のスラッグ
 * @returns {Promise<{ content: string; frontmatter: any; article: Article } | null>} 記事データまたはnull
 * @private
 */
async function getArticleContent(slug: string) {
  try {
    const articles = await getArticles();
    const article = articles.find(a => a.entryName === slug);
    
    if (!article) {
      return null;
    }

    const fileContent = await fs.readFile(article.path, 'utf-8');
    const { content, data } = matter(fileContent);

    return {
      content,
      frontmatter: data,
      article,
    };
  } catch (error) {
    console.error('Failed to load article content:', error);
    return null;
  }
}

/**
 * ページのメタデータを生成
 * @param {Object} props - プロパティ
 * @param {Promise<{ slug: string }>} props.params - URLパラメータ
 * @returns {Promise<Metadata>} ページのメタデータ
 * @description SEOとOGPのためのメタデータを動的に生成
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articleData = await getArticleContent(slug);

  if (!articleData) {
    return {
      title: 'Not Found',
    };
  }

  const { frontmatter, article } = articleData;
  const author = getAuthor(frontmatter.author || 'unknown');

  const ogImageUrl = `https://engineering.0x1.company/ogps/${article.entryName}.png`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: author ? [{ name: author.name }] : undefined,
    keywords: frontmatter.tags || [],
    openGraph: {
      title: `${frontmatter.title} | ONE Engineering`,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated || frontmatter.date,
      authors: author ? [author.name] : undefined,
      url: `https://engineering.0x1.company/articles/${slug}`,
      siteName: 'ONE Engineering',
      locale: 'ja_JP',
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
          type: 'image/png',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@0x1company',
      creator: '@0x1company',
      title: frontmatter.title,
      description: frontmatter.description,
      images: {
        url: ogImageUrl,
        alt: frontmatter.title,
      },
    },
    alternates: {
      canonical: `https://engineering.0x1.company/articles/${slug}`,
    },
    other: {
      'article:published_time': frontmatter.date,
      'article:modified_time': frontmatter.updated || frontmatter.date,
      'article:author': author?.name || '',
      'article:section': 'Technology',
    },
  };
}

/**
 * 記事詳細ページコンポーネント
 * @param {Object} props - プロパティ
 * @param {Promise<{ slug: string }>} props.params - URLパラメータ
 * @returns {Promise<JSX.Element>} 記事ページのレイアウト
 * @description
 * - MDXコンテンツをレンダリング
 * - 記事メタデータと著者情報を表示
 * - 関連記事を下部に表示
 * - エラーバウンダリでエラーをキャッチ
 */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articleData = await getArticleContent(slug);

  if (!articleData) {
    notFound();
  }

  const { content, frontmatter, article } = articleData;
  const author = getAuthor(frontmatter.author || 'unknown');
  
  // 最新記事を取得（現在の記事を除く）
  const allArticles = await getArticles();
  const latestArticles = allArticles
    .filter(a => a.entryName !== slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* 記事ヘッダー */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {article.frontmatter.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <time dateTime={article.frontmatter.date}>
              {new Date(article.frontmatter.date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}
            </time>
            {author && (
              <div className="flex items-center gap-2">
                {author.icon && (
                  <Image
                    src={author.icon}
                    alt={author.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span>{author.name}</span>
              </div>
            )}
          </div>
        </header>

        {/* OGP画像 */}
        <div className="mb-12">
          <Image
            src={`/ogps/${article.entryName}.png`}
            alt={article.frontmatter.title}
            width={1200}
            height={630}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* 記事本文 */}
        <ErrorBoundary>
          <article className="prose prose-lg prose-gray max-w-none mb-16">
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkFrontmatter, remarkGfm],
                  rehypePlugins: [[rehypePrettyCode, { theme }]],
                },
              }}
            />
          </article>
        </ErrorBoundary>
      </main>

      {/* 最新記事セクション */}
      {latestArticles.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Latest Articles</h2>
            <ArticleList articles={latestArticles} showTitle={false} />
          </div>
        </section>
      )}
    </div>
  );
}