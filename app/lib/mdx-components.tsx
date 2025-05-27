import React, { lazy, Suspense } from 'react'
import { AnchorLink } from './mdxComponents/anchorLink'
import { ArticleImage } from './mdxComponents/articleImage'

// 動的インポートでExternalOgpを遅延読み込み
const ExternalOgp = lazy(() => import('./mdxComponents/externalOgp').then(mod => ({ default: mod.ExternalOgp })))

type ComponentProps<T extends keyof React.JSX.IntrinsicElements> = React.JSX.IntrinsicElements[T]

// ExternalOgpのローディングコンポーネント
const ExternalOgpWithSuspense = (props: any) => (
  <Suspense fallback={
    <div className="border rounded-lg p-4 my-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
    </div>
  }>
    <ExternalOgp {...props} />
  </Suspense>
)

// Define the MDX components that will be used in MDX files
const mdxComponents = {
  // Custom components
  ExternalOgp: ExternalOgpWithSuspense,
  img: ArticleImage,
  a: AnchorLink,
  // Default components
  h1: (props: ComponentProps<'h1'>) => <h1 className="text-3xl font-bold mt-24 mb-4" {...props} />,
  h2: (props: ComponentProps<'h2'>) => <h2 className="text-2xl font-bold mt-20 mb-3" {...props} />,
  h3: (props: ComponentProps<'h3'>) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
  h4: (props: ComponentProps<'h4'>) => <h4 className="text-lg font-bold mt-4 mb-2" {...props} />,
  p: (props: ComponentProps<'p'>) => <p className="my-4" {...props} />,
  ul: (props: ComponentProps<'ul'>) => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: (props: ComponentProps<'ol'>) => <ol className="list-decimal pl-6 my-4" {...props} />,
  li: (props: ComponentProps<'li'>) => <li className="mb-1" {...props} />,
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
  ),
  code: (props: ComponentProps<'code'>) => {
    if (typeof props.children === 'string') {
      // Inline code
      return <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm" {...props} />
    }
    // Code block (already processed by rehype-pretty-code)
    return <code {...props} />
  },
  pre: (props: ComponentProps<'pre'>) => (
    <pre className="bg-gray-100 rounded p-4 overflow-x-auto my-4 font-mono text-sm" {...props} />
  ),
  table: (props: ComponentProps<'table'>) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: ComponentProps<'th'>) => (
    <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-bold" {...props} />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td className="border border-gray-300 px-4 py-2" {...props} />
  ),
  hr: (props: ComponentProps<'hr'>) => <hr className="my-6 border-t border-gray-300" {...props} />,
}

export default mdxComponents
