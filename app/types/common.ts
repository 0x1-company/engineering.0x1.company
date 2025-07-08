/**
 * 共通の型定義
 */

/**
 * 著者情報の型定義
 * @interface Author
 * @description 記事の著者情報を表現するインターフェース
 */
export interface Author {
  /** 著者ID（一意識別子） */
  id: string;
  /** 表示名 */
  name: string;
  /** アバター画像のURL */
  avatar: string;
  /** 一覧ページ用の短い紹介文（60文字程度） */
  bio?: string;
  /** 役職 */
  position?: string;
  /** 所属 */
  company?: string;
  /** スキル・専門分野 */
  skills?: string[];
  /** SNSリンク */
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
    zenn?: string;
    qiita?: string;
  };
}

/**
 * OGP（Open Graph Protocol）情報の型定義
 * @interface OgpData
 * @description SNSでシェアされる際のプレビュー情報
 */
export interface OgpData {
  /** ページタイトル */
  title: string;
  /** ページの説明 */
  description?: string;
  /** OGP画像のURL */
  image?: string;
  /** ページのURL */
  url?: string;
}

/**
 * ナビゲーションリンクの型定義
 * @interface NavLink
 * @description ヘッダーやフッターのナビゲーションリンク
 */
export interface NavLink {
  /** リンクテキスト */
  label: string;
  /** リンク先URL */
  href: string;
  /** 外部リンクかどうか */
  external?: boolean;
}

/**
 * レスポンシブ画像の型定義
 * @interface ResponsiveImage
 * @description 最適化された画像表示のための情報
 */
export interface ResponsiveImage {
  /** 画像のソースURL */
  src: string;
  /** 代替テキスト */
  alt: string;
  /** 画像の幅 */
  width?: number;
  /** 画像の高さ */
  height?: number;
  /** 遅延読み込みを行うか */
  loading?: 'lazy' | 'eager';
}

/**
 * エラー情報の型定義
 * @interface ErrorInfo
 * @description アプリケーションのエラー情報を統一的に表現
 */
export interface ErrorInfo {
  /** エラーコード */
  code: string;
  /** エラーメッセージ */
  message: string;
  /** 詳細情報 */
  details?: unknown;
}

/**
 * ページメタデータの型定義
 * @interface PageMetadata
 * @description SEOとソーシャルシェアのためのメタデータ
 */
export interface PageMetadata {
  /** ページタイトル */
  title: string;
  /** ページの説明 */
  description: string;
  /** キーワード */
  keywords?: string[];
  /** OGP情報 */
  ogp?: OgpData;
}