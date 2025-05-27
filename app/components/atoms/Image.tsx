export interface ImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  width?: number
  height?: number
}

export function Image({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  width,
  height
}: ImageProps) {
  return (
    <img 
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
    />
  )
}