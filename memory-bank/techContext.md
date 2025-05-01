# Technical Context

## Core Technologies

### Frontend Framework
- **Next.js 15.x**: React framework with App Router
- **React 19**: For component-based UI development
- **TypeScript 5.x**: For type safety and developer experience

### Styling
- **Tailwind CSS 3.x**: Utility-first CSS framework
- **tailwind-merge**: For conditional class merging via `cn()` utility
- **@tailwindcss/typography**: For styling Markdown content

### Content Management
- **Contentlayer**: For processing Markdown files into typed content
- **Unified/Remark/Rehype**: Ecosystem for Markdown processing
  - **remark-gfm**: GitHub Flavored Markdown support
  - **rehype-pretty-code**: Code syntax highlighting
  - **rehype-autolink-headings**: Automatic heading links
  - **rehype-slug**: Generate IDs for headings

### UI Components
- **Radix UI**: Accessible primitive components
- **cmdk**: Command menu component
- **Lucide React**: Icon library

### Testing
- **Playwright**: End-to-end testing
- **Vitest**: Unit testing
- **axe-core**: Accessibility testing
- **LostPixel**: Visual regression testing

### Build Tools
- **pnpm**: Package manager
- **Biome**: Code formatting and linting
- **ESLint**: Code linting
- **Markuplint**: HTML accessibility linting
- **Dependency Cruiser**: Dependency analysis

## Development Environment

### Setup Requirements
```sh
corepack enable
pnpm i
pnpm dev
```

### Key Commands
- **Development**: `pnpm dev`
- **Build**: `pnpm build`
- **Linting**: `pnpm lint`
- **Formatting**: `pnpm fmt`
- **Testing**: `pnpm test`

### Directory Structure
- **app/**: Next.js application code
- **contents/**: Markdown content files
- **public/**: Static assets
- **scripts/**: Build scripts

## Technical Constraints

### Browser Support
- Modern browsers with support for:
  - CSS Grid and Flexbox
  - ES6+ JavaScript
  - View Transitions API (with fallback)

### Performance Targets
- Lighthouse score > 90 on all metrics
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements

## Dependencies & Integration Points

### External Services Integration
- **Twitter/X**: Tweet embedding functionality
- **Open Graph**: OG image generation and fetching

### Critical Dependencies
- **contentlayer**: Core to the content management workflow
- **next-contentlayer**: Next.js integration for Contentlayer
- **unified**: Markdown processing pipeline
- **tailwindcss**: Primary styling approach

### Build Pipeline
1. Contentlayer processes Markdown files
2. Next.js builds the application
3. Pagefind generates search indices
4. Static assets are optimized

## Deployment

### Platform
- Likely deployed on Vercel (based on Next.js usage)

### Build & Deploy Process
- Automated builds triggered by git commits
- Static site generation at build time
- Edge functions for dynamic features

## Technical Debt & Known Limitations

- View Transitions API has limited browser support
- RSS feed generation happens at build time only
- Search functionality requires client-side JavaScript

## Performance Considerations

- Server Components for reduced JavaScript
- Static Generation for fast initial loads
- Strategic Client Components for interactivity
- Image optimization via Next.js Image

## Security Considerations

- Content Security Policy implementation
- No sensitive user data collection
- Static site reduces attack surface

This technical context provides a comprehensive overview of the technologies, tools, and approaches used in the project, helping to inform future development decisions.