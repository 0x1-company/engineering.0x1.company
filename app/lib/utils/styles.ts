import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * クラス名を結合してTailwindのコンフリクトを解決
 * @param {...ClassValue[]} inputs - クラス名の配列
 * @returns {string} 結合されたクラス名
 * @description clsxとtailwind-mergeを組み合わせて、条件付きクラスの結合とTailwindクラスのコンフリクト解決を行う
 * @example
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500') // 条件に応じてクラスを適用
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 共通のスタイル定義
 * @namespace styles
 * @description アプリケーション全体で使用される共通スタイル
 */
export const styles = {
  /** ボタンスタイル */
  button: {
    base: 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    variants: {
      primary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    },
    sizes: {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    },
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
  },
  
  /** テキストスタイル */
  text: {
    variants: {
      h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
      h2: 'text-3xl md:text-4xl font-bold',
      h3: 'text-2xl md:text-3xl font-bold',
      h4: 'text-xl md:text-2xl font-semibold',
      h5: 'text-lg md:text-xl font-semibold',
      h6: 'text-base md:text-lg font-semibold',
      body: 'text-base',
      caption: 'text-sm text-gray-600',
      small: 'text-xs text-gray-500',
    },
    colors: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      muted: 'text-gray-500',
      error: 'text-red-600',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      info: 'text-blue-600',
    },
  },
  
  /** レイアウトスタイル */
  layout: {
    container: 'container mx-auto px-4',
    section: 'py-8 md:py-12 lg:py-16',
    grid: {
      cols1: 'grid grid-cols-1 gap-6',
      cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
      cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    },
  },
  
  /** アニメーション */
  animation: {
    fadeIn: 'animate-fade-in',
    slideIn: 'animate-slide-in',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
  },
  
  /** シャドウ */
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    none: 'shadow-none',
  },
  
  /** ボーダー */
  border: {
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
  },
}

/**
 * レスポンシブクラスを生成
 * @param {Record<string, string>} values - ブレークポイントごとの値
 * @returns {string} レスポンシブクラス文字列
 * @example
 * responsive({ base: 'text-sm', md: 'text-base', lg: 'text-lg' })
 * // 'text-sm md:text-base lg:text-lg'
 */
export function responsive(values: Partial<Record<'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', string>>): string {
  const classes: string[] = []
  
  if (values.base) classes.push(values.base)
  if (values.sm) classes.push(`sm:${values.sm}`)
  if (values.md) classes.push(`md:${values.md}`)
  if (values.lg) classes.push(`lg:${values.lg}`)
  if (values.xl) classes.push(`xl:${values.xl}`)
  if (values['2xl']) classes.push(`2xl:${values['2xl']}`)
  
  return classes.join(' ')
}