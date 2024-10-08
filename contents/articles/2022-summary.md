---
title: 2022年の振り返り 技術と仕事と生活
description: 2022年ももうすぐ終わりですね。毎度のことながら今年も振り返りブログを残します。今年は技術的なことがらだけでなく、仕事や生活についても触れます。
publishedAt: 2022-12-31
tags: 
  - dev
  - life
---

2022 年ももうすぐ終わりですね。毎度のことながら今年も振り返りブログを残します。昨年はこちら。

[2021 年 ソフトウェアエンジニアとしてできたことと振り返り｜ miya ｜ note](https://note.com/mh4gf/n/nf131e1c3bc7b)

今年は技術的なことがらだけでなく、仕事や生活についても触れます。

## 雑感

今年も良い一年でした。技術者として成長を感じることができましたし、また健康的に働けており無理をしているとも感じていません。

Web エンジニアとしての自分の頭打ちがいつ来るのかについて考えることはたまにありますが、勉強したいことは山ほどありますし、軸足は違うものの近い領域、例えばモバイルアプリ・コーポレートエンジニアリング・エンジニアマネジメントなどにも興味はあるので、何かあってもそちらに挑戦するのも良さそうと思っています。うまく自分の興味関心と市場が求めるポジションを合わせていきつつ、楽しく仕事をしていきたいですね。

ワーカホリック気味な生活をここ数年は送っていましたが、2022 年は一旦落ち着いて、自身のアウトプットを一定に保つことに注力していました。意図的に散歩の時間を増やしたり、無理が必要になるような仕事を断ったり。結果的にメンタルの不調もなく、技術的な研鑽にも良い影響があったように思います。

## フリーランスとしての仕事

自分はフリーランスとしての働き方を「キャリアの試行錯誤のために、自身の責任範囲内で自由に仮説検証できる場」として捉えていて、意図的に複数社並行して稼働していました。そのあたりはこの記事に書きました。

[フリーランスエンジニアになって半年が経った｜ miya ｜ note](https://note.com/mh4gf/n/n1f263fb3c4ee)

上記の記事ではフリーランスという働き方の良さを以下のように捉えています。

- 時間的・金銭的余裕を作れる
- 複数のチームに参加することにより幅広く浅く技術を学びやすい

今でもその感覚は変わっておらず、ある程度この働き方を楽しみました。しかしそのトレードオフとして一つのプロダクトを長く保守することで得られる知見やシステム全体のアーキテクティング能力などは得づらいと考えており、少しずつこちら側にチャレンジしたいと感じ始めています。並行で稼働していた会社さんに少しずつ契約を解除させてもらい、いまは週 4 稼働で 1 社で働いています。

## 今年触った技術

毎年の差分を確認するためにその年触った技術を振り返っていて、今年も列挙してみます。特に思い入れのあるトピックについては取り上げます。

- フロントエンド: TypeScript, React, Next.js, Zod, emotion, Chakra UI, vanilla-extract, testing-library, StoryBook, reg-suit, jest, msw, graphql-codgen, Apollo Client, urql, ProseMirror
- バックエンド: Ruby, Rails, graphql-ruby, Go
- そのほか: GraphQL, Cognito, Auth0, mermaid.js

昨年はフロントエンド : バックエンド : インフラが 4 : 5 : 1 程度でしたが、今年はインフラをほぼ触らず、フロントエンド : バックエンド = 7 : 3 ほどになりました。 業務委託で請けている仕事の性質というのもありますが、毎年大きく変わっていくのが面白いです。

## TypeScript

昨年に引き続き、TypeScript は今年最も書いた言語となりました。現在の稼働先ではフロントエンド専任のポジションで稼働することになったのも大きいです。このブログも今年勉強目的で作り、Next.js と Notion API を使って書きました。

プロジェクトのモジュール化に強い興味があり、PR の差分ファイルの依存関係を可視化しコメントとして表示する[dependency-cruiser-report-action](https://github.com/MH4GF/dependency-cruiser-report-action)を作りました。レビュー時に PR の影響範囲をザッと確認するのにも便利です。

## GraphQL

GraphQL は今年最も学んでよかった技術でした。フロントエンドもバックエンドも依存の方向がスキーマという規約に向くことになるのが良いです。その中でも Custom Scalar や Custom Directive はスキーマの表現力を高め、活用することで仕様やドメインを machine readable に表現でき、これは静的解析やコード生成の適用範囲を広げ開発者体験を向上させられます。来年はもっとスキーマ設計に取り組んでいきたいです。

仕事としてはクライアントサイドが 7 割、バックエンドが 3 割程度でやっていました。古巣であるタイミーで GraphQL の初期導入を手伝ってほしいと誘われ、実装をしつつ社内共有のためのブログを大量に書く仕事をしていました。それらを外部向け記事としてもまとめました。

[Rails+Next.js で GraphQL を導入する時に考えたこと - Timee Product Team Blog](https://tech.timee.co.jp/entry/2022/09/29/110000)

公開後それなりにはてぶもついたので嬉しかったですが、今思うとクライアントサイドはもう少し書きたいことがあります。来年少しずつ世に出していきたいです。

## ProseMirror

株式会社ビットジャーニーさんの[Kibela](https://kibe.la/)の開発チームに参加しており、そこでリッチテキストエディタを実装するために利用している[ProseMirror](https://prosemirror.net/)を今年はよく触りました。エディタの開発はとてもエキサイティングで、ブラウザの API をうまく活用しつつ、文章を書く道具としての心地よさを追求するのは楽しい経験でした。特に日本語は IME を使った変換(composition)があるため、他言語圏では踏まないようなバグを何度か踏み、報告したりもしました。

また ProseMirror は日本語の資料も少なく(というかほぼなく)、インデックス操作に特化した独自の木構造のドキュメントモデルを扱うなど少々初見だと理解まで時間がかかると感じます。自身の理解を深めるためにもガイドの日本語訳に取り組みました。

[ProseMirror Guide(日本語訳)](https://zenn.dev/mh4gf/articles/d25ef1ff30b5a6)

コミュニティへの貢献にもなり、チームメンバーへの概念の共有にも役立ったのでこれは良い取り組みだったと思います。

## Kaigi on Rails

今年達成できたことの一つとして、Kaigi on Rails の CFP が accept され初の登壇ができました。来年も 1 回くらいは登壇できるように頑張りたいです。トピックを用意せねば。

[Kaigi on Rails 2022 に参加・登壇しました](/articles/kaigi-on-rails-2022)

## OSS 活動

今年は少しずつ OSS 活動の幅を広げられた一年でした。バグレポートやドキュメントの修正などは以前からもできていましたが、機能の改善や追加が複数できたのがよかったです。

- [feature(plugin): add alternative implementation for mermaid.js reporter plugin · sverweij/dependency-cruiser](https://github.com/sverweij/dependency-cruiser/pull/599)
  - JS/TS プロジェクトの依存関係のビジュアライズツールである dependency-cruiser に、mermaid.js シンタックスで出力するプラグインを追加しました。上述の dependency-cruiser-report-action で必要になったため実装しました
  - 最初はサードパーティプラグインという位置付けでしたが、バグの修正や出力サイズの圧縮などのいくつかの改善を経て、公式オプションとして導入されることとなりました。感慨深いです。
- [feat: add generatorLibrary options and allow faker to select · ardeois/graphql-codegen-typescript-mock-data](https://github.com/ardeois/graphql-codegen-typescript-mock-data/pull/93)
- [add serializer option to set custom regexp for escaping · ProseMirror/prosemirror-markdown](https://github.com/ProseMirror/prosemirror-markdown/pull/68)

オープンソース活動は、利用するライブラリへの感謝と理解を深めたいのと、自身よりレベルの高い人と関わることができ技術的研鑽に繋がるため可能な限り取り組みたいです。しかし今年もまだまだ足りないなと感じているので、来年は何か一つの OSS に継続的にコントリビュートできたら良いなと思います。

## 生活

### 気胸になって入院した

11 月ごろに気胸になってしまいました。息を吸うと軽く胸が痛いので内科に行くと、肺に穴が開き通常の 40%ほどの大きさしかない状態だったとのことでその場で入院となりました。原因はわからないらしいです。手術で塞いだので現在は痛みも何もなく、ジョギングのように肺に負荷をかけても特に問題ないほどまで落ち着きました。

突然 2 週間稼働が止まってしまったのでチームには迷惑をかけてしまいましたが、問題なくカバーしてくれる頼もしいチームで本当にありがたかったです。突然何が起こるかわからないので常に引き継ぎが不要な状態を保つのは大事ですね…。こういう話はあと 5 年は先かなと思ってたんだけど…

### 引っ越しをした

<blockquote class="twitter-tweet">
  <p lang="ja" dir="ltr">
    入居done
    <a href="https://t.co/Zq5xb8Sg5a">pic.twitter.com/Zq5xb8Sg5a</a>
  </p>
  Hirotaka Miyagi (@MH4GF) 
  <a href="https://twitter.com/MH4GF/status/1560767693128896512?ref_src=twsrc%5Etfw">August 19, 2022</a>
</blockquote>

都内で引っ越しをしました。フルリモートワークかつ部屋で過ごす時間は好きなので少し課金しても良いかなと思い、リビングがちょっと広めの 1LDK を選びました。作業中横を向くと飼ってるうさぎの様子が眺められるのはとても良いです。

少しずつ家具を買い揃えていくのが楽しいですね。今はペンダントライトを探す旅の途中です。

### 自動車教習所を卒業した

今年は仕事の合間に教習所に通っていて、つい先日卒業試験に合格しました。まだ学科試験が残っているので免許は取得できていないけど！年明けの早い段階で試験を受けにいきたいです。

まったり通っており仮免許の期限ギリギリになってしまったので、今思えば免許合宿で一気に取ってしまった方がよかったなーとも思います。

## 終わり

関わったみなさんは本当にお世話になりました。来年も何卒よろしくお願いします。

良いお年を！
