import { Text } from '../atoms'

export interface ArticleDescriptionProps {
  description: string
  variant?: 'card' | 'preview-compact' | 'preview-expanded'
  className?: string
}

export function ArticleDescription({ description, variant = 'card', className = '' }: ArticleDescriptionProps) {
  const variantStyles = {
    card: 'text-gray-600 text-sm line-clamp-3 flex-grow leading-relaxed',
    'preview-compact': 'text-gray-700 text-sm mt-1 line-clamp-2',
    'preview-expanded': 'text-gray-700 text-base mt-2 line-clamp-2'
  }
  
  return (
    <Text 
      variant="body"
      className={`${variantStyles[variant]} ${className}`}
    >
      {description}
    </Text>
  )
}