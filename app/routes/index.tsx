import { createRoute } from 'honox/factory'
import { getArticles } from '../lib/articles'
import { ArticleList } from '../components/ArticleList'
import { HomeContainer } from '../components/HomeContainer'

export default createRoute((c) => {
  const articles = getArticles()

  return c.render(
    <HomeContainer>
      <ArticleList articles={articles} />
    </HomeContainer>
  )
})
