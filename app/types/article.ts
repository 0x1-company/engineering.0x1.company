import type { Frontmatter } from './frontmatter';

export type Article = {
  entryName: string;
  frontmatter: Frontmatter;
  path: string;
};
