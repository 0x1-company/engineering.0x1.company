import ssg from "@hono/vite-ssg";
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite'
import honox from 'honox/vite'
import { defineConfig } from 'vite'
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype, { defaultFootnoteBackContent, defaultFootnoteBackLabel } from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';

const entry = './app/server.ts';

export default defineConfig({
  plugins: [
    ssg({ entry }),
    honox({}),
    tailwindcss(),
    mdx({
      jsxImportSource: 'hono/jsx',
      providerImportSource: './app/lib/mdx-components',
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
        remarkParse,
        [
          remarkRehype,
          {
            defaultFootnoteBackContent: '↩︎',
            defaultFootnoteBackLabel: '↩Back to reference 1'
          },
        ]
      ],
      rehypePlugins: [rehypeStringify, [rehypePrettyCode]],
    }),
  ],
  ssr: {
    target: "node",
    external: [
      "unified",
      "@mdx-js/mdx",
      "satori",
      "@resvg/resvg-js",
      "feed",
      "budoux",
      "jsdom",
      "lodash",
      "motion",
    ],
  },
  server: {
    host: "0.0.0.0",
  },
});
