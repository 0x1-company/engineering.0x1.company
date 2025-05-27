import { Image } from '../atoms'

export interface ArticleImageProps {
  src: string
  alt: string
  priority?: 'high' | 'low'
  className?: string
  aspectRatio?: string
}

export function ArticleImage({ 
  src, 
  alt, 
  priority = 'low', 
  className = '',
  aspectRatio = 'aspect-[1200/630]'
}: ArticleImageProps) {
  return (
    <div className={`w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 ${className}`}>
      <div className={`${aspectRatio} relative`}>
        <Image 
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          loading={priority === 'high' ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  )
}