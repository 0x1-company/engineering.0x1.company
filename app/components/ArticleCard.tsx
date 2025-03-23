import { formattedDate } from '../lib/date'
import type { Article } from '../types'

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const ogpPath = `/ogps/${article.entryName}.png`;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <a href={`/articles/${article.entryName}`} className="block h-full">
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={ogpPath} 
            alt={article.frontmatter.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 line-clamp-2 hover:text-[#FF8040] transition-colors">
            {article.frontmatter.title}
          </h2>
          <time className="text-gray-600 text-sm block mb-3">
            {formattedDate(article.frontmatter.date)}
          </time>
          <p className="text-gray-700 line-clamp-3">
            {article.frontmatter.description}
          </p>
        </div>
      </a>
    </article>
  )
}
