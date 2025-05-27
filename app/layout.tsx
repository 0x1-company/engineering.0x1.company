import type { Metadata } from 'next';
import { PageLayout } from './components/templates';
import './globals.css';
import './styles/style.css';
import './styles/syntax-highlight.css';

export const metadata: Metadata = {
  title: {
    default: 'ONE Engineering',
    template: '%s | ONE Engineering'
  },
  description: '技術的な知見や学びを共有する ONE株式会社のエンジニアリングブログ',
  metadataBase: new URL('https://engineering.0x1.company'),
  openGraph: {
    title: 'ONE Engineering',
    description: '技術的な知見や学びを共有する ONE株式会社のエンジニアリングブログ',
    url: 'https://engineering.0x1.company',
    siteName: 'ONE Engineering',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://engineering.0x1.company/ogps/default.png',
        secureUrl: 'https://engineering.0x1.company/ogps/default.png',
        width: 1200,
        height: 630,
        alt: 'ONE Engineering',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ONE Engineering',
    description: '技術的な知見や学びを共有する ONE株式会社のエンジニアリングブログ',
    site: '@0x1company',
    images: ['https://engineering.0x1.company/ogps/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://engineering.0x1.company',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}