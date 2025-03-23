import { formattedDate } from '../lib/date'
import type { Article } from '../types'

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const ogpPath = `/ogps/${article.entryName}.png`;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] h-full">
      <a href={`/articles/${article.entryName}`} className="block h-full flex flex-col">
        <div className="w-full overflow-hidden">
          <div className="aspect-[1200/630] relative">
            <img 
              src={ogpPath} 
              alt={article.frontmatter.title} 
              className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-xl font-bold mb-2 line-clamp-2 hover:text-[#FF8040] transition-colors">
            {article.frontmatter.title}
          </h2>
          <time className="text-gray-600 text-sm block mb-3">
            {formattedDate(article.frontmatter.date)}
          </time>
          <p className="text-gray-700 line-clamp-3 flex-grow">
            {article.frontmatter.description}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm font-medium text-[#FF8040] hover:underline">
              Read Article →
            </span>
          </div>
        </div>
      </a>
    </article>
  )
}
