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
  // Article は async RSC の MarkdownRenderer を子に持つためストーリー化できない。
  // ゲート①はユニットテスト（__tests__/article.test.tsx）、視覚検証はページVRTで担保
  "app/blog/[slug]/_features/Article.tsx",
  // Content は contentlayer 実データ（外部リポジトリ由来・非決定的）を値 import し、
  // かつ async RSC の MarkdownRenderer を子に持つためストーリー化できない。
  // ゲート①は生成物依存として恒久除外済み（coverageExclusions.ts）、視覚検証はページVRTで担保
  "app/[slug]/_features/Content.tsx",
];
