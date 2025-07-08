import { Metadata } from 'next';
import { AuthorsListTemplate } from '../components/templates/AuthorsListTemplate';
import { authorsData, getAuthorArticleCount } from '../lib/authors';
import type { Author } from '../types';

export const metadata: Metadata = {
  title: '著者一覧 - 0x1 Engineering Blog',
  description: '0x1 Engineering Blogの執筆者一覧です。',
  openGraph: {
    title: '著者一覧 - 0x1 Engineering Blog',
    description: '0x1 Engineering Blogの執筆者一覧です。',
  },
};

interface AuthorWithStats extends Author {
  articleCount: number;
}

async function getAllAuthorsWithStats(): Promise<AuthorWithStats[]> {
  const authorIds = Object.keys(authorsData);
  
  const authorsWithStats = await Promise.all(
    authorIds.map(async (id) => {
      const authorData = authorsData[id];
      if (!authorData) {
        throw new Error(`Author data not found for id: ${id}`);
      }
      
      const author: Author = {
        id,
        name: authorData.name,
        avatar: authorData.avatar,
        social: authorData.social,
        ...(authorData.bio && { bio: authorData.bio }),
        ...(authorData.position && { position: authorData.position }),
        ...(authorData.company && { company: authorData.company }),
        ...(authorData.skills && { skills: authorData.skills }),
      };
      
      const articleCount = await getAuthorArticleCount(id);
      
      return {
        ...author,
        articleCount,
      };
    })
  );
  
  // 記事数の多い順にソート
  return authorsWithStats.sort((a, b) => b.articleCount - a.articleCount);
}

export default async function AuthorsPage() {
  const authors = await getAllAuthorsWithStats();
  
  return <AuthorsListTemplate authors={authors} />;
}