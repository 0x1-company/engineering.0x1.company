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
          className="mb-12 text-gray-900 text-3xl md:text-4xl font-bold tracking-tight"
        >
          Latest Articles
        </Text>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {articles.map((article, index) => {
          const priority = index < 3 ? 'high' : 'low'
          
          return (
            <ArticleCard 
              key={article.entryName} 
              article={article} 
              priority={priority}
              className="hover:shadow-xl transition-all duration-300"
            />
          )
        })}
      </div>
    </div>
  )
}