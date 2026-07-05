# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

IMPORTANT: Read coding guidelines in docs/lint-rules.md before beginning code work.

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
- コードコメントは日本語で書く。Why（なぜそうしているか）を説明する場合にのみ書く。What の説明は実装との乖離が生じやすいため書かない

## File アクセス Rules (Next.js App Router)

`app/` には `_features/` や `[slug]/` 等の慣習的ディレクトリがある。以下を守ること:

- ディレクトリを Read しない。`app/_features` 等は EISDIR で失敗する。Glob で `app/_features/**/*.{ts,tsx}` のようにファイル列挙してから個別に Read する
- 角括弧パスは Bash でシングルクォートで囲む。zsh が `[slug]` を glob として解釈するため。Read/Glob/Grep ツールの path 引数はクォート不要