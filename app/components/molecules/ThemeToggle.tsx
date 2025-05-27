'use client'

import { useTheme } from '../../lib/hooks/useTheme'
import { Button } from '../atoms'
import { Icon } from '../atoms'

export interface ThemeToggleProps {
  className?: string
}

/**
 * テーマ切り替えボタン
 * @description ライト/ダーク/システムテーマを切り替えるボタン
 */
export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    // light -> dark -> system -> light のサイクル
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const iconType = theme === 'light' ? 'sun' : theme === 'dark' ? 'moon' : 'computer'
  const label = theme === 'light' ? 'ダークモードに切り替え' : 
                theme === 'dark' ? 'システム設定に従う' : 
                'ライトモードに切り替え'

  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      size="sm"
      className={`p-2 ${className}`}
      aria-label={label}
    >
      <Icon type={iconType} size="md" />
    </Button>
  )
}