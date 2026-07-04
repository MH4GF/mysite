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

  // --- ラチェット: ゲート①導入時点で未カバーのファイル。テスト（ユニット / ストーリー）追加時に削除する ---
  "app/\\(pages\\)/articles/feed/_features/getRssFeed.ts",
  "app/_components/Footer.tsx",
  "app/_components/MyAvatar.tsx",
  "app/_components/icons.tsx",
  "app/_components/ui/command.tsx",
  "app/_components/ui/dialog.tsx",
  "app/_components/ui/popover.tsx",
  "app/_components/ui/tooltip.tsx",
  "app/_features/Header.tsx",
  "app/_features/articles/ArticleList.tsx",
  "app/_features/articles/ArticleListItem.tsx",
  "app/_features/articles/constants.ts",
  "app/_features/articles/data/externalArticles.ts",
  "app/_features/articles/getAdjacentArticles.ts",
  "app/_features/articles/type.ts",
  "app/_features/askAI/AskAIDropdown.tsx",
  "app/_features/colorMode/ColorModeScript.tsx",
  "app/_features/colorMode/useColorMode.ts",
  "app/_features/command/Command.tsx",
  "app/_features/command/CommandProvider.tsx",
  "app/_features/command/CommandTrigger.tsx",
  "app/_features/command/items/ColorTheme.tsx",
  "app/_features/command/items/CommandLinkItem.tsx",
  "app/_features/command/items/ShareToX.tsx",
  "app/_features/markdownRenderer/MarkdownRenderer.tsx",
  "app/_features/markdownRenderer/elements/Blockquote.tsx",
  "app/_features/markdownRenderer/elements/Paragraph.tsx",
  "app/_features/markdownRenderer/processor.tsx",
  "app/_features/richLinkCard/RichLinkCard.tsx",
  "app/_features/richLinkCard/getOGP.ts",
  "app/_features/top/HeroImage.tsx",
  "app/_features/top/WorkExperienceList.tsx",
  "app/_features/tweetEmbed/TweetEmbed.tsx",
  "app/_features/tweetEmbed/TwitterWidgets.tsx",
  "app/_features/viewTransition/Link.tsx",
  "app/_features/viewTransition/UniversalLink.tsx",
  "app/_features/viewTransition/isSameOrigin.ts",
  "app/_features/viewTransition/useViewTransitionRouter.ts",
  "app/_utils/cn.ts",
  "app/_utils/constants.ts",
  "app/_utils/date.ts",
  "app/blog/[slug]/_features/Article.tsx",
  "app/blog/[slug]/_features/ArticleMetaDetail.tsx",
  "app/blog/[slug]/_features/ArticleNavigation.tsx",
];
