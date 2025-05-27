import type { ReactNode } from "react"

export interface LinkProps {
  href: string
  children: ReactNode
  className?: string
  isExternal?: boolean
  target?: string
  rel?: string
}

export function Link({ 
  href, 
  children, 
  className = '', 
  isExternal = false,
  target,
  rel
}: LinkProps) {
  const finalTarget = target || (isExternal ? '_blank' : undefined)
  const finalRel = rel || (isExternal ? 'noopener noreferrer' : undefined)
  
  return (
    <a 
      href={href}
      className={className}
      target={finalTarget}
      rel={finalRel}
    >
      {children}
    </a>
  )
}