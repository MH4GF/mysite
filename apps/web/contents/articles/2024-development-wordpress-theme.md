---
title: 2024年にWebエンジニアがWordpressテーマ開発をした備忘録
description: Wordpressテーマ開発をすることになり、先日無事リリースを迎えたので備忘録的にツール選定や構成の記録を残しておく。
publishedAt: 2024-05-25
tags:
  - dev
---

Wordpress テーマ開発をすることになり、先日無事リリースを迎えたので備忘録的にツール選定や構成の記録を残しておく。
普段は Web エンジニアをしていて、Wordpress も PHP もほぼ初めてなので最適ではない箇所もあるかも。

## 方針

- 納品後の追加改修等は別のエンジニアが担当する可能性が高いので、可能な限り Wordpress テーマとして王道な選択肢で学習コストを下げたい。
- 静的解析・テスト・継続的デプロイなど、開発生産性を上げるものについては取り入れたい。

## スターターテーマ

https://underscores.me/ を利用した。2012 年の公開と少々古いが、今でも使われているようで情報量も多い。  
[Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/)もあまり理解していない状態だったため、一般的な構成を知りたいと思いベースとなるテーマを探したところ、スターターテーマやブランクテーマといったジャンルがあることを知った。その中の一つとして選んだ。

選んだ感想として、基本的なテンプレート構成や、fuctions.php で書いた方が良い各種設定、[get_template_part()](https://developer.wordpress.org/reference/functions/get_template_part/)によるコンポーネント分割などが学べたのがよかった。Linter や Formatter も同梱されているのもありがたい。  
ただ完全にまっさらなテーマというわけではなく、モーダルの開閉やカスタマイザーなどいくつかの JavaScript ファイルがあったが、これらは要件に合わなかったためほとんど 0 から作り直した。Sass のコンパイルも設定されていたが CSS で十分なため外した。

## カスタム投稿タイプとカスタムタクソノミー

管理画面上で簡単に作成・更新できる[Custom Post Type UI](https://ja.wordpress.org/plugins/custom-post-type-ui/)プラグインを利用した。今回は「カスタム投稿として絞り込んでデータ取得し、専用のテンプレートで表示できれば良い」というシンプルな要件だったため、コードは書かずよく使われているプラグインで実現した。

## カスタムフィールド

[Smart Custom Fields](https://ja.wordpress.org/plugins/smart-custom-fields/)プラグインを利用した。おそらく最も有名なのは[Advanced Custom Fields](https://ja.wordpress.org/plugins/advanced-custom-fields/)プラグインだと思われるが、定義できるデータ型のうち繰り返しフィールド(key/value のオブジェクトの配列を表現できるフィールド)が月額課金が必要な有料プランのため困ってしまい、無料で実現できるプラグインとして選択した。

最小限かつ必要十分な機能を揃えている印象で、とてもよかった。エディタ画面での入力フィールドに説明を置けるのも良い。

## JavaScript ライブラリ

アニメーションやインタラクションは基本的には CSS アニメーションや Web API を使った自前実装で解決できたものの、複雑な領域については JavaScript ライブラリを利用した。

- カルーセル ... [Swiper](https://swiperjs.com/)
- SVG アニメーション ... [@lottiefiles/lottie-player](https://www.npmjs.com/package/@lottiefiles/lottie-player)
- 慣性スクロール ... [Lenis](https://lenis.darkroom.engineering/)
- パララックスアニメーション ... [GSAP](https://gsap.com/) / [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger)

カルーセルは CSS の scroll-snap で、パララックスは CSS の perspective でできるかも...?と思いつつ、今回は時間の都合上 JavaScript ライブラリに任せることにした。いずれ挑戦してみたい。

## CSS

[Tailwind CSS](https://tailwindcss.com/)を利用した。Tailwind CLI を使って `dist/style.css` に出力し、[wp_enqueue_style()](https://developer.wordpress.org/reference/functions/wp_enqueue_style/) で読み込む素朴な運用だ。  
ここだけは方針にある王道な選択肢か？と言われたら疑問は残ってしまうが、Scoped CSS が使えない単純な PHP テンプレートという状況で BEM 等の CSS 設計を考えるより保守しやすく、かつ CSS in JS ライブラリと違い JavaScript への依存がないため、PHP でも運用可能と考えた。  
この選択については、デザインシステムとしての統一性と拡張性が得られたり、生成 AI のサポートが受けやすいなどの想定していた価値を享受できた部分はあるが、Wordpress のコンポーネント分割の難しさによる相性の悪さも感じた。この件は長くなるため別の記事で紹介したい。

## Linter, Formatter

[PHP_CodeSniffer](https://github.com/PHPCSStandards/PHP_CodeSniffer), [Biome](https://biomejs.dev/), [Prettier](https://prettier.io/)を利用した。使い分けはこんな感じ。

- PHP ファイルの Lint, Format ... PHP_CodeSniffer
- JavaScript ファイルの Lint ... Biome
- それ以外の Format ... Prettier

最初は PHP ファイルの Format も、慣れている Prettier でできないかなーと [prettier/plugin-php](https://github.com/prettier/plugin-php)を利用していたが、HTML の一部に PHP を埋め込む書き方の場合 1 トークンごとに改行されるなどで結構見づらかったため、underscores に同梱されていた PHP_CodeSniffer に切り替えた。Linter としても PHP のよろしくない書き方をしている箇所の指摘もしてくれるため PHP の学習に役立った。  
Biome は推奨ルールを設定するだけで簡単に使えるので良い。

## テスト

Playwright の [toHaveScreenshot()](https://playwright.dev/docs/test-snapshots) を使った Visual Regression Test(VRT)だけ用意した。PC/モバイル/タブレットサイズのブラウザでアクセスし全ページのスクリーンショットを保存しておき、コードの変更によって出てきた差分が意図的かを確認する。スクリーンショットは Git リポジトリにコミットして、特に VRT のための SaaS などは利用していない。一人開発のため CI も設定せずローカルでのみテスト実行した。

これは最低限の労力で十分な効果を発揮してくれた。例えばレスポンシブ対応のためのスタイル調整が PC 側に影響していないかなどに気付けるのはもちろん、とにかく常に全ページ問題なく開けることが確認できているのは安心感があった。  
スクリーンショットの差分は GitHub 上で確認もでき、履歴も見れるので、デザイナーにも GitHub リポジトリにアクセスできるようにしてもらい、開発終盤のデザインレビューで出てきた細かい調整などは差分を見てもらう運用にしていた。

## ソースコード管理とデプロイ

今回は FTP でデータを VPS にアップロードする形でのデプロイだった。テーマディレクトリを Git リポジトリとして管理し、[SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action)を使って GitHub Action 経由で FTP を実行するようにした。手動で FTP することがなくなったため安全になり、かつ git push したら数十秒でデプロイが完了するので非常に楽になった。

テーマディレクトリ以外も Git 管理したいものが出てくるかもと思い、リポジトリルートに `wp-content/themes/theme-name` というディレクトリを置いてその中で開発していたが、特に何もなかったので次回は `theme-name` をリポジトリルートにして良いかも。

手元での環境構築には[Local](https://localwp.com/)を利用した。Virtualbox を使って nginx, MySQL, PHP の環境を簡単に作ってくれて、特に困ることもなかった。自己署名による SSL 化もワンクリックでできて助かる。
Local で作った環境のテーマディレクトリは Mac だと `/Users/ユーザー名/Local Sites/サイト名/app/public/wp-content/themes` になり、Git リポジトリは別ディレクトリで作っていたため、シンボリックリンクを貼ることで Local の環境で使えるようにした。

## Wordpress テーマ開発をした感想

React などの UI ライブラリと比べて、純粋に HTML、CSS、JS を書く経験はとても良かった。今は Internet Explorer が退場し、HTML や CSS だけでできることが増えており、必要に応じて JavaScript を使う程度で済むことが多い。また TypeScript がなくても JSDoc で十分に良い開発体験を得られた。Web の基礎技術の進歩を享受できたと感じる。

WordPress については、CMS として必要な機能がほぼすべて揃っており、ネット上に多くの情報があるため、「PHP、CSS、JavaScript でカスタマイズ可能なローコードツール」としての開発生産性は非常に高いと感じた。

PHP テンプレートについては、リクエストごとに WP_Query でデータを取得し、ループと共に HTML をレンダリングするというシンプルな方法はわかりやすかった。ただロジックとプレゼンテーションの分離が難しく、テンプレートパーツによるファイル分割はできるものの引数を簡単に渡せる程度で、コードの可読性やメンテナンス性は低いと感じた。React などのモダンフレームワークが解決しようとした課題や、SSR や React Server Component などの新しい流れについて改めて理解した。

## おわり

いい経験でした。
