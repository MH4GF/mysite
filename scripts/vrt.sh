#!/usr/bin/env bash
#
# コンポーネントVRT（SPEC.md「VRT の決定性」）をローカルで実行するための docker ラッパー。
#
# - CI (.github/workflows/ci.yml の test ジョブ) と同一 digest の Playwright イメージを使う。
#   基準画像はこのコンテナ環境でのみ生成し、ホスト（macOS 等）で生成してはならない
# - node_modules / pnpm store は named volume に隔離し、ホストの node_modules を汚染しない・されない
# - 引数はそのまま vitest に渡す（例: --update で基準画像を再生成する）
set -euo pipefail

IMAGE="mcr.microsoft.com/playwright:v1.57.0-noble@sha256:3bed4b1a12f2338642f3d8cba28e291deef3c66bd4a964bbeb3e57bbff511dbd"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

exec docker run --rm \
  -e VRT=1 \
  -e COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
  -e npm_config_store_dir=/pnpm-store \
  -v "${REPO_ROOT}:/work" \
  -v mysite-vrt-node_modules:/work/node_modules \
  -v mysite-vrt-pnpm-store:/pnpm-store \
  -w /work \
  "${IMAGE}" \
  bash -c 'corepack enable && corepack pnpm install --frozen-lockfile && corepack pnpm exec vitest run --project component-vrt "$@"' vrt "$@"
