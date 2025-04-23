import { formattedDate } from '../lib/date'
import type { Article } from '../types'

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const ogpPath = `/ogps/${article.entryName}.png`;

  return (
    <article className="bg-white border border-gray-100 hover:border-gray-200 rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col">
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
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-lg font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {article.frontmatter.title}
          </h2>
          <p className="text-gray-700 text-sm line-clamp-3 flex-grow">
            {article.frontmatter.description}
          </p>
          <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100">
            <time className="text-gray-500 text-xs font-medium">
              {formattedDate(article.frontmatter.date)}
            </time>
            <span className="text-xs font-medium text-blue-600 hover:underline inline-flex items-center">
              続きを読む
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </div>
        </div>
      </a>
    </article>
  )
}
