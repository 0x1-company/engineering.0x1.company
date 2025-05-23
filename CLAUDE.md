# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Development server with hot reload
bun dev

# Build for production (client and SSG)
bun run build

# Type checking
bunx tsc --noEmit
```

## Project Architecture

This is a HonoX-based engineering blog built with TypeScript, MDX, and Vite. It uses Static Site Generation (SSG) for performance and SEO.

### Key Technologies
- **HonoX**: Full-stack framework built on Hono + Vite
- **MDX**: For rich content authoring with JSX components
- **TailwindCSS v4**: For styling
- **Vite**: Build tool with SSG capabilities
- **TypeScript**: Full type safety across the codebase

### Directory Structure
- `app/articles/`: MDX content organized by date (YYYY/MMDD format)
- `app/assets/`: Static assets for articles
- `app/components/`: Reusable UI components (ArticleCard, ArticleList, etc.)
- `app/routes/`: File-based routing system
  - `index.tsx`: Homepage with article listing
  - `articles/[slug].tsx`: Individual article pages
  - `ogps/[slug].tsx`: OGP image generation
- `app/lib/`: Utilities and MDX component providers
- `app/types/`: TypeScript type definitions

### Content Management
Articles are MDX files in `app/articles/YYYY/MMDD/filename.mdx` with frontmatter:
```mdx
---
title: "Article Title"
description: "Brief description"
date: "YYYY-MM-DD"
author: "author-id"
---
```

### URL Management
Legacy URLs are handled via `vercel.json` rewrites. When adding new rewrites:
1. Place specific routes before general patterns
2. Include file extensions in destinations when needed
3. Use rewrites (not redirects) to preserve original URLs

### MDX Components
The MDX components provider (`app/lib/mdx-components.tsx`) must export the function directly:
```typescript
export default useMDXComponents  // Correct
// NOT: export default { useMDXComponents }
```

Custom components available in MDX:
- `<ExternalOgp url="...">`: Rich link previews
- `<img>`: Auto-styled images with proper alt text

### Testing
No automated tests are currently configured. Manual testing via development server is the primary method.

### Deployment
The site is deployed to Cloudflare Workers/Pages. Build outputs to `./dist` directory.

## Writing Guidelines

Articles should follow these conventions:
- Primary language: Japanese
- Use "わたしたち" for first-person plural
- Technical terms remain in English (Swift, TCA, etc.)
- Include descriptive alt text for all images
- Use `<ExternalOgp>` for external links when appropriate
- Images stored in `/app/assets/YYYY/MMDD/article-name/`