import { Text } from '../atoms'
import { ArticleCard } from './ArticleCard'
import type { Article } from '../../types'

export interface ArticleListProps {
  articles: Article[]
  onArticleClick?: (article: Article) => void
}

export function ArticleList({ articles, onArticleClick }: ArticleListProps) {
  return (
    <div>
      <Text 
        as="h2"
        variant="title"
        className="mb-6 text-gray-800 border-b pb-2"
      >
        Latest Articles
      </Text>
      
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {articles.map((article, index) => {
          const priority = index < 2 ? 'high' : 'low'
          
          const handleClick = () => {
            if (onArticleClick) {
              onArticleClick(article)
            } else {
              window.location.href = `/articles/${article.entryName}`
            }
          }
          
          return (
            <ArticleCard 
              key={article.entryName} 
              article={article} 
              onClick={handleClick}
              priority={priority}
              className="hover:shadow-lg transition-shadow duration-300"
            />
          )
        })}
      </div>
    </div>
  )
}