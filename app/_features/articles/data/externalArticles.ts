import type { ArticleMeta } from "../type";

type RawArticleMeta = Omit<ArticleMeta, "publishedAt"> & {
  publishedAt: string;
};

const articles: Omit<RawArticleMeta, "externalLink">[] = [
  {
    title:
      "Valibot Schema Driven UI - ユーザーがノーコードで自由に UI を組み立てられるエディタを Next.js と Valibot で構築する",
    publishedAt: "2024/09/26",
    href: "https://tech.route06.co.jp/entry/2024/09/26/122250",
    tags: ["route06-tech-blog"],
  },
  {
    title: "jscodeshift + OpenAI API でソースコード内の日本語文字列を一括で翻訳する",
    publishedAt: "2024/08/20",
    href: "https://tech.route06.co.jp/entry/2024/08/20/121720",
    tags: ["route06-tech-blog"],
  },
  {
    title: "チュートリアル: Yjs, valtio, React で実現する共同編集アプリケーション",
    publishedAt: "2024/07/03",
    href: "https://tech.route06.co.jp/entry/2024/07/03/154219",
    tags: ["route06-tech-blog"],
  },
  {
    title:
      "Playwright - 高速なフィードバックにより0→1フェーズでも生産性に大きく寄与するE2Eテストツール",
    publishedAt: "2024/06/12",
    href: "https://findy-tools.io/products/playwright/33/109",
    tags: ["findy-tools"],
  },
  {
    title: "モノレポでマージキューと必須ステータスチェックを運用するためのTips",
    publishedAt: "2024/06/12",
    href: "https://tech.route06.co.jp/entry/2024/06/12/121511",
    tags: ["route06-tech-blog"],
  },
  {
    title: "valtioに依存するReactコンポーネントをStorybookで表示する",
    publishedAt: "2024/06/05",
    href: "https://zenn.dev/route06/articles/valtio-with-storybook",
    tags: ["zenn"],
  },
  {
    title: "AWS Amplify Auth v6へのマイグレーションで対応した破壊的変更",
    publishedAt: "2024/04/08",
    href: "https://tech.route06.co.jp/entry/2024/04/08/122004",
    tags: ["route06-tech-blog"],
  },
  {
    title: "urqlのDocument Cachingを安全に運用する",
    publishedAt: "2024/03/13",
    href: "https://tech.route06.co.jp/entry/2024/03/13/134852",
    tags: ["route06-tech-blog", "graphql"],
  },
  {
    title: "to B プロダクトで Vite + React Router を採用して半年後の感想",
    href: "https://speakerdeck.com/mh4gf/impressions-after-6-months-of-using-vite-plus-react-router-e448b113-96f4-479a-adea-7d003e5d3fda",
    publishedAt: "2024/02/28",
    tags: ["speaker-deck"],
  },
  {
    title: "Playwright で一番小さく始める VRT と、次のステップの選択肢",
    href: "https://speakerdeck.com/mh4gf/playwright-de-fan-xiao-sakushi-meru-vrt-to-ci-nosutetupunoxuan-ze-zhi",
    publishedAt: "2024/02/21",
    tags: ["speaker-deck"],
  },
  {
    title: "GraphQL成熟度モデルをROUTE06のtoBプロダクトに当てはめてみる",
    publishedAt: "2024/01/29",
    href: "https://tech.route06.co.jp/entry/2024/01/29/120647",
    tags: ["route06-tech-blog", "graphql"],
  },
  {
    title: "@storybook/testing-libraryのconfigure()はpreview.jsで呼び出す",
    publishedAt: "2024/01/11",
    href: "https://zenn.dev/route06/articles/5a505fd0f471ab",
    tags: ["zenn"],
  },
  {
    title: "VSCodeで閲覧しているファイルから、GitHubのコミット内のパーマリンクを取得する",
    publishedAt: "2023/12/25",
    href: "https://zenn.dev/mh4gf/articles/4ff18b864ef359",
    tags: ["zenn"],
  },
  {
    title: "GitHub Actions のみで、actions/cache も使わない最軽量の VRT",
    publishedAt: "2023/12/20",
    href: "https://zenn.dev/mh4gf/articles/tiny-vrt-with-github-actions",
    tags: ["zenn"],
  },
  {
    title: "GitHubのCODEOWNERSで一部サブディレクトリだけ別のオーナーを指定する",
    publishedAt: "2023/08/25",
    href: "https://zenn.dev/route06/articles/codeowners-specify-different-owner",
    tags: ["zenn"],
  },
  {
    title: "学習しながらアーキテクチャを進化させていくためのモノレポ",
    href: "https://speakerdeck.com/mh4gf/xue-xi-sinagaraakitekutiyawojin-hua-saseteikutamenomonorepo",
    publishedAt: "2023/10/06",
    tags: ["speaker-deck"],
  },
  {
    title: "Amplify Hostingのプレビュー環境でパラメータストアの秘匿情報を取得する",
    href: "https://tech.route06.co.jp/entry/2023/09/22/102742",
    publishedAt: "2023/09/22",
    tags: ["route06-tech-blog"],
  },
  {
    title: "pnpm workspace実践ノウハウ",
    href: "https://speakerdeck.com/mh4gf/pnpm-workspaceshi-jian-nouhau",
    publishedAt: "2023/09/09",
    tags: ["speaker-deck"],
  },
  {
    title: "Plainのフロントエンドにおける技術選定(2023年8月版)",
    href: "https://tech.route06.co.jp/entry/2023/08/08/115253",
    publishedAt: "2023/08/08",
    tags: ["route06-tech-blog", "graphql"],
  },
  {
    title: "StoryBook v7.0 へのアップデートで非推奨になった型",
    href: "https://zenn.dev/route06/articles/storybook-v7-deprecations",
    publishedAt: "2023/07/05",
    tags: ["zenn"],
  },
  {
    title: "Amplify Hostingのプレビュー環境をGitHub Actionsでデプロイする",
    href: "https://tech.route06.co.jp/entry/2023/06/30/120807",
    publishedAt: "2023/6/30",
    tags: ["route06-tech-blog"],
  },
  {
    title: "GitHub Actionsで実行するstorycap / reg-suit の高速化",
    href: "https://tech.route06.co.jp/entry/2023/03/29/080000",
    publishedAt: "2023/3/29",
    tags: ["route06-tech-blog"],
  },
  {
    title: "GraphQL Code Generator v3 Roadmapで推されているclient-presetを紹介する",
    href: "https://zenn.dev/mh4gf/articles/graphql-codegen-client-preset",
    publishedAt: "2023/1/26",
    tags: ["zenn", "graphql"],
  },
  {
    title: "graphql-codegenとzodのz.brandでCustom ScalarのNominal Typingを実現する例",
    href: "https://zenn.dev/mh4gf/articles/nominal-typing-with-graphql-codegen-and-zod",
    publishedAt: "2023/1/10",
    tags: ["zenn", "graphql"],
  },
  {
    title: "graphql-rubyで入力値の柔軟なバリデーションを実現する@constraint directiveを導入する",
    publishedAt: "2023/1/5",
    href: "https://zenn.dev/mh4gf/articles/graphql-ruby-constraint-directive",
    tags: ["zenn", "graphql"],
  },
  {
    title: "Next.js上のGraphQLクライアントから秘匿情報を安全に扱いつつAPIリクエストを行う",
    publishedAt: "2022/12/10",
    href: "https://zenn.dev/mh4gf/articles/urql-client-working-with-credential-in-nextjs",
    tags: ["zenn", "graphql"],
  },
  {
    title: "Rails+Next.jsでGraphQLを導入する時に考えたこと",
    publishedAt: "2022/9/29",
    href: "https://tech.timee.co.jp/entry/2022/09/29/110000",
    tags: ["timee-product-team-blog", "graphql"],
  },
  {
    title: "GitHub Apps / GitHub Actionsを使って別のリポジトリにファイルをコピーするPRを作成する",
    publishedAt: "2022/9/18",
    href: "https://zenn.dev/mh4gf/articles/copy-file-to-another-repository",
    tags: ["zenn"],
  },
  {
    title: "GitHub Container Registryへのdocker loginでGitHub CLIの認証情報を利用する",
    publishedAt: "2022/8/5",
    href: "https://zenn.dev/mh4gf/articles/ff4a36eb2580a3",
    tags: ["zenn"],
  },
  {
    title: "graphql-rubyで、queryだけのリクエストの場合リードレプリカに接続する",
    publishedAt: "2022/7/18",
    href: "https://zenn.dev/mh4gf/articles/f3c606fce193f8",
    tags: ["zenn", "graphql"],
  },
  {
    title: "ActiveModelSerializersを利用しているRailsプロジェクトでgraphql-rubyを導入・共存させる",
    publishedAt: "2022/7/7",
    href: "https://zenn.dev/mh4gf/articles/1110e9e962ad3f",
    tags: ["zenn"],
  },
  {
    title: "dependency-cruiser-report-actionでPRの変更ファイルの依存関係を可視化してコメントする",
    publishedAt: "2022/6/27",
    href: "https://zenn.dev/mh4gf/articles/12fcdcba14e576",
    tags: ["zenn"],
  },
  {
    title: "フリーランスエンジニアになって半年が経った",
    publishedAt: "2022/5/8",
    href: "https://note.com/mh4gf/n/n1f263fb3c4ee",
    tags: ["note"],
  },
  {
    title: "[@svgr/webpack] Next.js / Storybook でSVGをコンポーネントとして扱う",
    publishedAt: "2022/5/7",
    href: "https://zenn.dev/mh4gf/articles/64456281f65fbe",
    tags: ["zenn"],
  },
  {
    title: "ProseMirror Guide(日本語訳)",
    publishedAt: "2022/3/10",
    href: "https://zenn.dev/mh4gf/articles/d25ef1ff30b5a6",
    tags: ["zenn"],
  },
  {
    title: "docker-composeで立ち上げているminioをvirtual-hosted styleで接続する",
    publishedAt: "2022/1/18",
    href: "https://zenn.dev/mh4gf/articles/873e34b95bbbdf",
    tags: ["zenn"],
  },
  {
    title: "2021年 ソフトウェアエンジニアとしてできたことと振り返り",
    publishedAt: "2021/12/31",
    href: "https://note.com/mh4gf/n/nf131e1c3bc7b",
    tags: ["note"],
  },
  {
    title: "2021年、在宅ワークで買ってよかったもの",
    publishedAt: "2021/12/28",
    href: "https://note.com/mh4gf/n/n639f13c6a62b",
    tags: ["note"],
  },
  {
    title: "「民藝の100年」を観に行った",
    publishedAt: "2021/12/13",
    href: "https://note.com/mh4gf/n/n85ec2fd70fc7",
    tags: ["note"],
  },
  {
    title: "code-serverを立ち上げた",
    publishedAt: "2021/11/8",
    href: "https://note.com/mh4gf/n/n4c9bc6fcb9a6",
    tags: ["note"],
  },
  {
    title: "モニターアームを黒に塗る",
    publishedAt: "2021/11/7",
    href: "https://note.com/mh4gf/n/n443283dd240b",
    tags: ["note"],
  },
  {
    title: "Vercel上のNuxt.jsで`Could not load Nuxt configuration.` が出た",
    publishedAt: "2021/9/27",
    href: "https://zenn.dev/mh4gf/articles/674cfdcf1e5d89d75d09",
    tags: ["zenn"],
  },
  {
    title: "株式会社タイミーを退職しました。",
    publishedAt: "2021/9/13",
    href: "https://note.com/mh4gf/n/n901dafda3ffa",
    tags: ["note"],
  },
  {
    title: "現在持っている技術の棚卸し 2021年",
    publishedAt: "2021/8/30",
    href: "https://note.com/mh4gf/n/n678b2a5dfb89",
    tags: ["note"],
  },
  {
    title: "M1 MacでDocker/Ruby on Rails/Go/Nodeの開発環境構築メモ",
    publishedAt: "2021/5/30",
    href: "https://zenn.dev/mh4gf/articles/d917c809991808",
    tags: ["zenn"],
  },
  {
    title: "2020年 ソフトウェアエンジニアとしてできたことと振り返り",
    publishedAt: "2020/12/31",
    href: "https://note.com/mh4gf/n/n0831d457d2ee",
    tags: ["note"],
  },
  {
    title: "新規事業の決済機能としてStripeを導入する上で考えたこと全て",
    publishedAt: "2020/12/10",
    href: "https://tech.timee.co.jp/entry/2020/12/10/131108",
    tags: ["timee-product-team-blog"],
  },
  {
    title: "Rails + RSpec + OpenAPI3 + Committeeでスキーマ駆動開発を運用するTips",
    publishedAt: "2020/7/5",
    href: "https://tech.timee.co.jp/entry/2020/07/05/150312",
    tags: ["timee-product-team-blog"],
  },
  {
    title: "RedashをFargate, Datadog, Terraformで構築/運用する",
    publishedAt: "2020/4/20",
    href: "https://tech.timee.co.jp/entry/2020/04/20/175821",
    tags: ["timee-product-team-blog"],
  },
  {
    title:
      "rubocop --auto-gen-config で、LineLengthのMaxを変更せず指摘に該当するファイルをexcludeする",
    publishedAt: "2019/12/19",
    href: "https://qiita.com/mh4gf/items/4611f60aa99905686c84",
    tags: ["qiita"],
  },
] as const;

export const externalArticles: RawArticleMeta[] = articles.map((article) => ({
  ...article,
  externalLink: true,
}));
