# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- Build: `pnpm build`
- Development: `pnpm dev`
- Lint: `pnpm lint` (runs all lint commands)
- Format: `pnpm fmt` (runs all format commands)
- Test: `pnpm test` (runs all test suites)
- Single Vitest test: `pnpm vitest run app/_features/path/to/test.test.ts`
- Single Playwright test: `pnpm playwright test app/path/to/test.e2e.ts`

## Code Style Guidelines
- Use Biome for formatting: semicolons always, double quotes
- Import organization: external dependencies first, then internal modules
- Named exports preferred over default exports (with some exceptions)
- React components use PascalCase, hooks use camelCase with `use` prefix
- Typescript: strict type checking, explicitly type function parameters and returns
- Error handling: use try/catch blocks with proper error typing
- CSS: use Tailwind utility classes with cn() helper for conditionals
- Testing: use Vitest for unit tests, Playwright for e2e tests