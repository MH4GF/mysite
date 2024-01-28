---
title: Biomeの個人スポンサーになった
publishedAt: 2024-01-28
tags:
  - dev
---

[Biome](https://biomejs.dev/) の個人スポンサーになりました。月 5 ドルの tier で支援しています。

<blockquote class="twitter-tweet">
   <p lang="en" dir="ltr">
      💖 I&#39;m sponsoring <a href="https://twitter.com/biomejs?ref_src=twsrc%5Etfw">@biomejs</a> <a href="https://t.co/vS8bStkDLx">https://t.co/vS8bStkDLx</a>
   </p>
   &mdash; Hirotaka Miyagi (@MH4GF) <a href="https://twitter.com/MH4GF/status/1750681008134115423?ref_src=twsrc%5Etfw">January 26, 2024</a>
</blockquote>

## Biome と私

Biome は、Rust で開発されている JavaScript プロジェクト向けのツールチェインを提供するプロジェクトです。自分は 2023 年 12 月ごろから触り始めていました。以下の Zenn スクラップはその時のメモです。

https://zenn.dev/mh4gf/scraps/282885bcd91828

いくつかのプロジェクトで使ってみており、その速度にすぐさま虜になりました。このブログでも Linter, Analyzer, Formatter として使っています。以下は設定ファイルです。

https://github.com/MH4GF/mysite/blob/fc6246786be0f678c52b366334a76a3fc2991190/biome.json

`pnpm format` で自動修正できるようにしていますが、今適当に試してみると 93 ファイルを 15ms で修正できています。あまりにも速いので、個人的には好みではなかった lint-staged を設定しても良いかも、とも思い始めています。

```sh
$ pnpm format

> mysite@ format /Users/mh4gf/ghq/github.com/MH4GF/mysite
> run-p -c format:*


> mysite@ format:biome-format /Users/mh4gf/ghq/github.com/MH4GF/mysite
> biome format . --write


> mysite@ format:biome-check /Users/mh4gf/ghq/github.com/MH4GF/mysite
> biome check . --apply-unsafe

Fixed 93 file(s) in 14ms
Formatted 93 file(s) in 15ms
```

細かいドキュメントの修正 PR も出したことがありました。

https://github.com/biomejs/biome/pull/1272

## Biome に期待していること

ESLint や Prettier を Biome 一つに置き換えられると理想ですが、自分のユースケースでは現状全てを代替することはできていません。

Prettier は取り急ぎアンインストールし Biome に置き換えて運用しています。ただ Prettier を使っている時は[prettier-plugin-packagejson](https://www.npmjs.com/package/prettier-plugin-packagejson)というプラグインを好んで使っていましたが、これは Biome ではサポートされていません([issue は立っています](https://github.com/biomejs/biome/issues/1668))。好みの問題でありそこまで大きな問題ではないので、ここについては気にしていません。

また、Markdown や CSS などサポートされていない言語もまだまだ多いです。これらのファイルをフォーマットしたい時は、 Prettier の VSCode 拡張でフォーマットする形でお茶を濁しています。

ESLint は利用したいルールがまだ Biome に移植されていないことも多いので、現状は併用する形で運用しています。Biome のアップデートに伴いルールが追加されていくため、それらを見つつ ESLint 側で無効化したりしています。

ただ、上記で挙げた言語サポート、プラグイン機構、ルールの移植については、 Biome のロードマップで取り上げられています。

https://biomejs.dev/blog/roadmap-2024/

プラグイン機構については最近 GitHub Discussions で RFC の議論が始まっています。

https://github.com/biomejs/biome/discussions/1649

どれも楽しみで応援したくなりますね。

## おわり

Biome に個人スポンサーという形で支援した話でした。  
隙を見てコードでもコントリビュートしていきたいですね。Rust の勉強頑張ろう。
