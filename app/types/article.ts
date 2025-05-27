import type { Frontmatter } from './frontmatter';

/**
 * 記事データの型定義
 * @interface Article
 * @description ブログ記事のデータ構造を定義するインターフェース
 */
export interface Article {
  /** 記事のエントリ名（ファイル名から抽出） */
  entryName: string;
  /** フロントマター情報 */
  frontmatter: Frontmatter;
  /** 記事ファイルのパス */
  path: string;
  /** 記事のコンテンツ（オプション） */
  content?: string;
  /** 記事の抄要（オプション） */
  excerpt?: string;
}

/**
 * 記事データのバリデーション用型ガード
 * @param {unknown} obj - 検証するオブジェクト
 * @returns {boolean} Article型に準拠している場合true
 * @example
 * const data: unknown = JSON.parse(jsonString);
 * if (isArticle(data)) {
 *   // dataはArticle型として安全に使用可能
 *   console.log(data.frontmatter.title);
 * }
 */
export function isArticle(obj: unknown): obj is Article {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  
  const article = obj as Record<string, unknown>;
  
  return (
    typeof article.entryName === 'string' &&
    article.frontmatter !== null &&
    typeof article.frontmatter === 'object' &&
    typeof article.path === 'string'
  );
}

/**
 * 記事のソート用比較関数
 * @param {Article} a - 比較する記事1
 * @param {Article} b - 比較する記事2
 * @returns {number} 日付の新しい順にソートするための比較値
 * @description
 * - aがbより新しい場合: 負の値
 * - aとbが同じ日付の場合: 0
 * - aがbより古い場合: 正の値
 * @example
 * const articles = [<articles array>];
 * articles.sort(compareArticles); // 新しい順にソート
 */
export function compareArticles(a: Article, b: Article): number {
  const dateA = new Date(a.frontmatter.date);
  const dateB = new Date(b.frontmatter.date);
  return dateB.getTime() - dateA.getTime();
}
