/**
 * 日付文字列を日本語形式（YYYY/MM/DD）にフォーマット
 * @param {string} date - フォーマットする日付文字列（ISO 8601形式推奨）
 * @returns {string} 日本語形式にフォーマットされた日付文字列
 * @example
 * formattedDate('2025-01-15'); // '2025/01/15'
 * formattedDate('2025-01-15T10:30:00Z'); // '2025/01/15'
 * 
 * @example
 * // フロントマターの日付をフォーマット
 * const article = await getArticleByEntryName('my-article');
 * const displayDate = formattedDate(article.frontmatter.date);
 */
export const formattedDate = (date: string) => {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
