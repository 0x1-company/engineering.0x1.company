import type { Article } from '../types'
import { ArticleCard } from './ArticleCard'

type ArticleListProps = {
  articles: Article[]
  featured?: boolean
}

export function ArticleList({ articles, featured = false }: ArticleListProps) {
  // If featured is true, we skip the first article as it's displayed separately
  const displayArticles = featured ? articles.slice(1) : articles;
  
  return (
    <div>
      {featured && (
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Latest Articles
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {displayArticles.map((article) => (
          <ArticleCard key={article.entryName} article={article} />
        ))}
      </div>
    </div>
  )
}
