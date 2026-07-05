import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { getOGP } from "../getOGP";

import {
  FETCH_ERROR_URL,
  handlers,
  LEGACY_META_URL,
  NO_DATA_URL,
  SAMPLE_URL,
  TWITTER_META_URL,
} from "./handlers";

const server = setupServer(...handlers);

describe("parseHTML", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("return parsed ogp", async () => {
    const url = SAMPLE_URL;
    const result = await getOGP(url);
    const expected = {
      url: "https://mh4gf.dev",
      title: "Example Domain",
      description: "Hello! This is example :)",
      imageSrc: "https://mh4gf.dev/assets/images/social-card.png",
    };
    expect(result).toStrictEqual(expected);
  });

  it("return empty when ogp properties are not found", async () => {
    const url = NO_DATA_URL;
    const result = await getOGP(url);
    const expected = {
      url: "https://nodata.mh4gf.dev",
      title: "",
      description: "",
      imageSrc: "",
    };
    expect(result).toStrictEqual(expected);
  });

  it("prefer plain title/description meta properties when present", async () => {
    const url = LEGACY_META_URL;
    const result = await getOGP(url);
    const expected = {
      url: "https://legacy.mh4gf.dev",
      title: "Legacy Meta Domain",
      description: "Legacy style meta tags",
      imageSrc: "",
    };
    expect(result).toStrictEqual(expected);
  });

  it("fall back to twitter meta tags when og properties are not found", async () => {
    const url = TWITTER_META_URL;
    const result = await getOGP(url);
    const expected = {
      url: "https://twitter-meta.mh4gf.dev",
      title: "Twitter Meta Domain",
      description: "Twitter style meta tags",
      imageSrc: "",
    };
    expect(result).toStrictEqual(expected);
  });

  it("throw when fetch rejects (network error)", async () => {
    const url = FETCH_ERROR_URL;
    await expect(getOGP(url)).rejects.toThrow(`Failed to fetch: ${url}`);
  });
});
