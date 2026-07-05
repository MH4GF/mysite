import { setupServer } from "msw/node";
import type { ReactElement } from "react";
import { renderToReadableStream, renderToStaticMarkup } from "react-dom/server";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { handlers, SAMPLE_URL } from "@/app/_features/richLinkCard/__tests__/handlers";
import { processor } from "../processor";

const renderMarkdown = async (markdown: string): Promise<string> => {
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

// 単体URL段落 → RichLinkCard の変換を検証するため、richLinkCard の OGP モックを共有する
const server = setupServer(...handlers);

describe("processor", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders a paragraph with inline emphasis", async () => {
    const markup = await renderMarkdown("Hello **world**");

    expect(markup).toContain("<p>Hello <strong>world</strong></p>");
  });

  it("renders links with target blank for external URLs", async () => {
    const markup = await renderMarkdown("[example](https://example.com)");

    expect(markup).toContain('href="https://example.com"');
    // 外部リンクは別タブで開く
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noreferrer"');
  });

  it("renders images through next/image with default dimensions", async () => {
    const markup = await renderMarkdown("![サンプルの図](/images/sample.png)");

    expect(markup).toContain("<img");
    expect(markup).toContain('alt="サンプルの図"');
    expect(markup).toContain('width="840"');
    expect(markup).toContain('height="472"');
  });

  it("renders plain blockquotes as blockquote elements", async () => {
    const markup = await renderMarkdown("> 引用テキスト");

    expect(markup).toContain("<blockquote>");
    expect(markup).toContain("引用テキスト");
  });

  it("renders twitter-tweet blockquotes as TweetEmbed with light/dark themes", async () => {
    const markup = await renderMarkdown(
      '<blockquote class="twitter-tweet"><p>ツイート本文</p></blockquote>',
    );

    expect(markup).toContain('data-theme="light"');
    expect(markup).toContain('data-theme="dark"');
    expect(markup).toContain("ツイート本文");
  });

  it("renders code blocks as focusable pre elements with syntax highlighting", async () => {
    const markup = await renderMarkdown('```ts\nconst a = "b";\n```');

    expect(markup).toContain('<pre tabindex="0"');
    expect(markup).toContain("const");
  });

  it("renders a single bare URL paragraph as a RichLinkCard", async () => {
    const markup = await processWithStream(SAMPLE_URL);

    expect(markup).toContain('data-testid="rich-link-card"');
    expect(markup).toContain("Example Domain");
    expect(markup).toContain("Hello! This is example :)");
  });
});
