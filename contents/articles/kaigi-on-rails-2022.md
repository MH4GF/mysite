---
title: Kaigi on Rails 2022に参加・登壇しました
description: Kaigi on Rails 2022 に参加し、「sassc-rails を利用している我々は、Sass の@import の非推奨化をどのように乗り越えていくか」というテーマで登壇しました。
publishedAt: 2022-11-10
tags:
  - dev
---

先日の[Kaigi on Rails 2022](https://kaigionrails.org/2022/)に参加し、「sassc-rails を利用している我々は、Sass の@import の非推奨化をどのように乗り越えていくか」というテーマで登壇しました。

- [スライド](https://speakerdeck.com/mh4gf/sassc-railswoli-yong-siteiruwo-ha-sassno-at-importnofei-tui-jiang-hua-wodonoyounicheng-riyue-eteikuka)
- [話した内容と動画](https://kaigionrails.org/2022/talks/mh4gf/)

Sass の@import 構文の非推奨化にまつわる周辺知識をざっくりと理解しつつ、さてどのように移行を進めていくか、という実践的な内容となりました。

## Proposal を出した経緯

今年の 3 月、業務中に Sass の@import 構文が非推奨になることを知り、移行期限も(発表で話した通り延長されましたが)同年の 10 月 1 日までということだったので移行について軽い気持ちで調べ始めました。

元々 Sass に明るいわけではなかったので、「そもそも@use は何がどう変わるんだ？」「sassc-rails は何をしてくれてるの？」「dartsass-rails に切り替えてみたら全くビルドできない 😇」「というか cssbundling-rails の方がいいのでは？いいのか？」などわからないことだらけで、かつ Rails での@use や DartSass の情報も全くと言って良いほどなく、苦労して情報をかき集めたのを覚えています。

そんな折に CFP の募集を知り、sassc-rails は多くのプロジェクトで使われているものの非推奨の話題は全くと言って情報がなかったものですから登壇内容として価値を出せるかも？と思い提出したところ、採択いただきました。CFP の審査のある登壇は初なので、採択が決まった時は嬉しかったですね。

## \***\*Kaigi on Rails _2022_ new\*\***

Kaigi on Rails の 2 週間前に開催されたプレイベントにも参加しました。タイムテーブルの見所をチーフオーガナイザーである大倉さんとうなすけさんが紹介するということで、「自身の発表はどういった内容が期待されているのだろう」と参考にさせていただきました。メモに残っている話されていた内容はこちらです(要約です)。

- okura san: プロポーザルを見たときに、うん、知りたい、と思った
- okura san: トップクラスの「明日すぐ使える枠」では、sassc-rails 使ってるプロジェクトは多そう
- unasuke san: dart 実装に移ったことを知っている方も少なそうだし、知ってても惰性で sassc-rails を使っているプロジェクトは多そうなので、どのように脱出するかを知りたい
- okura san: Sass は日本語の資料も少ない

やはり「明日すぐ使える枠」として期待されていそうだなーということを再確認し、移行における実務的な話題にフォーカスした内容に調整しました。

## 本番

今回の Kaigi on Rails は登壇方法に録画とライブの二つがありましたが、ライブを選択しました。録画の場合動画提出の締め切りが 1 ヶ月前ほどだったため、ギリギリまで調整したいだろうなあというのがライブを選んだ理由です。

Twitter のハッシュタグを追いながら発表していました。内容としては一部のエンジニアに刺されば良いと考えていたので、Twitter の反応も「あとで読む」系のものがちらほらあったため良かったかなと思います。Sass の移行をするエンジニアがスライドを見返して参考になれば何よりです。

SpatialChat でも何人かの方とフロントエンド系の雑談ができました。大倉さんと話した際に「Rails7 のフロントエンド系の CFP が今回はあまりなかった」と話されていたのが印象的でした。自分も技術選定をするなら React を選択してしまうので、Hotwire がプロダクションでどれほど使われているのかは気になるところです。

## トーク

他の方のトークもどれも良かったです。ursm さんの[大量塩基配列登録申請システムができるまで](https://kaigionrails.org/2022/talks/ursm/)は Web 技術を駆使した総力戦とも言えるようで最高でしたし、shshimamo さんの[モノリシック Rails アプリケーションをモジュラモノリスへ移行している note の事例](https://kaigionrails.org/2022/talks/shshimamo/)は packwerk 事例を日本の大規模サービスでそこまで聞かないのもあり、非常に参考になりました。発表の後 note さんのブースではファシリテーターの方とともに公開 Q&A をやられていて、自分もいくつか質問させていただきました。

## 終わりに

このような素晴らしい場を提供していただいた Kaigi on Rails の運営の皆様、ありがとうございました。 来年のハイブリッド開催も楽しみにしています。