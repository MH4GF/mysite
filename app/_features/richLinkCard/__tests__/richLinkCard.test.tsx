import { setupServer } from "msw/node";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { RichLinkCard } from "../index";

import { handlers, LEGACY_META_URL, NO_DATA_URL, SAMPLE_URL } from "./handlers";

const server = setupServer(...handlers);

describe("RichLinkCard", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders a full card with image when OGP has title/description/image", async () => {
    const element = await RichLinkCard({ url: SAMPLE_URL });
    const markup = renderToStaticMarkup(element);

    expect(markup).toContain('data-testid="rich-link-card"');
    expect(markup).toContain("Example Domain");
    expect(markup).toContain("Hello! This is example :)");
    expect(markup).toContain("<img");
    expect(markup).toContain("https://mh4gf.dev/assets/images/social-card.png");
  });

  it("renders a card without image when og:image is missing", async () => {
    const element = await RichLinkCard({ url: LEGACY_META_URL });
    const markup = renderToStaticMarkup(element);

    expect(markup).toContain('data-testid="rich-link-card"');
    expect(markup).toContain("Legacy Meta Domain");
    expect(markup).not.toContain("<img");
  });

  it("renders a plain link when title is empty", async () => {
    const element = await RichLinkCard({ url: NO_DATA_URL });
    const markup = renderToStaticMarkup(element);

    expect(markup).not.toContain('data-testid="rich-link-card"');
    expect(markup).toContain(NO_DATA_URL);
    expect(markup).toContain("<a ");
  });
});
