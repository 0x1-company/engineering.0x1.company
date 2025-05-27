import { createRoute } from 'honox/factory'
import { getArticles } from '../lib/articles'
import { ArticleList, HomeTemplate } from '../components'
import { formattedDate } from '../lib/date'

export default createRoute((c) => {
  const articles = getArticles()
  const latestDate = articles.length > 0 ? formattedDate(articles[0].frontmatter.date) : null

  return c.render(
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <HomeTemplate>
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl -z-10" />
            <div className="text-center py-16 md:py-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Tech Blog
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent animate-fade-in-up">
                ONE Engineering
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
                技術的な知見や学びを共有する<br className="md:hidden" />
                <span className="font-semibold text-gray-800">ONE株式会社</span>のエンジニアリングブログ
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 animate-fade-in-up animation-delay-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{articles.length} Articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>最終更新: {latestDate}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Articles Section */}
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">最新の記事</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent ml-8" />
            </div>
            
            <ArticleList articles={articles} />
          </div>
        </div>
      </HomeTemplate>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  )
})
