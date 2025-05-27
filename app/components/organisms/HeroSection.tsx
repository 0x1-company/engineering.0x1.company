import { Text, Badge } from '../atoms'

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
          <div className="flex flex-wrap gap-4">
            <Badge variant="success" className="flex items-center gap-2 bg-green-600/80 text-green-100 border border-green-500">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              iOS Development
            </Badge>
            <Badge variant="info" className="flex items-center gap-2 bg-blue-600/80 text-blue-100 border border-blue-500">
              <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
              Cloud Infrastructure
            </Badge>
            <Badge variant="default" className="flex items-center gap-2 bg-purple-600/80 text-purple-100 border border-purple-500">
              <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
              System Architecture
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}