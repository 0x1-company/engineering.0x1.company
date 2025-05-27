import type { ReactNode } from 'react'

export interface ListItemProps {
  children: ReactNode
  className?: string
  as?: 'li' | 'div'
}

/**
 * リストアイテムコンポーネント
 * @param {ListItemProps} props - リストアイテムのプロパティ
 * @returns {JSX.Element} リストアイテム要素
 * @description リスト要素のラッパーコンポーネント
 * @example
 * <ListItem>リスト項目</ListItem>
 * <ListItem className="flex items-center">カスタムスタイル付きリスト項目</ListItem>
 */
export function ListItem({ 
  children, 
  className = '',
  as: Component = 'li'
}: ListItemProps) {
  return (
    <Component className={className}>
      {children}
    </Component>
  )
}