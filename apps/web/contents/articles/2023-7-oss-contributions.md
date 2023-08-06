# 2023 年 7 月にできた OSS コントリビュート

[2023/7/9 キャリアの指向性(脳内メモ)](https://www.mh4gf.dev/articles/2023-7-9-thinking-in-career)でも記載した通り、今は OSS へのコントリビュートをもっと増やしたいと考えています。  
まずは仕事で利用している OSS の issue から見てみようと追っていますが、issue を読んでもさっぱりわからんということが多く、コードでの貢献はまだ難しいという気持ちです。できるところから始めつつなのですが、取り急ぎ毎月のコントリビュートを記録していくことにしました。

## vitejs/docs-ja

6 月あたりから Vite の日本語翻訳プロジェクトに参加しています。

https://twitter.com/MH4GF/status/1668423901922095105?s=20

Vite の日本語翻訳プロジェクトは現在ほぼ翻訳が追従できている状態で、vitejs/vite の main ブランチにドキュメントの更新が追加されたら issue が作られるので挙手制でアサイン、差分を翻訳し PR を出すという運用になっています。  
過去に参考になる PR も多く、自分でも貢献しやすかったので参加してみました。今月は 8 件の PR を出すことができました。

- [docs: remove note about firefox not supporting ESM imports in Web Workers](https://github.com/vitejs/docs-ja/pull/1044)
- [docs(static-deploy): add deployment instructions for AWS Amplify Hosting](https://github.com/vitejs/docs-ja/pull/1043)
- [docs: feedback about experimental features](https://github.com/vitejs/docs-ja/pull/1040)
- [docs(static-deploy): added deployment instructions for AWS with Flightcontrol](https://github.com/vitejs/docs-ja/pull/1036)
- [docs: fix build.cssMinify link](https://github.com/vitejs/docs-ja/pull/1038)
- [chore: warning about ssr cjs format removal](https://github.com/vitejs/docs-ja/pull/1037)
- [docs: reference to qwik templates in getting starter guide](https://github.com/vitejs/docs-ja/pull/1031)
- [docs: add solidjs templates](https://github.com/vitejs/docs-ja/pull/1028)

翻訳はコントリビューションの難易度も低く、またドキュメントを読むいい機会にもなるので今後も継続して参加していきたいです。

## vitejs/vite

Vite は仕事で利用しているので興味があるのと、 `contribution welcome` ラベルが運用されており参入障壁が低そう、ということで動向を追っています。

仕事では Vite でビルドした SPA のホスティング先に AWS Amplify Hosting を利用しており、ただ vite のドキュメントのホスティング先一覧ページに載っていなかったため PR を出してみたところマージされました。

- [docs(static-deploy): add deployment instructions for AWS Amplify Hosting](https://github.com/vitejs/vite/pull/13882)

## storybook/test-runner

こちらも仕事で最近使い始めたので issue や PR を読みつつ、気になったところがあったので PR を出したところマージできました。

- [docs: fix github actions example for shard usage](https://github.com/storybookjs/test-runner/pull/320)
  - ドキュメント修正
- [maintenance: remove no-manager-cache flag in example storybook](https://github.com/storybookjs/test-runner/pull/331)
  - storybook のバージョンアップに伴い開発用コマンドが動かなくなっていたので修正

## 終わり

というわけで初回の記録でした。  
コードによる貢献もできるようにしていくために、8 月はバグレポートの issue を読みつつ手元で再現してみる、みたいなところから始めてみようかなと思っています。毎月ちょっとずつでもいいのでできることを増やしていきたいですね。

### おまけ: 7 月にマージされた PR の一覧を出すクエリ(自分用)

結果をフィルタリングしつつ、マークダウンの URL 記法に変換させています。ChatGPT に書いてもらいました。

```
gh api graphql -f query='{
  viewer {
    pullRequests(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
      nodes {
        title
        url
        state
        updatedAt
        baseRepository {
         	name
          isPrivate
        }
      }
    }
  }
}' | jq '.data.viewer.pullRequests.nodes[] | select(.state == MERGED and .baseRepository.isPrivate == false and (.updatedAt | . >= 2023-07-01T00:00:00Z and . <= 2023-07-31T23:59:59Z)) | [\(.title)](\(.url))'
```
