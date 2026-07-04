/**
 * ストーリー存在チェック（SPEC.md「コンポーネントテスト（Storybook）」）の除外 allowlist。
 *
 * scripts/checkStoryExistence.mts が対象とする PascalCase コンポーネントファイル
 * （`app/**\/[A-Z]*.tsx`、ただし *.stories.tsx / *.test.tsx / __tests__ 等は対象外）のうち、
 * 対応する `<Name>.stories.tsx` を持たないものをここに列挙する。
 *
 * 運用ルール（coverageExclusions.ts と同様）:
 * - インラインの ignore コメントは全面禁止。除外はこのファイルでのみ管理する
 * - エントリごとに除外理由コメントを必須とする
 * - エントリはリポジトリルートからの相対パス（POSIX区切り）の完全一致で扱う。
 *   coverageExclusions.ts と異なりグロブとしては解釈しないため、`(` `[` 等のエスケープは不要
 * - このリストは縮む方向にのみ変更してよい（ラチェット）。新規追加はユーザーの明示的な承認が必要
 * - allowlist に載っているのに対応する stories ファイルが存在する場合（stale エントリ）も
 *   checkStoryExistence.mts はエラーにする。ストーリー追加時は必ずここから該当エントリを削除すること
 */
export const storyExclusions = [
  // --- RSC: ページVRT（ゲート②）で担保 ---
  "app/_features/markdownRenderer/MarkdownRenderer.tsx",
  "app/_features/richLinkCard/RichLinkCard.tsx",

  // --- ラチェット: Storybook 導入時点で未作成。ストーリー追加時に削除する ---
  "app/[slug]/_features/Content.tsx",
  "app/_components/Footer.tsx",
  "app/_components/MyAvatar.tsx",
  "app/_features/Header.tsx",
  "app/_features/articles/ArticleList.tsx",
  "app/_features/articles/ArticleListItem.tsx",
  "app/_features/askAI/AskAIDropdown.tsx",
  "app/_features/colorMode/ColorModeScript.tsx",
  "app/_features/command/Command.tsx",
  "app/_features/command/CommandProvider.tsx",
  "app/_features/command/CommandTrigger.tsx",
  "app/_features/command/items/ColorTheme.tsx",
  "app/_features/command/items/CommandLinkItem.tsx",
  "app/_features/command/items/SearchGroup.tsx",
  "app/_features/command/items/ShareToX.tsx",
  "app/_features/markdownRenderer/elements/Blockquote.tsx",
  "app/_features/markdownRenderer/elements/Paragraph.tsx",
  "app/_features/top/HeroImage.tsx",
  "app/_features/top/WorkExperienceList.tsx",
  "app/_features/tweetEmbed/TweetEmbed.tsx",
  "app/_features/tweetEmbed/TwitterWidgets.tsx",
  "app/_features/viewTransition/Link.tsx",
  "app/_features/viewTransition/UniversalLink.tsx",
  "app/blog/[slug]/_features/Article.tsx",
  "app/blog/[slug]/_features/ArticleMetaDetail.tsx",
  "app/blog/[slug]/_features/ArticleNavigation.tsx",
];
