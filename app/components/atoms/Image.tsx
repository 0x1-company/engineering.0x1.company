'use client'

import NextImage from 'next/image'
import { useState } from 'react'
import { validateProps, validateRequired, validateString, validateEnum, validateNumber, validateUrl } from '../../lib/utils/validation'

export interface ImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  fill?: boolean
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

export function Image(props: ImageProps) {
  const { 
    src, 
    alt, 
    className = '', 
    loading = 'lazy',
    width,
    height,
    priority = false,
    quality = 75,
    fill = false,
    sizes,
    placeholder,
    blurDataURL,
    onLoad,
    onError
  } = validateProps('Image', props, {
    src: (v) => validateRequired(validateUrl(v, 'src', 'Image', { allowRelative: true }), 'src', 'Image'),
    alt: (v) => validateRequired(validateString(v, 'alt', 'Image', { allowEmpty: true }), 'alt', 'Image'),
    loading: (v) => v ? validateEnum(v, 'loading', 'Image', ['eager', 'lazy'] as const) : 'lazy',
    width: (v) => v !== undefined ? validateNumber(v, 'width', 'Image', { min: 1, integer: true }) : undefined,
    height: (v) => v !== undefined ? validateNumber(v, 'height', 'Image', { min: 1, integer: true }) : undefined,
    quality: (v) => v !== undefined ? validateNumber(v, 'quality', 'Image', { min: 1, max: 100, integer: true }) : 75,
    placeholder: (v) => v ? validateEnum(v, 'placeholder', 'Image', ['blur', 'empty'] as const) : undefined
  })
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  // Next.js Imageを使用できるかチェック
  const isExternalImage = src.startsWith('http://') || src.startsWith('https://')
  const isOgpImage = src.includes('/ogps/')
  
  // OGP画像またはローカル画像の場合はNext.js Imageを使用
  if (!isExternalImage || isOgpImage) {
    return (
      <div className={`relative ${fill ? 'w-full h-full' : ''} ${className}`}>
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
        )}
        {hasError ? (
          <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <NextImage
            src={src}
            alt={alt}
            {...(!fill && width ? { width } : {})}
            {...(!fill && height ? { height } : {})}
            className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            {...(!priority && loading ? { loading } : {})}
            priority={priority}
            quality={quality}
            fill={fill}
            {...(sizes ? { sizes } : fill ? { sizes: '100vw' } : {})}
            {...(placeholder ? { placeholder } : {})}
            {...(blurDataURL ? { blurDataURL } : {})}
            onLoad={() => {
              setIsLoading(false)
              onLoad?.()
            }}
            onError={() => {
              setHasError(true)
              setIsLoading(false)
              onError?.()
            }}
          />
        )}
      </div>
    )
  }
  
  // 外部画像の場合は通常のimgタグを使用
  return (
    <img 
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      onLoad={onLoad}
      onError={onError}
    />
  )
}