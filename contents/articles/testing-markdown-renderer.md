---
title: (internal) Testing Markdown Renderer
description: Test the markdown renderer
publishedAt: 2000-1-1
tags:
  - dev
---

## 見出し

```
# 見出し1
## 見出し2
### 見出し3
#### 見出し4
```

## テキストリンク

```
[アンカーテキスト](/)
```

[アンカーテキスト](/)

## リスト

```
- Hello!
- Hola!
  - Bonjour!
  * Hi!
```

- Hello!
- Hola!
  - Bonjour!
  * Hi!

## 単体の URL 文字列

```
<!-- リンクテキストとしてレンダリング -->
- https://mh4gf.dev/articles

<!-- 上下に空白行がある場合リンクカードとしてレンダリング -->

https://mh4gf.dev

https://mh4gf.dev/articles

<!-- 上下に空白行がない場合リンクテキストとしてレンダリング -->
https://mh4gf.dev
https://mh4gf.dev
```

- https://mh4gf.dev/articles

https://mh4gf.dev

https://mh4gf.dev/articles

https://mh4gf.dev
https://mh4gf.dev

## インラインスタイル

```
*イタリック*
**太字**
~~打ち消し線~~
`code`
```

_イタリック_
**太字**
~~打ち消し線~~
`code`

## コードブロック

### タイトルあり

```js title="./lib/sample.js"
const hello = () => {
  console.log("Hello, world!");
};
```

### タイトルなし

```ruby
def hello
  puts "Hello, world!"
end
```

### Diff

```js
const hello = () => { // [!code --]
const hello = () => { // [!code ++]
  console.log("Hello, world!");
};
```
