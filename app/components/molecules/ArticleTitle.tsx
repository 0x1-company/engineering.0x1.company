import { Text } from '../atoms'

export interface ArticleTitleProps {
  title: string
  variant?: 'card' | 'preview-compact' | 'preview-expanded'
  className?: string
}

export function ArticleTitle({ title, variant = 'card', className = '' }: ArticleTitleProps) {
  const variantStyles = {
    card: 'text-lg font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-200',
    'preview-compact': 'text-lg font-bold hover:text-blue-600 transition-colors',
    'preview-expanded': 'text-xl font-bold mb-2 hover:text-blue-600 transition-colors'
  }
  
  const headingLevel = variant === 'preview-expanded' ? 'h3' : 'h2'
  
  return (
    <Text 
      as={headingLevel}
      className={`${variantStyles[variant]} ${className}`}
    >
      {title}
    </Text>
  )
}