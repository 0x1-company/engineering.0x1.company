import { memo } from 'react'
import { Link } from '../atoms'
import { ArticleImage, ArticleTitle, ArticleDescription, ArticleDate, ReadMoreLink } from '../molecules'
import type { Article } from '../../types'
import { validateProps, validateRequired, validateEnum } from '../../lib/utils/validation'

export interface ArticleCardProps {
  article: Article
  className?: string
  priority?: 'high' | 'low'
}

function ArticleCardComponent(props: ArticleCardProps) {
  const { article, className = '', priority = 'low' } = validateProps('ArticleCard', props, {
    article: (v) => validateRequired(v, 'article', 'ArticleCard'),
    priority: (v) => v ? validateEnum(v, 'priority', 'ArticleCard', ['high', 'low'] as const) : 'low'
  })
  const ogpPath = `/ogps/${article.entryName}.png`

  return (
    <article className={`group bg-white border border-gray-200/60 rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col hover:border-gray-300 hover:shadow-2xl hover:-translate-y-2 ${className}`}>
      <Link 
        href={`/articles/${article.entryName}`} 
        className="flex flex-col h-full"
      >
        <div className="relative aspect-[1200/630] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
          <ArticleImage 
            src={ogpPath}
            alt={article.frontmatter.title}
            priority={priority}
          />
        </div>
        
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <ArticleTitle 
            title={article.frontmatter.title}
            variant="card"
          />
          
          <ArticleDescription 
            description={article.frontmatter.description}
            variant="card"
          />
          
          <div className="mt-auto pt-6 flex justify-between items-center border-t border-gray-100">
            <ArticleDate date={article.frontmatter.date} />
            <ReadMoreLink />
          </div>
        </div>
      </Link>
    </article>
  )
}

export const ArticleCard = memo(ArticleCardComponent)