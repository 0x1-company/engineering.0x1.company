import { AuthorCard } from './AuthorCard';
import type { Author } from '../../types';

interface AuthorWithStats extends Author {
  articleCount: number;
}

interface AuthorListProps {
  authors: AuthorWithStats[];
}

export function AuthorList({ authors }: AuthorListProps) {
  if (authors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">著者が見つかりません。</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {authors.map((author) => (
        <AuthorCard
          key={author.id}
          author={author}
          articleCount={author.articleCount}
        />
      ))}
    </div>
  );
}