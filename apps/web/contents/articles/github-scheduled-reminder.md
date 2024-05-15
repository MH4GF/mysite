---
title: GitHub Scheduled ReminderによるCI失敗時の通知
description: 
publishedAt: 2024-05-15
tags: 
  - dev
---


GitHub ActionsのCIが失敗した時にリアルタイムで通知させたいと思い調べていたところ、そういえばScheduled Reminderに `Your PR has failed CI checks` という項目があることを思い出した。  

Schedued Reminderについてはこれらの記事を参照ください:

https://docs.github.com/ja/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-your-membership-in-organizations/managing-your-scheduled-reminders

https://tech.route06.co.jp/entry/2023/04/25/154828

他の通知設定と違いこの項目だけテキスト入力が必要で、ドキュメントを見てもどういった値を入れれば良いかわからず、今まで使わずに放置してしまっていた。

自身の関わるプロダクトでは `frontend-lint` という名前のCI Jobがあったため試しに入力してみると、確かに失敗時に通知が来てくれた。Require Status Checksの設定と同じなのかも。

画像: Slackの通知画面

カンマ区切りで設定すれば良いということなので、現在はこのように設定している。

画像: Scheduled Reminderの設定画面 `frontend-lint,frontend-test,backend-lint,backend-test`

Slack通知はリアルタイムで見ていることが多いので、その仕組みに乗れたので満足だ。

---

あまりにも `Your PR has failed CI checks` についての情報が少なくないかと調べていると、「設定例が非常に少なくわからない」というDiscussionsがあった。

https://github.com/orgs/community/discussions/23986

Scheduled Reminderの設定値はカンマ区切りの文字列なので、ジョブ名にカンマが含まれているとうまく動作しないとのこと。これはmatrixを使うと起きるため困ることは多そう。  
また「なぜ全てのCI失敗時に通知を受け取れないのか？」という意見もあった。これもそう思う、改善に期待したい。
