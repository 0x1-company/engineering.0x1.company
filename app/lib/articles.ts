import type { JSX } from "hono/jsx/jsx-runtime";
import type { MDXProps } from "mdx/types";
import { Article, Frontmatter } from '../types'
import { getEntryNameFromPath } from '../utils';

type MDX = {
  frontmatter: Frontmatter;
  default: (props: MDXProps) => JSX.Element;
}

const articles = import.meta.glob<MDX>('../articles/**/*.mdx', {
  eager: true,
});

const sortByDateDesc = (): | ((
  a: [string, { frontmatter: Frontmatter }],
  b: [string, { frontmatter: Frontmatter }],
) => number) | undefined => {
  return ([_aid, aPost], [_bid, bPost]) => {
    const aDate = new Date(aPost.frontmatter.date);
    const bDate = new Date(bPost.frontmatter.date);
    return bDate.getTime() - aDate.getTime();
  };
};

export const getArticles = () => {
  const postsData: Article[] = Object.entries(articles)
    .sort(sortByDateDesc())
    .map(([path, article]) => {
      const entryName = getEntryNameFromPath(path);
      const { frontmatter } = article;
      const { default: Component } = article;
      const res: Article = { entryName, frontmatter, Component };
      return res;
    });
  return postsData;
};

export const getArticleByEntryName = (entryName: string) => {
  const posts = getArticles();
  return posts.find((post) => post.entryName === entryName);
}

export const getLatestArticlesWithoutTargetArticle = (entryName: string) => {
  const posts = getArticles();
  return posts.filter((post) => post.entryName !== entryName).slice(0, 3);
}

