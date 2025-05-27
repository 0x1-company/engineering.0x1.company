import { readdir } from 'fs/promises'
import path from 'path'
import { getArticles } from '../app/lib/articles'
import { getAuthor } from '../app/lib/authors'
import { generateOgpImage } from '../app/lib/generateOgpImage'
import { formattedDate } from '../app/lib/date'

async function main() {
  console.log('🖼️  OGP画像を生成中...')
  
  const articles = await getArticles()
  const outputDir = path.join(process.cwd(), 'public', 'ogps')
  
  await Promise.all(
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
    })
  )
  
  console.log(`✅ ${articles.length}個のOGP画像を生成しました`)
}

main().catch(console.error)