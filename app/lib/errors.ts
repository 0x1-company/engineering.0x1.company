/**
 * カスタムエラークラスの定義
 */

/**
 * ベースとなるカスタムエラークラス
 * @class AppError
 * @extends {Error}
 * @param {string} message - エラーメッセージ
 * @param {string} code - エラーコード（例: 'ARTICLE_NOT_FOUND'）
 * @param {number} [statusCode] - HTTPステータスコード
 * @param {unknown} [details] - エラーの詳細情報
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    
    // Errorクラスの継承時の対策
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * 記事が見つからない場合のエラー
 * @class ArticleNotFoundError
 * @extends {AppError}
 * @param {string} slug - 見つからなかった記事のスラッグ
 * @example
 * throw new ArticleNotFoundError('my-article');
 */
export class ArticleNotFoundError extends AppError {
  constructor(slug: string) {
    super(
      `Article not found: ${slug}`,
      'ARTICLE_NOT_FOUND',
      404,
      { slug }
    );
  }
}

/**
 * ファイル読み込みエラー
 * @class FileReadError
 * @extends {AppError}
 * @param {string} path - 読み込みに失敗したファイルパス
 * @param {Error} [originalError] - 元のエラーオブジェクト
 * @example
 * try {
 *   const content = fs.readFileSync(path);
 * } catch (error) {
 *   throw new FileReadError(path, error as Error);
 * }
 */
export class FileReadError extends AppError {
  constructor(path: string, originalError?: Error) {
    super(
      `Failed to read file: ${path}`,
      'FILE_READ_ERROR',
      500,
      { path, originalError: originalError?.message }
    );
  }
}

/**
 * フロントマターの検証エラー
 * @class FrontmatterValidationError
 * @extends {AppError}
 * @param {string} path - 検証に失敗したファイルパス
 * @param {string} reason - 検証失敗の理由
 * @example
 * if (!frontmatter.title) {
 *   throw new FrontmatterValidationError(filePath, 'title is required');
 * }
 */
export class FrontmatterValidationError extends AppError {
  constructor(path: string, reason: string) {
    super(
      `Invalid frontmatter in ${path}: ${reason}`,
      'FRONTMATTER_VALIDATION_ERROR',
      400,
      { path, reason }
    );
  }
}

/**
 * MDX解析エラー
 * @class MDXParseError
 * @extends {AppError}
 * @param {string} path - 解析に失敗したMDXファイルパス
 * @param {Error} [originalError] - 元のエラーオブジェクト
 * @example
 * try {
 *   const result = await compileMDX(content);
 * } catch (error) {
 *   throw new MDXParseError(filePath, error as Error);
 * }
 */
export class MDXParseError extends AppError {
  constructor(path: string, originalError?: Error) {
    super(
      `Failed to parse MDX file: ${path}`,
      'MDX_PARSE_ERROR',
      500,
      { path, originalError: originalError?.message }
    );
  }
}

/**
 * 設定エラー
 * @class ConfigurationError
 * @extends {AppError}
 * @param {string} message - エラーメッセージ
 * @param {unknown} [details] - 設定エラーの詳細情報
 * @example
 * if (!process.env.API_KEY) {
 *   throw new ConfigurationError('API_KEY is not set', { required: 'API_KEY' });
 * }
 */
export class ConfigurationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(
      message,
      'CONFIGURATION_ERROR',
      500,
      details
    );
  }
}

/**
 * エラーがAppErrorかどうかを判定
 * @param {unknown} error - 判定するエラー
 * @returns {boolean} AppErrorのインスタンスの場合true
 * @example
 * try {
 *   // 何かの処理
 * } catch (error) {
 *   if (isAppError(error)) {
 *     console.log(`Error code: ${error.code}`);
 *   }
 * }
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * エラーメッセージを安全に取得
 * @param {unknown} error - メッセージを取得するエラー
 * @returns {string} エラーメッセージ（取得できない場合はデフォルトメッセージ）
 * @example
 * catch (error) {
 *   const message = getErrorMessage(error);
 *   console.error(message);
 * }
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

/**
 * エラーの詳細情報を取得
 * @param {unknown} error - 詳細情報を取得するエラー
 * @returns {Object} エラーの詳細情報
 * @returns {string} returns.message - エラーメッセージ
 * @returns {string} [returns.code] - エラーコード
 * @returns {number} [returns.statusCode] - HTTPステータスコード
 * @returns {unknown} [returns.details] - その他の詳細情報
 * @example
 * catch (error) {
 *   const details = getErrorDetails(error);
 *   logger.error(details);
 * }
 */
export function getErrorDetails(error: unknown): {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
} {
  if (isAppError(error)) {
    return {
      message: error.message,
      code: error.code,
      ...(error.statusCode !== undefined && { statusCode: error.statusCode }),
      ...(error.details !== undefined && { details: error.details }),
    };
  }
  
  return {
    message: getErrorMessage(error),
    code: 'UNKNOWN_ERROR',
    statusCode: 500,
  };
}