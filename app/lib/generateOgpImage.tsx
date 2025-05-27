import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { loadDefaultJapaneseParser } from 'budoux'
import fs from 'fs/promises'
import path from 'path'

const parser = loadDefaultJapaneseParser()

interface OgpImageOptions {
  title: string
  description?: string
  author?: string
  authorIcon?: string
  date?: string
}

async function loadLocalFont(): Promise<ArrayBuffer> {
  try {
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSansJP-Bold.otf')
    const fontBuffer = await fs.readFile(fontPath)
    return fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength)
  } catch (error) {
    console.error('Failed to load local font:', error)
    throw new Error('Could not load local font file')
  }
}

export async function generateOgpImage(
  options: OgpImageOptions,
  outputPath: string
): Promise<void> {
  const { title, description, author, authorIcon, date } = options

  const titleLen = title.length
  const splitedTitle = parser.parse(title)

  const notoSansBold = await loadLocalFont()

  const getTextSize = () => {
    if (titleLen > 35) {
      return 3.8
    }
    if (titleLen > 20) {
      return 4
    }
    return 4.8
  }

  const svg = await satori(
    <div tw={'bg-[#FF8040] w-full h-full flex p-9'}>
      <div
        tw={
          'bg-[#FFFBEC] rounded-3xl border-solid w-full flex flex-col justify-end'
        }
      >
        <div tw={'flex w-full flex-1 items-center justify-center px-20'}>
          <h1
            tw={`text-[${getTextSize()}rem] text-center font-bold`}
            style={{
              lineHeight: 1.3,
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
            }}
          >
            {title}
          </h1>
        </div>
        <div
          tw={
            'flex px-18 mb-10 items-center justify-between w-full text-[#444444]'
          }
        >
          <div tw="text-4xl flex items-center">
            {authorIcon && (
              <img
                alt="avatar"
                tw="rounded-full mr-4"
                src={authorIcon}
                width={72}
                height={72}
                style={{ objectFit: 'cover' }}
              />
            )}
            {author}
          </div>
          <h1
            style={{
              fontWeight: 600,
              fontFamily: 'Noto Sans JP',
            }}
          >
            ONE Engineering
          </h1>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'NotoSansJP',
          data: notoSansBold,
          weight: 600,
          style: 'normal',
        },
      ],
    }
  )

  const body = new Resvg(svg).render().asPng()
  const bodyArray = new Uint8Array(body)
  
  await fs.writeFile(outputPath, bodyArray)
}