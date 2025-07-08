import { SocialIcon } from './SocialIcon';
import { Link } from '../atoms/Link';
import type { Author } from '../../types';

interface AuthorSocialProps {
  social: Author['social'];
}

export function AuthorSocial({ social }: AuthorSocialProps) {
  const socialLinks = [
    { key: 'twitter', icon: 'twitter' as const, label: 'Twitter', bgColor: 'bg-black' },
    { key: 'instagram', icon: 'instagram' as const, label: 'Instagram', bgColor: 'bg-gradient-to-br from-purple-600 to-pink-500' },
  ];

  // 追加のソーシャルリンク（SocialIconでサポートされていないもの）
  const additionalLinks = [
    { key: 'github', icon: 'github', label: 'GitHub', url: social.github },
    { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn', url: social.linkedin },
    { key: 'website', icon: 'globe', label: 'Website', url: social.website },
    { key: 'zenn', icon: 'book', label: 'Zenn', url: social.zenn },
    { key: 'qiita', icon: 'edit', label: 'Qiita', url: social.qiita },
  ];

  return (
    <div className="flex gap-4 items-center">
      {/* 既存のSocialIconコンポーネントを使用 */}
      {socialLinks.map(({ key, icon, bgColor }) => {
        const url = social[key as keyof typeof social];
        if (!url || (icon !== 'twitter' && icon !== 'instagram')) return null;
        
        return (
          <SocialIcon
            key={key}
            platform={icon}
            href={url}
            bgColor={bgColor}
          />
        );
      })}
      
      {/* その他のソーシャルリンク */}
      {additionalLinks.map(({ key, label, url }) => {
        if (!url) return null;
        
        return (
          <Link
            key={key}
            href={url}
            className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white transition-transform hover:scale-110"
            isExternal
            aria-label={`${label}プロフィール`}
          >
            <span className="text-xs font-bold">
              {label.charAt(0)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}