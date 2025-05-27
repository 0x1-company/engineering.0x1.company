import { Badge } from '../atoms'

export interface TagListProps {
  tags: string[]
  className?: string
  size?: 'sm' | 'md'
}

/**
 * タグリストコンポーネント
 * @param {TagListProps} props - タグリストのプロパティ
 * @returns {JSX.Element} タグリスト要素
 * @description 記事のタグを横並びで表示
 * @example
 * <TagList tags={['React', 'Next.js', 'TypeScript']} />
 */
export function TagList({ 
  tags, 
  className = '',
  size = 'md' 
}: TagListProps) {
  if (!tags || tags.length === 0) {
    return null
  }
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Badge key={tag} variant="default" size={size}>
          {tag}
        </Badge>
      ))}
    </div>
  )
}