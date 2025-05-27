import { Button } from '../atoms'

/**
 * ページネーションコンポーネントのプロパティ
 * @interface PaginationProps
 */
export interface PaginationProps {
  /** 現在のページ番号（1始まり） */
  currentPage: number
  /** 総ページ数 */
  totalPages: number
  /** ページ変更時のコールバック関数 */
  onPageChange: (page: number) => void
  /** 追加のCSSクラス名 */
  className?: string
}

/**
 * ページネーションコンポーネント
 * @param {PaginationProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} ページネーションUI
 * @description
 * - 最大5ページ分のページ番号を表示
 * - 現在のページを中央に配置
 * - 最初と最後のページは常に表示
 * - アクセシビリティ対応（aria属性付き）
 * @example
 * <Pagination
 *   currentPage={3}
 *   totalPages={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 */
export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = '' 
}: PaginationProps) {
  const pageNumbers = []
  const maxVisiblePages = 5
  
  // ページ番号の範囲を計算
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }
  
  return (
    <nav className={`flex items-center justify-center gap-2 ${className}`} aria-label="ページネーション">
      {/* 前へボタン */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        aria-label="前のページへ"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Button>
      
      {/* 最初のページ */}
      {startPage > 1 && (
        <>
          <Button
            onClick={() => onPageChange(1)}
            variant={currentPage === 1 ? "primary" : "ghost"}
            size="sm"
            aria-label="ページ 1"
            aria-current={currentPage === 1 ? "page" : undefined}
          >
            1
          </Button>
          {startPage > 2 && <span className="text-gray-500">...</span>}
        </>
      )}
      
      {/* ページ番号 */}
      {pageNumbers.map(number => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          variant={currentPage === number ? "primary" : "ghost"}
          size="sm"
          aria-label={`ページ ${number}`}
          aria-current={currentPage === number ? "page" : undefined}
        >
          {number}
        </Button>
      ))}
      
      {/* 最後のページ */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
          <Button
            onClick={() => onPageChange(totalPages)}
            variant={currentPage === totalPages ? "primary" : "ghost"}
            size="sm"
            aria-label={`ページ ${totalPages}`}
            aria-current={currentPage === totalPages ? "page" : undefined}
          >
            {totalPages}
          </Button>
        </>
      )}
      
      {/* 次へボタン */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
        aria-label="次のページへ"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </nav>
  )
}