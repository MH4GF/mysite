---
title: github-nippou の Web 版を App Router + Go + Vercel で作った
publishedAt: 2023-12-07
---


GitHub アカウントでログインし実行すると、その日の GitHub での活動をマークダウンのリスト形式で出力する Web サイトを作りました。  
日報を書く時に便利なので、ぜひ使ってみてください！

https://github-nippou-web.vercel.app/

## github-nippou とは

github-nippou は、[@masutaka](https://twitter.com/masutaka) さんが開発されている CLI ツールです。

https://github.com/masutaka/github-nippou

僕が所属している ROUTE06 では業務の大半が GitHub 上で行われていて、日々の活動ログが GitHub 上に蓄積されています。経理や人事などのメンバーも Issue でタスクを管理し、毎日 PullRequest を出しているほどです。メンバーの日報も GitHub 上で書かれています。

そんな中、3 ヶ月ほど前に @masutaka さんが入社され、@masutaka さんが過去に作成した github-nippou の存在を教えてもらいました。僕は日報を書く際は今まで手動で issue や PR のリンクを収集して日報に貼り付けていたので、これがソリューションか...!!と思い早速使ってみました。予想通り最高に便利なので毎日利用し、社内でも布教活動をしていました。

ただ社内の全員が GitHub を利用するとはいえ、CLI ツールを利用するのは敷居が高い方も多いです。Web 版があれば誰でも簡単に利用できるのではないかと思い作成に取り組みました。

## 使い方

機能は少ないですが、必要なものは揃っています。GitHub アカウントでログインし、Run ボタンを押すだけです。

![screenshot](https://raw.githubusercontent.com/MH4GF/github-nippou-web/main/docs/screenshot.png)

本家 github-nippou と同様に、設定を記載した Gist ID を指定することで出力フォーマットのカスタマイズも可能です。

## 技術的な話

開発にあたっては、いくつか技術的にも面白い取り組みができたので紹介します。

### 技術スタック

このサイトの技術スタックは以下の通りです。

- フロントエンド ... Next.js(App Router), Tailwind CSS, NextAuth.js
- バックエンド ... Go 製の Serverless Functions

どちらも Vercel で動かし、無料で運用しています(ありがたいですね)。Vercel の Serverless Functions はとても便利で、Go, Ruby, Python を簡単に動かすことができ、さらに Hobby プランでも利用可能です（！）。Go の場合、`http.HandlerFunc`を実装したファイルを置いておけばファイルベースルーティングでパスが決まります。

https://vercel.com/docs/functions/serverless-functions/runtimes/go

### Go 製の github-nippou を API サーバーとして動かす試行錯誤

本家 github-nippou は Go で実装された CLI ツールで、これを Web アプリとして動かすための方法を検討する必要がありました。WebAssembly 化すればブラウザで動作できるのでは？というところから始まり、いくつかの方法を試しました。

#### 1. WebAssembly 形式にコンパイルしてブラウザで動かす

- これはできました。最終的に関数を Promise でラップしてグローバルオブジェクトに入れ込む形になりました。[PoC のコミット](https://github.com/MH4GF/github-nippou/commit/c7f9ca57fd6fff838e662c3abba13abba309d237)
- ただ、GitHub App から得られたアクセストークンをブラウザで扱うのはセキュリティ的に良くないので、この方法は却下しました。
- バイナリサイズが 13MB, TinyGo を使っても 8MB と大きいのも問題でした。ただ技術としてかなり面白いので機会があればまた試したいです。

#### 2. wasm を Node.js から呼び出す

- Next.js on Vercel なので Route Handlers から呼び出せばいいやん、ということで試しましたが、ローカルでは動くものの Vercel 上ではエラーになってしまいました。Go のリポジトリで issue は立っているものの解消はされていない模様...[PoC のコミット](https://github.com/MH4GF/github-nippou-web/commit/48c3d4396f5e6b208f30253039ca34abb025c6c4)
- https://github.com/golang/go/issues/39402
- https://github.com/golang/go/issues/59605

#### 3. wasm を Deno から呼び出し、Deno Deploy で動かす

- 動きました 🙌 [PoC のコミット](https://github.com/MH4GF/github-nippou-web/commit/43e03e47acd579d95b4b01c55bcde091bf89eaa9)
- ただ Vercel ではなく Deno Deploy だったりで、ここまで頑張るなら Go 製の API サーバーを立てればいいのでは...?となってしまった

#### 4. Go の API サーバーを net/http で作成し https://render.com で動かす

- 動きました 🙌 リリース初期はこの構成で動かしていました。
- 問題は、render.com の無料プランでは 15 分間アクセスがないとスリープしてしまうことです。再起動には時間がかかり、また Vercel の Hobby プランでは Serveless Function のタイムアウトは 30 秒なので、何度もエラーが発生してしまいます。

#### 5. Go の http ハンドラを Vercel の Serverless Functions で動かす

- 最終的にここに辿り着きました。Vercel の Serverless Functions は Hobby プランでも利用可能で、アクセスが一定期間ない場合のスリープは 2 週間なため、自分が毎日使うのでスリープすることはないだろうと考えました。

これにより、Go 製の github-nippou を API サーバーとして無料で動かすことができました。

### github-nippou をライブラリとして利用できるようリファクタリング

github-nippou は CLI ツールとして実装されており、認証情報を`git config`や環境変数から取得していたり、処理中にエラーがあると exit 1 するなど、ライブラリとして利用する上でいくつか修正したい箇所がありました。そのため@masutaka さんと相談しつつ、少しずつリファクタリングを進めていきました。

https://github.com/masutaka/github-nippou/issues/110

1 回だけデグレを起こしてしまったので申し訳ないですが 🙏、無事 github-nippou を`go get`でインストールできるようになりました！

https://github.com/MH4GF/github-nippou-web/pull/21

### GitHub App の作成

「ブラウザで github-nippou を簡単に利用できる」という Web 版の価値を高めるためには、GitHub 認証を実装することは必須でした。NextAuth.js の利用方法はある程度枯れているためそこまで難しくなかったのですが、GitHub App の仕様や制約に苦戦しました。

まず GitHub 認証を実現するためには方法が 2 つあり、GitHub App と OAuth App があります。GitHub App の方が後発のため、Callback URL を複数設定できたり、きめ細やかな権限の設定、有効期限の短いトークンなどいくつかの利点があります。  
ただ、GitHub App から得られるトークンではいくつかの GitHub API に対応していないようです。例えば github-nippou では REST API の [/users/{username}/events](https://docs.github.com/en/rest/activity/events?apiVersion=2022-11-28#list-events-for-the-authenticated-user) を利用していて、このエンドポイントは認証済みであれば自身のプライベートイベントも取得できるはずですが、GitHub App の権限設定をいくら調整しても取得できませんでした。  
そのため OAuth App に切り替えることとなりました。GitHub App のアップデートにより対応したら元に戻そうと考えています。

### React の Server Actions

今回の要件は「フォーム送信後結果を出力する」といったものなので Server Actions の相性が良く、使ってみました。Server Actions とは何か、については Next.js のドキュメントを読むのが良いです。

https://nextjs.org/docs/app/api-reference/functions/server-actions

また今回は React Canary のいくつかの API も使っています。こちらは最近 stable になったようです。

- [useFormState](https://react.dev/reference/react-dom/hooks/useFormState) ... ServerActions の実行結果を取り出すために利用します。
- [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus) ... `pending` というフィールドを取り出すことができ、これは ServerActions の実行中は true になります。
  - `data` フィールドも取り出すことができるため一見 `useFormState` の代替になるか？と思いましたが、こちらは data の型を generics で指定することはできず FormData 型となり、ちょっとだけ取り回しがしづらいです。

実装のイメージとしては以下のような感じです。

```tsx title="app/showList.tsx"
'use server'

type Result =
  | {
      success: true
      result: string
    }
  | {
      success: false
      error: string
    }

// formData にはフォームの入力値が入っている 今回の場合 gistId
export const showList = async (_prevState: Result, formData: FormData): Promise<Result> => {
  try {
    // NextAuthでの認証情報の取得・入力値のバリデーション・APIのfetchなど
  } catch (e) {
    return { success: false, error: e.message }
  }

  return { success: true, result: ... }
}
```

```tsx title="app/page.tsx"
import { showList } from './showList'

function Page() {
  // showList の返却型から推論され、state は Result 型となる
  // 第二引数にはstateの初期値を指定する
  const [state, formAction] = useFormState(showList, {
    success: true,
    result: '',
  })

  // 送信中は pending が true になるため、button の disabled に利用する
  const { pending } = useFormStatus()

  return (
    <main>
      {!state.success && <Alert>{state.error}</Alert>}
      <form action={formAction}>
        <div>
          <label htmlFor="gistId">Gist ID</label>
          <input type="text" name="gistId" />
        </div>
        <button type="submit" isDisabled={pending}>
          Run
        </button>
      </form>
      <textarea defaultValue={state.success ? state.result : ''} />
    </main>
  )
}
```

実際は他にもロジックがあったり、スタイリングもあるので簡略化していますが、このようにフォームの送信・結果の表示を実装することができました。  
フォームの実装においてはバリデーションをどのように行うかが焦点になりますが、色々試した結果今回は関数型プログラミングにおける Result 型で表現するのが良いと考えました。サーバーサイドでバリデーションしつつエラーがあればそれをフィールドとして返し、フロントエンドで表示します。

また、ServerActions は[プログレッシブエンハンスメント](https://developer.mozilla.org/ja/docs/Glossary/Progressive_Enhancement)の実現として JavaScript が無効な環境下やクライアントサイドのハイドレーションが終わっていない状態でもフォームの送信ができるのが特徴です。せっかくの趣味プロダクトなのでプログレッシブエンハンスメントを実現しようということでコンポーネント設計を見直しました。見直した箇所は以下でした。

- これまで: クライアントサイドで NextAuth の認証情報があるかチェックし、認証情報が正しくない場合は Run ボタンを表示しない
- 見直し: 認証情報のチェックは ServerActions 側でも行っていたためクライアントサイドでは外した。ログイン中はページ表示された瞬間に Run ボタンを押下できるようになり、未ログインの場合も押下後のアラート表示で十分と判断した

これで JavaScript が無効な環境下でもフォームの送信ができるようになりました！やったぜ！！  
...と言いたかったのですが、現在は Vercel 上では HTML フォームによる送信の場合は 405 Method Not Allowed が返ってきてしまうようです。HTML フォームでの送信は POST メソッドになるのでそれがブロックされている模様。Hobby プランの制約かと思い Pro プランにアップグレードしてみましたが変わらず、Vercel の Discussions に投稿して様子をみています。

https://github.com/orgs/vercel/discussions/5056

クライアント側でのハイドレーションが終わった後であればフォーム送信ができるので、自身が使う分としてはページを開いた瞬間にボタンを押せる程度の速さはあるものの、毎日使うツールなので速度は改善していきたいところです。

## おわりに

github-nippou の Web 版を作成したこと、またその作成背景や技術的な話を紹介しました。

一応誰が利用したかというログだけ取っているのですが、ROUTE06 社内の非開発職メンバーに毎日使って下さっている方もおり非常に嬉しいです。シンプルなツールなので拡張の機会は少ないかな？とも思いつつ、まったりとメンテナンスしていきたいと思います。

改めて、Web 版の開発にあたっては @masutaka さんに大変ご助力いただきました。この場を借りてお礼申し上げます、ありがとうございました！
