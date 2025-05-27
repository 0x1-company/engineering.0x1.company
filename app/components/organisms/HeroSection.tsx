import { Text } from '../atoms'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
      <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40 max-w-screen-xl">
        <div className="max-w-3xl">
          <Text as="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
            ONE Engineering
          </Text>
          <Text as="p" className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
            わたしたちの技術的な挑戦と発見を共有します。
            モバイルアプリ開発、クラウドインフラ、そして最新技術の活用について。
          </Text>
          <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              iOS Development
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Cloud Infrastructure
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              System Architecture
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}