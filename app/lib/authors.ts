import type { Author } from '../types';

/**
 * 著者情報の管理
 */

/**
 * 著者データ（idを除いたAuthor型）
 */
export const authorsData: Record<string, Omit<Author, 'id'>> = {
  tomokisun: {
    name: 'tomokisun',
    avatar: 'https://engineering.0x1.company/tomokisun.png',
    bio: 'ONE株式会社 取締役',
    position: '取締役',
    company: 'ONE株式会社',
    skills: ['Swift', 'TypeScript', 'Dart', 'React', 'Next.js', 'Ruby on Rails', 'Blockchain'],
    social: {
      twitter: 'https://twitter.com/tomokisun',
      github: 'https://github.com/tomokisun',
      zenn: 'https://zenn.dev/tomokisun',
    },
  },
};

/**
 * 簡易的な著者情報
 * @typedef {Object} SimpleAuthor
 * @property {string} name - 著者名
 * @property {string} icon - 著者アイコンのURL
 */
type SimpleAuthor = {
  name: string;
  icon: string;
};

/**
 * 著者IDをキーとする著者情報のマップ
 * @typedef {Object.<string, SimpleAuthor>} Authors
 */
type Authors = {
  [key: string]: SimpleAuthor;
};

/**
 * 利用可能な著者の一覧（後方互換性のため維持）
 * @type {Authors}
 */
export const authors: Authors = Object.entries(authorsData).reduce(
  (acc, [id, author]) => ({
    ...acc,
    [id]: {
      name: author.name,
      icon: author.avatar,
    },
  }),
  {} as Authors
);

/**
 * 著者IDから著者情報を取得
 * @param {string} [authorId] - 著者ID
 * @returns {SimpleAuthor} 著者情報（未指定または不明な場合はデフォルト値）
 * @description
 * - 著者IDが未指定または存在しない場合は'Anonymous'を返す
 * - デフォルトアイコンはtomokisunの画像を使用
 * @example
 * const author = getAuthor('tomokisun');
 * console.log(author.name); // 'tomokisun'
 * 
 * const anonymous = getAuthor('unknown');
 * console.log(anonymous.name); // 'Anonymous'
 */
export const getAuthor = (authorId?: string): SimpleAuthor => {
  if (!authorId || !authors[authorId]) {
    // Default author if not specified or not found
    return {
      name: 'Anonymous',
      icon: 'https://engineering.0x1.company/tomokisun.png',
    };
  }
  
  return authors[authorId];
};

/**
 * 著者IDから完全な著者情報を取得
 * @param {string} authorId - 著者ID
 * @returns {Author} SNS情報を含む完全な著者情報
 * @description
 * - 完全なAuthor型の情報を返す
 * - 存在しない著者IDの場合はデフォルト値を返す
 * @example
 * const fullAuthor = getFullAuthor('tomokisun');
 * console.log(fullAuthor.social?.twitter); // 'https://twitter.com/tomokisun'
 */
export const getFullAuthor = (authorId: string): Author => {
  if (!authorsData[authorId]) {
    // デフォルト値を返す
    return {
      id: authorId,
      name: 'Anonymous',
      avatar: 'https://engineering.0x1.company/tomokisun.png',
      social: {},
    };
  }
  
  return {
    id: authorId,
    ...authorsData[authorId],
  };
};

/**
 * 有効な著者IDかどうかを確認
 * @param {string} authorId - 検証する著者ID
 * @returns {boolean} 著者IDが存在する場合true、存在しない場合false
 * @example
 * if (isValidAuthor('tomokisun')) {
 *   console.log('有効な著者です');
 * }
 */
export const isValidAuthor = (authorId: string): boolean => {
  return authorId in authorsData;
};

/**
 * 著者の記事数を取得する関数
 * @param {string} authorId - 著者ID
 * @returns {Promise<number>} 記事数
 */
export async function getAuthorArticleCount(authorId: string): Promise<number> {
  const { getArticles } = await import('./articles');
  const articles = await getArticles();
  return articles.filter(article => article.frontmatter.author === authorId).length;
}

/**
 * 著者の記事を取得する関数
 * @param {string} authorId - 著者ID
 * @param {number} page - ページ番号（1から始まる）
 * @param {number} limit - 1ページあたりの記事数
 * @returns {Promise<{articles: Article[], total: number, page: number, totalPages: number}>}
 */
export async function getAuthorArticles(authorId: string, page = 1, limit = 10) {
  const { getArticles } = await import('./articles');
  const articles = await getArticles();
  
  const authorArticles = articles.filter(
    article => article.frontmatter.author === authorId
  );
  
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    articles: authorArticles.slice(start, end),
    total: authorArticles.length,
    page,
    totalPages: Math.ceil(authorArticles.length / limit),
  };
}
