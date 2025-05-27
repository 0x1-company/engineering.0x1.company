import type { ReactNode } from 'react'
import { Link, Icon } from '../atoms'

export interface FooterNavLinkProps {
  href?: string
  children: ReactNode
  isExternal?: boolean
  className?: string
}

/**
 * フッターナビゲーションリンクコンポーネント
 * @param {FooterNavLinkProps} props - フッターリンクのプロパティ
 * @returns {JSX.Element} フッターリンク要素
 * @description フッター用のリンクコンポーネント（外部リンクアイコン付き、リスト要素を含まない）
 * @example
 * <ul>
 *   <li><FooterNavLink href="/privacy" isExternal>Privacy Policy</FooterNavLink></li>
 * </ul>
 */
export function FooterNavLink({ href, children, isExternal = false, className = '' }: FooterNavLinkProps) {
  const linkContent = isExternal ? (
    <span className="flex items-center">
      <span>{children}</span>
      <Icon type="external-link" size="sm" className="ml-1" />
    </span>
  ) : children
  
  return (
    <Link
      href={href || "#"}
      className={`hover:text-[#FF8040] transition-colors ${className}`}
      isExternal={isExternal}
    >
      {linkContent}
    </Link>
  )
}