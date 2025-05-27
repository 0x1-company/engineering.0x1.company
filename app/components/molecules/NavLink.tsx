import type { ReactNode } from 'react'
import { Link } from '../atoms'

export interface NavLinkProps {
  href: string
  children: ReactNode
  isExternal?: boolean
  className?: string
}

export function NavLink({ href, children, isExternal = false, className = '' }: NavLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className={`px-4 py-2 text-gray-700 hover:text-[#FF8040] transition-colors font-medium text-sm ${className}`}
        isExternal={isExternal}
      >
        {children}
      </Link>
    </li>
  )
}