import { Fragment, JSX } from 'hono/jsx'
import { ExternalOgp } from './mdxComponents/externalOgp'
import { AnchorLink } from './mdxComponents/anchorLink'
import { ArticleImage } from './mdxComponents/articleImage'

type ComponentProps<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T]

// Define the MDX components that will be used in MDX files
export function useMDXComponents(components: Record<string, any> = {}) {
  return {
    // Custom components
    ExternalOgp,
    img: ArticleImage,
    a: AnchorLink,
    // Default components
    h1: (props: ComponentProps<'h1'>) => <h1 class="text-3xl font-bold mt-8 mb-4" {...props} />,
    h2: (props: ComponentProps<'h2'>) => <h2 class="text-2xl font-bold mt-6 mb-3" {...props} />,
    h3: (props: ComponentProps<'h3'>) => <h3 class="text-xl font-bold mt-5 mb-2" {...props} />,
    h4: (props: ComponentProps<'h4'>) => <h4 class="text-lg font-bold mt-4 mb-2" {...props} />,
    p: (props: ComponentProps<'p'>) => <p class="my-4" {...props} />,
    ul: (props: ComponentProps<'ul'>) => <ul class="list-disc pl-6 my-4" {...props} />,
    ol: (props: ComponentProps<'ol'>) => <ol class="list-decimal pl-6 my-4" {...props} />,
    li: (props: ComponentProps<'li'>) => <li class="mb-1" {...props} />,
    blockquote: (props: ComponentProps<'blockquote'>) => (
      <blockquote class="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
    ),
    code: (props: ComponentProps<'code'>) => {
      if (typeof props.children === 'string') {
        // Inline code
        return <code class="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm" {...props} />
      }
      // Code block (already processed by rehype-pretty-code)
      return <code {...props} />
    },
    pre: (props: ComponentProps<'pre'>) => (
      <pre class="bg-gray-100 rounded p-4 overflow-x-auto my-4 font-mono text-sm" {...props} />
    ),
    table: (props: ComponentProps<'table'>) => (
      <div class="overflow-x-auto my-4">
        <table class="min-w-full border-collapse" {...props} />
      </div>
    ),
    th: (props: ComponentProps<'th'>) => (
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-bold" {...props} />
    ),
    td: (props: ComponentProps<'td'>) => (
      <td class="border border-gray-300 px-4 py-2" {...props} />
    ),
    hr: (props: ComponentProps<'hr'>) => <hr class="my-6 border-t border-gray-300" {...props} />,
    // Override with user provided components
    ...components,
  }
}

export default { useMDXComponents }
