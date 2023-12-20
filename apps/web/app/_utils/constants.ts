import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PWD: z.string(),
  },
  client: {},
  runtimeEnv: {
    PWD: process.env["PWD"],
  },
});

export const externalLinks = Object.freeze({
  avatar: "https://avatars.githubusercontent.com/u/31152321?v=4",
});

export const siteInfo = Object.freeze({
  siteName: "Hirotaka Miyagi",
  description: "My personal website.",
  url: "https://mh4gf.dev",
  twitter: "@mh4gf",
});
