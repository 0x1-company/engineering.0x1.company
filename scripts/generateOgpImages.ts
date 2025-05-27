import { readdir } from 'fs/promises'
import path from 'path'
import { getArticles } from '../app/lib/articles'
import { getAuthor } from '../app/lib/authors'
import { generateOgpImage } from '../app/lib/generateOgpImage'
import { formattedDate } from '../app/lib/date'

async function main() {
  try {
    console.log('🖼️  OGP画像を生成中...')
    
    const articles = await getArticles()
    const outputDir = path.join(process.cwd(), 'public', 'ogps')
    
    const results = await Promise.allSettled(
      articles.map(async (article) => {
        const outputPath = path.join(outputDir, `${article.entryName}.png`)
        
        console.log(`✨ ${article.entryName}.png を生成中...`)
        
        const author = getAuthor(article.frontmatter.author)
        
        await generateOgpImage({
          title: article.frontmatter.title,
          description: article.frontmatter.description,
          author: author?.name,
          authorIcon: author?.icon,
          date: formattedDate(article.frontmatter.date),
        }, outputPath)
        
        return article.entryName
      })
    )
    
    const succeeded = results.filter(result => result.status === 'fulfilled').length
    const failed = results.filter(result => result.status === 'rejected')
    
    if (failed.length > 0) {
      console.warn(`⚠️  ${failed.length}個の画像生成に失敗しました:`)
      failed.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`   - ${articles[index]?.entryName || 'unknown'}: ${result.reason}`)
        }
      })
    }
    
    console.log(`✅ ${succeeded}個のOGP画像を生成しました`)
    
    if (failed.length > 0) {
      process.exit(1)
    }
  } catch (error) {
    console.error('OGP画像生成中にエラーが発生しました:', error)
    process.exit(1)
  }
}

main().catch(console.error)