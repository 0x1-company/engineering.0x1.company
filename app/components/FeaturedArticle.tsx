import { formattedDate } from '../lib/date'
import type { Article } from '../types'

type FeaturedArticleProps = {
  article: Article
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const ogpPath = `/ogps/${article.entryName}.png`;

  return (
    <div className="mb-12 bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 overflow-hidden">
          <div className="aspect-[1200/630] relative">
            <img 
              src={ogpPath} 
              alt={article.frontmatter.title} 
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
        </div>
        <div className="lg:w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-block bg-[#FF8040] text-white text-xs font-semibold px-3 py-1 rounded-full">
              FEATURED
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4 hover:text-[#FF8040] transition-colors">
            <a href={`/articles/${article.entryName}`}>
              {article.frontmatter.title}
            </a>
          </h1>
          <time className="text-gray-600 text-sm block mb-4">
            {formattedDate(article.frontmatter.date)}
          </time>
          <p className="text-gray-700 mb-6 line-clamp-3">
            {article.frontmatter.description}
          </p>
          <a 
            href={`/articles/${article.entryName}`} 
            className="inline-block bg-black hover:bg-[#FF8040] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  )
}
