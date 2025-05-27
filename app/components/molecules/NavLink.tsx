import type { ReactNode } from 'react'
import { Link } from '../atoms'

export interface NavLinkProps {
  href: string
  children: ReactNode
  isExternal?: boolean
  className?: string
}

/**
 * ナビゲーションリンクコンポーネント
 * @param {NavLinkProps} props - ナビゲーションリンクのプロパティ
 * @returns {JSX.Element} ナビゲーションリンク要素
 * @description ヘッダーナビゲーション用のリンクコンポーネント（リスト要素を含まない）
 * @example
 * <ul>
 *   <li><NavLink href="/about">About</NavLink></li>
 * </ul>
 */
export function NavLink({ href, children, isExternal = false, className = '' }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-gray-700 hover:text-[#FF8040] transition-colors font-medium text-sm ${className}`}
      isExternal={isExternal}
    >
      {children}
    </Link>
  )
}