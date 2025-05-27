import type { JSX } from 'hono/jsx/jsx-runtime'
import { Link, Icon } from '../atoms'

export interface FooterNavLinkProps {
  href?: string
  children: JSX.Element | string
  isExternal?: boolean
  className?: string
}

export function FooterNavLink({ href, children, isExternal = false, className = '' }: FooterNavLinkProps) {
  const linkContent = isExternal ? (
    <span className="flex items-center">
      <span>{children}</span>
      <Icon type="external-link" size="sm" className="ml-1" />
    </span>
  ) : children
  
  return (
    <li>
      <Link
        href={href || "#"}
        className={`hover:text-[#FF8040] transition-colors ${className}`}
        isExternal={isExternal}
      >
        {linkContent}
      </Link>
    </li>
  )
}