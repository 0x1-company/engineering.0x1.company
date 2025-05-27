/**
 * デザイントークン定義
 * @description アプリケーション全体で使用する統一されたデザイントークン
 */

/**
 * カラーパレット
 */
export const colors = {
  // ブランドカラー
  brand: {
    primary: '#10b981', // emerald-500
    secondary: '#065f46', // emerald-800
    accent: '#fbbf24', // amber-400
  },
  
  // 汎用カラー（ライトモード）
  light: {
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb', // gray-50
      tertiary: '#f3f4f6', // gray-100
    },
    text: {
      primary: '#111827', // gray-900
      secondary: '#4b5563', // gray-600
      tertiary: '#9ca3af', // gray-400
    },
    border: {
      primary: '#e5e7eb', // gray-200
      secondary: '#d1d5db', // gray-300
    },
    surface: {
      white: '#ffffff',
      gray: '#f9fafb', // gray-50
    }
  },
  
  // 汎用カラー（ダークモード）
  dark: {
    background: {
      primary: '#0a0a0a',
      secondary: '#171717',
      tertiary: '#262626',
    },
    text: {
      primary: '#fafafa',
      secondary: '#a3a3a3',
      tertiary: '#737373',
    },
    border: {
      primary: '#404040',
      secondary: '#525252',
    },
    surface: {
      white: '#171717',
      gray: '#262626',
    }
  },
  
  // ステータスカラー
  status: {
    success: '#10b981', // emerald-500
    warning: '#f59e0b', // amber-500
    error: '#ef4444', // red-500
    info: '#3b82f6', // blue-500
  }
} as const

/**
 * タイポグラフィ
 */
export const typography = {
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  },
  fontFamily: {
    sans: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      'sans-serif',
    ].join(', '),
    mono: [
      'ui-monospace',
      'SFMono-Regular',
      '"SF Mono"',
      'Consolas',
      '"Liberation Mono"',
      'Menlo',
      'monospace',
    ].join(', '),
  }
} as const

/**
 * スペーシング
 */
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
  '4xl': '6rem', // 96px
  '5xl': '8rem', // 128px
} as const

/**
 * 境界線
 */
export const borders = {
  radius: {
    none: '0',
    sm: '0.125rem', // 2px
    base: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    full: '9999px',
  },
  width: {
    none: '0',
    thin: '1px',
    base: '2px',
    thick: '4px',
  }
} as const

/**
 * シャドウ
 */
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const

/**
 * アニメーション
 */
export const animation = {
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
} as const

/**
 * ブレークポイント
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

/**
 * Z-index
 */
export const zIndex = {
  auto: 'auto',
  base: '0',
  dropdown: '1000',
  sticky: '1100',
  fixed: '1200',
  modalBackdrop: '1300',
  modal: '1400',
  popover: '1500',
  tooltip: '1600',
} as const