import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { getOGP } from "../getOGP";

import { NO_DATA_URL, SAMPLE_URL, handlers } from "./handlers";

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
});
