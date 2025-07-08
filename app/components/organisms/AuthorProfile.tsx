import { AuthorAvatar, SkillTag } from '../atoms';
import { AuthorSocial } from '../molecules';
import type { Author } from '../../types';

interface AuthorProfileProps {
  author: Author;
  articleCount: number;
}

export function AuthorProfile({ author, articleCount }: AuthorProfileProps) {
  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <AuthorAvatar
            src={author.avatar}
            alt={author.name}
            size="xl"
          />
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">{author.name}</h1>
          
          {author.position && (
            <p className="text-lg text-gray-600 mb-1">
              {author.position}
              {author.company && ` at ${author.company}`}
            </p>
          )}
          
          <p className="text-gray-500 mb-4">
            記事数: {articleCount}件
          </p>
          
          <AuthorSocial social={author.social} />
          
          {author.skills && author.skills.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">スキル・専門分野</h2>
              <div className="flex flex-wrap gap-2">
                {author.skills.map((skill) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}