import { Image } from './Image';

interface AuthorAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
};

export function AuthorAvatar({ src, alt, size = 'md' }: AuthorAvatarProps) {
  return (
    <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden`}>
      <Image
        src={src}
        alt={alt}
        className="object-cover w-full h-full"
      />
    </div>
  );
}