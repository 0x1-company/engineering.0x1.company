import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { AuthorDetailTemplate } from '../../components/templates/AuthorDetailTemplate';
import { 
  getFullAuthor, 
  isValidAuthor, 
  getAuthorArticles, 
  getAuthorArticleCount,
  authorsData 
} from '../../lib/authors';

interface Props {
  params: Promise<{ authorId: string }>;
}

export async function generateStaticParams() {
  return Object.keys(authorsData).map((authorId) => ({
    authorId,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { authorId } = await params;
  
  if (!isValidAuthor(authorId)) {
    return { title: '著者が見つかりません' };
  }
  
  const author = getFullAuthor(authorId);
  
  return {
    title: `${author.name} - 0x1 Engineering Blog`,
    description: author.bio || `${author.name}の記事一覧`,
    openGraph: {
      title: `${author.name} - 0x1 Engineering Blog`,
      description: author.bio || `${author.name}の記事一覧`,
      images: [author.avatar],
    },
  };
}

export default async function AuthorDetailPage({ params }: Props) {
  const { authorId } = await params;
  
  if (!isValidAuthor(authorId)) {
    notFound();
  }
  
  const author = getFullAuthor(authorId);
  const articleCount = await getAuthorArticleCount(authorId);
  const { articles, totalPages } = await getAuthorArticles(authorId, 1);
  
  return (
    <AuthorDetailTemplate
      author={author}
      articles={articles}
      articleCount={articleCount}
      currentPage={1}
      totalPages={totalPages}
    />
  );
}