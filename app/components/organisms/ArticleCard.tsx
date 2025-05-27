import { Link } from '../atoms'
import { ArticleImage, ArticleTitle, ArticleDescription, ArticleDate, ReadMoreLink } from '../molecules'
import type { Article } from '../../types'

export interface ArticleCardProps {
  article: Article
  className?: string
  onClick?: () => void
  priority?: 'high' | 'low'
}

export function ArticleCard({ article, className, onClick, priority = 'low' }: ArticleCardProps) {
  const ogpPath = `/ogps/${article.entryName}.png`
  
  const handleClick = (e: any) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <article className={`group bg-white border border-gray-100 hover:border-gray-300 rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:-translate-y-1 ${className || ''}`}>
      <Link 
        href={`/articles/${article.entryName}`} 
        className="flex flex-col h-full"
      >
        <div onClick={handleClick}>
          <ArticleImage 
            src={ogpPath}
            alt={article.frontmatter.title}
            priority={priority}
          />
          
          <div className="p-6 flex flex-col flex-grow">
            <ArticleTitle 
              title={article.frontmatter.title}
              variant="card"
            />
            
            <ArticleDescription 
              description={article.frontmatter.description}
              variant="card"
            />
            
            <div className="mt-6 flex justify-between items-center">
              <ArticleDate date={article.frontmatter.date} />
              <ReadMoreLink />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}