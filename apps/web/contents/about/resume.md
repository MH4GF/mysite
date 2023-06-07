# Hirotaka Miyagi | 宮城 広隆

## 自己PR

- フロントエンド・バックエンド・インフラまで一気通貫で開発を進められることを強みとしています。
- キャリアの大半がスタートアップでの活動であり、会社の成長のためにフルサイクルになんでも取り組んできました。今後も継続していくつもりです。
- チームで働き、一人だけでは得られない成果を生むことを大事にしています。丁寧なドキュメンテーションや仕組み化でトラック係数を上げつつ、チームビルディングやコミュニケーションを進めていきたいです。
- どちらかというと仕事が好きな性格で、仕事へのモチベーションは新しい知識の学習と転用です。業界の最新動向・枯れて安定した技術それぞれ取り入れつつ、自身や会社としての技術投資を進めていきたいです。技術的なアウトプットやOSS活動も継続して取り組んでいきたいです。

[好む振る舞い](https://www.mh4gf.dev/behavior), [キャリアの指向性](https://www.mh4gf.dev/thinking-in-career)も合わせてご覧ください。

## 過去の使用技術

- Ruby, Rails, Rspec, FactoryBot, RuboCop, graphql-ruby
- TypeScript, React, Next.js, Jest, Testing Library, MSW, ESLint, Prettier, Tailwind CSS, Webpack, Vite, Vitest, Storybook, ProseMirror, reg-suit, urql, GraphQL Code Generator, Vue.js, Nuxt.js
- Go, Gorm, gplgen
- Terraform, AWS Fargate, ALB, RDS, S3, CloudFront, CloudWatch, Route53, VPC, Amplify, Cognito
- GitHub Actions, CircleCI, Sentry, Datadog, Redash, Slack, Figma, draw.io, VSCode, Notion, Google Workspace, Slack, Zoom, Google Meet

## RESUME

### 株式会社タイミー(2022/4~2022/10)

業務委託として開発プラットフォームチームに所属し、Rails/Next.jsでのGraphQLの導入・初期設計・各種オンボーディングを担当しました。

[Rails+Next.jsでGraphQLを導入する時に考えたこと - Timee Product Team Blog](https://tech.timee.co.jp/entry/2022/09/29/110000)

### 株式会社ビットジャーニー（2021/9〜現在）

業務委託として [https://kibe.la/](https://kibe.la/) の開発チームに参画し、フロントエンドをメインにフルサイクルに開発を進行しました。

#### ProseMirrorを利用したリッチテキストエディタの開発

- ProseMirrorの木構造⇄DOM⇄markdown textの相互変換により、リッチテキストエディタで記入したテキストを即座にmarkdownに変換させる
  - ユーザーフレンドリーなテーブル記法の入力UIの実装
    - [https://blog.kibe.la/entry/rich-text-editor-beta-table](https://blog.kibe.la/entry/rich-text-editor-beta-table)
  - 列・行・セルの選択や追加、削除などを直感的に行えるように
  - DOMを効率的にレンダリングするためのキャッシュアルゴリズムの実装        

#### フルサイクルな機能開発

- DB設計・RailsのMVC設計・GraphQLインターフェース・Reactコンポーネント・Redash/GA4での分析までを一貫して担当
- GitHub Actionsの導入と開発プロセス中のトイルの自動化

#### リリース7年が経過するRails + Reactアプリケーションのモダン化

- Sassの@import非推奨によるsassc-railsからcssbundling-railsへの移行
- webpack.config.jsの最適化
- Sass → CSS in JSへの移行のための技術選定
- jQueryからの安全な脱却ロードマップの策定・進行（進行中）、ES5を上げていくためのリスク評価、古いpolyfillの削除等

---

### 株式会社リゾートワークス（2020/12〜現在)

ワーケーションを通じて働く人の“創造性“を刺激する福利厚生サブスクリプションサービス [ResortWorx](https://resortworx.jp/) で、インフラ/バックエンドエンジニアを担当しました。

#### インフラ構築の0→1に伴う技術選定と構築

プロダクトローンチ初期に求められる最低限の構成で、ランニングコストの抑制とエンジニアがキャッチアップできるようなドキュメンテーションを心がけました。

- Nuxt.js + Rails API の利用者向け Web アプリケーションと、Rails SSR による管理画面のホスティング
- Route53 → ALB → ECS / RDS の一般的な Rails のホスティング
- GitHub Actions による CD 環境、 SSM を利用した ssh(rails c 等）実行環境
- CloudWatch によるロギングとアラート、AWS Chatbot による Slack 通知
- S3 + CloudFront による SPA のホスティング、GitHub Actions による CD, workflow dispatch を利用したブランチ指定のデプロイ
    - のちに Nuxt の SSR も必要になったため Vercel へ移行
- 上記の AWS リソースを terraform で IaC 化、draw.io + VSCodeによるアーキテクチャ図の記載、その他オペレーションをドキュメント化

#### チケットベースでのチーム開発

- Rails, Nuxtでの機能追加
- CloudWatch Logs Insights で可視化・検索ができるよう Rails のログの JSON 化

#### 企画LPサイトの構築

- Nuxt.js(composition API), Tailwind CSS, Vercelによる0→1を一人で担当
- デザイナーとFigma上で会話しながら背中合わせで進行
- Lighthouseの点数をほぼ100点に

---

### 株式会社タイミー（2018/07〜2021/09）

サービスローンチの 1 ヶ月前にジョイン、初期は1人サーバーサイドとして Rails をメインに、プロダクト/会社の成長とともに幅広い業務を担当しました。

#### PjM/PdM/バックエンドエンジニア (2020/08〜2021/04)

##### 当時の課題

会社の成長に伴いガバナンスを強めていく必要性があり、プロダクト「タイミー」における社内オペレーション改善や、コーポレートエンジニアリングの領域で開発を進行しました。

##### メンバー構成

プロジェクトの開発メンバーとしては 2 名で、関係部署にヒアリングしながら遊軍のように活動しました。

- 自身： プロジェクトマネジメント/ 要件定義/ Rails や Go での実装
- チームメンバー: 元 iOS エンジニア（Rails はビギナー)/ 要件定義/ Rails や Go での実装
- 関わる部署： 経理財務、 CS

##### やったこと

ヒアリングや SaaS の選定、スケジューリングや開発着手、リリースまで一気通貫で担当しました。（NDAレベルの業務が多く少しぼかしています）

- CRM ツール HubSpot の API 連携
- 経理・財務業務 SaaS との API 連携
- 内部統制に伴う各種機能開発の進行（職務権限規定に沿った権限管理・与信・反社チェックなど）
- 社内業務のオペレーション改善
- Mac にインストールし deamon で常駐起動するソフトウェアを Go で開発
    - 主に非機能要件であるリリースパイプラインの設計を担当 死活監視、バイナリのセルフアップデート機構、リトライ制御など
- チームメンバーに Rails を指導 コードレビューやキャッチアップのための順序立てたタスク振りなど

---

#### 新規事業 PjM/バックエンドエンジニア/フロントエンドエンジニア (2021/04〜2021/08)

##### メンバー構成

- 開発チーム： iOS 担当 1 名、 デザイナー1 名、 Web フロントエンド&バックエンド API2 名
- 関わった部署： 経営, Sales, CS, 経理

##### 役割

- プロジェクトマネジメント・技術選定・設計・実装（Rails, Vue.js)を担当
- チームのエンジニアは それぞれ iOS と Rails に強いメンバーとのプロジェクトだったため、それぞれの強みを活かしてもらいつつ取りこぼしがないよう拾う立ち回りに努めた
- Biz サイドとの折衝、サポートや経理とのオペレーション構築など
- エンジニアリングとしてはコアドメインのモデリングや Stripe を利用した決済周りの設計実装を主に担当した

##### 技術選定・初期設計

- Vue.js/vue-router を使った SPA の実装
- 一般的な Rails の環境構築（annotate/rails-erd/bullet/rspec/rubocop)
- 監視/ロギング/CI/CD の導入（Datadog, Sentry, lograge を利用したログの JSON 化、 CircleCI)
- 商品情報登録・在庫管理・注文・決済履歴などのドメインの境界を意識したモデリング
- Rails プロジェクトでの行動指針決め
    - 原則テストコードを書く、書けないなら書けるよう責務を分割する
    - トランザクションやロックなど SQL を適切に書く
    - シンプル・ミニマルに

##### 決済機能の要件定義・技術選定・Stripe APIの実装/運用

[新規事業の決済機能としてStripeを導入する上で考えたこと全て - Timee Product Team Blog](https://tech.timee.co.jp/entry/2020/12/10/131108)

##### スキーマ駆動開発の導入・運用

[Rails + RSpec + OpenAPI3 + Committeeでスキーマ駆動開発を運用するTips - Timee Product Team Blog](https://tech.timee.co.jp/entry/2020/07/05/150312)

---

#### SRE (2021/01〜2021/04)

##### 当時の課題

プロダクトの成長は進みテレビ CM を打つことになり、現状のスケールしない EC2 によるインフラでは耐えられないだろう、という課題がありました。ただひたすらこなしていた開発業務についてもメンバーが増えスクラムを回せるようになり、組織化が進んで自身の属人性は剥がれてきていました。運よくシニアレベルの SRE の方が採用できたこともあり、その方と主に SRE チームを立ち上げ AWS のアーキテクチャから作り変えるプロジェクトを始め、キャッチアップしつつインフラの移行を進めていきました。

##### メンバー構成

SRE: 2 人（シニアメンバー, 自身）

##### やったこと(公開情報)

[ProductionでRails6マルチDB対応を小さく始める](https://speakerdeck.com/mh4gf/productionderails6marutidbdui-ying-woxiao-sakushi-meru)

[GitHub - MH4GF/ecr-lifecycle: Delete more than specified number of images, and protect if dependent on ECS task](https://github.com/MH4GF/ecr-lifecycle)

[RedashをFargate, Datadog, Terraformで構築/運用する - Timee Product Team Blog](https://tech.timee.co.jp/entry/2020/04/20/175821)

---

#### バックエンドエンジニア (2018/07〜2020/01)

サービスローンチの 1 ヶ月前にジョイン、初期は 1 人サーバーサイドとして保守運用を担当Rails をメインに、プロダクト/会社の成長とともに幅広い業務を担当しました。

##### メンバー構成

- リリース前： iOS…5 人、 サーバーサイド 4 人
- リリース後〜半年程度： iOS…2 人、 サーバーサイド 1 人、 技術顧問数人
    - 徐々にメンバーは増えていきました

##### 役割

スタートアップのシード期なので、通常の機能開発や運用はもちろん、経営・CS・経理・営業チームからの要望対応も全てバックログに載せただひたすらにこなしていました。

##### やったこと

- 0→1 の開発・0→1 後のサービスの保守運用・負債解消
- RSpec, Rubocop, OpenAPI3 の導入
- Ruby/Rails のバージョンアップ業
- API のバージョニング、Serializer のスキーマ分割
- サービス固有の強いドメインを持つ機能の設計、実装

### 業務外活動

#### オープンソース貢献

日常的に行なっています。いくつかリンクを紹介します。

- ProseMirrorコミュニティでの活動
    - Pull Requests
        - add serializer option to set custom regexp for escaping [https://github.com/ProseMirror/prosemirror-markdown/pull/68](https://github.com/ProseMirror/prosemirror-markdown/pull/68)
        - declare Builders type for builders() ****[https://github.com/ProseMirror/prosemirror-test-builder/pull/9](https://github.com/ProseMirror/prosemirror-test-builder/pull/9)
        - Fix types for cellSelection ****[https://github.com/ProseMirror/prosemirror-tables/pull/160](https://github.com/ProseMirror/prosemirror-tables/pull/160)
    - フォーラムでのバグ報告や知見共有
    - ガイドを和訳し公開: [https://zenn.dev/mh4gf/articles/d25ef1ff30b5a6](https://zenn.dev/mh4gf/articles/d25ef1ff30b5a6)
- feature(plugin): add alternative implementation for mermaid.js reporter plugin ****[https://github.com/sverweij/dependency-cruiser/pull/599](https://github.com/sverweij/dependency-cruiser/pull/599)
    - dependency-cruiserというJS/TSプロジェクトのディレクトリ構造のビジュアライズツールで、mermaid.js構文での出力を可能にする実装を追加
- feat: add generatorLibrary options and allow faker to select ****[https://github.com/ardeois/graphql-codegen-typescript-mock-data/pull/93](https://github.com/ardeois/graphql-codegen-typescript-mock-data/pull/93)
- [ExtractType]: add `has` prefix to default values for config ****[https://github.com/DmitryTsepelev/rubocop-graphql/pull/89](https://github.com/DmitryTsepelev/rubocop-graphql/pull/89)

#### 登壇

社内外の勉強会・カンファレンスで発表を行っています。

- [sassc-railsを利用している我々は、Sassの@importの非推奨化をどのように乗り越えていくか](https://speakerdeck.com/mh4gf/sassc-railswoli-yong-siteiruwo-ha-sassno-at-importnofei-tui-jiang-hua-wodonoyounicheng-riyue-eteikuka)
- [ProductionでRails6マルチDB対応を小さく始める](https://speakerdeck.com/mh4gf/productionderails6marutidbdui-ying-woxiao-sakushi-meru)

### 学歴

- 2019/03 武蔵大学社会学部 メディア社会学科 中退

### スキル

- Ruby / Rails ... 6年
- TypeScript ... 2年
- React ... 2年
- Terraform / AWS ... 2年
- Go ... 2年

### 免許・資格

- 普通自動車免許
