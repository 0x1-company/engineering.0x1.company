export const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <div className="mb-8">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-32 w-32 mx-auto text-[#FF8040]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">ページが見つかりませんでした</h2>
        <p className="text-gray-600 mb-8">
          お探しのページは移動したか、削除された可能性があります。
          URLが正しく入力されているか確認してください。
        </p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors"
        >
          トップページに戻る
        </a>
      </div>
    </div>
  )
}