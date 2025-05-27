import type { ReactNode, ElementType } from "react"

export interface TextProps {
  children: ReactNode
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'time'
  variant?: 'body' | 'caption' | 'title' | 'subtitle' | 'large'
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success'
  className?: string
}

export function Text({ 
  children, 
  as = 'p', 
  variant = 'body',
  color = 'primary',
  className = '' 
}: TextProps) {
  const Component = as
  
  const variantClasses = {
    body: 'text-base',
    caption: 'text-sm',
    title: 'text-2xl font-bold',
    subtitle: 'text-lg font-semibold',
    large: 'text-xl'
  }
  
  const colorClasses = {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    muted: 'text-gray-500',
    error: 'text-red-600',
    success: 'text-green-600'
  }
  
  const classes = `${variantClasses[variant]} ${colorClasses[color]} ${className}`
  
  return (
    <Component className={classes}>
      {children}
    </Component>
  )
}