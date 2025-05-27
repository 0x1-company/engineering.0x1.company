import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import theme from '../../../assets/theme.json';
import { ArticlePreview, ArticleList } from '../../components/organisms';
import { getArticles } from '../../lib/articles';
import { getAuthor } from '../../lib/authors';
import mdxComponents from '../../lib/mdx-components';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.entryName,
  }));
}

async function getArticleContent(slug: string) {
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
}

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
                  <img
                    src={author.icon}
                    alt={author.name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>{author.name}</span>
              </div>
            )}
          </div>
        </header>

        {/* OGP画像 */}
        <div className="mb-12">
          <img
            src={`/ogps/${article.entryName}.png`}
            alt={article.frontmatter.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* 記事本文 */}
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