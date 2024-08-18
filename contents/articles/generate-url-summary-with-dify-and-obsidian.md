---
title: DifyでのAPIアクセス実践 - Obsidianから呼び出しURL記事の要約をノートに保存する
description: 最近は LLM を使って色々実験しており、その中でも Dify をよく使っています。今回は Dify を使った小ネタを紹介します。
publishedAt: 2024-08-18
tags:
  - dev
---

最近は LLM を使って色々実験しており、その中でも Dify をよく使っています。今回は Dify を使った小ネタを紹介します。

[Dify](https://dify.ai/jp) は、カスタマイズ可能な AI ワークフロー・チャットボット・エージェントをノーコードで作成できるプラットフォームです。作成したワークフローはブラウザや Chrome 拡張機能、API 経由で実行できます。一方、[Obsidian](https://obsidian.md/) は拡張性の高い markdown ベースのノートアプリケーションとして知られています。

今回はこれらのツールを連携させ、以下の機能を実現しました。

1. Dify を利用して、指定した URL の記事を自動的に要約する
2. Obsidian から Dify の要約機能を API 経由で呼び出し、結果をノートとして保存する

私は Obsidian にさまざまなメモやログを蓄積しており、日々気になった Web 上の記事もメモと共に Obsidian に保存し、ナレッジベースとして活用しています。

1 年ほど前から ChatGPT でも Web 記事の内容を読んで返答できるようになったので、普段でも要約をまとめてもらってノートにコピペしていましたが、その作業を自動化して一発で Obsidian のノートに保存できないかと考えていました。それが Dify と Obsidian の組み合わせで実現できました。

Dify と Obsidian の組み合わせを紹介する記事となるとかなりニッチな領域なんですが、両者とも拡張性が高いため、さまざまな用途に活用できると思います。例えば Dify の API アクセスを活用すると、Dify だけでは機能が足りない時に Zapier から API アクセスする形で補うなども可能です。

以下のセクションでは、Dify でのワークフロー作成から Obsidian での実装まで、具体的な手順を解説していきます。

## 動作イメージ

実際の動作イメージは以下の通りです：

![](/images/generate-url-summary-with-dify-and-obsidian/3.gif)

1. コマンドパレットから「Templater: Create new note from template」を選択
2. テンプレート「url-summary」を選択
3. 要約・保存したい記事の URL を入力
4. 数秒待つと、要約されたノートが自動的に保存される

ノートとして保存した後は、LLM の要約結果を必要に応じて調整できます。私は [Evergreen Notes](https://notes.andymatuschak.org/Evergreen_notes) の思想を取り入れて情報整理をしており、ここで既存の他のノートへのリンクを貼るようにしています。

この仕組みはスマホ版の Obsidian でも問題なく動作するため、出先などでも記事を簡単に保存できるのが便利です。

## Dify での要約ワークフロー作成

Dify を使って、URL から記事を要約するワークフローを作成します。以下がワークフローの概要です。

![](/images/generate-url-summary-with-dify-and-obsidian/1.png)

このワークフローは以下のノードで構成されています：

1. 開始ノード：URL を入力として受け取ります。
2. JinaReader ツール：入力された URL の内容を読み取ります。
3. JSON Parse ツール：JSON 文字列から任意のフィールドを取り出すツールです。ここでは JinaReader の出力から記事のタイトルを取り出します。
4. LLM ノード（GPT-4o）：記事の内容を要約します。要約は日本語で、主な議論点と結論を含む 3 行以内の箇条書きで生成されます。
5. 終了ノード：要約内容（content）とタイトル（title）を出力します。

このワークフローを自分の Dify アカウントで再現したい方は、以下の DSL をコピーの上インポートしてください。

<details>
<summary>ワークフローの DSL</summary>

```yaml
app:
  description: ""
  icon: 🤖
  icon_background: "#FFEAD5"
  mode: workflow
  name: 要約
kind: app
version: 0.1.1
workflow:
  conversation_variables: []
  environment_variables: []
  features:
    file_upload:
      image:
        enabled: false
        number_limits: 3
        transfer_methods:
          - local_file
          - remote_url
    opening_statement: ""
    retriever_resource:
      enabled: false
    sensitive_word_avoidance:
      enabled: false
    speech_to_text:
      enabled: false
    suggested_questions: []
    suggested_questions_after_answer:
      enabled: false
    text_to_speech:
      enabled: false
      language: ""
      voice: ""
  graph:
    edges:
      - data:
          isInIteration: false
          sourceType: start
          targetType: tool
        id: 1722151586902-source-1722300182734-target
        source: "1722151586902"
        sourceHandle: source
        target: "1722300182734"
        targetHandle: target
        type: custom
        zIndex: 0
      - data:
          isInIteration: false
          sourceType: tool
          targetType: tool
        id: 1722300182734-source-1723634891190-target
        source: "1722300182734"
        sourceHandle: source
        target: "1723634891190"
        targetHandle: target
        type: custom
        zIndex: 0
      - data:
          isInIteration: false
          sourceType: tool
          targetType: llm
        id: 1723634891190-source-1722299744292-target
        source: "1723634891190"
        sourceHandle: source
        target: "1722299744292"
        targetHandle: target
        type: custom
        zIndex: 0
      - data:
          isInIteration: false
          sourceType: llm
          targetType: end
        id: 1722299744292-source-1722300260176-target
        source: "1722299744292"
        sourceHandle: source
        target: "1722300260176"
        targetHandle: target
        type: custom
        zIndex: 0
    nodes:
      - data:
          desc: ""
          selected: false
          title: 開始
          type: start
          variables:
            - label: URL
              max_length: 256
              options: []
              required: true
              type: text-input
              variable: url
        height: 90
        id: "1722151586902"
        position:
          x: 30
          y: 349
        positionAbsolute:
          x: 30
          y: 349
        selected: true
        sourcePosition: right
        targetPosition: left
        type: custom
        width: 244
      - data:
          context:
            enabled: true
            variable_selector:
              - "1722300182734"
              - text
          desc: ""
          model:
            completion_params:
              temperature: 0.7
            mode: chat
            name: gpt-4o-mini
            provider: openai
          prompt_template:
            - id: b2b30596-9568-474b-8c30-75da1cfc104b
              role: system
              text:
                "以下の記事を要約してください。要約は、日本語で、主な議論点と結論を含め、箇条書きで、3行以内でお願いします。


                {{#context#}}"
          selected: false
          title: Generate summary
          type: llm
          variables: []
          vision:
            configs:
              detail: high
            enabled: true
        height: 98
        id: "1722299744292"
        position:
          x: 942
          y: 349
        positionAbsolute:
          x: 942
          y: 349
        selected: false
        sourcePosition: right
        targetPosition: left
        type: custom
        width: 244
      - data:
          desc: ""
          provider_id: jina
          provider_name: jina
          provider_type: builtin
          selected: false
          title: JinaReader
          tool_configurations:
            gather_all_images_at_the_end: 0
            gather_all_links_at_the_end: 0
            image_caption: 0
            max_retries: 3
            no_cache: 0
            proxy_server: null
            summary: 0
            target_selector: null
            wait_for_selector: null
          tool_label: JinaReader
          tool_name: jina_reader
          tool_parameters:
            url:
              type: mixed
              value: "{{#1722151586902.url#}}"
          type: tool
        height: 298
        id: "1722300182734"
        position:
          x: 334
          y: 349
        positionAbsolute:
          x: 334
          y: 349
        selected: false
        sourcePosition: right
        targetPosition: left
        type: custom
        width: 244
      - data:
          desc: ""
          outputs:
            - value_selector:
                - "1722299744292"
                - text
              variable: content
            - value_selector:
                - "1723634891190"
                - text
              variable: title
          selected: false
          title: 終了
          type: end
        height: 116
        id: "1722300260176"
        position:
          x: 1246
          y: 349
        positionAbsolute:
          x: 1246
          y: 349
        selected: false
        sourcePosition: right
        targetPosition: left
        type: custom
        width: 244
      - data:
          desc: ""
          provider_id: json_process
          provider_name: json_process
          provider_type: builtin
          selected: false
          title: Extract title
          tool_configurations:
            ensure_ascii: 1
          tool_label: JSON Parse
          tool_name: parse
          tool_parameters:
            content:
              type: mixed
              value: "{{#1722300182734.text#}}"
            json_filter:
              type: mixed
              value: data.title
          type: tool
        height: 90
        id: "1723634891190"
        position:
          x: 638
          y: 349
        positionAbsolute:
          x: 638
          y: 349
        selected: false
        sourcePosition: right
        targetPosition: left
        type: custom
        width: 244
    viewport:
      x: 68.00119294975991
      y: 34.74871751854829
      zoom: 0.6686980554677073
```

</details>

ワークフローを作成したら、API キーを取得します。この API キーは後で Obsidian から要約機能を呼び出す際に使用します。

![](/images/generate-url-summary-with-dify-and-obsidian/2.png)

次のセクションでは、この Dify ワークフローを Obsidian から呼び出す方法について説明します。

## Obsidian から API 呼び出しとノート保存の実装

Obsidian から Dify の API を呼び出し、生成された要約をノートとして保存する機能を実装します。この実装には Obsidian の [Templater プラグイン](https://github.com/SilentVoid13/Templater) を使用します。Templater プラグインをインストールし、有効化してください。

### 1. API 呼び出し用 JavaScript ファイルの作成

Dify の API を呼び出すための JavaScript 関数を記述したファイルを作成します。以下の内容で `getSummaryFromUrl.js` というファイルを作成し、Obsidian の vault の適切な場所（自分は `templater-scripts` フォルダにしています）に保存します。

```js title="/templater-scripts/getSummaryFromUrl.js"
/**
 *
 * @param {string} url - The URL of the article to summarize.
 * @param {function(string): Promise<void>} onTitleUpdate - Callback function to handle title updates as they are streamed.
 * @param {function(string): void} onContentUpdate - Callback function to handle content updates as they are streamed.
 */
async function getSummaryFromUrl(url, onTitleUpdate, onContentUpdate) {
  const response = await fetch("https://api.dify.ai/v1/workflows/run", {
    method: "POST",
    headers: {
      Authorization: "Bearer [DifyのAPIキーを貼り付け]",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: { url: url }, // 「開始」ノードで設定した入力フィールド
      response_mode: "streaming", // Server-Sent Eventsで返却される
      user: "obsidian", // APIアクセスしたユーザーを識別するための情報。適当な文字列で大丈夫
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";
  let bufferObj;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    for (const line of lines) {
      // レスポンスには先頭に `data: ` という文字列とJSON文字列が含まれている
      if (line.startsWith("data: ")) {
        try {
          // 不要な文字列を取り除いてパース
          bufferObj = JSON.parse(line.substring(6));
        } catch {
          continue;
        }

        // タイトル抽出のノードが終了したらその時点でタイトルを保存
        if (
          bufferObj.event === "node_finished" &&
          bufferObj.data.title === "Extract title" &&
          bufferObj.data?.outputs?.text
        ) {
          await onTitleUpdate(bufferObj.data.outputs.text);
        }

        // LLMのテキストチャンクを都度保存
        if (bufferObj.event === "text_chunk" && bufferObj.data?.text) {
          onContentUpdate(bufferObj.data.text);
        }
      }
      buffer = lines[lines.length - 1];
    }
  }
}

module.exports = getSummaryFromUrl;
```

`[DifyのAPIキーを貼り付け]` の部分を、先ほど取得した Dify の API キーに置き換えてください。

`response_mode: "streaming"` を指定することで、Server-Sent Events（SSE）形式でレスポンスが返却されます。これにより、要約の生成過程をリアルタイムで取得し、ノートに反映することが可能になります。  
今回は 「`text_chunk` イベントであれば要約の生成結果だと見なして保存」としていますが、ワークフローで利用する LLM が複数の場合は困るかもしれません。 `text_chunk` イベントのレスポンスにはどのノードで実行されたかという情報が含まれていないためです。  
もし困った場合は無理にリアルタイムで更新せずに、 `node_finished` イベントで最終結果を取り出す形でも実現できます。

### 2. テンプレートファイルの作成

次に、ノートの作成を行うテンプレートファイルを作成します。以下の内容で `url-summary.md` というファイルを作成し、テンプレートフォルダに保存します。(自分は `templater` フォルダにしています。)

```md title="/templater/url-summary.md"
<%*
// 実行時に URL を入力するプロンプトを出す
const url = await tp.system.prompt("Please enter a URL");

// わかりやすさのために、自分は記事のノートのプレフィックスとして「📰」をつけています
// この辺りのフォーマットはお好みで変更してください。
const handleUpdateTitle = async (newTitle) => {
await tp.file.rename(`📰${newTitle}`);
tR += `[${newTitle}](${url})\n`;
}
const handleUpdateContent = (newContent) => {
tR += newContent;
}  
await tp.user.getSummaryFromUrl(url, handleUpdateTitle, handleUpdateContent);
%>
```

### 3. Templater の設定

Templater の設定で、テンプレートフォルダと `getSummaryFromUrl.js` を保存したスクリプトフォルダのパスを指定してください。

これで設定は完了です。コマンドパレットを開き「Templater: Create new note from template」を実行すると、記事要約を含めてノートに保存されました！

## おわりに

今回は Dify の API アクセスの実践例として、Obsidian からワークフローを呼び出して結果をノートに保存する方法を紹介しました。
今回はある程度シンプルなワークフローでしたが、カスタマイズすることで単なる記事要約に限らず様々な用途に使えるかと思います。

余談ですが、最近はノーコードで実現可能なことは可能な限りそちらに寄せる方が構築スピードや試行錯誤のしやすさから良いと考え、Dify や Zapier を試している面もあります。しかしプログラミングはどうしても楽しいので、結局この記事の例でもコーディングしてしまいました。うまくバランスを取って両方利活用していきたいですね。
