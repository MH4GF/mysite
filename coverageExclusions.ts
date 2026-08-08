/**
 * カバレッジ計測（SPEC.md ゲート①）の除外 allowlist。
 *
 * 運用ルール:
 * - インラインの ignore コメント（v8 ignore 等）は全面禁止。除外はこのファイルでのみ管理する
 * - エントリごとに除外理由コメントを必須とする
 * - このリストは縮む方向にのみ変更してよい（ラチェット）。新規追加はユーザーの明示的な承認が必要
 */
export const coverageExclusions = [
  // --- Next.js 規約ファイル: ルートカバレッジ（ゲート②）のページVRT + E2E で担保 ---
  "app/**/page.tsx",
  "app/**/layout.tsx",
  "app/**/route.ts",
  "app/**/opengraph-image.tsx",
  "app/sitemap.ts",

  // --- Playwright テストコード: テスト自身はカバレッジ計測の対象外 ---
  "app/**/*.e2e.ts",

  // --- Storybook ストーリー: テストコード（play function を含む）自身はカバレッジ計測の対象外 ---
  "app/**/*.stories.tsx",

  // --- 生成物依存の境界: contentlayer/generated・pagefind の生成物を import しており、
  //     生成物の有無で解析可否が変わる（暗黙除外は環境依存になるため明示除外する）。ページVRT + E2E で担保 ---
  "app/_features/articles/getArticle.ts",
  "app/_features/articles/getArticlesMeta.ts",
  "app/[slug]/_features/Content.tsx",
  "app/_features/command/items/SearchGroup.tsx",
];
