import type { ReactNode } from "react"

export interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  target?: string
  rel?: string
}

export function Button({ 
  children, 
  onClick, 
  href, 
  variant = 'primary', 
  size = 'md',
  className = '',
  target,
  rel
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200'
  
  const variantClasses = {
    primary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
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
    >
      {children}
    </button>
  )
}