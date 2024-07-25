---
title: Next.js App RouterでPagefindを使うときのあれこれ
description: このブログサイトでサイト内検索機能を追加しました。検索が必要なほど記事数はないので完全に自己満足。右下の⌘ボタンか、Cmd + Kキーを押すと検索フォームが表示されるので、テキストを入力し試してみてください。
publishedAt: 2024-07-25
tags:
  - dev
---

このブログサイトでサイト内検索機能を追加しました。検索が必要なほど記事数はないので完全に自己満足。  
右下の ⌘ ボタンか、Cmd + K キーを押すと検索フォームが表示されるので、テキストを入力し試してみてください。

![テキストを入力し記事を検索する](/images/pagefind-with-app-router/1.gif)

サイト内検索機能は[Pagefind](https://pagefind.app/)を利用して実装しました。静的サイトに特化した全文検索ライブラリで、UI フレームワークに依存せずに利用できます。全文検索にも関わらず転送量をかなり抑えることができるのも大きなメリットです。とても便利ですが、Next.js で利用する際にいくつか考えることがありました。今回はそれらを紹介します！

Pagefind とは何か、どのように使うか、についてはインターネット上に多くの記事があるため割愛します。

## 前提

このサイトは Next.js App Router で構築しています。  
ブログ記事はマークダウンファイルでリポジトリ上に配置しており、[contentlayer](https://contentlayer.dev/)で読み込み JSON データに変換した後、[Unified.js](https://unifiedjs.com/), [rehype-react](https://github.com/rehypejs/rehype-react)を利用し React コンポーネントに変換します。  
これらの処理は React Server Components で実行され、ビルド時に静的な HTML として出力されます。詳しくはリポジトリをご覧ください。

https://github.com/MH4GF/mysite

## Indexing

### Next.js でのインデックスの作成

Pagefind CLI でビルド時にインデックスの作成を行います。Next.js でのビルド結果は `.next` に配置されるため、そのディレクトリを指定します。具体的なコマンドは以下のようになります:

```json title="package.json"
"build:pagefind": "pagefind --site .next --output-path public/search"
```

pagefind の生成ファイルは `public/search` に出力しました。Next.js では public ディレクトリに配置したファイルは静的アセットとしてホスティングしてくれるため、それを利用します。これはクライアントサイドの JavaScript から pagefind を呼び出すために必要です。

Pagefind は静的な HTML に対してインデックスを作成するため、 `next build` の後に CLI を実行する必要があります。以下のように `postbuild` で実行することで、 `pnpm build` を実行するだけで後処理として Pagefind を実行することができます。

```json
"build": "next build",
"postbuild": "pnpm run build:pagefind",
```

### インデックスに独自データを追加する

通常は Pagefind CLI の利用だけで良いのですが、このサイトでは NodeJS API を利用しスクリプトファイルを作って実行する形にしました。  
背景として、このサイトは他サイトで公開している記事へのリンク集としている側面もあり、Zenn や所属企業のテックブログで書いた記事なども記事一覧にリンクとして掲載しています: http://mh4gf.dev/articles

そのため、外部サイトの記事であってもタイトルを検索できたら良いなと考えました。それは NodeJS API で Pagefind を実行し `addCustomRecord()` を使うと実現できました。

以下のようにスクリプトファイルを用意します:

```ts title="scripts/pagefind.mts"
import { createIndex } from "pagefind";
// このサイトで表示している外部記事のデータ
import { externalArticles } from "../app/_features/articles/data/externalArticles";

async function main() {
  const { index } = await createIndex({});

  if (index === undefined) {
    throw new Error("Failed to create index");
  }

  // `--site .next` と同等
  await index.addDirectory({
    path: ".next",
  });

  // addCustomRecord() を利用し、外部記事のデータをインデックスに追加
  for (const article of externalArticles) {
    await index.addCustomRecord({
      url: article.href,
      content: article.title,
      meta: {
        title: article.title,
        externalLink: "true",
      },
      language: "ja",
    });
  }

  // `--output-path public/search` と同等
  await index.writeFiles({
    outputPath: "public/search",
  });
}

main();
```

externalArticles は、外部記事の情報を持つ以下のような構造のオブジェクトです。それを`index.addCustomRecord()` に渡す形で実現できました。

```ts
export const externalArticles = [
  {
    title: "チュートリアル: Yjs, valtio, React で実現する共同編集アプリケーション",
    publishedAt: "2024/07/03",
    href: "https://tech.route06.co.jp/entry/2024/07/03/154219",
    tags: ["route06-tech-blog"],
  },
  ...
]
```

https://github.com/MH4GF/mysite/blob/467b401e369a74f987fa9c5161f54ec6387e6a06/app/_features/articles/data/externalArticles.ts

今回はこの externalArticles を import するために、スクリプトファイルも TypeScript ファイルとしました。もしこれが JSON の読み込みなどであれば mjs でも良いかと思います。  
TypeScript ファイルを実行するために、今回は[tsx ](https://github.com/privatenumber/tsx)を使いました。インストールし依存に追加します:

```
pnpm add -D tsx
```

Pagefind CLI を置き換えます。

```json title="package.json"
"build:pagefind": "pagefind --site .next --output-path public/search" // [!code --]
"build:pagefind": "tsx ./scripts/pagefind.mts" // [!code ++]
```

## Search

Pagefind では検索結果を表示する UI コンポーネントが同梱されていますが、このサイトでは React コンポーネントを自前で用意したかったため[search API](https://pagefind.app/docs/api/)を直接使うことにしました。

### Pagefind の初期化

Pagefind は、生成ファイルに含まれる pagefind.js をブラウザから読み込むことで動作しますが、Next.js のビルド時にはそれらがないため、ビルドの失敗を解決する必要があります。  
具体的には以下の記事で紹介されていた、window オブジェクトに Dynamic Import で差し込みつつ `webpackIgnore`コメントを使う方法で解決できました。

https://www.petemillspaugh.com/nextjs-search-with-pagefind

```ts
void (async () => {
  if (typeof window !== "undefined" && typeof window.pagefind === "undefined") {
    try {
      window.pagefind = await import(
        // @ts-expect-error pagefind.js generated after build
        /* webpackIgnore: true */ "/search/pagefind.js"
      );
    } catch {
      window.pagefind = { search: () => Promise.resolve({ results: [] }) };
    }
  }
})();
```

https://github.com/MH4GF/mysite/blob/467b401e369a74f987fa9c5161f54ec6387e6a06/app/_features/command/items/SearchGroup.tsx#L34-L47

### React コンポーネントから Pagefind Search API の読み込み

Pagefind の Search API は以下のように利用します。

- `const search = await pagefind.search("static");` で検索を実行
- `const oneResult = await search.results[0].data();` で検索結果を取り出す

2 回非同期関数を実行することになります。React コンポーネントで非同期関数を扱う方法はいくつかありますが、React 19 からは Promise から値を取り出す [use](https://ja.react.dev/reference/react/use) API が提供され、Next.js では既に利用できるようになっています。  
今回はこちらを利用してみました。個人のサイトなので新しい API をどしどし使う。

```tsx
// Pagefindの型定義
type Data = {
  url: string;
  meta: {
    title: string;
  };
};

type Result = {
  id: string;
  data: () => Promise<Data>;
};

type Pagefind = {
  search: (query: string) => Promise<{ results: Result[] }>;
};

declare global {
  interface Window {
    pagefind: Pagefind | undefined;
  }
}

// キャッシュを有効にしつつ、データを取り出す関数
const getData = cache(async (result: Result) => result.data());

// .next内のhtmlファイル名がPageFindの検索結果として使われてしまうため変換する関数
// /server/app/articles/pagefind-with-app-router.html を
// /articles/pagefind-with-app-router にする
const formatUrl = (url: string): string => {
  return url.replace(/\/server\/app\/articles\/(.*)\.html/, "/articles/$1");
};

const SearchResultItem: FC<{ result: Result }> = ({ result }) => {
  // `use()` でPromiseから値を取り出す
  const data = use(getData(result));

  return <Link href={formatUrl(data.url)}>{data.meta.title}</Link>;
};

// PageFindの検索を実行する関数 こちらも `cache()` でラップ
const search = cache(async (query: string): Promise<Result[]> => {
  if (!window.pagefind) {
    return [];
  }

  return (await window.pagefind.search(query)).results;
});

const InnerSearchResultItems: FC<{ query: string }> = ({ query }) => {
  // `use()` でPromiseから値を取り出す
  const results = use(search(query));

  return results.map((result) => (
    <Suspense key={result.id}>
      <SearchResultItem result={result} />
    </Suspense>
  ));
};

export const SearchResultItems = () => {
  return (
    <Suspense>
      <InnerSearchResultItems />
    </Suspense>
  );
};
```

`use()` で Promise から値を取り出す場合、`cache()` 関数と `Suspense` コンポーネントを利用することになります。  
`use()` を使う際、再レンダリングにより複数回のデータフェッチが行われることを回避するために、Promise を読み取る関数はキャッシュされている必要があります。そのために `cache()`を利用します。  
Promise が解決していない場合、 `use()` は Promise を throw しコンポーネントをサスペンドさせます。 `Suspense` コンポーネントでラップし待機します。

詳しくは以下の記事が参考になります。

https://azukiazusa.dev/blog/promise-context-value-react-hook

https://zenn.dev/uhyo/articles/react-use-rfc

---

上記のコード例では Suspense の fallback を省略していたり、スタイリング([shadcn/ui](https://ui.shadcn.com/)の Command コンポーネントを利用しています)を省略しています。詳しくはソースコードをご覧ください。

https://github.com/MH4GF/mysite/blob/ab0cee1ecc0bff89828fa68261446c752d58228d/app/_features/command/items/SearchGroup.tsx

## 終わり

今回は Next.js で Pagefind を組み込む事例を紹介しました。私自身は他の全文検索ライブラリを使ったことはないのですが、Pagefind は簡単に利用でき、困るところはほぼありませんでした。(余談ですが shadcn/ui の Command コンポーネントの調整の方が大変でした。)  
今回は使用しませんでしたが、Pagefind は[検索結果のハイライト](https://pagefind.app/docs/highlighting/)にも対応しているためそちらも気が向いたら試せると良いなと思っています。

終わり！
