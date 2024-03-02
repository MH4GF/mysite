---
title: Next.js App Router製ブログサイトでのツイートの埋め込み
description: このブログサイトでツイートの埋め込みをサポートしました。ツイートの埋め込みについてはウェブ上での情報量も多く枯れている内容かと思いきや、意外と考えることがあったため Next.js App Router での埋め込みについてまとめます。
publishedAt: 2024-2-2
tags:
  - dev
---

このブログサイトでツイートの埋め込みをサポートしました。  
ツイートの埋め込みについてはウェブ上での情報量も多く枯れている内容かと思いきや、意外と考えることがあったため Next.js App Router での埋め込みについてまとめます。

この記事では X のポストのことをツイートという呼称に統一しています。(伝わりやすいので....)

## 埋め込みの前提知識

ツイートの埋め込みを実装する際の前提知識としては、以下の Catnose さんの記事が参考になります。

https://zenn.dev/catnose99/articles/329d7d61968efb

ツイートのウェブページから[ツイートの埋め込み]を選択し、埋め込み用の HTML をコピーします。以下のような HTML が手に入ります。

```html
<blockquote class="twitter-tweet">
   <p lang="ja" dir="ltr">誕生日ボーイ <a href="https://t.co/j5aZPs1O1J">pic.twitter.com/j5aZPs1O1J</a></p>
   &mdash; Hirotaka Miyagi (@MH4GF) <a href="https://twitter.com/MH4GF/status/1717172182798000500?ref_src=twsrc%5Etfw">October 25, 2023</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

この widgets.js が読み込まれると、twitter-tweet クラスを持つ blockquote タグが iframe に置き換わります。  
以下のような表示です。

<blockquote class="twitter-tweet">
   <p lang="ja" dir="ltr">誕生日ボーイ <a href="https://t.co/j5aZPs1O1J">pic.twitter.com/j5aZPs1O1J</a></p>
   &mdash; Hirotaka Miyagi (@MH4GF) <a href="https://twitter.com/MH4GF/status/1717172182798000500?ref_src=twsrc%5Etfw">October 25, 2023</a>
</blockquote>

その他にも [Catnose さんの記事](https://zenn.dev/catnose99/articles/329d7d61968efb)では JavaScript フレームワークでのパフォーマンス向上などにも触れられています。  
以降はこの記事を読んでいる前提で記載していきます。

## このサイトについて

対象となるこのサイトの概要について説明します。

- Next.js App Router で作られているブログサイト
- 記事はマークダウンファイルとしてリポジトリ内に保存されている
- マークダウンファイルを [contentlayer](https://contentlayer.dev/) で読み込み、React Server Component 上で [Unified.js](https://unifiedjs.com/) を利用し ReactElement に変換する

ソースコードはこちらです: https://github.com/MH4GF/mysite

## 基本的な考え方

ウェブ上でよく見かける React でのツイート埋め込みの記事において、 以下のように tweetId だけを props で受け取って blockquote タグを生成するコンポーネントを実装するパターンをよく見かけます。

```tsx
<TweetEmbed tweetId={"1717172182798000500"} />
```

しかしこの場合埋め込みが完了するまでツイート本文が抜け落ちてしまうため、プログレッシブエンハンスメントの観点であまり望ましくありません。  
プログレッシブエンハンスメントとは、誰もが Web ページの基本的なコンテンツと機能にアクセスできるようにした上で、追加のブラウザ機能やネットワーク回線を持つユーザーはさらに強化された機能を利用できるようにする設計思想です。  
ツイート埋め込みで考えると、blockquote 要素としてもツイート本文を閲覧できつつ、 widgets.js の読み込みが完了したならば iframe のリッチな表示に切り替わる方が望ましいです。  
それを実現するためには、今回はツイートのウェブページから得られる HTML をそのまま利用する方が望ましい、と判断しました。

次節以降からは、本題の Next.js での実装について紹介していきます。

## Next.js での widgets.js の読み込み

まず、Next.js で widgets.js を読み込む方法について考えていきます。これは `next/script` を利用するのが良いでしょう。

```tsx title="TwitterWidgets.tsx"
import Script from "next/script";

export const TwitterWidgets = () => {
  return (
    <Script
      src="https://platform.twitter.com/widgets.js"
      strategy="lazyOnload"
    />
  );
};
```

widgets.js の読み込みについては、[公式ドキュメントで重複読み込みを防ぎパフォーマンスを向上させるスニペット](https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites)が紹介されていますが、そのような重複制御は next/script が行なってくれているため気にせずとも良さそうです。

strategy は `lazyOnLoad` にしています。これはブラウザが idle 状態になってからツイートの表示の読み込みを開始する戦略です。一瞬元々の blockquote タグが表示されますが、ツイート表示のためにページ全体をブロックする必要はないと考えているのでこれで良いと考えています。

ref: https://nextjs.org/docs/pages/api-reference/components/script#lazyonload

## マークダウンファイルで HTML を貼り付ける

続いて、記事のマークダウンファイルで 手に入れた HTML を貼り付けます。先ほどの例を再掲します。

```html
<blockquote class="twitter-tweet">
   <p lang="ja" dir="ltr">誕生日ボーイ <a href="https://t.co/j5aZPs1O1J">pic.twitter.com/j5aZPs1O1J</a></p>
   &mdash; Hirotaka Miyagi (@MH4GF) <a href="https://twitter.com/MH4GF/status/1717172182798000500?ref_src=twsrc%5Etfw">October 25, 2023</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

ここの `<script>` タグの widgets.js は前述の通り既に読み込んでいて不要なので、HTML から取り除いて貼り付けます。

このサイトではマークダウンファイルを ReactElement に変換するために [Unified.js](https://unifiedjs.com/) を利用していますが、マークダウンに含まれる生の HTML をそのまま展開することは XSS 攻撃のリスクがあるためデフォルトでは許可されていません。それをオプトインするためには [rehype-raw](https://github.com/rehypejs/rehype-raw) を利用します。

これだけで、widgets.js が DOM 内の twitter-tweet クラスを持つ blockquote タグを iframe に置き換え、ツイート埋め込みができるようになりました。

## クライアントサイドルーティングでの埋め込みに対応する

今の状態では記事 URL に直接アクセスした際や記事ページをリロードした際には iframe への変換が行われますが、next/link によるクライアントサイドルーティングで記事ページに遷移した際は blockquote タグのまま変換が行われません。widgets.js が読み込まれたあとに blockquote タグが挿入されるためです。  
これを解決するために、ページ遷移のタイミングで `twttr.widgets.load()` を呼び出す必要があります。そのように書き足してみましょう。

```tsx title="TwitterWidgets.tsx"
"use client"; // [!code ++]

import Script from "next/script";
import { usePathname } from "next/navigation"; // [!code ++]
import { useEffect } from "react"; // [!code ++]

export const TwitterWidgets = () => {
  const pathname = usePathname(); // [!code ++]

  useEffect(() => {// [!code ++]
    if (typeof window.twttr === "object") {// [!code ++]
      window.twttr.widgets.load(); // [!code ++]
    } // [!code ++]
  }, [pathname]); // [!code ++]

  return (
    <Script
      src="https://platform.twitter.com/widgets.js"
      strategy="lazyOnload"
    />
  );
};

declare global {// [!code ++]
  interface Window {// [!code ++]
    twttr: {// [!code ++]
      widgets: {// [!code ++]
        // [!code ++]
        load: () => void; // [!code ++]
      }; // [!code ++]
    }; // [!code ++]
  } // [!code ++]
} // [!code ++]
```

usePathname, useEffect を利用し、ページ遷移のタイミングで `twttr.widgets.load()` を呼び出します。型定義がないため、ここで合わせて追加しています。  
またこの二つのフックは Server Component では利用できないため `"use client"` を明示します。

これでクライアントサイドルーティングでの埋め込みにも対応できました。

## Appendix: rehype-react と tailwindcss 利用時のダークモード対応

通常の埋め込みの利用としては以上で完了ですが、このサイトではダークモードも提供しているためツイート埋め込みでもダークモード対応させたいです。rehype-react と tailwindcss を使っているちょっとニッチな状況下ですが、おまけとして紹介します。

ツイート埋め込みでダークモードを利用するには、以下のように meta タグを追加するか、

```html
<meta name="twitter:widgets:theme" content="dark" />
```

個々の blockquote タグに`data-theme`属性を追加することで設定ができます。

```html
<blockquote class="twitter-tweet" data-theme="dark">
   <p lang="zxx" dir="ltr"><a href="https://t.co/xtLfkMez5u">pic.twitter.com/xtLfkMez5u</a></p>
   &mdash; Hirotaka Miyagi (@MH4GF) <a href="https://twitter.com/MH4GF/status/1639253815936565248?ref_src=twsrc%5Etfw">March 24, 2023</a>
</blockquote>
```

ref

- https://developer.twitter.com/en/docs/twitter-for-websites/webpage-properties
- https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference

このうち前者の meta タグの手法は全ての埋め込みツイートに一括で反映できて良さそうでしたが、一度 widgets.js による変換が終わった後にテーマ変更ボタンを押して meta タグの値を変えても反映ができないため採用できませんでした。  
後者の blockquote タグの data 属性に追加する方法も widgets.js の変換後の切り替えの問題がありそうでしたが、**事前にライトテーマ・ダークテーマの blockquote タグを生成しておき、css によって表示を出し分ける方法**で解決できました。

前述の通りマークダウン文字列から React コンポーネントへの変換には `Unified.js` を利用しており、現状以下のようにプラグインを利用しています。(一部簡略化しています)

```tsx title="processor.ts"
import type { ComponentProps } from "react";
import { createElement } from "react";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { Link } from "next/link";

export const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeReact, {
    createElement,
    components: {
      a: Link,
    },
  });
```

ReactElement への出力を `rehype-react` が担当しており、rehype-react のオプションでは各 HTML タグに対応する React コンポーネントを渡すことができます。上記の例では a タグを next/link の Link コンポーネントに差し替えており、クライアントサイドルーティングできるよう拡張しています。

ここで blockquote タグに対応する Blockquote コンポーネントを作って拡張していきます。

```tsx title="Blockquote.tsx"
import type { ComponentProps } from "react";

import { TweetEmbed } from "../../tweetEmbed";

type Props = ComponentProps<"blockquote">;

export const Blockquote = (props: Props) => {
  if (props.className?.includes("twitter-tweet")) {
    return <TweetEmbed {...props} />;
  }

  return <blockquote {...props} />;
};
```

`"twitter-tweet"` クラスを持っている場合は TweetEmbed コンポーネントを返します。以下のような実装です。

```tsx title="TweetEmbed.tsx"
import type { ComponentProps } from "react";

type Props = ComponentProps<"blockquote">;

export const TweetEmbed = (props: Props) => {
  return (
    <>
      <div className="dark:hidden">
        <blockquote {...props} data-theme="light" />
      </div>
      <div className="hidden dark:block">
        <blockquote {...props} data-theme="dark" />
      </div>
    </>
  );
};
```

blockquote タグを 2 つ生成し、data-theme 属性をそれぞれ付与します。 `dark:*` というのは tailwindcss のダークモード対応のための記法で、ダークモード時に反映されるクラスとなります。これを利用し要素の表示非表示を切り替えます。

最後に作成した Blockquote コンポーネントを追加します。

```tsx title="processor.ts"
import type { ComponentProps } from "react";
import { createElement } from "react";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { Link } from "next/link";
import { Blockquote } from "./elements"; // [!code ++]

export const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeReact, {
    createElement,
    components: {
      a: Link,
      blockquote: Blockquote, // [!code ++]
    },
  });
```

これによりテーマ切り替え時にも埋め込みツイートも切り替えることができました！

## おわり

ここまでお読みいただきありがとうございました。今回紹介した実装について、リポジトリ内の実際に利用している箇所を紹介して終わりとしたいと思います。

- [TwitterWidgets.tsx](https://github.com/MH4GF/mysite/blob/6c20fd05938eaa4cd02dcff0cb6ede00f5d4a534/apps/web/app/_features/tweetEmbed/TwitterWidgets.tsx#L28-L29)
- [processor.tsx](https://github.com/MH4GF/mysite/blob/6c20fd05938eaa4cd02dcff0cb6ede00f5d4a534/apps/web/app/_features/markdownRenderer/processor.tsx)
- [TweetEmbed.tsx](https://github.com/MH4GF/mysite/blob/6c20fd05938eaa4cd02dcff0cb6ede00f5d4a534/apps/web/app/_features/tweetEmbed/TweetEmbed.tsx)

<blockquote class="twitter-tweet" data-theme="dark">
   <p lang="zxx" dir="ltr"><a href="https://t.co/xtLfkMez5u">pic.twitter.com/xtLfkMez5u</a></p>
   &mdash; Hirotaka Miyagi (@MH4GF) <a href="https://twitter.com/MH4GF/status/1639253815936565248?ref_src=twsrc%5Etfw">March 24, 2023</a>
</blockquote>

かわいいですね。
