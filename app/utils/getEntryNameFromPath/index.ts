/**
 * MDXファイルパスからエントリ名（ファイル名から拡張子を除いたもの）を抽出
 * @param {string} path - MDXファイルのパス
 * @returns {string} エントリ名（拡張子なしのファイル名）
 * @throws {Error} パスが無効な場合、またはMDXファイルでない場合
 * @example
 * getEntryNameFromPath('../../articles/2025/0127/my-article.mdx'); // 'my-article'
 * getEntryNameFromPath('/articles/hogehoge/fugafuga/aaa.mdx'); // 'aaa'
 * 
 * @example
 * // エラーケース
 * getEntryNameFromPath('invalid/path/'); // Error: Invalid path
 * getEntryNameFromPath('not-mdx.txt'); // Error: Invalid path
 */
export const getEntryNameFromPath = (path: string): string => {
  const match = path.match(/([^/]+)\.mdx$/);
  if (!match || !match[1]) {
    throw new Error(`Invalid path: ${path}`);
  }
  return match[1];
};
