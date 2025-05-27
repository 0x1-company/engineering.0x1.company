'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export const ArticleImage = ({ src, alt, width, height }: Props) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isFullUrl = src.startsWith("http");
  const imageUrl = isFullUrl ? src : `/assets/${src}`;
  
  // デフォルトのサイズを設定
  const imageWidth = width || 800;
  const imageHeight = height || 600;
  
  return (
    <>
      <figure className="my-8 flex justify-center">
        <div 
          className="relative cursor-zoom-in"
          onClick={() => setIsFullscreen(true)}
        >
          <Image
            src={imageUrl}
            alt={alt}
            width={imageWidth}
            height={imageHeight}
            className="rounded-lg shadow-md object-contain max-h-[500px] w-auto h-auto"
            loading="lazy"
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
        </div>
        {alt && (
          <figcaption className="mt-2 text-center text-sm text-gray-600">
            {alt}
          </figcaption>
        )}
      </figure>
      
      {/* フルスクリーンモーダル */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="relative max-w-full max-h-full">
            <Image
              src={imageUrl}
              alt={alt}
              width={imageWidth * 2}
              height={imageHeight * 2}
              className="object-contain max-w-full max-h-full"
              loading="eager"
              quality={100}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
              aria-label="閉じる"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
