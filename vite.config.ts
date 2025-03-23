import path from "node:path";
import ssg from "@hono/vite-ssg";
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite'
import honox from 'honox/vite'
import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import theme from "./assets/theme.json";

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
      rehypePlugins: [rehypeStringify, [rehypePrettyCode, { theme: theme }]],
    }),
    viteStaticCopy({
      targets: [
        {
          src: [
            "./app/assets/**/*.png",
            "./app/assets/**/*.jpg",
            "./app/assets/**/*.jpeg",
            "./app/assets/**/*.webp",
            "./app/assets/**/*.gif",
          ],
          dest: "assets",
          rename: (
            _fileName: string,
            _fileExtension: string,
            fullPath: string,
          ) => {
            const destPath = normalizePath(
              path.relative(__dirname, fullPath).replace(/^app\/.*\//, ""),
            );
            return destPath;
          },
          overwrite: false,
        },
        {
          src: ["./app/theme.ts"],
          dest: "static",
          rename: (
            _fileName: string,
            _fileExtension: string,
            fullPath: string,
          ) => {
            const destPath = normalizePath(
              path.relative(__dirname, fullPath).replace(/^app\//, ""),
            );
            return destPath;
          },
          overwrite: false,
        },
      ],
    }),
  ],
  build: {
    assetsDir: "static",
    emptyOutDir: false,
    ssrEmitAssets: true,
    rollupOptions: {
      input: ["./app/style.css", "./app/theme.ts"],
      output: {
        entryFileNames: "static/[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "styles/style.css";
          if (assetInfo.name === "theme.ts") return "static/theme.js";
          return assetInfo.name ?? "";
        },
      },
    },
  },
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
