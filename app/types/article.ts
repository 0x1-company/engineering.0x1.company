import type { JSX } from "hono/jsx/jsx-runtime";
import type { MDXProps } from "mdx/types";
import type { Frontmatter } from './frontmatter';

export type Article = {
  entryName: string;
  frontmatter: Frontmatter;
  Component: (props: MDXProps) => JSX.Element;
};
