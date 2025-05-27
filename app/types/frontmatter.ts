/**
 * 記事のフロントマター型定義
 * @interface Frontmatter
 * @description MDXファイルのフロントマターに必須のプロパティ
 * @example
 * ---
 * title: "記事タイトル"
 * date: "2025-01-27"
 * description: "記事の概要"
 * author: "tomokisun"
 * tags: ["Next.js", "React"]
 * ---
 */
export interface Frontmatter {
  /** 記事のタイトル（必須） */
  title: string;
  /** 公開日（YYYY-MM-DD形式、必須） */
  date: string;
  /** 記事の概要説明（必須） */
  description: string;
  /** 著者ID（必須） */
  author: string;
  /** タグ一覧 */
  tags?: string[];
  /** 更新日（YYYY-MM-DD形式） */
  updated?: string;
}

/**
 * 拡張フロントマター型
 * @interface ExtendedFrontmatter
 * @extends {Frontmatter}
 * @description システムが内部的に使用する追加プロパティ
 */
export interface ExtendedFrontmatter extends Frontmatter {
  /** URLスラッグ */
  slug?: string;
  /** 公開状態 */
  published?: boolean;
  /** カテゴリ */
  category?: string;
  /** 読了時間（分） */
  readingTime?: number;
}

/**
 * フロントマターのバリデーション用型ガード
 * @param {unknown} obj - 検証するオブジェクト
 * @returns {boolean} Frontmatter型に準拠している場合true
 * @example
 * const data = matter(mdxContent).data;
 * if (isFrontmatter(data)) {
 *   console.log(data.title);
 * }
 */
export function isFrontmatter(obj: unknown): obj is Frontmatter {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  
  const fm = obj as Record<string, unknown>;
  
  return (
    typeof fm.title === 'string' &&
    typeof fm.date === 'string' &&
    typeof fm.description === 'string' &&
    typeof fm.author === 'string' &&
    (fm.tags === undefined || (Array.isArray(fm.tags) && fm.tags.every((tag) => typeof tag === 'string'))) &&
    (fm.updated === undefined || typeof fm.updated === 'string')
  );
}

/**
 * 日付形式のバリデーション
 * @param {string} date - 検証する日付文字列
 * @returns {boolean} YYYY-MM-DD形式に準拠している場合true
 * @example
 * isValidDateFormat('2025-01-27'); // true
 * isValidDateFormat('2025/01/27'); // false
 * isValidDateFormat('01-27-2025'); // false
 */
export function isValidDateFormat(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

/**
 * フロントマターのバリデーション
 * @param {unknown} fm - 検証するフロントマターデータ
 * @throws {Error} 必須フィールドが欠けているか、日付形式が不正な場合
 * @returns {asserts fm is Frontmatter} 検証成功時はfmをFrontmatter型として扱える
 * @example
 * try {
 *   validateFrontmatter(data);
 *   // ここ以降、dataはFrontmatter型として安全に使用可能
 * } catch (error) {
 *   console.error('フロントマターエラー:', error.message);
 * }
 */
export function validateFrontmatter(fm: unknown): asserts fm is Frontmatter {
  if (!isFrontmatter(fm)) {
    throw new Error('Invalid frontmatter: missing required fields');
  }
  
  if (!isValidDateFormat(fm.date)) {
    throw new Error(`Invalid date format: ${fm.date}. Expected YYYY-MM-DD`);
  }
  
  if (fm.updated && !isValidDateFormat(fm.updated)) {
    throw new Error(`Invalid updated date format: ${fm.updated}. Expected YYYY-MM-DD`);
  }
}
