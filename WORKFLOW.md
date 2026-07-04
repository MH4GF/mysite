---
tracker:
  kind: linear
  project_slug: "ai-native-workspace-202646c35423"
  api_key: $LINEAR_API_KEY
  active_states: ["Todo", "In Progress", "Merging", "Rework"]
  terminal_states: ["Human Review", "Done", "Canceled", "Duplicate"]
  required_labels: ["mysite"]

workspace:
  root: /Users/hermes/.symphony/workspaces/mysite

hooks:
  after_create: |
    set -eu
    git clone --depth 1 git@github.com:MH4GF/mysite.git .

agent:
  max_concurrent_agents: 2
  max_turns: 20

codex:
  command: /Users/hermes/.local/bin/safe-claude
  claude_args: ["--permission-mode", "bypassPermissions"]
  stall_timeout_ms: 600000
  turn_timeout_ms: 1800000
---

MH4GF/mysite (Next.js App Router 製の個人サイト) の clone で作業する。ビルド / lint / テストのコマンドと注意事項は root の `CLAUDE.md` を起点に把握する。コード変更の前に `docs/lint-rules.md` のコーディング規約を読む。

## Issue

{{ issue.identifier }} - {{ issue.title }}

## Body

{{ issue.description }}

{% if attempt %}
## Continuation context

- これはリトライ attempt #{{ attempt }}。チケットが active state のため再ディスパッチされた。
- 最初からやり直さず、現在の workspace 状態から resume する。
- 完了済みの調査や validation を繰り返さない。新規コード変更で必要な場合は除く。
- issue が active state の間は turn を終わらせない。required permissions/secrets が missing で blocked の場合は除く。
{% endif %}

## ワークフロー手順

- セッション起動直後に `symphony-workflow` スキルを呼ぶ。ステータスの振り分け / workpad 運用 / 実装 / レビュースイープ / `Human Review` 遷移 / マージまで、進行は全て同スキルの手順に従う
- `symphony-workflow` スキルが利用できない環境では実装に入らない。Linear issue にブロッカーコメント (何が不足しているか / 解除に必要な人間の対応) を 1 件書き、issue を `Human Review` へ動かして終了する
- 下の「本リポジトリ固有ルール」はスキルの共通手順を上書きする

## 本リポジトリ固有ルール

- 依存インストールは `pnpm install --frozen-lockfile` を使う。lockfile を書き換える依存更新は Renovate の管轄のため、issue が明示的に要求する場合を除きスコープ外
- 検証の最低ラインは `pnpm lint` と `pnpm test`。UI に影響する変更は `pnpm build` の成功も確認する

## スコープ外

issue が次のいずれかを含むなら、止まってユーザーに label 修正を依頼する。

- vault 内容の編集 (`MH4GF/works`)
- `MH4GF/claude-code` の編集 (claude-code workflow の管轄)
- Symphony orchestrator のコード (`MH4GF/symphony`)
- secrets / デプロイ環境変数のコミット
