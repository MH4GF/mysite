---
title: Next.js App RouterでView Transitions APIの活用
publishedAt: 2024-01-08
tags:
  - dev
---

このサイトのリンク遷移で View Transitions API を有効化してみました。ヘッダーの Articles を押下するとフワッとページ遷移することがわかるかと思います。
この記事では Next.js App Router での View Transitions API の利用方法や、まだ実現できていないことなどを紹介します。

## View Transitions API とは

View Transitions API とは、「複数の DOM 要素間の状態遷移に対してアニメーションを適用できる API」です。  
今まで CSS で設定できていたのは単一の DOM 要素に対するアニメーションでした。例えばある要素の不透明度を変更する際のトランジションなどですが、View Transitions API を使うと例えばページ全体の遷移やスライドショーのような複数の要素の相互作用にも簡単にアニメーションを適用することが可能になります。詳しくは以下の Google が公開している記事をご覧ください。

https://developer.chrome.com/docs/web-platform/view-transitions?hl=ja

現在は Chromium 系ブラウザである Chrome, Edge で利用可能な実験的機能で、Safari や Firefox ではサポートされていません。また現在は単一ドキュメント内での遷移(シングルページアプリケーションのクライアントルーティング等)でのみサポートされていますが、将来的には同一オリジンの複数ドキュメントでの遷移もサポートする予定とのことです。

---

また今回は Next.js での実現方法の記事ですが、別の Web フレームワークである Astro では公式で View Transitions API のサポートが組み込まれています。

https://docs.astro.build/ja/guides/view-transitions/

Astro では、組み込みのアニメーションオプションが用意されているなど静的サイト向けのいくつかの拡張も含まれています。こちらの API も合わせて読むことで View Transitions API の理解に役立つかもしれません。

## Next.js での先行事例

Next.js のルーティングで View Transitions API を利用する方法はすでに日本語の記事も含め先行事例があります。ここでいくつか記事を紹介します。

- [View Transitions API によるスムーズなページ遷移を Next.js で簡単に試す](https://zenn.dev/iz_pixel/articles/77dce550a7694e)
- [View Transitions API × Next.js × TypeScript の実用的なサンプルを作った](https://zenn.dev/remew/articles/view-transitions-api-with-nextjs)
- [Page Transitions In Next.js 13 With App Router And The Built-In View Transitions API (No Third-Party Libraries)](https://plainenglish.io/blog/page-transitions-in-next-js-13)

ただこれらの記事では Next.js であっても Pages Router を利用していたり、App Router だとしても実装方法が異なっているようです。

また Next.js の GitHub Discussions でも View Transitions API のサポートについての話題が取り上げられており、いくつかの実装方法と課題が議論されています。

https://github.com/vercel/next.js/discussions/46300

こちらで紹介されている実装を試してみたところ、全てのユースケースを満たすことは難しそうなものの、 `next/navigation` の router.push による遷移のみであれば問題なさそうだったため今回導入してみました。

## 動作環境

- `next: 14.0.4`
- App Router

また今回の関連コードは以下のリポジトリのディレクトリに実際に動かしているものが含まれています。
https://github.com/MH4GF/mysite/tree/69fb94d44ebf032258fc148dd5717fb63945fa8c/apps/web/app/_features/viewTransition

## Link コンポーネントを利用したクライアントルーティング

早速実装を紹介していきます。実装は 3 ステップ必要になります。

- 型定義の追加
- ページ遷移を行う `useViewTransitionRouter` カスタムフックの追加
- 上記カスタムフックを利用する Link コンポーネント

### 型定義の追加

今回利用する[Document: startViewTransition() メソッド](https://developer.mozilla.org/ja/docs/Web/API/Document/startViewTransition)はまだ TypeScript の型定義に含まれていないため自身で定義します。

```ts title="viewTransitions.d.ts"
interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
}

interface Document {
  startViewTransition(
    updateCallback: () => Promise<void> | void
  ): ViewTransition;
}
```

W3C の API セクションにある定義に近い形にしています: https://drafts.csswg.org/css-view-transitions-1/#api

### ページ遷移を行う `useViewTransitionRouter` カスタムフックの追加

続いて useRouter をラップしたカスタムフックを用意します。今回は `useViewTransitionRouter` という命名にし、インターフェースを `next/navigation` の `useRouter` と同一にすることとします。使用感を変えずに利用できるようにすることが目的です。

```ts title="useViewTransitionRouter.ts"
"use client";

import type { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

// document.startViewTransitionに対応していないブラウザでの実行時は、単純にフォールバックする
const safeStartViewTransition = (callback: () => Promise<void> | void) => {
  if (!document.startViewTransition) {
    return void callback();
  }
  document.startViewTransition(callback);
};

export const useViewTransitionRouter = (): ReturnType<typeof useRouter> => {
  const router = useRouter();
  const pathname = usePathname();

  // ナビゲーション操作をPromiseで扱うためのrefオブジェクト。後述
  const promiseCallbacks = useRef<Record<
    "resolve" | "reject",
    () => void
  > | null>(null);

  // pathnameが変更されたときにPromiseをresolveする。後述
  useLayoutEffect(() => {
    return () => {
      if (promiseCallbacks.current) {
        promiseCallbacks.current.resolve();
        promiseCallbacks.current = null;
      }
    };
  }, [pathname]);

  // 他のメソッドはそのままに、pushメソッドだけsafeStartViewTransitionでラップする
  return {
    ...router,
    push: (href: Route) => {
      safeStartViewTransition(
        () =>
          new Promise((resolve, reject) => {
            promiseCallbacks.current = { resolve, reject };
            router.push(href);
          })
      );
    },
  };
};
```

細かい箇所を解説していきます。
上部で定義した`safeStartViewTransition()` を `router.push()` でラップするのは直感的かと思いますが、気になるのは単純に `router.push()` するだけでなく Promise オブジェクトでラップし、ref に格納していることかと思います。これは**ページ遷移処理(≒ 新しい DOM の用意)が終わってからアニメーションを動作させるために追加しています**。以下のような挙動となります:

- useViewTransitionRouter の `router.push()` が呼び出されると新しい Promise が作成され、その resolve と reject コールバックが `promiseCallbacks` に保持される
- useRouter の `router.push()` によるページ遷移が完了すると usePathname の `pathname` が変更するため、その変更をフックに `useLayoutEffect` が発火する その中身で Promise を resolve する
- `document.startViewTransition` は Promise の解決を待ってから実行され、アニメーションと同時に表示が切り替わる

`router.push()` の Promise 化をすることで、遷移先のページが用意できてからアニメーションさせることができました。Promise 化しなくても動作するにはするのですが、この実装がない場合、development 環境などの prefetch が効いていない状況や、production 環境のデプロイ直後のキャッシュがない状況などでは初回はアニメーションが動かないはずです。2 回目以降の遷移でアニメーションが効く形となります。

### Link コンポーネントの実装

最後に、 useViewTransitionRouter を利用する `Link` コンポーネントを追加します。こちらも `next/link` の `Link` コンポーネントにインターフェースを合わせる形とします。

```tsx title="Link.tsx"
"use client";

import type { Route } from "next";
import type { LinkProps } from "next/link";
import NextLink from "next/link";

import { useViewTransitionRouter } from "./useViewTransitionRouter";

export function Link({ children, href, ...props }: LinkProps) {
  const router = useViewTransitionRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    router.push(href.toString());
  };

  return (
    <NextLink {...props} href={href} onClick={handleLinkClick}>
      {children}
    </NextLink>
  );
}
```

`NextLink` の `onClick` で `router.push()` を実行する形で、あまり特筆することはありません。NextLink を利用することで prefetch も効かせることもできています。

この `Link` コンポーネントをアプリケーション内で利用することでアニメーションを伴うページ遷移ができました！

ちなみに CSS でアニメーションの調整も可能なのですが、今回はデフォルトの挙動が自然で好みだったためそのままにすることとしました。興味のある方は調べてみてください。

## 今回実現していない戻る・進むのページ遷移について

Link コンポーネントを利用したページ遷移では問題なく動作しますが、ブラウザの戻る・進むの操作はうまく動作せず、一旦保留としています。  
[App Router では popstate イベントのイベントリスナーでブラウザバックの遷移をしている](https://github.com/vercel/next.js/blob/5e7106141f1ca6db0ba8830cace70bfac18b3284/packages/next/src/client/components/app-router.tsx#L536-L558)ので、このあたりの処理を差し替えられれば動きそうな気がしますが...  
Pages Router では `router.beforePopState`が提供されていて、ここで popstate イベントの前に処理を差し込むことで解決できていましたが、App Router ではその代替は提供されていないようです。  
ここについては discussions で議論されているので、続報を追っています。

https://github.com/vercel/next.js/discussions/46300

## まとめ

- App Router で View Transitions API を利用したい場合、Link コンポーネントや router.push による遷移であれば問題なく動作する
- ブラウザの戻る・進むの操作はまだうまく動作せず、Next.js の GitHub Discussions で議論されている
