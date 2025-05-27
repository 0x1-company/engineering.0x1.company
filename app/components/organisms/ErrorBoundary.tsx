'use client'

import { Component, ReactNode } from 'react'
import { getErrorDetails } from '../../lib/errors'
import { Button } from '../atoms'

/**
 * エラーバウンダリの状態
 * @interface ErrorBoundaryState
 */
interface ErrorBoundaryState {
  /** エラーが発生したかどうか */
  hasError: boolean
  /** 発生したエラー */
  error?: Error
  /** エラーの詳細情報（コンポーネントスタック） */
  errorInfo?: { componentStack: string }
}

/**
 * エラーバウンダリのプロパティ
 * @interface ErrorBoundaryProps
 */
interface ErrorBoundaryProps {
  /** 子コンポーネント */
  children: ReactNode
  /** エラー時に表示するカスタムフォールバックUI */
  fallback?: ReactNode
  /** エラー発生時のコールバック関数 */
  onError?: (error: Error, errorInfo: { componentStack: string }) => void
}

/**
 * エラーバウンダリコンポーネント
 * @class ErrorBoundary
 * @extends {Component<ErrorBoundaryProps, ErrorBoundaryState>}
 * @description
 * - Reactコンポーネントツリー内のエラーをキャッチ
 * - エラー発生時にフォールバックUIを表示
 * - 開発環境では詳細なエラー情報を表示
 * @example
 * <ErrorBoundary
 *   fallback={<CustomError />}
 *   onError={(error) => console.error(error)}
 * >
 *   <App />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  /**
   * エラーからstateを更新
   * @param {Error} error - 発生したエラー
   * @returns {ErrorBoundaryState} 新しいstate
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  /**
   * エラー情報をログに記録
   * @param {Error} error - 発生したエラー
   * @param {{ componentStack: string }} errorInfo - エラーの詳細情報
   */
  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ errorInfo })
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const errorDetails = this.state.error ? getErrorDetails(this.state.error) : null
      const isDevelopment = process.env.NODE_ENV === 'development'

      return (
        <div className="min-h-64 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {errorDetails?.code === 'ARTICLE_NOT_FOUND' ? '記事が見つかりません' : 'エラーが発生しました'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {errorDetails?.message || '申し訳ございませんが、コンテンツの読み込み中にエラーが発生しました。'}
            </p>

            {isDevelopment && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  エラーの詳細を表示
                </summary>
                <div className="mt-2 p-4 bg-gray-100 rounded-lg overflow-auto">
                  <pre className="text-xs text-gray-700">
                    {this.state.error.stack}
                  </pre>
                  {this.state.errorInfo && (
                    <>
                      <p className="mt-2 font-semibold text-xs">Component Stack:</p>
                      <pre className="text-xs text-gray-700">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              </details>
            )}

            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
                size="md"
              >
                ページを再読み込み
              </Button>
              
              {errorDetails?.code !== 'ARTICLE_NOT_FOUND' && (
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  size="md"
                >
                  前のページに戻る
                </Button>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}