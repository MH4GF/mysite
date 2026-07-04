import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import type { ReactElement } from "react";
import { renderToReadableStream, renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { processor } from "../processor";

const process = async (markdown: string): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const file = await processor.process(markdown);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return renderToStaticMarkup(file.result as ReactElement);
};

// RichLinkCard（async RSC）を含むツリーは同期 API の renderToStaticMarkup では描画できないため、
// ストリーミング API で描画して HTML 文字列に集約する
const processWithStream = async (markdown: string): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const file = await processor.process(markdown);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const stream = await renderToReadableStream(file.result as ReactElement);
  await stream.allReady;
  return await new Response(stream).text();
};

const LINK_CARD_URL = "https://mh4gf.dev";

// 単体URL段落 → RichLinkCard の変換を検証するための OGP レスポンスモック
const server = setupServer(
  http.get(LINK_CARD_URL, () => {
    return new HttpResponse(
      `<!doctype html>
<html>
  <head>
    <meta property="og:title" content="MH4GF Site" />
    <meta property="og:description" content="mysite description" />
  </head>
  <body></body>
</html>`,
      { status: 200 },
    );
  }),
);

describe("processor", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it("renders a paragraph with inline emphasis", async () => {
    const markup = await process("Hello **world**");

    expect(markup).toContain("<p>Hello <strong>world</strong></p>");
  });

  it("renders links with target blank for external URLs", async () => {
    const markup = await process("[example](https://example.com)");

    expect(markup).toContain('href="https://example.com"');
    // 外部リンクは別タブで開く
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noreferrer"');
  });

  it("renders images through next/image with default dimensions", async () => {
    const markup = await process("![サンプルの図](/images/sample.png)");

    expect(markup).toContain("<img");
    expect(markup).toContain('alt="サンプルの図"');
    expect(markup).toContain('width="840"');
    expect(markup).toContain('height="472"');
  });

  it("renders plain blockquotes as blockquote elements", async () => {
    const markup = await process("> 引用テキスト");

    expect(markup).toContain("<blockquote>");
    expect(markup).toContain("引用テキスト");
  });

  it("renders twitter-tweet blockquotes as TweetEmbed with light/dark themes", async () => {
    const markup = await process(
      '<blockquote class="twitter-tweet"><p>ツイート本文</p></blockquote>',
    );

    expect(markup).toContain('data-theme="light"');
    expect(markup).toContain('data-theme="dark"');
    expect(markup).toContain("ツイート本文");
  });

  it("renders code blocks as focusable pre elements with syntax highlighting", async () => {
    const markup = await process('```ts\nconst a = "b";\n```');

    expect(markup).toContain('<pre tabindex="0"');
    expect(markup).toContain("const");
  });

  it("renders a single bare URL paragraph as a RichLinkCard", async () => {
    const markup = await processWithStream(LINK_CARD_URL);

    expect(markup).toContain('data-testid="rich-link-card"');
    expect(markup).toContain("MH4GF Site");
    expect(markup).toContain("mysite description");
  });
});
