import { afterEach, describe, expect, it, vi } from "vitest";

import { isSameOrigin } from "../isSameOrigin";

describe("isSameOrigin", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("returns true for root-relative paths", () => {
    expect(isSameOrigin("/blog")).toBe(true);
  });

  it("returns true for same-page hash links", () => {
    expect(isSameOrigin("#section")).toBe(true);
  });

  it("returns true for absolute URLs with the same origin", () => {
    expect(isSameOrigin("http://localhost:3000/blog")).toBe(true);
  });

  it("returns false for absolute URLs with a different origin", () => {
    expect(isSameOrigin("https://example.com/blog")).toBe(false);
  });

  it("returns false for unparseable hrefs", () => {
    expect(isSameOrigin("::invalid::")).toBe(false);
  });

  it("uses VERCEL_URL as the base origin when set", async () => {
    vi.stubEnv("VERCEL_URL", "mysite.example.com");
    vi.resetModules();
    const reloaded = await import("../isSameOrigin");

    expect(reloaded.isSameOrigin("https://mysite.example.com/blog")).toBe(true);
    expect(reloaded.isSameOrigin("http://localhost:3000/blog")).toBe(false);
  });
});
