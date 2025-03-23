import type { JSX } from "hono/jsx/jsx-runtime"

type HomeContainerProps = {
  children: JSX.Element;
}

export function HomeContainer({ children }: HomeContainerProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  )
}
