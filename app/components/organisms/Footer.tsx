import { Text, ListItem, Separator } from '../atoms'
import { FooterNavLink, SocialIcon } from '../molecules'

export function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-50 pt-12 pb-8" aria-labelledby="footer-heading">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="mb-8">
          <Text as="h2" variant="title">ONE株式会社</Text>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <nav aria-label="フッターナビゲーション">
            <Text as="h3" className="text-[#FF8040] mb-4">Menu</Text>
            
            <div className="mb-6">
              <Text as="h4" className="font-medium mb-2">私たちについて</Text>
              <ul className="space-y-2 text-sm text-gray-600">
                <ListItem><FooterNavLink href="https://0x1.company/ja#company">会社概要</FooterNavLink></ListItem>
                <ListItem><FooterNavLink href="https://0x1.company/ja#member">経営メンバー</FooterNavLink></ListItem>
              </ul>
            </div>
            
            <div className="mb-6">
              <Text as="h4" className="font-medium mb-2">事業・サービス</Text>
              <ul className="space-y-2 text-sm text-gray-600">
                <ListItem><FooterNavLink href="https://0x1.company/ja#products">サービス一覧</FooterNavLink></ListItem>
              </ul>
            </div>
            
            <div className="mb-6">
              <Text as="h4" className="font-medium mb-2">ニュース</Text>
              <ul className="space-y-2 text-sm text-gray-600">
                <ListItem><FooterNavLink href="https://prtimes.jp/main/html/searchrlp/company_id/101105">プレスリリース</FooterNavLink></ListItem>
              </ul>
            </div>
            
            <div className="mb-6">
              <Text as="h4" className="font-medium mb-2">お問い合わせ</Text>
              <ul className="space-y-2 text-sm text-gray-600">
                <ListItem><FooterNavLink href="https://0x1.company/ja#contact">お問い合わせ</FooterNavLink></ListItem>
              </ul>
            </div>
          </nav>
          
          <div>
            <Text as="h3" className="text-[#FF8040] mb-4">Link</Text>
            <ul className="space-y-4">
              <FooterNavLink href="https://0x1.company" isExternal>公式サイト</FooterNavLink>
              <FooterNavLink href="https://herp.careers/v1/oneinc" isExternal>採用情報</FooterNavLink>
              <FooterNavLink href="https://note.com/0x1company" isExternal>ブログ</FooterNavLink>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-end mt-8 mb-8 space-x-4">
          <SocialIcon 
            platform="instagram" 
            href="https://www.instagram.com/0x1.company" 
            bgColor="bg-white"
          />
          <SocialIcon 
            platform="twitter" 
            href="https://twitter.com/0x1company" 
            bgColor="bg-black"
          />
        </div>
        
        <div className="text-right text-sm text-gray-600">
          <Text>{`ONE株式会社 © ${year} ONE, Inc.`}</Text>
        </div>
      </div>
    </footer>
  )
}