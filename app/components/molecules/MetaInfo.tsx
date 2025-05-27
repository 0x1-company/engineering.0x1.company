import { Text, Icon } from '../atoms'
import { ArticleDate } from './ArticleDate'
export interface AuthorInfo {
  name: string
  icon?: string
}

export interface MetaInfoProps {
  date: string
  author?: AuthorInfo
  readingTime?: number
  className?: string
}

/**
 * メタ情報表示コンポーネント
 * @param {MetaInfoProps} props - メタ情報のプロパティ
 * @returns {JSX.Element} メタ情報要素
 * @description 記事の日付、著者、読了時間などのメタ情報を表示
 * @example
 * <MetaInfo 
 *   date="2025-01-27" 
 *   author={{ name: 'John Doe', icon: '/avatar.jpg' }}
 *   readingTime={5}
 * />
 */
export function MetaInfo({ 
  date, 
  author,
  readingTime,
  className = '' 
}: MetaInfoProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm text-gray-600 ${className}`}>
      <ArticleDate date={date} />
      
      {author && (
        <div className="flex items-center gap-2">
          <Icon type="user" size="sm" />
          <Text as="span" variant="caption" color="muted">
            {author.name}
          </Text>
        </div>
      )}
      
      {readingTime && (
        <div className="flex items-center gap-2">
          <Icon type="clock" size="sm" />
          <Text as="span" variant="caption" color="muted">
            {readingTime}分で読了
          </Text>
        </div>
      )}
    </div>
  )
}