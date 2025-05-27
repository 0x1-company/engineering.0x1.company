import { generateOgpImage } from '../app/lib/generateOgpImage'
import path from 'path'

async function main() {
  console.log('🖼️  デフォルトOGP画像を生成中...')
  
  const outputPath = path.join(process.cwd(), 'public', 'ogps', 'default.png')
  
  await generateOgpImage({
    title: 'ONE Engineering',
    description: '技術的な知見や学びを共有する ONE株式会社のエンジニアリングブログ',
  }, outputPath)
  
  console.log('✅ デフォルトOGP画像を生成しました')
}

main().catch(console.error)