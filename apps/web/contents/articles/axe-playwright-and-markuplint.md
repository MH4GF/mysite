---
title: axe-core/playwrightとmarkuplintを導入しアクセシビリティの自動テストをできるようにした
description: Web アクセシビリティに興味があったので、まず機械的なチェックツールから学んで知識を増やそうということで @axe-core/playwright と markuplint を導入してみました。
publishedAt: 2024-03-17
tags:
  - dev
---

Web アクセシビリティに興味があったので、まず機械的なチェックツールから学んで知識を増やそうということで [@axe-core/playwright](https://www.npmjs.com/package/@axe-core/playwright) と [markuplint](https://github.com/markuplint/markuplint) を導入してみました。

## axe-playwright のセットアップ

既に Playwright が導入されている状況を想定し進めます。まず[@axe-core/playwright ](https://www.npmjs.com/package/@axe-core/playwright)をインストールします。

```sh
pnpm add -D @axe-core/playwright
```

このサイトの場合 VRT として Playwright を動かしているテストがあるので([過去資料](https://speakerdeck.com/mh4gf/playwright-de-fan-xiao-sakushi-meru-vrt-to-ci-nosutetupunoxuan-ze-zhi))、そのプロセスに同居する形で axe を実行することにしました。

```ts
import AxeBuilder from "@axe-core/playwright"; // [!code ++]
import type { Page, TestInfo } from "@playwright/test";

const setup = async (page: Page): Promise<void> => {
  // 省略
};

const screenshot = async (page: Page, testInfo: TestInfo): Promise<void> => {
  // 省略
};

const testA11y = async (page: Page) => { // [!code ++]
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // [!code ++]
  expect(accessibilityScanResults.violations).toEqual([]); // [!code ++]
}; // [!code ++]

test("VRT", async ({ page }, testInfo) => {
  await setup(page);
  await screenshot(page, testInfo); // [!code --]
  await Promise.all([testA11y(page), screenshot(page, testInfo)]); // [!code ++]
});
```

`accessibilityScanResults.violations` が空配列になっているかどうか、で検証します。このブログの場合対応しきれない指摘はなかったのでこのままでよかったのですが、もし除外したい指摘がある場合は `toMatchSnapshot` にし配列の状態をそのまま保存する形になるようです。

このテストをそれぞれのページで実行し、出てきた指摘を解消していくのを進めました。

## markuplint のセットアップ

以下のコマンドを実行し、対話式にセットアップします。

```sh
$ pnpm dlx markuplint --init
Packages: +170
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 170, reused 169, downloaded 1, added 170, done
┌──────────────────────────────────────┐
│                                      │
│            /✔\ Markuplint            │
│                v4.1.0                │
│                                      │
│            Initialization            │
│                                      │
└──────────────────────────────────────┘

✔ Which do you use template engines? · React (JSX)
✔ May I install them automatically? (y/N) · true
✔ Do you customize rules? (y/N) · false
✔ Does it import the recommended config? (y/N) · true
✨Created: /Users/mh4gf/ghq/github.com/MH4GF/mysite/.markuplintrc
Install automatically
npm install -D --legacy-peer-deps markuplint @markuplint/jsx-parser @markuplint/react-spec
npm ERR! code EUNSUPPORTEDPROTOCOL
npm ERR! Unsupported URL Type "workspace:": workspace:^*

npm ERR! A complete log of this run can be found in: /Users/mh4gf/.npm/_logs/2024-03-14T00_55_41_545Z-debug-0.log
```

.markuplintrc ファイルの作成はできましたが、依存のインストールでエラーになってしまいました。このプロジェクトでは pnpm を使っているのですが、npm でインストールしようとしてエラーになっているようです。  
markuplint が実行したコマンドを参考に以下のパッケージをインストールします。このサイトは React で実装されているため、必要になるパッケージが含まれています。

```sh
pnpm add -D markuplint @markuplint/jsx-parser @markuplint/react-spec
```

設定ファイルの入力中の補完が欲しいので、.markuplintrc ファイルを `.markuplintrc.ts` に変換して TypeScript で書けるようにします。

```ts
import type { Config } from "@markuplint/ml-config";

const config: Config = {
  specs: {
    "\\.tsx?$": "@markuplint/react-spec",
  },
  parser: {
    "\\.tsx?$": "@markuplint/jsx-parser",
  },
  extends: ["markuplint:recommended"],
};

export default config;
```

`Config` 型は `@markuplint/ml-config` パッケージにあるようです。このパッケージはインストールされていないため、依存に追加します。

```sh
pnpm add -D @markuplint/ml-config
```

package.json の scripts に以下を追加し、実行できるようにします。

```json
"lint:markuplint": "markuplint \"**/*.tsx\"",
```

これで lint が実行できるようになったので、それぞれ出てきた指摘を対応していきました。

## 指摘を受けて対応したこと

axe-playwright と markuplint それぞれで指摘が出たため、その指摘がなくなるよう解消していきました。
以下で対応したことを列挙してみます。理解が間違っている箇所があるかもしれませんが、ぜひ指摘いただけると嬉しいです。

- アクセシブルネームがなかった要素の対応
  - アイコンリンクそれぞれに aria-label を設定した
  - 記事の見出しリンクに aria-label を設定した( 「このセクションへのリンク」にした)
  - ヘッダーの nav 要素の aria-label を「グローバルナビゲーション」、記事の目次の nav 要素の aria-label に「目次」を設定した
- リンクカードの og 画像に alt がなかったので「`${hostname}のサムネイル画像`」を追加した
- リンクカードの img タグの width と height が `100%` という指定だったが、それを整数値にした
- 見出しが h2 から始まっているページがあったので h1 からに変えた
- コントラスト比の改善 ... コードブロックの diff がある場合にコントラストが弱い指摘がでていたので、背景色の明度を調整した
- インライン SVG に含まれていた xmlns は効果がないため削除した
- 横スクロール可能なコードブロックに tabindex="0" を設定した
  - これは悩んだので後述します。

また指摘を受けて背景知識や対応方法を調べたり、関連記事を読む中で改善した方が良いと判断した対応や、VoiseOver で読み上げてもらった上で気になった箇所の対応も以下に掲載します。

- aria-label や代替テキストは英語にしていたが、このサイトは日本語のコンテンツなので全て日本語に変えた
- 日付表記は `2024/03/16` にしていたが、VoiceOver で年月日の読み上げができないため `2024-03-16` に変えた
- Web サイトの装飾目的で hr 要素を利用していたが、hr 要素はコンテンツの意味的な区切りを表し、スクリーンリーダーでも区切り線として読み上げられてしまうため div に切り替えた

### 横スクロール可能なコードブロックに tabindex="0"を設定した

指摘を受けて悩んだ事例を1つ紹介します。axe からの以下のような指摘を受けました。  
`Ensure elements that have scrollable content are accessible by keyboard.`(id: [scrollable-region-focusable](https://dequeuniversity.com/rules/axe/4.8/scrollable-region-focusable?application=playwright))  
スクロール可能なコンテンツはキーボードでのアクセスができるようにするべきというもので、これは以下のような記事内のコードブロックで指摘されていました。

```ts
const text = "コードブロックです";
```

このコードブロックを表示している pre 要素には `overflow-x: auto` を指定しているため、コンテンツがはみ出した際に横スクロールが発生します。しかしこの要素はフォーカスを当てることができないため、キーボードでの横スクロールができないのは改善すべき、とのことでした。

[指摘内容の説明 URL](https://dequeuniversity.com/rules/axe/4.8/scrollable-region-focusable?application=playwright)にもある通り、この問題の解決には `tabindex="0"` を指定することで解決できます。pre 要素にフォーカスを当てることができるようになり、横スクロールをキーボードで行えるようになります。

しかし、pre 要素に tabindex を設定すると今度 Linter として設定していた Biome でエラーになってしまいました。  
`The HTML element pre is non-interactive. Do not use tabIndex. `(rule: [lint/a11y/noNoninteractiveTabindex](https://biomejs.dev/linter/rules/no-noninteractive-tabindex))  
対話的ではない要素に tabindex を設定すべきでない、という指摘です。pre 要素は一般的に対話的ではないのでこの指摘は理にかなっているものの、今回の場合コードブロック内のコンテンツがはみ出した場合はスクロール操作が必要になるため、どうすべきか迷ってしまいました。

結論として、今回は Biome のルールを `biome-ignore` でこのコードブロックの行だけ無効にすることにしました。対話的な操作が必要なのは事実であり、ユーザーの操作を損ねないための例外パターンと判断しました。

## 感想

思っていたより手軽に導入できたのと、ある程度は対応しきれないルールがあると想像していたのですが全て導入できてよかったです。  
自動テストや静的解析として導入することでより実践的な形で知識を得られますし、どう解消するか調べる過程で関連する情報が手に入り知識が広がるのはやはり良いなと感じました。  
もちろん自動テストだけではアクセシビリティを完全に担保することはできず、手動でのアクセシビリティテストも重要です。そのためにも体系的な知識をこれからつけていこうと思います。

## 余談: axe のレポートを見やすくする axe-html-reporter について

axe-playwright でのテストは、以下のように指摘が 0 で空配列かどうかで検証することになります。

```ts
const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
expect(accessibilityScanResults.violations).toEqual([]);
```

指摘がある場合、ある程度大きなオブジェクトが配列内に含まれているため、Playwright のテスト結果では読みづらいです。見やすいレポーターはないか調べてみると、axe-html-reporter を使うのが良さそうだったため紹介します。

まずプロジェクトに `axe-html-reporter` をインストールします。

```sh
pnpm add -D axe-html-reporter
```

axe によるテストの途中で、axe-html-reporter のレポート作成を挟みます。

```ts
import { createHtmlReport } from "axe-html-reporter"; // [!code ++]

const testA11y = async (page: Page) => {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  createHtmlReport({ // [!code ++]
    results: accessibilityScanResults, // [!code ++]
  }); // [!code ++]
  expect(accessibilityScanResults.violations).toEqual([]);
};
```

このように設定することで、以下のように HTML で見やすいレポートが生成されます。

![axe-html-reporterの出力HTML](/images/axe-playwright-and-markuplint/1.png)

## 参考資料

- [コンポーネントをアクセシブルに保つ技術](https://zenn.dev/ubie_dev/articles/38b2b93272ee60)
- [Accessibility testing | Playwright](https://playwright.dev/docs/accessibility-testing)
- [aria-label を使いすぎない](https://azukiazusa.dev/blog/do-not-use-aria-label-too-much/)
- [スクリーンリーダーに配慮したテキスト表記](https://azukiazusa.dev/blog/screen-reader-friendly-text-notation/)
