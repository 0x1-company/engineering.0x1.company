import type { ReactNode } from "react"
import { cn } from '../../lib/utils'
import { validateProps, validateEnum, validateUrl } from '../../lib/utils/validation'

export interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  target?: string
  rel?: string
  disabled?: boolean
  'aria-label'?: string
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | undefined
}

export function Button(props: ButtonProps) {
  const { 
    children, 
    onClick, 
    href, 
    variant = 'primary', 
    size = 'md',
    className = '',
    target,
    rel,
    disabled = false,
    'aria-label': ariaLabel,
    'aria-current': ariaCurrent
  } = validateProps('Button', props, {
    variant: (v) => v ? validateEnum(v, 'variant', 'Button', ['primary', 'secondary', 'outline', 'ghost'] as const) : 'primary',
    size: (v) => v ? validateEnum(v, 'size', 'Button', ['sm', 'md', 'lg'] as const) : 'md',
    href: (v) => v ? validateUrl(v, 'href', 'Button', { allowRelative: true }) : undefined,
    'aria-current': (v) => v ? validateEnum(v, 'aria-current', 'Button', ['page', 'step', 'location', 'date', 'time', 'true', 'false'] as const) : undefined
  })
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200'
  
  const variantClasses = {
    primary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )
  
  if (href) {
    return (
      <a 
        href={href} 
        className={classes}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    )
  }
  
  return (
    <button 
      onClick={onClick} 
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </button>
  )
}