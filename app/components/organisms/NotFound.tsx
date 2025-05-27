import { Text, Icon, Button } from '../atoms'

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl">
        <Text as="h1" className="text-6xl font-bold text-gray-800 mb-4">404</Text>
        
        <div className="mb-8">
          <Icon 
            type="sad-face"
            className="h-32 w-32 mx-auto text-[#FF8040]"
          />
        </div>
        
        <Text as="h2" variant="title" className="text-gray-700 mb-4">
          ページが見つかりませんでした
        </Text>
        
        <Text variant="body" color="secondary" className="mb-8">
          お探しのページは移動したか、削除された可能性があります。
          URLが正しく入力されているか確認してください。
        </Text>
        
        <Button 
          href="/" 
          variant="primary"
          size="md"
          className="bg-green-500 hover:bg-green-600"
        >
          トップページに戻る
        </Button>
      </div>
    </div>
  )
}