---
title: GitHub Scheduled ReminderによるCI失敗時の通知
description: CI失敗時の通知を設定する方法
publishedAt: 2024-05-15
tags:
  - dev
---

GitHub Actions の CI が失敗した時にリアルタイムで通知させたいと思い調べていたところ、そういえば [Scheduled Reminder](https://github.com/settings/reminders) の real-time alerts に `Your PR has failed CI checks` という項目があることを思い出した。

Schedued Reminder についてはこれらの記事を参照ください:

https://docs.github.com/ja/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-your-membership-in-organizations/managing-your-scheduled-reminders

https://tech.route06.co.jp/entry/2023/04/25/154828

他の通知設定と違いこの項目だけテキスト入力が必要で、ドキュメントを見てもどういった値を入れれば良いかわからず、今まで使わずに放置してしまっていた。

自身の関わるプロダクトでは `frontend-lint` という名前の CI Job があったため試しに入力してみると、確かに失敗時に通知が来てくれた。Require Status Checks の設定と同じなのかも。

<img src="/images/github-scheduled-reminder/1.png" alt="Slackの通知画面" width="896" height="102" />

カンマ区切りで設定すれば良いということなので、現在はこのように設定している。

<img src="/images/github-scheduled-reminder/2.png" alt="Scheduled Reminder の設定画面 'frontend-lint,frontend-test,backend-lint,backend-test'" width="906" height="854" />

Slack 通知はリアルタイムで見ていることが多いので、その仕組みに乗れたので満足だ。

---

あまりにも `Your PR has failed CI checks` についての情報が少なくないかと調べていると、「設定例が非常に少なくわからない」という Discussions があった。

https://github.com/orgs/community/discussions/23986

Scheduled Reminder の設定値はカンマ区切りの文字列なので、ジョブ名にカンマが含まれているとうまく動作しないとのこと。これは matrix を使うと起きるため困ることは多そう。  
また「なぜ全ての CI 失敗時に通知を受け取れないのか？」という意見もあった。これもそう思う、改善に期待したい。
