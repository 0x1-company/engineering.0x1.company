import { createRoute } from 'honox/factory';
import { getArticleByEntryName, getLatestArticlesWithoutTargetArticle } from '../../lib/articles';
import { formattedDate } from '../../lib/date';
import { NotFound } from '../../components/not-found';

export default createRoute(
  async (c) => {
    const slug = c.req.param('slug');
    const article = getArticleByEntryName(slug);

    if (!article) {
      c.status(404);
      return c.render(
        <NotFound />
      );
    }

    const pageTitle = article.frontmatter.title ?? '';
    const date = formattedDate(article.frontmatter.date ?? '');

    const latestArticles = getLatestArticlesWithoutTargetArticle(article.entryName ?? '');
    const hasLatestArticles = latestArticles.length > 0;

    return c.render(
      <>
        <title>{slug}</title>
        <h1 class="text-3xl font-bold">Article: {slug}</h1>

        <div class='flex flex-col mb-10 items-center'>
          <h1 class='text-center leading-tight text-3xl mb-0 mt-6 pb-2 font-bold flex justify-center'>
            {pageTitle}
          </h1>
          <time class='flex justify-center text-gray-600 text-base'>
            {date}
          </time>
        </div>
        <article class='markdown'>{article?.Component({})}</article>
      </>
    );
  }
);