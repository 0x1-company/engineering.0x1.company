import { Text } from '../atoms'
import { ArticleCard } from './ArticleCard'
import type { Article } from '../../types'

export interface ArticleListProps {
  articles: Article[]
  showTitle?: boolean
}

export function ArticleList({ articles, showTitle = true }: ArticleListProps) {
  return (
    <div>
      {showTitle && (
        <Text 
          as="h2"
          variant="title"
          className="mb-6 text-gray-800 border-b pb-2"
        >
          Latest Articles
        </Text>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {articles.map((article, index) => {
          const priority = index < 2 ? 'high' : 'low'
          
          return (
            <ArticleCard 
              key={article.entryName} 
              article={article} 
              priority={priority}
              className="hover:shadow-lg transition-shadow duration-300"
            />
          )
        })}
      </div>
    </div>
  )
}