# GitHub CLI でよく使うコマンド

https://cli.github.com/

GitHub CLI を便利に使っている。基本的に GitHub の操作の起点は CLI からにしていて、現時点での自身の利用コマンドをまとめてみる。

## gh browse

### `gh browse`

- リポジトリをブラウザで開く
- ghq+peco でターミナルでのリポジトリ移動をしているので、そこから GitHub のリポジトリを開くことが多い

### `gh browse config/routes.rb:15`

- ファイルと行数を渡してデフォルトブランチでファイルを開く
- コード行を slack 等でシェアしたい時に使うが、デフォルトブランチだと時間が経つとリンク先の情報が変わってしまうため、以下のコミット指定で開く方をよく使う

### `gh browse -c db/schema.rb:52`

- c をつければ現在のコミットで開く
- `gh b` で開けるようにエイリアスにしている。 `gh b` で開くと現在のコミットで開き、 `gh browse` で開くとデフォルトブランチで開く
- この相対リンクの取得方法は RubyMine だと行にカーソルがある状態で cmd+Shift+C で手に入るが、VSCode だとちょうどよいキーボードショートカットがない…

### `gh browse -p`

- projects の一覧を開く

## gh pr

### `gh pr create`

- 対話式に PR を作成、git push も含めてやってくれる
- 最近のアップデートで draft PR も作れるようになった

### `gh pr view --web`

- PR をブラウザで開く
- `gh prv` で開けるようにエイリアスにしている

### `gh pr list --web`

- PR 一覧をブラウザで開く

### `gh pr list --search "review-requested:@me"`

- 自分がレビュワーをアサインされている PR で絞り込む
- 集中するタスクが一区切りしたタイミングでとりあえず叩く

### `gh pr checkout {number}`

- リモートブランチを fetch してきてチェックアウトする
- PR のレビュー時に、手元で動かしたかったり差分周辺のコードが読みたかったりする時に使う。

## gh issue

### `gh issue list --web`

- issue 一覧をブラウザで開く

### `gh issue create`

- 対話式に issue の作成

## gh gist

### `gh gist view`

- 自身の投稿した gist の内容を表示する。issue や pr とは違い ID 指定をせずに実行すると gist 一覧が表示され、インクリメンタルに絞り込んで開くことができる。

### `gh gist edit {id}`

- id 指定して gist を編集する。 `gh config` で設定したエディタで編集が可能。自分は vim を設定している。
- id は `gh list` で取得可能

## gh api

- `gh login` で登録した認証情報を使って GitHub API を叩ける。ちょっと複雑なことがしたくなった際にサクッと API を試せるのは非常に便利。
- REST API はもちろん、V4 の GraphQL API も叩ける。 `--jq` \*\*\*\*で jq シンタックスでの絞り込みが jq をインストールせずとも使える。
- 例えば適当な PR の変更差分ファイル全てをスペース区切りで出力したい場合、このようになる。
- `gh api /repos/{owner}/{repo}/pulls/255/files --jq '[.[].filename] | join(" ")'`
  - owner と repo はプレースホルダーで、カレントディレクトリのリポジトリ情報で置き換えてくれる。

## gh repo

### `gh repo edit --delete-branch-on-merge --enable-auto-merge`

- リポジトリの設定を変更できる。全ての設定を満たしているわけではないがフラグが用意されているので、詳しくはドキュメントを見ると良い。 [https://cli.github.com/manual/gh_repo_edit](https://cli.github.com/manual/gh_repo_edit)
- この二つはリポジトリを作った際に大体設定しているので、CLI で設定できるようになったのは楽。

## 組み合わせ

以上で紹介したコマンドや、その他のコマンドラインツールを組み合わせて使うこともある。少々長いが、一度実行しておけば後は history から補完できるためエイリアスを用意したりはしていない。

### `gh pr checkout $(gh pr list --search "review-requested:@me" | peco | awk '{print $1}')`

- 自身がレビュワーをアサインされている PR で絞り込み、peco でインクリメンタルに選択し、選択した PR にチェックアウトする

### `gh gist edit $(gh gist list | peco| awk '{print $1}')`

- gist の一覧を開いて peco でインクリメンタルに選択し、選択した gist を編集する

---

この記事では自分が GitHub CLI でよく使うコマンドをまとめてみた。

他のコマンドは認知はしているものの使うユースケースが思いつかない、といったものも多いので、「このコマンドはこの状況で便利だよ」というのがあれば知りたい。workflow や release は使いこなせると便利かも？と思いつつ使えていない。

GitHub CLI は月に複数回はマイナーバージョンがリリースされるほど活発に開発されている。新機能の追加も多いので今後も追っていきたい。

## 余談：GitHub CLI の設定ファイル

GitHub CLI の設定は `~/.config/gh/config.yml` に保存されている。保存されている場所がわかればシンボリックリンクにして git で管理することができるので便利。自分の設定はこちら。

[https://github.com/MH4GF/dotfiles/blob/master/.config/gh/config.yml](https://github.com/MH4GF/dotfiles/blob/master/.config/gh/config.yml)
