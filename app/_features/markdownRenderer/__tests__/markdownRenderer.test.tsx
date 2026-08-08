import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MarkdownRenderer } from "../index";

describe("MarkdownRenderer", () => {
  it("renders processed markdown inside a prose article", async () => {
    const element = await MarkdownRenderer({ raw: "Hello **markdown**" });
    const markup = renderToStaticMarkup(element);

    expect(markup).toContain('<article class="prose prose-zinc dark:prose-invert">');
    expect(markup).toContain("<p>Hello <strong>markdown</strong></p>");
  });
});
