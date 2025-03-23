import type { JSX } from "hono/jsx/jsx-runtime";

// Icons
const ExternalLinkIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-4 w-4 ml-1" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
    />
  </svg>
);

// Social Media Icons
type SocialIconProps = {
  platform: string;
  href?: string;
  bgColor: string;
  children: JSX.Element;
}

const SocialIcon = ({ platform, href, bgColor, children }: SocialIconProps) => (
  <a 
    href={href || "#"} 
    className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white transition-transform hover:scale-110`}
    aria-label={`${platform}でフォローする`}
  >
    {children}
  </a>
);

const InstagramIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5" 
    fill="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5" 
    fill="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
  </svg>
);

// Footer Navigation Components
type FooterNavSectionProps = {
  title: string;
  children: JSX.Element;
}

const FooterNavSection = ({ title, children }: FooterNavSectionProps) => (
  <div className="mb-6">
    <h4 className="font-medium mb-2">{title}</h4>
    {children}
  </div>
);

type FooterNavLinkProps = {
  href?: string;
  children?: any;
}

const FooterNavLink = ({ href, children }: FooterNavLinkProps) => (
  <li>
    <a 
      href={href || "#"} 
      className="hover:text-green-500 transition-colors"
    >
      {children}
    </a>
  </li>
);

type ExternalLinkProps = {
  href?: string;
  children: string;
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <li>
    <a 
      href={href || "#"} 
      className="flex items-center hover:text-green-500 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{children}</span>
      <ExternalLinkIcon />
    </a>
  </li>
);

// Main Footer Component
export const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-12 pb-8" aria-labelledby="footer-heading">
      <div className="container mx-auto px-4">
        {/* Company Name */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">ONE株式会社</h2>
        </div>
        
        <hr className="border-gray-200 mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Menu Section */}
          <nav aria-label="フッターナビゲーション">
            <h3 className="text-green-500 mb-4">Menu</h3>
            
            <FooterNavSection title="私たちについて">
              <ul className="space-y-2 text-sm text-gray-600">
                <FooterNavLink href="https://0x1.company/ja#company">会社概要</FooterNavLink>
                <FooterNavLink href="https://0x1.company/ja#member">経営メンバー</FooterNavLink>
              </ul>
            </FooterNavSection>
            
            <FooterNavSection title="事業・サービス">
              <ul className="space-y-2 text-sm text-gray-600">
                <FooterNavLink href="https://0x1.company/ja#products">サービス一覧</FooterNavLink>
              </ul>
            </FooterNavSection>
            
            <FooterNavSection title="ニュース">
              <ul className="space-y-2 text-sm text-gray-600">
                <FooterNavLink href='https://prtimes.jp/main/html/searchrlp/company_id/101105'>プレスリリース</FooterNavLink>
              </ul>
            </FooterNavSection>
            
            <FooterNavSection title="お問い合わせ">
              <ul className="space-y-2 text-sm text-gray-600">
                <FooterNavLink href='https://0x1.company/ja#contact'>お問い合わせ</FooterNavLink>
              </ul>
            </FooterNavSection>
          </nav>
          
          {/* Links Section */}
          <div>
            <h3 className="text-green-500 mb-4">Link</h3>
            <ul className="space-y-4">
              <ExternalLink href="https://www.0x1.company">公式サイト</ExternalLink>
              <ExternalLink href="https://herp.careers/v1/oneinc">採用情報</ExternalLink>
              <ExternalLink href="https://note.com/0x1company">ブログ</ExternalLink>
            </ul>
          </div>
        </div>
        
        {/* Social Media Icons */}
        <div className="flex justify-end mt-8 mb-8 space-x-4">
          <SocialIcon 
            platform="Instagram" 
            href="https://www.instagram.com/0x1.company" 
            bgColor="bg-green-500"
          >
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon 
            platform="Twitter" 
            href="https://twitter.com/0x1company" 
            bgColor="bg-black"
          >
            <TwitterIcon />
          </SocialIcon>
        </div>
        
        {/* Copyright */}
        <div className="text-right text-sm text-gray-600">
          <p>ONE株式会社 © {year} ONE, Inc.</p>
        </div>
      </div>
    </footer>
  );
};
