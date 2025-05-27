/**
 * デザインシステムエクスポート
 */

export * from './tokens'
export { useTheme, ThemeProvider } from '../hooks/useTheme'

/**
 * デザインシステムユーティリティ
 */

import { colors, typography, spacing, borders, shadows, animation, breakpoints, zIndex } from './tokens'

/**
 * テーマ対応のカラー取得関数
 * @param lightColor ライトモードの色
 * @param darkColor ダークモードの色
 * @returns Tailwindクラス文字列
 */
export function themeColor(lightColor: string, darkColor: string): string {
  return `${lightColor} dark:${darkColor}`
}

/**
 * レスポンシブクラス生成関数
 * @param base デフォルトクラス
 * @param responsive ブレークポイントごとのクラス
 * @returns レスポンシブ対応クラス文字列
 */
export function responsive(
  base: string,
  responsive?: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
  }
): string {
  if (!responsive) return base
  
  let classes = base
  
  if (responsive.sm) classes += ` sm:${responsive.sm}`
  if (responsive.md) classes += ` md:${responsive.md}`
  if (responsive.lg) classes += ` lg:${responsive.lg}`
  if (responsive.xl) classes += ` xl:${responsive.xl}`
  if (responsive['2xl']) classes += ` 2xl:${responsive['2xl']}`
  
  return classes
}

/**
 * コンポーネントバリアント定義
 */
export const componentVariants = {
  button: {
    base: 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200',
    variants: {
      primary: themeColor(
        'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
        'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
      ),
      secondary: themeColor(
        'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
        'bg-gray-800 text-gray-100 hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
      ),
      outline: themeColor(
        'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'border border-gray-600 text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
      ),
      ghost: themeColor(
        'text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
        'text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
      ),
    },
    sizes: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
  },
  
  badge: {
    base: 'inline-flex items-center font-medium rounded-full',
    variants: {
      default: themeColor(
        'bg-gray-100 text-gray-800',
        'bg-gray-800 text-gray-200'
      ),
      primary: themeColor(
        'bg-green-100 text-green-800',
        'bg-green-900 text-green-200'
      ),
      secondary: themeColor(
        'bg-blue-100 text-blue-800',
        'bg-blue-900 text-blue-200'
      ),
      warning: themeColor(
        'bg-amber-100 text-amber-800',
        'bg-amber-900 text-amber-200'
      ),
      error: themeColor(
        'bg-red-100 text-red-800',
        'bg-red-900 text-red-200'
      ),
    },
    sizes: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-base',
    }
  },
  
  text: {
    variants: {
      h1: 'text-4xl font-bold tracking-tight',
      h2: 'text-3xl font-semibold tracking-tight',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-semibold',
      h6: 'text-base font-semibold',
      title: 'text-3xl font-bold',
      body: 'text-base leading-relaxed',
      caption: 'text-sm',
      small: 'text-xs',
    },
    colors: {
      primary: themeColor('text-gray-900', 'text-gray-100'),
      secondary: themeColor('text-gray-700', 'text-gray-300'),
      muted: themeColor('text-gray-500', 'text-gray-400'),
      brand: themeColor('text-green-600', 'text-green-400'),
    }
  }
} as const

// デザイントークンのエクスポート
export {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  animation,
  breakpoints,
  zIndex
}