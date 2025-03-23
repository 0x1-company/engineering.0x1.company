import { FC } from 'hono/jsx'

type Props = {
  url: string
}

export const ExternalOgp: FC<Props> = ({ url }) => {
  // Extract domain from URL
  const domain = url.replace(/^https?:\/\//, '').split('/')[0]
  
  return (
    <div class="my-4 border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
      <a href={url} target="_blank" rel="noopener noreferrer" class="block p-4">
        <div class="flex items-center">
          <div class="mr-2">
            <img 
              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`} 
              alt={`Favicon for ${domain}`} 
              width="16" 
              height="16" 
              class="w-4 h-4"
            />
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400 truncate">
            {domain}
          </div>
        </div>
        <div class="mt-2 font-medium text-blue-600 hover:underline">
          {url}
        </div>
      </a>
    </div>
  )
}

export default ExternalOgp
