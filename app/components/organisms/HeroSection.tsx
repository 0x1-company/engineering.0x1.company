import { Text } from '../atoms'

interface HeroSectionProps {
  title?: string;
  description?: string;
}

export function HeroSection({ 
  title = 'ONE Engineering',
  description = 'わたしたちの技術的な挑戦と発見を共有します。'
}: HeroSectionProps = {}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:30px_30px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      <div className="relative container mx-auto px-4 py-28 md:py-36 lg:py-44 max-w-screen-xl">
        <div className="max-w-4xl">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Text as="h1" className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {title}
            </Text>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <Text as="p" className="text-xl md:text-2xl lg:text-3xl text-slate-200 leading-relaxed max-w-3xl font-light">
              {description}
              {title === 'ONE Engineering' && (
                <>
                  <br className="hidden md:block" />
                  モバイルアプリ開発、システムアーキテクチャ、そして最新技術の活用について。
                </>
              )}
            </Text>
          </div>
        </div>
      </div>
    </section>
  )
}