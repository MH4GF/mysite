# System Patterns

## Architecture Overview

The website follows a modern Next.js architecture using the App Router pattern, with a clear separation of concerns:

1. **Content Layer**: Markdown files processed through Contentlayer
2. **Presentation Layer**: React components for UI rendering
3. **Routing Layer**: Next.js App Router for URL structure and navigation
4. **Utility Layer**: Helper functions and shared utilities

## Directory Structure Patterns

```
app/
├── (pages)/                # Main page routes with App Router structure
├── _components/            # Shared UI components
├── _features/              # Domain-specific feature components
├── _utils/                 # Utility functions and helpers
contents/                   # Markdown content files
public/                     # Static assets
```

### Key Organization Patterns

1. **Feature-First Organization**: Components are organized by feature domain rather than by component type
2. **Barrel Export Pattern**: Index files for clean imports
3. **Co-location of Tests**: Tests are located alongside the code they test
4. **Atomic Design Influence**: UI components follow a hierarchy of complexity

## Component Design Patterns

1. **Composition Over Inheritance**: Components are composed together rather than extended
2. **Container/Presentation Pattern**: Separation of data fetching/state management from presentation
3. **Component Naming Conventions**:
   - PascalCase for React components
   - camelCase for hooks (prefixed with `use`)
   - Named exports preferred over default exports
4. **Prop Interface Definition**: Clear TypeScript interfaces for component props

## Data Flow Patterns

1. **Server Components by Default**: Most components are React Server Components
2. **Content Processing Pipeline**:
   ```
   Markdown Files → Contentlayer → React Components → Rendered Pages
   ```
3. **Static Site Generation**: Content is pre-rendered at build time for optimal performance
4. **Client-Side Enhancement**: Interactive elements use client components

## UI/UX Patterns

1. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
2. **Dark/Light Mode**: Theme switching with consistent color variables
3. **Command Menu Pattern**: Global menu for navigation and actions
4. **View Transitions**: Smooth page transitions for improved UX
5. **Consistent Typography**: Type scale using Tailwind's typography plugin

## Implementation Patterns

1. **Utility-First CSS**: Tailwind CSS for styling with `cn()` helper for conditionals
2. **Type Safety**: Strict TypeScript throughout with explicit typing
3. **Error Boundaries**: Proper error handling at component boundaries
4. **Accessibility Patterns**: ARIA attributes, keyboard navigation, and semantic HTML

## Testing Patterns

1. **E2E Testing**: Playwright tests for critical user flows
2. **Component Testing**: Vitest for unit testing components
3. **Visual Regression Testing**: Screenshot comparisons with LostPixel
4. **Accessibility Testing**: Integration with axe-core

## Build and Development Patterns

1. **Monorepo-Like Structure**: All code in a single repository
2. **Automated Linting/Formatting**: Biome and ESLint for code quality
3. **Dependency Management**: pnpm for efficient package management
4. **Incremental Builds**: Leveraging Next.js incremental static regeneration

## Critical Implementation Paths

1. **Article Rendering Pipeline**:
   - Content sourcing from Markdown
   - Processing through Contentlayer
   - Rendering with React components
   - Enhancement with syntax highlighting and other features

2. **Page Transition System**:
   - View Transitions API integration
   - Client-side navigation
   - Animation coordination

3. **Search Implementation**:
   - Static search index generation
   - Client-side search functionality
   - Results presentation

4. **Command Menu Flow**:
   - Global keyboard shortcut activation
   - Command indexing
   - Filtering and execution

These patterns establish a consistent approach to development across the project, ensuring maintainability and scalability.