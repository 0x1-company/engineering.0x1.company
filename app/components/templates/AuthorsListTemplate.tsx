import { HeroSection, AuthorList } from '../organisms';
import type { Author } from '../../types';

interface AuthorWithStats extends Author {
  articleCount: number;
}

interface AuthorsListTemplateProps {
  authors: AuthorWithStats[];
}

export function AuthorsListTemplate({ authors }: AuthorsListTemplateProps) {
  return (
    <>
      <HeroSection
        title="Authors"
        description="0x1 Engineering Blogの執筆者一覧"
      />
      
      <div className="bg-gray-50">
        <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16 max-w-screen-xl">
          <AuthorList authors={authors} />
        </section>
      </div>
    </>
  );
}