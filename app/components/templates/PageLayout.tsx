import type { JSX } from "hono/jsx/jsx-runtime"
import { Header, Footer } from '../organisms'

export interface PageLayoutProps {
  children: JSX.Element
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}