# Engineering.0x1.company - Technical Knowledge

This document provides a comprehensive overview of the engineering.0x1.company project, including its architecture, technologies, design patterns, and implementation details.

## Project Overview

Engineering.0x1.company is a blog/documentation site built with modern web technologies. It serves as a platform for sharing technical articles and knowledge about the company's engineering practices.

## Tech Stack

### Core Technologies

- **HonoX**: A lightweight full-stack web framework built on top of Hono and Vite
- **TypeScript**: The project is fully typed with TypeScript
- **MDX**: For content authoring with JSX components embedded in Markdown
- **Vite**: Used as the build tool with SSG (Static Site Generation) capabilities
- **TailwindCSS**: For styling components
- **Cloudflare Workers**: For deployment (using Wrangler)

### Key Dependencies

- **@hono/vite-ssg**: Enables Static Site Generation with Hono
- **@mdx-js/rollup**: MDX integration with Vite/Rollup
- **rehype-pretty-code**: For code syntax highlighting in MDX
- **remark-frontmatter/remark-mdx-frontmatter**: For handling frontmatter metadata in MDX files
- **jsdom**: Used for fetching and parsing OGP (Open Graph Protocol) data

## Architecture

### Project Structure

The project follows a modular structure:

```
app/
├── articles/            # MDX content files organized by date
├── assets/              # Static assets for articles
├── components/          # Reusable UI components
├── islands/             # Interactive components for client-side hydration
├── lib/                 # Utility functions and MDX components
├── routes/              # Application routes
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
public/                  # Public static assets
```

### Server-Side Rendering & Static Site Generation

The project uses HonoX with SSG capabilities to pre-render pages at build time. This approach provides:

1. Fast initial page loads
2. SEO benefits from pre-rendered HTML
3. Reduced server load
4. Ability to deploy to static hosting or edge platforms like Cloudflare

### Routing

Routing is handled by HonoX's file-based routing system in the `app/routes/` directory:

- `index.tsx`: The home page that displays a list of articles
- `articles/[slug].tsx`: Dynamic route for individual article pages
- `_404.tsx`: Custom 404 page
- `_error.tsx`: Error handling page
- `_renderer.tsx`: Custom renderer for the application

### Content Management

Content is managed through MDX files stored in the `app/articles/` directory, organized by date (YYYY/MMDD). Each article includes:

1. Frontmatter metadata (title, date, description)
2. Markdown content with optional JSX components

## Key Features

### MDX Integration

The project leverages MDX to enhance content with custom React-like components:

- Custom components like `ExternalOgp` for embedding rich link previews
- Styled markdown elements through the `mdx-components.tsx` provider
- Code syntax highlighting with rehype-pretty-code

### OGP (Open Graph Protocol) Support

The project includes functionality to:

1. Fetch OGP data from external URLs for rich link previews
2. Generate OGP images for the site's own content

### Article Management

Articles are:

1. Organized by date in the filesystem
2. Loaded and processed at build time
3. Sorted by date for display
4. Enhanced with custom components

## Design Patterns

### Component-Based Architecture

The UI is built using a component-based approach with Hono's JSX implementation:

- Reusable components in `app/components/`
- Custom MDX components in `app/lib/mdxComponents/`
- Islands components for client-side interactivity

### Islands Architecture

The project uses the "Islands Architecture" pattern:

- Most of the page is static HTML generated at build time
- Interactive components ("islands") are hydrated on the client
- This provides a balance of performance and interactivity

### Data Fetching

Data is primarily loaded at build time:

- MDX files are processed during the build process
- External OGP data is fetched during build for static generation
- This approach minimizes client-side data fetching

## Build & Deployment

### Build Process

The build process uses Vite with custom plugins:

1. HonoX for framework integration
2. @hono/vite-ssg for static site generation
3. MDX processing with various remark/rehype plugins
4. TailwindCSS for styling

### Deployment

The project is configured for deployment to Cloudflare Workers:

- Wrangler is used for deployment
- Assets are served from the `./dist` directory
- Node.js compatibility mode is enabled

## Related Projects

Based on the content of the articles, the company (0x1) also develops:

1. iOS applications using:
   - Swift and SwiftUI
   - The Composable Architecture (TCA)
   - Multi-module, multi-package architecture
   - GitHub Actions for CI/CD

2. Multiple brand applications sharing core business logic:
   - BeMatch
   - TapMatch
   - Trinket

## Development Practices

From the project structure and content, we can infer these development practices:

1. TypeScript for type safety
2. Component-based architecture
3. Static site generation for performance
4. MDX for rich content authoring
5. Modern build tools (Vite)
6. Edge deployment (Cloudflare Workers)
