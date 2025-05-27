'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Text } from '../atoms'
import { Pagination } from '../molecules'
import { ArticleCard } from './ArticleCard'
import type { PaginatedArticles } from '../../lib/articles'

/**
 * ページネーション付き記事一覧のプロパティ
 * @interface PaginatedArticleListProps
 */
export interface PaginatedArticleListProps {
  /** 初期表示用のページネーションデータ */
  initialData: PaginatedArticles
  /** 1ページあたりの記事数 */
  perPage?: number
  /** タイトルを表示するかどうか */
  showTitle?: boolean
}

/**
 * ページネーション付き記事一覧コンポーネント
 * @param {PaginatedArticleListProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} ページネーション付き記事一覧
 * @description
 * - URLパラメータでページネーションを管理
 * - ページ変更時はURLを更新（ブラウザの履歴に追加）
 * - レスポンシブデザイン対応
 * @example
 * <PaginatedArticleList
 *   initialData={paginatedArticles}
 *   showTitle={true}
 * />
 */
export function PaginatedArticleList({ 
  initialData, 
  showTitle = true 
}: PaginatedArticleListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [paginatedData] = useState(initialData)
  
  // URLのページパラメータを監視
  useEffect(() => {
    const page = searchParams.get('page')
    const pageNumber = page ? parseInt(page, 10) : 1
    
    if (pageNumber !== paginatedData.currentPage) {
      // ここで新しいページのデータを取得する処理を追加
      // 現在はSSGなので、クライアントサイドでのデータ取得は行わない
    }
  }, [searchParams, paginatedData.currentPage])
  
  const handlePageChange = (page: number) => {
    // URLパラメータを更新
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : ''
    router.push(newUrl, { scroll: true })
  }
  
  return (
    <div>
      {showTitle && (
        <div className="mb-6 flex items-center justify-between">
          <Text 
            as="h2"
            variant="title"
            className="text-gray-800 border-b pb-2"
          >
            Latest Articles
          </Text>
          <Text
            as="span"
            variant="caption"
            color="muted"
          >
            {paginatedData.totalCount}件の記事
          </Text>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
        {paginatedData.articles.map((article, index) => {
          const priority = index < 2 ? 'high' : 'low'
          
          return (
            <ArticleCard 
              key={article.entryName} 
              article={article} 
              priority={priority}
              className="hover:shadow-lg transition-shadow duration-300"
            />
          )
        })}
      </div>
      
      {paginatedData.totalPages > 1 && (
        <Pagination
          currentPage={paginatedData.currentPage}
          totalPages={paginatedData.totalPages}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}
    </div>
  )
}