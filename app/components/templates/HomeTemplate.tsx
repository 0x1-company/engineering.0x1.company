import type { ReactNode } from "react"
import { ArticleList, HeroSection } from '../organisms'
import type { Article } from '../../types'

export interface HomeTemplateProps {
  articles: Article[]
}

export function HomeTemplate({ articles }: HomeTemplateProps) {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 max-w-screen-xl">
        <ArticleList articles={articles} />
      </div>
    </>
  )
}