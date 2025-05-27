import type { ReactNode } from 'react'

/**
 * 基本的なコンポーネントプロパティ
 * @interface BaseComponentProps
 * @description すべてのコンポーネントが継承すべき基本プロパティ
 */
export interface BaseComponentProps {
  /** カスタムCSSクラス名 */
  className?: string
  /** 子要素 */
  children?: ReactNode
}

/**
 * データ属性を持つコンポーネントプロパティ
 * @interface WithDataAttributes
 * @description data-*属性をサポートするコンポーネント用
 */
export interface WithDataAttributes {
  /** データ属性のマップ */
  [key: `data-${string}`]: string | number | boolean | undefined
}

/**
 * ARIA属性を持つコンポーネントプロパティ
 * @interface WithAriaAttributes
 * @description アクセシビリティのためのARIA属性
 */
export interface WithAriaAttributes {
  /** ARIAラベル */
  'aria-label'?: string
  /** ARIA説明 */
  'aria-describedby'?: string
  /** ARIA非表示 */
  'aria-hidden'?: boolean
  /** ARIAロール */
  role?: string
}

/**
 * インタラクティブコンポーネントプロパティ
 * @interface InteractiveComponentProps
 * @extends {BaseComponentProps}
 * @extends {WithAriaAttributes}
 * @description クリックやホバーなどのインタラクションを持つコンポーネント用
 */
export interface InteractiveComponentProps extends BaseComponentProps, WithAriaAttributes {
  /** 無効状態 */
  disabled?: boolean
  /** クリックハンドラ */
  onClick?: () => void
  /** ホバーハンドラ */
  onHover?: () => void
  /** フォーカスハンドラ */
  onFocus?: () => void
  /** ブラーハンドラ */
  onBlur?: () => void
}

/**
 * スタイルバリアントプロパティ
 * @interface WithStyleVariants
 * @description 複数のスタイルバリアントを持つコンポーネント用
 */
export interface WithStyleVariants<TVariant extends string = string> {
  /** スタイルバリアント */
  variant?: TVariant
  /** サイズバリアント */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * レスポンシブプロパティ
 * @interface ResponsiveValue
 * @template T - 値の型
 * @description レスポンシブデザインのための値定義
 */
export interface ResponsiveValue<T> {
  /** モバイル向けの値 */
  base?: T
  /** タブレット向けの値（768px以上） */
  md?: T
  /** デスクトップ向けの値（1024px以上） */
  lg?: T
  /** 大画面向けの値（1280px以上） */
  xl?: T
}

/**
 * アイテムプロパティ
 * @interface ItemProps
 * @template T - アイテムデータの型
 * @description リストアイテムなどの個別要素用
 */
export interface ItemProps<T> extends BaseComponentProps {
  /** アイテムデータ */
  item: T
  /** インデックス */
  index?: number
  /** 選択状態 */
  isSelected?: boolean
  /** アクティブ状態 */
  isActive?: boolean
}

/**
 * コレクションプロパティ
 * @interface CollectionProps
 * @template T - アイテムデータの型
 * @description リストやグリッドなどのコレクション用
 */
export interface CollectionProps<T> extends BaseComponentProps {
  /** アイテムの配列 */
  items: T[]
  /** レンダリング関数 */
  renderItem?: (item: T, index: number) => ReactNode
  /** 空状態の表示 */
  emptyState?: ReactNode
  /** 読み込み中状態 */
  isLoading?: boolean
  /** エラー状態 */
  error?: Error | null
}