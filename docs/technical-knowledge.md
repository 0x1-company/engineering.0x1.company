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

#### Redirects and Rewrites

The application supports URL redirects and rewrites for handling legacy URLs or URL structure changes through two methods:

1. **Route-based redirects**:
   - Implemented as route files that return a redirect response
   - Each redirect file is named after the source path and uses `c.redirect()` with a 301 status code

2. **Configuration-based redirects and rewrites**:
   - Implemented in `vercel.json` using the `redirects` or `rewrites` arrays
   - Each redirect/rewrite is defined with `source` and `destination` properties
   - This approach reduces the number of route files and centralizes URL management
   - Example redirect:
     ```json
     {
       "source": "/tech-stack-of-ios-d6466798ed80",
       "destination": "/articles/tech-stack-of-ios"
     }
     ```
   - Example rewrite:
     ```json
     {
       "source": "/tech-stack-of-ios-d6466798ed80",
       "destination": "/articles/tech-stack-of-ios.html"
     }
     ```

The configuration-based approach is preferred for maintaining URL compatibility while organizing content under a consistent path structure.

**URL Rewrite Best Practices**:
- Order specific routes before general patterns (e.g., place `/tech-stack-of-ios-d6466798ed80` before `/articles/:path*`)
- Include file extensions in destination paths when necessary (e.g., `.html`)
- Use rewrites instead of redirects when you want to keep the original URL in the browser address bar

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

#### MDX Components Export Pattern

The MDX components provider must follow a specific export pattern:

- The `useMDXComponents` function should be exported as the default export directly, not wrapped in an object
- Correct: `export default useMDXComponents`
- Incorrect: `export default { useMDXComponents }`

This is important because the MDX plugin expects the default export to be the provider function itself, not an object containing the function. Using the incorrect export pattern can lead to build errors like `Failed to resolve import "react/jsx-runtime"` even when the project is using Hono's JSX runtime instead of React.

### OGP (Open Graph Protocol) Support

The project includes functionality to:

1. Fetch OGP data from external URLs for rich link previews
2. Generate OGP images for the site's own content
3. Display OGP images in article cards to enhance visual appeal

OGP images are:
- Stored at `/ogps/[article-entry-name].png` path
- Displayed as featured images in article cards
- Styled with responsive design (full-width, fixed height with object-cover)
- Used to improve visual hierarchy and engagement in article listings
- Include author information from the article's frontmatter

Article cards are displayed in a responsive grid layout:
- Single column on mobile devices
- Two columns on desktop and larger screens

### Author Management

The project includes an author management system:

1. Author information is stored in the article's frontmatter metadata
2. A centralized author registry in `app/lib/authors.ts` maps author IDs to their display names and profile images
3. The `getAuthor` utility function provides a consistent way to retrieve author information
4. Default author information is provided when an author is not specified or not found
5. OGP images dynamically include the author's name and profile image

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

### Layout Techniques

The project employs modern CSS layout techniques:

- **Flexbox for Page Structure**: The main layout uses a flex column structure to ensure the footer always appears at the bottom of the viewport, even when content is minimal
- **Responsive Grid Layouts**: Article lists use grid layouts that adapt to different screen sizes
- **Utility-First CSS**: TailwindCSS classes are used for styling, promoting consistency and reusability
- **Minimum Height Strategy**: The body element uses `min-h-screen` to ensure it fills at least the entire viewport height
- **Flex Grow for Content**: The main content area uses `flex-grow` to expand and fill available space, pushing the footer down

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

### iOS Applications

The company develops multiple iOS applications using a monorepo approach that enables efficient development across multiple brands with a small team.

#### Core Technologies

- **Swift and SwiftUI**: Modern UI development with Swift's latest features
- **The Composable Architecture (TCA)**: For predictable state management and reusable components
- **Swift Package Manager**: For dependency management and modularization
- **Multi-module, multi-package architecture**: For code organization and reuse
- **GitHub Actions**: For CI/CD workflows
- **Xcode Cloud**: For TestFlight and App Store Connect submissions

#### Multiple Brand Applications

The company currently maintains three brand applications that share core business logic:

- **BeMatch**: BeReal exchange app (https://bematch.jp)
- **TapMatch**: TapNow exchange app (https://tapmatch.jp)
- **Trinket**: Locket exchange app (https://trinket.camera)

#### Package Structure

The iOS monorepo contains six Swift packages:

1. **Utility**: Common utility code shared across all packages
2. **Dependencies**: Implementations using swift-dependencies that can be reused across different products
3. **BeMatch (App UI Package)**: UI code specific to the BeMatch brand
4. **TapMatch (App UI Package)**: UI code specific to the TapMatch brand
5. **Trinket (App UI Package)**: UI code specific to the Trinket brand
6. **MatchCore**: Contains all business logic (TCA Reducers) shared across all brands

This structure allows the team to:
- Share business logic across all brands
- Customize UI for each brand
- Reuse components efficiently
- Maintain consistency in core functionality

#### Brand-Specific Implementations

For brand-specific configurations and implementations, the codebase uses:

1. **EnvironmentClient**: Injects brand-specific settings like website URLs, terms of service, and social media accounts
2. **Brand switching**: Conditional code execution based on the current brand being built

#### Multi Xcode Workspace

The repository uses multiple Xcode workspaces (one per brand) to avoid naming conflicts between targets in different packages. This approach works around limitations in Swift Package Manager that prevent having the same target name in different packages within a single workspace.

#### Localization

The applications support multiple languages including Japanese, English, Korean, French, and Vietnamese using String Catalogs for localization management.

#### CI/CD Pipeline

The CI/CD pipeline is implemented using:

1. **GitHub Actions**:
   - Build and test workflows that run only when relevant code changes
   - Uses path filtering to determine which apps need to be rebuilt
   - Automated version updates across all applications

2. **Xcode Cloud**:
   - Handles TestFlight and App Store Connect submissions
   - Simplifies code signing
   - Triggered by tag releases from GitHub

#### Release Process

The release process is automated through GitHub Actions:
1. A workflow updates version numbers across all applications
2. Creates and approves a pull request with these changes
3. When merged, automatically creates a new release tag
4. The tag triggers Xcode Cloud to build and archive production versions of the apps

This approach ensures version consistency across all applications and minimizes manual intervention in the release process.

## Development Practices

From the project structure and content, we can infer these development practices:

1. TypeScript for type safety
2. Component-based architecture
3. Static site generation for performance
4. MDX for rich content authoring
5. Modern build tools (Vite)
6. Edge deployment (Cloudflare Workers)
