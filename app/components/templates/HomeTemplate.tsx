import { ArticleList, HeroSection } from '../organisms'
import type { Article } from '../../types'

/**
 * ホームページテンプレートのプロパティ
 * @interface HomeTemplateProps
 */
export interface HomeTemplateProps {
  /** 表示する記事の一覧 */
  articles: Article[]
}

/**
 * ホームページテンプレート
 * @param {HomeTemplateProps} props - テンプレートのプロパティ
 * @returns {JSX.Element} ホームページのレイアウト
 * @description
 * - ヒーローセクションと記事一覧を含む
 * - レスポンシブデザイン対応
 * @example
 * <HomeTemplate articles={allArticles} />
 */
export function HomeTemplate({ articles }: HomeTemplateProps) {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 max-w-screen-xl">
        <ArticleList articles={articles} />
      </div>
    </>
  )
}