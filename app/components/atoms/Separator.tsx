export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/**
 * 区切り線コンポーネント
 * @param {SeparatorProps} props - 区切り線のプロパティ
 * @returns {JSX.Element} 区切り線要素
 * @description セクション間の視覚的な区切りを提供
 * @example
 * <Separator />
 * <Separator orientation="vertical" className="h-4" />
 */
export function Separator({ 
  orientation = 'horizontal',
  className = '' 
}: SeparatorProps) {
  const baseClasses = 'bg-gray-200'
  
  const orientationClasses = {
    horizontal: 'h-px w-full',
    vertical: 'w-px h-full'
  }
  
  return (
    <div
      className={`${baseClasses} ${orientationClasses[orientation]} ${className}`}
      role="separator"
      aria-orientation={orientation}
    />
  )
}