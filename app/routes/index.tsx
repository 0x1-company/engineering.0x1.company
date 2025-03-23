import { createRoute } from 'honox/factory'
import { getArticles } from '../lib/articles'
import { ArticleList } from '../components/ArticleList'
import { HomeContainer } from '../components/HomeContainer'
import { FeaturedArticle } from '../components/FeaturedArticle'

export default createRoute((c) => {
  const articles = getArticles()
  const featuredArticle = articles[0]

  return c.render(
    <HomeContainer>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Engineering Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            技術的な知見や学びを共有するONE株式会社のエンジニアリングブログです
          </p>
        </div>
        
        {/* Featured Article */}
        <FeaturedArticle article={featuredArticle} />
        
        {/* Article List */}
        <ArticleList articles={articles} featured={true} />
      </div>
    </HomeContainer>
  )
})
