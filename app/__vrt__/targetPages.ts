export interface TargetPage {
  name: string;
  path: string;
  /**
   * opengraph-image はテーマ(ライト/ダーク)の概念を持たず、a11y検査も行わない特殊なVRT対象のため、
   * 通常ページと区別するフラグ
   */
  isOpengraphImage?: boolean;
}

export const TARGET_PAGES: TargetPage[] = [
  { name: "home", path: "/" },
  // /[slug] (About) の代表値
  { name: "behavior", path: "/behavior" },
  { name: "blog", path: "/blog" },
  { name: "media", path: "/media" },
  { name: "thinking-in-career", path: "/thinking-in-career" },
  // /tags/[tag] の代表値。"dev" は (internal) Testing Markdown Renderer が持つタグで、
  // 常に存在することが保証されている(意図的に公開されているテスト記事のため)
  { name: "tags-dev", path: "/tags/dev" },
  // /blog/[slug] の代表値
  { name: "2024-development-wordpress-theme", path: "/blog/2024-development-wordpress-theme" },
  { name: "testing-markdown-renderer", path: "/blog/testing-markdown-renderer" },
  {
    name: "opengraph-image",
    path: "/blog/embed-tweet-with-app-router/opengraph-image",
    isOpengraphImage: true,
  },
];
