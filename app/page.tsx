import { Metadata } from 'next';
import { HomeTemplate } from './components/templates';
import { getArticles } from './lib/articles';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://engineering.0x1.company',
  },
};

/**
 * ホームページコンポーネント
 * @returns {Promise<JSX.Element>} ホームページのレイアウト
 * @description
 * - 全記事を取得してホームテンプレートに渡す
 * - SSGで静的生成される
 */
export default async function HomePage() {
  const articles = await getArticles();
  return <HomeTemplate articles={articles} />;
}