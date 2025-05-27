import type { JSX } from "hono/jsx/jsx-runtime"

export interface HomeTemplateProps {
  children: JSX.Element
}

export function HomeTemplate({ children }: HomeTemplateProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 max-w-screen-xl">
      {children}
    </div>
  )
}