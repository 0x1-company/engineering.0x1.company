import { Text } from '../atoms'
import { formattedDate } from '../../lib/date'

export interface ArticleDateProps {
  date: string
  className?: string
}

export function ArticleDate({ date, className = '' }: ArticleDateProps) {
  return (
    <Text 
      as="time" 
      variant="caption" 
      color="muted"
      className={`font-medium tracking-wide uppercase ${className}`}
    >
      {formattedDate(date)}
    </Text>
  )
}