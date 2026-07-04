import { afterEach, describe, expect, it, vi } from "vitest";

describe("me / siteInfo", () => {
  it("exposes profile data and frozen site info", async () => {
    const { me, siteInfo } = await import("../constants");

    expect(me.name).toBe("MH4GF / Hirotaka Miyagi / 宮城広隆");
    expect(me.workExperiences.length).toBeGreaterThan(0);
    expect(me.findMeOn.some((entry) => entry.service === "GitHub")).toBe(true);

    expect(siteInfo.siteName).toBe("Hirotaka Miyagi");
    expect(Object.isFrozen(siteInfo)).toBe(true);
  });
});

describe("baseUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses NEXT_PUBLIC_BASE_URL when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://example.com");
    vi.stubEnv("VERCEL_URL", "vercel-deployment.example.com");
    vi.resetModules();

    const { baseUrl } = await import("../constants");
    expect(baseUrl).toBe("https://example.com");
  });

  it("falls back to VERCEL_URL when NEXT_PUBLIC_BASE_URL is unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");
    vi.stubEnv("VERCEL_URL", "vercel-deployment.example.com");
    vi.resetModules();

    const { baseUrl } = await import("../constants");
    expect(baseUrl).toBe("https://vercel-deployment.example.com");
  });

  it("falls back to localhost when neither env var is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");
    vi.stubEnv("VERCEL_URL", "");
    vi.resetModules();

    const { baseUrl } = await import("../constants");
    expect(baseUrl).toBe("http://localhost:3000");
  });
});
