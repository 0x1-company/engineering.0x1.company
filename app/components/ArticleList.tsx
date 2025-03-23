import type { Article } from '../types'
import { ArticleCard } from './ArticleCard'

type ArticleListProps = {
  articles: Article[]
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.entryName} article={article} />
      ))}
    </div>
  )
}
