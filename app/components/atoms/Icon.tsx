import type { ReactElement } from "react"

export interface IconProps {
  type: 'arrow-right' | 'external-link' | 'instagram' | 'twitter' | 'sad-face'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Icon({ type, size = 'md', className = '' }: IconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  }
  
  const iconClasses = `${sizeClasses[size]} ${className}`
  
  const icons: Record<string, ReactElement> = {
    'arrow-right': (
      <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    ),
    'external-link': (
      <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    'instagram': (
      <svg className={iconClasses} viewBox="0 0 24 24">
        <defs>
          <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="10%" stopColor="#fdf497" />
            <stop offset="25%" stopColor="#fd5949" />
            <stop offset="35%" stopColor="#d6249f" />
            <stop offset="60%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="white" />
        <path fill="url(#instagram-gradient)" d="M12 7.5c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm0 7.425c-1.615 0-2.925-1.31-2.925-2.925S10.385 9.075 12 9.075 14.925 10.385 14.925 12 13.615 14.925 12 14.925zm5.73-7.605c0 .58-.47 1.05-1.05 1.05s-1.05-.47-1.05-1.05.47-1.05 1.05-1.05 1.05.47 1.05 1.05zm2.98 1.065c-.067-1.41-.389-2.658-1.422-3.687C18.26 3.669 17.011 3.347 15.6 3.277c-1.452-.082-5.804-.082-7.256 0-1.407.067-2.655.389-3.687 1.418S3.343 7.378 3.277 8.789c-.082 1.452-.082 5.804 0 7.256.067 1.41.389 2.658 1.418 3.687s2.276 1.351 3.687 1.422c1.452.082 5.804.082 7.256 0 1.41-.067 2.658-.389 3.687-1.422 1.029-1.029 1.351-2.276 1.422-3.687.082-1.452.082-5.8 0-7.252zm-1.876 8.814c-.307.77-.9 1.364-1.674 1.674-1.159.46-3.909.354-5.19.354s-4.035.102-5.19-.354c-.77-.307-1.364-.9-1.674-1.674-.46-1.159-.354-3.909-.354-5.19s-.102-4.035.354-5.19c.307-.77.9-1.364 1.674-1.674 1.159-.46 3.909-.354 5.19-.354s4.035-.102 5.19.354c.77.307 1.364.9 1.674 1.674.46 1.159.354 3.909.354 5.19s.106 4.035-.354 5.19z"/>
      </svg>
    ),
    'twitter': (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    'sad-face': (
      <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
  
  return icons[type] || null
}