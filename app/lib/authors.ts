import type { Author } from '../types';

/**
 * 著者情報の管理
 */

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
 * 利用可能な著者の一覧
 * @type {Authors}
 * @example
 * // 新しい著者を追加する場合
 * authors['newauthor'] = {
 *   name: 'New Author',
 *   icon: 'https://example.com/avatar.png'
 * };
 */
export const authors: Authors = {
  tomokisun: {
    name: 'tomokisun',
    icon: 'https://engineering.0x1.company/tomokisun.png',
  },
  // Add more authors as needed
};

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
 * - SimpleAuthorに加えてIDとSNS情報を含む
 * - tomokisunの場合はTwitterとGitHubのリンクを含む
 * @example
 * const fullAuthor = getFullAuthor('tomokisun');
 * console.log(fullAuthor.social?.twitter); // 'https://twitter.com/tomokisun'
 */
export const getFullAuthor = (authorId: string): Author => {
  const simpleAuthor = getAuthor(authorId);
  
  return {
    id: authorId,
    name: simpleAuthor.name,
    avatar: simpleAuthor.icon,
    social: authorId === 'tomokisun' ? {
      twitter: 'https://twitter.com/tomokisun',
      github: 'https://github.com/tomokisun',
    } : {},
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
  return authorId in authors;
};
