# Project Brief

## Project Overview
This project is a personal website/blog for MH4GF (GitHub username) hosted at mh4gf.dev. It serves as a personal portfolio and blog where the owner shares articles, information about themselves, and their work experiences.

## Core Requirements

1. **Personal Website**: Provide information about the owner, their interests, and professional experience
2. **Blog**: Feature articles written by the owner on various topics, primarily related to technology
3. **Responsive Design**: Support both light and dark mode, and be responsive across different devices
4. **Modern Web Technologies**: Built with Next.js, React, TypeScript, and Tailwind CSS
5. **Accessibility**: Maintain high accessibility standards with testing via axe-core and Playwright

## Technology Stack

- **Framework**: Next.js with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Content Management**: Contentlayer for markdown processing
- **Testing**: Playwright for E2E tests, Vitest for unit tests
- **Linting & Formatting**: Biome, ESLint, TypeScript
- **Build & Development**: pnpm as package manager

## Project Structure

- **app/**: Next.js app directory with App Router structure
  - **(pages)/**: Main page templates
  - **_components/**: Reusable UI components
  - **_features/**: Feature-specific components organized by domain
  - **_utils/**: Utility functions
- **contents/**: Markdown content for articles and about pages
- **public/**: Static assets like images and fonts

## Key Features

1. **Article System**: Display blog posts written in Markdown with code syntax highlighting
2. **Command Menu**: Global command menu for site navigation and functionality
3. **Dark/Light Mode**: Theme switching capability
4. **RSS Feed**: Provide RSS feed for articles
5. **View Transitions**: Smooth page transitions using View Transitions API
6. **Rich Link Cards**: Generate rich preview cards for external links
7. **Search**: Site-wide search functionality

## Design Principles

1. **Simplicity**: Clean, minimalist design focusing on content
2. **Performance**: Fast page loads and minimal client-side JavaScript
3. **Accessibility**: Ensure the site is usable by people with disabilities
4. **SEO**: Optimize for search engines
5. **Type Safety**: Strict TypeScript usage throughout the codebase

This project aims to be a showcase of modern web development practices while serving as a personal platform for the owner to share their work and thoughts.