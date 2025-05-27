import { Link, Image } from '../atoms'
import { ArticleTitle, ArticleDescription, ArticleDate } from '../molecules'
import type { Article } from '../../types'

export interface ArticlePreviewProps {
  article: Article
  variant?: 'compact' | 'expanded'
  showDescription?: boolean
  showDate?: boolean
  className?: string
}

export function ArticlePreview({ 
  article, 
  variant = 'compact',
  showDescription = true,
  showDate = true,
  className = ''
}: ArticlePreviewProps) {
  const isExpanded = variant === 'expanded'
  
  return (
    <div className={`article-preview ${variant} ${className}`}>
      <Link href={`/articles/${article.entryName}`} className="block">
        <div>
          {isExpanded && (
            <div className="mb-4">
              <Image 
                src={`/ogps/${article.entryName}.png`}
                alt={article.frontmatter.title}
                className="w-full h-48 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          )}
          
          <ArticleTitle 
            title={article.frontmatter.title}
            variant={isExpanded ? 'preview-expanded' : 'preview-compact'}
          />
          
          {showDescription && (
            <ArticleDescription 
              description={article.frontmatter.description}
              variant={isExpanded ? 'preview-expanded' : 'preview-compact'}
            />
          )}
          
          {showDate && (
            <div className="mt-2">
              <ArticleDate 
                date={article.frontmatter.date}
                className="inline-block"
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}