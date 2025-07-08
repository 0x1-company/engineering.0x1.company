import { Link, AuthorAvatar, Text } from '../atoms';
import type { Author } from '../../types';

interface AuthorCardProps {
  author: Author;
  articleCount: number;
}

export function AuthorCard({ author, articleCount }: AuthorCardProps) {
  return (
    <article className="group bg-white border border-gray-200/60 rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col hover:border-gray-300 hover:shadow-2xl hover:-translate-y-2">
      <Link 
        href={`/authors/${author.id}`} 
        className="flex flex-col h-full p-6"
      >
        <div className="flex items-start gap-4">
          <AuthorAvatar
            src={author.avatar}
            alt={author.name}
            size="lg"
          />
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1 text-gray-900">{author.name}</h3>
            
            {author.position && (
              <p className="text-sm text-gray-600 mb-2">
                {author.position}
                {author.company && ` at ${author.company}`}
              </p>
            )}
            
            {author.bio && (
              <Text className="mb-3" color="secondary" variant="caption">
                {author.bio}
              </Text>
            )}
            
            <p className="text-sm text-gray-500">
              記事数: {articleCount}件
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}