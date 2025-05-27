import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, Frontmatter, validateFrontmatter, compareArticles } from '../types'
import { getEntryNameFromPath } from '../utils';
import { ArticleNotFoundError, FileReadError, FrontmatterValidationError } from './errors';

/**
 * 記事ファイルの一覧を取得
 * @returns {string[]} MDXファイルの絶対パスの配列
 * @throws {FileReadError} ディレクトリの読み込みに失敗した場合
 * @private
 */
const getArticleFiles = (): string[] => {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  
  const getAllMdxFiles = (dir: string): string[] => {
    const files: string[] = [];
    
    try {
      const entries = fs.readdirSync(dir);
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        
        try {
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            files.push(...getAllMdxFiles(fullPath));
          } else if (entry.endsWith('.mdx')) {
            files.push(fullPath);
          }
        } catch (error) {
          console.error(`Failed to stat file: ${fullPath}`, error);
          // ファイルの状態取得に失敗しても処理を続行
        }
      }
    } catch (error) {
      throw new FileReadError(dir, error as Error);
    }
    
    return files;
  };
  
  return getAllMdxFiles(articlesDirectory);
};

// キャッシュ用変数
let articlesCache: Article[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5分

/**
 * すべての記事を取得（キャッシュ機能付き）
 * @returns {Promise<Article[]>} 日付順（新しい順）にソートされた記事の配列
 * @description
 * - 5分間のキャッシュ機能付き
 * - エラーが発生した記事はスキップして処理を継続
 * - 50%以上の記事で処理が失敗した場合は警告を出力
 * @example
 * const articles = await getArticles();
 * console.log(articles.length); // 記事数を表示
 */
export const getArticles = async (): Promise<Article[]> => {
  // キャッシュが有効な場合はキャッシュを返す
  if (articlesCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_TTL) {
    return articlesCache;
  }
  
  const files = getArticleFiles();
  const articles: Article[] = [];
  const errors: Array<{ path: string; error: Error }> = [];
  
  for (const filePath of files) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter, content } = matter(fileContent);
      
      // フロントマターのバリデーション
      try {
        validateFrontmatter(frontmatter);
      } catch (error) {
        throw new FrontmatterValidationError(filePath, (error as Error).message);
      }
      
      const entryName = getEntryNameFromPath(filePath);
      
      const article: Article = {
        entryName,
        frontmatter: frontmatter as Frontmatter,
        path: filePath,
      };
      
      if (content.length > 0) {
        article.content = content.substring(0, 200); // 抄要用に先頭200文字を保存
      }
      
      articles.push(article);
    } catch (error) {
      errors.push({ path: filePath, error: error as Error });
      console.error(`Failed to process article: ${filePath}`, error);
      // エラーが発生しても他の記事の処理を続行
    }
  }
  
  // エラーが多すぎる場合は警告
  if (errors.length > files.length * 0.5) {
    console.warn(`Warning: Failed to process ${errors.length} out of ${files.length} articles`);
  }
  
  // ソートしてキャッシュに保存
  const sortedArticles = articles.sort(compareArticles);
  articlesCache = sortedArticles;
  cacheTimestamp = Date.now();
  
  return sortedArticles;
};

/**
 * エントリ名から記事を取得
 * @param {string} entryName - 記事のエントリ名（ファイル名から拡張子を除いたもの）
 * @returns {Promise<Article>} 指定されたエントリ名に対応する記事
 * @throws {ArticleNotFoundError} 指定されたエントリ名の記事が見つからない場合
 * @example
 * try {
 *   const article = await getArticleByEntryName('my-first-post');
 *   console.log(article.frontmatter.title);
 * } catch (error) {
 *   console.error('記事が見つかりません');
 * }
 */
export const getArticleByEntryName = async (entryName: string): Promise<Article> => {
  const posts = await getArticles();
  const article = posts.find((post) => post.entryName === entryName);
  
  if (!article) {
    throw new ArticleNotFoundError(entryName);
  }
  
  return article;
}

/**
 * 指定された記事を除いた最新記事を取得
 * @param {string} entryName - 除外する記事のエントリ名
 * @param {number} [limit=4] - 取得する記事の最大数
 * @returns {Promise<Article[]>} 指定された記事を除いた最新記事の配列
 * @example
 * // 現在の記事以外の最新4件を取得
 * const relatedArticles = await getLatestArticlesWithoutTargetArticle('current-article', 4);
 */
export const getLatestArticlesWithoutTargetArticle = async (
  entryName: string,
  limit: number = 4
): Promise<Article[]> => {
  const posts = await getArticles();
  return posts.filter((post) => post.entryName !== entryName).slice(0, limit);
}

/**
 * ページネーション付き記事取得の結果
 * @interface PaginatedArticles
 * @property {Article[]} articles - 現在のページの記事配列
 * @property {number} currentPage - 現在のページ番号（1始まり）
 * @property {number} totalPages - 総ページ数
 * @property {number} totalCount - 記事の総数
 * @property {boolean} hasNextPage - 次のページが存在するか
 * @property {boolean} hasPreviousPage - 前のページが存在するか
 */
export interface PaginatedArticles {
  articles: Article[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * ページネーション付きで記事を取得
 * @param {number} [page=1] - 取得するページ番号（1始まり）
 * @param {number} [perPage=10] - 1ページあたりの記事数
 * @returns {Promise<PaginatedArticles>} ページネーション情報を含む記事データ
 * @description
 * - ページ番号は1から始まる
 * - 無効なページ番号は自動的に有効な範囲に調整される
 * - 記事は日付順（新しい順）にソートされる
 * @example
 * // 1ページ目、10件ずつ取得
 * const result = await getArticlesPaginated(1, 10);
 * console.log(`${result.currentPage}/${result.totalPages}ページ`);
 */
export const getArticlesPaginated = async (
  page: number = 1,
  perPage: number = 10
): Promise<PaginatedArticles> => {
  const allArticles = await getArticles();
  const totalCount = allArticles.length;
  const totalPages = Math.ceil(totalCount / perPage);
  
  // ページ番号の検証
  const currentPage = Math.max(1, Math.min(page, totalPages));
  
  // ページネーション計算
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const articles = allArticles.slice(startIndex, endIndex);
  
  return {
    articles,
    currentPage,
    totalPages,
    totalCount,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

/**
 * 記事のキャッシュをクリア
 * @returns {void}
 * @description
 * - 記事の追加・更新・削除後に呼び出す
 * - 次回のgetArticles()呼び出し時に記事が再読み込みされる
 * @example
 * // 新しい記事を追加した後
 * clearArticlesCache();
 * const articles = await getArticles(); // 最新の記事一覧を取得
 */
export const clearArticlesCache = (): void => {
  articlesCache = null;
  cacheTimestamp = null;
};

