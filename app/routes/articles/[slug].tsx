import { createRoute } from 'honox/factory';
import { getArticleByEntryName, getArticles, getLatestArticlesWithoutTargetArticle } from '../../lib/articles';
import { formattedDate } from '../../lib/date';
import { NotFound } from '../../components/not-found';
import { ssgParams } from 'hono/ssg';

export default createRoute(
  ssgParams(() => {
    const articles = getArticles();
    return articles.map((article) => ({
      slug: article.entryName,
    }));
  }),
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

    const ogpPath = `/ogps/${slug}.png`;

    return c.render(
      <div class='container mx-auto px-4'>
        <div class='flex flex-col mb-10 items-center'>
          <h1 class='text-center leading-tight text-3xl mb-0 mt-6 pb-2 font-bold flex justify-center'>
            {pageTitle}
          </h1>
          <time class='flex justify-center text-gray-600 text-base'>
            {date}
          </time>
        </div>

        <img src={`https://engineering.0x1.company${ogpPath}`} />

        <article class='markdown mt-10 mb-10'>
          {article?.Component({})}
        </article>
      </div>
    );
  }
);