---
title: コードリーディングツールとしてNeovimを使い始めた
description: ターミナルから高速にコードリーディングできるツールを探し、Cursorから乗り換えたい
publishedAt: 2025-06-30
tags:
  - dev
---

## 課題

- Claude Code + Git Worktree によりターミナルで複数ペインでリポジトリを開く機会が増えた
- Claude Code に指示する前のコードリーディングも Cursor でやっていたが、Cursor の起動の遅さが気になってきた
- ターミナルから高速にコードリーディングできるツールを探し、Cursor から乗り換えたい

## やりたいこと

- ファイル名検索と全文検索
- TypeScript コードの定義ジャンプ
- コーディングエージェントに指示するためのファイルの相対パスをコピー
- GitHub の Web 版でファイルを開く
- Git の差分を見る (定義ジャンプなど上記操作も込み)

## 結論

Neovim を導入することにした。ターミナルから高速に動作し、世の中に情報が多く LLM が簡単にセットアップしてくれる。自身のやりたいことを細かくカスタマイズもでき、Cursor や VSCode で手間だったこともショートカット化できたのはかなり嬉しい。

ちなみに[VSCodeVim](https://github.com/VSCodeVim/Vim)拡張で Cursor 上でも Vim 記法による操作をしており、完全に 0 から Vim に入門したわけではない。ただ jj でノーマルモードに戻る程度のカスタマイズしかしていなかったので、プラグインシステムなどのキャッチアップをすることになった。

## 設定内容

素朴に init.lua に書いている。全ての設定は Claude Code に書いてもらった。この記事は自分向けの利用方法ドキュメントでもあります。

https://github.com/MH4GF/dotfiles/blob/f57ba55e689759ee4a189930cc2f9aad2f681515/.config/nvim/init.lua

## リーダーキー

スペースキーをリーダーキーに設定した。これが一般的らしい。

```lua title="./.config/nvim/init.lua"
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"
```

## ファイル名検索と全文検索

[Telescope](https://github.com/nvim-telescope/telescope.nvim) を導入した。
`.` から始まる隠しファイルも検索できるように設定しつつ、 `.git` や `node_modules` は除外するようにした。

```lua title="./.config/nvim/init.lua"
require("lazy").setup({
  {
    "nvim-telescope/telescope.nvim",
    dependencies = { "nvim-lua/plenary.nvim" },
    config = function()
      require("telescope").setup({
        defaults = {
          file_ignore_patterns = {"%.git/", "node_modules/", "%.DS_Store"},
        },
        pickers = {
          find_files = { hidden = true },
        },
      })

      local builtin = require("telescope.builtin")
      vim.keymap.set("n", "<leader>ff", builtin.find_files, { desc = "Find files" })
      vim.keymap.set("n", "<leader>fg", builtin.live_grep, { desc = "Live grep" })
      vim.keymap.set("n", "<leader>fb", builtin.buffers, { desc = "Find buffers" })
    end,
  },
})
```

### Telescope を開く

| キー          | コマンド                 | 説明            |
| ----------- | -------------------- | ------------- |
| `<Space>ff` | Telescope find_files | ファイル名検索       |
| `<Space>fg` | Telescope live_grep  | ファイル内容を文字列検索  |
| `<Space>fb` | Telescope buffers    | 開いているバッファから検索 |

できればキーボードショートカットはVSCodeのCmd+Pを踏襲したかったが、iTerm2 + NeovimだとCmdキーが反応しないとのこと。

### エイリアスでの起動

```sh
$ nf    # nvim + Telescope find_files で起動
$ ng    # nvim + Telescope live_grep で起動
```

### Telescope 検索画面での操作

| キー            | 機能                   |
| --------------- | ---------------------- |
| j / k           | 上下移動               |
| Ctrl+n / Ctrl+p | 上下移動（別パターン） |
| Enter           | ファイルを開く         |
| Ctrl+x          | 水平分割で開く         |
| Ctrl+v          | 垂直分割で開く         |
| Ctrl+t          | 新しいタブで開く       |
| Esc             | 検索をキャンセル       |

## コーディングエージェントに指示するためのファイルの相対パスをコピー

ファイルやコードをコピペして指示することが多かったので、簡単にコピーできるようにしたかった。以下の二つのキーバインドを用意した

| キー        | モード     | 機能                     | 説明                                              |
| ----------- | ---------- | ------------------------ | ------------------------------------------------- |
| `<Space>cp` | ノーマル   | Copy relative file path  | 現在開いているファイルの相対パスをコピー          |
| `<Space>cc` | ビジュアル | Copy file path with code | ファイルパス + 選択範囲をマークダウン形式でコピー |

選択範囲のコピーは以下のような文字列がクリップボードに保存される。 Cline や Roo Code が提供する `Add to Cline` が使いたかった。今回 Neovim で用意したのでどんなコーディングエージェントにも渡せるようになって便利。

````
@src/components/Header.tsx

```
function Header() {
  return Hello World;
}
```
````

```lua title="./.config/nvim/init.lua"
local function extract_real_path(path)
  -- fugitiveのパスから実際のファイルパスを抽出
  if path:match("^fugitive://") then
    local real_path = vim.fn.FugitiveReal(path)
    if real_path:match("^fugitive://") then
      real_path = real_path:match("/%.git/.-//%d+/(.*)$") or real_path
    end
    return real_path
  end
  return path
end

local function get_relative_path(path)
  -- 絶対パスの場合は相対パスに変換
  if path:match("^/") then
    return vim.fn.fnamemodify(path, ":.")
  end
  return path
end

local function get_current_file_path()
  local path = vim.fn.expand("%")
  path = extract_real_path(path)
  return get_relative_path(path)
end

-- ファイル相対パスをコピー
vim.keymap.set("n", "<leader>cp", function()
  local path = get_current_file_path()
  vim.fn.setreg("+", path)
  print("Copied: " .. path)
end, { desc = "Copy relative file path" })

-- ファイル相対パスとコード選択範囲をコピー
vim.keymap.set("v", "<leader>cc", function()
  local path = get_current_file_path()
  
  -- 選択範囲のテキストを取得
  vim.cmd('normal! "vy')
  local selected_text = vim.fn.getreg("v")
  
  -- フォーマットを作成
  local formatted = "@" .. path .. "\n\n```\n" .. selected_text .. "\n```"
  
  vim.fn.setreg("+", formatted)
  print("Copied: @" .. path .. " with selected text")
end, { desc = "Copy file path with selected code" })
```

## GitHub の Web でファイルを開く

ファイルを GitHub のパーマリンクで開いて共有するのも多用していたので、以下の二つのキーバインドを用意した。

| キー        | モード     | 機能                      | 説明                           |
| ----------- | ---------- | ------------------------- | ------------------------------ |
| `<Space>gh` | ノーマル   | Open file in GitHub       | 現在のファイルを GitHub で開く |
| `<Space>gh` | ビジュアル | Open file with line range | 選択した行範囲を GitHub で開く |

`gh browse --commit file.js:123-125` を呼び出す形。Neovim と Lua だと CLI ツールを簡単に呼び出せていいですね。

```lua title="./.config/nvim/init.lua"
-- GitHub でファイルを開く
vim.keymap.set("n", "<leader>gh", function()
  local path = get_current_file_path()
  vim.cmd("!gh browse " .. path .. " --commit")
  print("Opening: " .. path .. " in GitHub at current commit")
end, { desc = "Open file in GitHub at current commit" })

-- GitHub でファイルを行番号付きで開く（ビジュアルモード）
vim.keymap.set("v", "<leader>gh", function()
  local path = get_current_file_path()
  
  -- 選択範囲を取得（ビジュアルモード中に取得）
  local start_line = vim.fn.line("v")
  local end_line = vim.fn.line(".")
  
  -- 開始行と終了行を正しい順序にする
  if start_line > end_line then
    start_line, end_line = end_line, start_line
  end
  
  -- 行番号が0の場合は現在行を使用
  if start_line == 0 then
    start_line = vim.fn.line(".")
  end
  
  local line_part
  if start_line == end_line then
    line_part = ":" .. start_line
  else
    line_part = ":" .. start_line .. "-" .. end_line
  end
  
  vim.cmd("!gh browse " .. path .. line_part .. " --commit")
  if start_line == end_line then
    print("Opening: " .. path .. " line " .. start_line .. " in GitHub at current commit")
  else
    print("Opening: " .. path .. " lines " .. start_line .. "-" .. end_line .. " in GitHub at current commit")
  end
end, { desc = "Open file in GitHub with selected lines at current commit" })
```

## LSP の設定

これはまだ使い込みが足りていないので、別途記事にしたい。nvim-lspconfig を使うことになりそうだ。コードリーディング用途なのでオートコンプリートは不要

## Git の差分を見る

[fugitive.vim](https://github.com/tpope/vim-fugitive) が人気とのことで入れてみた。Vim の操作感で移動でき、そのままファイルを開けるのはとても良い。元々 CLI での簡単な差分チェックは [tig](https://github.com/jonas/tig) を使っていたが、うまくいけば完全に乗り換えてもよさそう。

```lua title="./.config/nvim/init.lua"
require("lazy").setup({
  {
    "tpope/vim-fugitive",
    config = function()
      vim.keymap.set("n", "<leader>gs", ":Git<CR>", { desc = "Git status" })
      vim.keymap.set("n", "<leader>gd", ":Git diff --staged<CR>", { desc = "Git diff staged" })
    end,
  },
})
```

### fugitive.vim を開く

| キー        | コマンド           | 説明                               |
| ----------- | ------------------ | ---------------------------------- |
| `<Space>gs` | :Git               | Git status 画面を開く              |
| `<Space>gd` | :Git diff --staged | ステージング済みファイルの差分表示 |
| <br>        |                    |                                    |

### エイリアスでの起動

```sh
$ nvg    # nvim + Git で起動
```

Git status 画面での操作

| キー  | 機能                             |
| ----- | -------------------------------- |
| =     | カーソル下のファイルの差分を表示 |
| s     | ファイルをステージング           |
| u     | ファイルをアンステージング       |
| cc    | コミット作成                     |
| Enter | ファイルを開く                   |
| q     | 画面を閉じる                     |

## 終わりに

とりあえず自分が欲しかった機能は用意でき、かつ Cursor ではちょっと面倒だったこともショートカットとして用意できたので満足している。新たに覚えることになったキーボードショートカットの数が多いのが悩みどころだが、少しずつ慣れていきたい。

コードリーディング用途の Neovim ということで、nvim-cmp によるオートコンプリートや copilot.vim による GitHub Copilot のコード補完がなくてもよかったのが面白かった。今は 2 割程度は自分でコードを書く機会があるので Cursor を使っているが、Cursor をアンインストールする未来もあるかもなあ。

---

## 余談: Neovim を採用する前に検討していた案

最初は rg + peco + bat が良さそうかと考えていた。

## Cmd+P（ファイル名検索）代替

```bash
# 基本的な使い方
git ls-files | peco

# 選択したファイルをbatで表示
git ls-files | peco | xargs bat

# 選択したファイルをエディタで開く
git ls-files | peco | xargs $EDITOR

# エイリアス設定
alias fp='git ls-files | peco | xargs bat'
alias fpe='git ls-files | peco | xargs $EDITOR'
```

## Cmd+Shift+F（全文検索）の peco 版

```bash
# rgの結果をpecoで選択
rg --line-number --no-heading "search_term" | peco

# より実用的なfunction
rgp() {
  local selected
  selected=$(rg --line-number --no-heading --color=never "$1" | peco)
  if [ -n "$selected" ]; then
    local file=$(echo "$selected" | cut -d: -f1)
    local line=$(echo "$selected" | cut -d: -f2)
    bat --highlight-line "$line" "$file"
  fi
}

# 行番号指定でファイルを開く版
rgpe() {
  local selected
  selected=$(rg --line-number --no-heading --color=never "$1" | peco)
  if [ -n "$selected" ]; then
    local file=$(echo "$selected" | cut -d: -f1)
    local line=$(echo "$selected" | cut -d: -f2)
    $EDITOR "+$line" "$file"  # vim/nvimの場合
  fi
}
```

ただ、自分のコードリーディングにおいてはファイルが開けるだけはダメで、定義ジャンプやファイルパスのコピーなどの高度な機能を必要としていた。そのため Neovim に切り替えることにした。
