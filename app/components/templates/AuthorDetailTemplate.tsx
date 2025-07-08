import { AuthorProfile, ArticleList } from '../organisms';
import { Link } from '../atoms';
import type { Author } from '../../types';
import type { Article } from '../../types';

interface AuthorDetailTemplateProps {
  author: Author;
  articles: Article[];
  articleCount: number;
  currentPage: number;
  totalPages: number;
}

export function AuthorDetailTemplate({
  author,
  articles,
  articleCount,
  currentPage,
  totalPages,
}: AuthorDetailTemplateProps) {
  return (
    <div className="bg-gray-50">
      <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16 max-w-screen-xl">
        <AuthorProfile author={author} articleCount={articleCount} />
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">執筆記事</h2>
          <ArticleList articles={articles} />
          
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/authors/${author.id}?page=${currentPage - 1}`}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  前のページ
                </Link>
              )}
              
              <span className="px-4 py-2">
                {currentPage} / {totalPages}
              </span>
              
              {currentPage < totalPages && (
                <Link
                  href={`/authors/${author.id}?page=${currentPage + 1}`}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  次のページ
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}