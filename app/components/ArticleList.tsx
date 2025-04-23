import type { Article } from '../types'
import { ArticleCard } from './ArticleCard'

type ArticleListProps = {
  articles: Article[]
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Latest Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.entryName} article={article} />
        ))}
      </div>
    </div>
  )
}
