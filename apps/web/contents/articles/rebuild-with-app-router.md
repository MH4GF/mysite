---
title: ブログを Next.js App Router で構築し直した感想
publishedAt: 2023-06-21
tags:
  - dev
---


このブログは今までは Astro で構築されていましたが、技術的な素振りとして Next.js の App Router で構築し直しました。今回の記事ではその学びを書きます。

## 利用技術

今回利用した技術は以下のとおりです。

- 言語: TypeScript
- UI ライブラリ・フレームワーク: React / Next.js(App Router)
- スタイリング: Tailwind CSS
- Markdown の変換: unified / remark / remark-react
- テスト: Playwright / Vitest
- ホスティング: Vercel

至ってシンプルな構成で、大枠のアプリケーション自体は App Router に従えばサクッと Vercel にデプロイできてしまうので、その体験はやはりすごいなと感じます。

Tailwind CSS は Server Component でも利用可能なスタイリングライブラリの一つですが、小規模なサービスにはやはり便利です。ChatGPT との相性もよく、今回の場合レイアウトを組むスタイリングはほぼ ChatGPT が書いてくれました。

## App Router のキャッチアップ

App Router をキャッチアップするための情報は Next.js 公式のドキュメントが詳しすぎるので、それを見るだけで大体解決できました。前提となる React Server Component の基礎や App Router の仕様、FAQ、ベストプラクティスまで、あらゆる情報がドキュメントに詰まっています。

自身がキャッチアップしていく過程でのメモは Zenn のスクラップにまとめています(ほぼ Next.js のドキュメントの参照になってしまっています)。こちらも参考にしてみてください。

https://zenn.dev/mh4gf/scraps/36af50cc21c9fa

## Server Component

App Router の最大の特徴と言っても良い Server Component です。今回はブログサービスなので、Server Component で書きたい処理は以下のようなものがありました。

- Markdown ファイルを fs モジュールを使って別ディレクトリから取得し、unified を使って React コンポーネントに変換する
- 記事内の URL からメタデータを取得してリッチなリンクカードとして表示する

これらは Server Component 内では単純な async/await として非同期関数を呼び出すことができます。API Routes を立てたり getStaticProps を使っていたのが不要になり、随分シンプルになって良いです。

コンポーネント内で useState や useEffect を使いたい、となったら次節で紹介する Client Component に切り替えることになります。

## Client Component

App Router ではデフォルトでは全てのコンポーネントが Server Component として扱われ、ブラウザ上で JavaScript を動かしたくなった場合に `'use client'` ディレクティブを付与して Client Component に切り替えることになります。useState やブラウザ API を触ったり、onClick などのイベントハンドラを設定する場合などです。

今回 Client Component に切り替えたのは今の所 2 箇所のみでした。テーマ切り替えのトグルボタンでイベントハンドラを設定したのと、Twitter 埋め込みのためのコンポーネントで useEffect を設定した箇所です。ブログサービスなので基本静的なレンダリングで済んでしまのは良いですが、素振りとしてはブログサービスで Server Actions を試すための機能はないかな…と探しています。いいねボタンを実装するのもいいかもですね。

個人的には `'use client'`, `'use server'` のディレクティブでコンポーネントがレンダリングされるランタイムが明示できるのは、実装の見通しとしてもわかりやすくなり良いなと感じました。Server Component では Node API が利用でき、Client Component ではブラウザ API や hooks が利用できる、とだけ意識すればよくなります。

ただ Next.js での Client Component はブラウザでだけレンダリングされるわけではなく、プリレンダリングされてブラウザでハイドレーションする、というところは注意する必要がありそうと感じました。Pages Router の SSR と同じですが、「あれこの処理どこで実行されてるんだ…？」と迷うことはあるかもしれません。

## Statically Typed Routes

Next.js 単体で型安全なルーティングを実現する機能で、個人的にはかなり好みな機能です。今まで Pages Router の時は [pathpida](https://github.com/aspida/pathpida) を使ったり、react-router の時は [react-router-typesafe-routes](https://github.com/fenok/react-router-typesafe-routes) を使って型安全ルーティングを実現していましたが、 どちらも `ROUTES.ARTICLES.DETAIL.buildPath({ slug: 'rebuild-with-app-router' })` のようなオブジェクトベースのパス構築になるため、最終的なパスを直感的に理解するのが難しいと感じていました。一方 Statically Typed Routes は Template Literal Type なので `/articles/rebuild-with-app-router` のような文字列の見た目になるのがいいです。

ただ Statically Typed Routes を有効化すると Link コンポーネントなどに単純な string を渡すことができなくなるため、ちょっとした手間がいくつか必要でした。例えば href を受け取るコンポーネントは以下のようになります。(スタイリングを取り除くなど簡略化しています)

```tsx title="ArticleListItem.tsx"
import Link from 'next/link'
import type { Route } from 'next'

type Props<T extends string> = {
  href: Route<T> // stringではなくRoute<T>を受け取る
  title: string
  publishedAt: string
}

export const ArticleListItem = <T extends string>({ title, href, publishedAt }: Props<T>) => {
  return (
    <article>
      <Link href={href} title={title} />
      <p>{publishedAt}</p>
    </article>
  )
}
```

生成された型は Route 型として import できるので、それを props に渡す形となります。

---

また記事のメタデータを表す Zod スキーマを作ろうとしたときに、パースしたオブジェクトの href の型を Route 型にすることはできないため、以下のようにしのぎました。

```ts
import type { Route } from 'next'
import { z } from 'zod'

export const articleSchema = z.object({
  title: z.string(),
  href: z.string(),
  publishedAt: z.string(),
})

export type Article<T extends string = string> = Omit<z.infer<typeof articleSchema>, 'href'> & {
  href: Route<T>
}

// 利用側
articleSchema.parse(maybeArticle) as Article
```

これでは型安全ではないので微妙だなーと感じています。Next.js 内部では Zod に依存しているので、 Route 型にパースできる Zod スキーマを提供してくれたらいいなと思ったりしています。

---

また Route 型をプロジェクト内で import すると、lint をするためには型生成が必要になるため、CI では next build が必要になります。型を生成するためだけにフルビルドする必要があるのは時間がかかってしまうので、型だけ生成するビルド方法を提供してくれたらいいなと思っています。こちらは discussion を起票しています。

https://github.com/vercel/next.js/discussions/50888

## ディレクトリ構成

今回は技術的な実験も込めているので、App Router ではディレクトリ構成をどうすると見通しが良くなるかを考えていました。Pages Router の時や Vite + React の時は[alan2207/bulletproof-react](https://github.com/alan2207/bulletproof-react)の features ディレクトリに全て詰め込む設計をよく採用していましたが、App Router の規約や思想も踏まえて考えたいです。最終的には以下の方針で落ち着きました。

- page.tsx で使うロジックは同階層に `_features` ディレクトリを切り、その中に全てまとめてコロケーションする
- eslint-plugin-import-access を活用して、基本的に import 可能なファイルは同階層のファイルのみとする

具体的には、この記事を表示している `/articles/[slug]` の構成は以下となります。(一部省略しています)

```
.
└── app/
    └── articles/
        └── [slug]/
            ├── page.tsx                    ... App Routerの命名規約となっているページファイル
            ├── _features/
            │   ├── Article.tsx             ... 記事詳細のServer Component, getMarkdownContentを呼び出す
            │   ├── getMarkdownContent.ts   ... Markdownファイルを取得し、unifiedでReactコンポーネントに変換する非同期関数
            │   └── index.ts                ... page.tsxで使える様にArticle.tsxをexportする
            └── __tests__/
                └── page.e2e.ts             ... PlaywrightでのE2Eテスト
```

### 基本はページ単位のコロケーションとする

App Router では page.tsx や not-found.tsx などの特別な振る舞いをするファイルが命名規則で決まっており、それ以外の命名であれば自由にファイルを配置することができます。そのため、ページの近くにロジックを配置するコロケーションが推奨されています。

https://nextjs.org/docs/app/building-your-application/routing/colocation

そのため、今回は page.tsx のそばに `_features` という名前でディレクトリを切り、その中にページをレンダリングする上で必要なロジックを全て詰め込むようにしました。ロジックは少ないため、コンポーネントや関数なども気にせず横並びにしています。

### eslint-plugin-import-access

上述した構成を後押ししてくれたのが eslint-plugin-import-access で、これは package-private-export の概念を持ち込むことができる eslint プラグインです。詳しくはこちらの記事をご覧ください。

https://zenn.dev/uhyo/articles/eslint-plugin-import-access

export されたモジュールは基本的には同一ディレクトリ内でのみしか import できなくなり、index.ts で re-export したモジュールが一つ上のディレクトリで import できます。これにより、**page.tsx で import できるモジュールは同階層の\_features/index.ts で re-export されているモジュールのみ** と機械的に制限できることになります。

もちろん複数のページで汎用的に使う関数やコンポーネントは出てくるので、その場合はトップレベルの `_components` ディレクトリに配置し、eslint-plugin-import-access で `@public` と jsdoc のアノテーションを付与することでどこからでも import できるようにしています。

別の階層の `_features` ディレクトリのロジックへの参照を防げる方法はないかなーと模索していたところ、このプラグインがちょうど良い解決策となってくれました。個人開発なのでそこまで厳しい設定にする必要はないですが、あえて実験として試してみました。

## テスト

React コンポーネントのテストは Testing Library や Storybook を利用することが多いですが、 Server Component はまだサポートはされておらず、サポートのための議論が Issue として進んでいます。

- [[Feature Request]: Support React Server Components (RSC) · Issue #21540 · storybookjs/storybook](https://github.com/storybookjs/storybook/issues/21540)
- [Support for async react server components · Issue #1209 · testing-library/react-testing-library](https://github.com/testing-library/react-testing-library/issues/1209)
  - React 18.3 (canary) では `render(<Suspense><AsyncComponent /></Suspense>)` という形でレンダリングできるかもしれないとのこと

現時点ではヘッドレスブラウザを利用した E2E テスト とするのが良さそうです。
今回は Playwright の toHaveScreenshot() を利用した Visual Regression Testing だけ導入し、スクリーンショットの比較を行う形としています。

## 感想

まだ試せていない機能がいくつかあるものの、 App Router の機能をいくつか触ってみてその開発体験の高さに驚きました。ただやはり Server Component を取り巻く周辺のエコシステムのサポートが追いついておらず、業務で利用するのはまだ早いかなと感じています。

個人的に気になっているのは、App Router のキャッシュ戦略と GraphQL クライアントの正規化されたキャッシュの相性が悪そうで、API から受け取ったデータをどうキャッシュすべきかというところです。

experimental ではあるものの Apollo Client では App Router に対応していますが、キャッシュの一貫性を保つために Server Component か Client Component のどちらかでだけ利用するという制約があります。

https://www.apollographql.com/blog/announcement/frontend/using-apollo-client-with-next-js-13-releasing-an-official-library-to-support-the-app-router/

GraphQL リクエストを行う場合は全て Client Component にする、というのは App Router の旨みを感じづらく、とはいえ Server Component を選ぶとしても現実的に実装可能なのか？というのが気になっています。選定した後支障が出て切り替えるとしても hooks ⇄ async function の書き換えなので変更が大変になるだろうな、というのも踏み切れない点の一つです。

---

気になる点はありますが、App Router や Server Component を取り巻く動向は今後も注目していきたいです。バグレポートなど、できるところから貢献していきたいと思っています。
