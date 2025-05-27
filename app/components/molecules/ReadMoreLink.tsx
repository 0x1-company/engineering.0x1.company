import { Icon } from '../atoms'

export interface ReadMoreLinkProps {
  className?: string
}

export function ReadMoreLink({ className = '' }: ReadMoreLinkProps) {
  return (
    <span className={`text-xs font-semibold text-blue-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200 ${className}`}>
      続きを読む
      <Icon 
        type="arrow-right" 
        size="sm"
        className="transform group-hover:translate-x-1 transition-transform duration-200"
      />
    </span>
  )
}