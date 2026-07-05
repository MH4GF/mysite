import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Paragraph } from "../elements";

describe("Paragraph", () => {
  it("renders a plain paragraph for text children", () => {
    const markup = renderToStaticMarkup(<Paragraph>こんにちは</Paragraph>);

    expect(markup).toBe("<p>こんにちは</p>");
  });

  it("renders a plain paragraph when children contain multiple nodes", () => {
    const markup = renderToStaticMarkup(
      <Paragraph>
        詳細は <a href="https://example.com">https://example.com</a> を参照
      </Paragraph>,
    );

    expect(markup).toContain("<p>");
    expect(markup).toContain("詳細は");
  });

  it("renders a plain paragraph when the single element has no children", () => {
    const markup = renderToStaticMarkup(
      <Paragraph>
        <br />
      </Paragraph>,
    );

    expect(markup).toBe("<p><br/></p>");
  });

  it("renders a plain paragraph when the single element has multiple children", () => {
    const markup = renderToStaticMarkup(
      <Paragraph>
        <a href="https://example.com">
          リンク <span>テキスト</span>
        </a>
      </Paragraph>,
    );

    expect(markup).toContain("<p>");
    expect(markup).toContain("リンク");
  });

  it("renders a plain paragraph when the single link text is not a URL", () => {
    const markup = renderToStaticMarkup(
      <Paragraph>
        <a href="https://example.com/about">プロフィールについて</a>
      </Paragraph>,
    );

    expect(markup).toContain("<p>");
    expect(markup).toContain("プロフィールについて");
  });

  it("renders a plain paragraph for a bare URL when renderRichLinkCard is not provided", () => {
    const markup = renderToStaticMarkup(
      <Paragraph>
        <a href="https://mh4gf.dev">https://mh4gf.dev</a>
      </Paragraph>,
    );

    expect(markup).toContain("<p>");
    expect(markup).not.toContain("not-prose");
  });

  it("renders the injected link card for a single bare URL link", () => {
    const markup = renderToStaticMarkup(
      <Paragraph
        renderRichLinkCard={(url) => <span data-testid="link-card-placeholder">{url}</span>}
      >
        <a href="https://mh4gf.dev">https://mh4gf.dev</a>
      </Paragraph>,
    );

    expect(markup).toContain("not-prose");
    expect(markup).toContain('data-testid="link-card-placeholder"');
    expect(markup).toContain("https://mh4gf.dev");
    expect(markup).not.toContain("<p>");
  });
});
