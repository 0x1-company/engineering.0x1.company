import { Link, Icon } from '../atoms'

export interface SocialIconProps {
  platform: 'instagram' | 'twitter'
  href?: string
  bgColor?: string
  className?: string
}

export function SocialIcon({ platform, href, bgColor, className = '' }: SocialIconProps) {
  return (
    <Link
      href={href || "#"}
      className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white transition-transform hover:scale-110 ${className}`}
      isExternal
    >
      <Icon type={platform} size="md" />
    </Link>
  )
}