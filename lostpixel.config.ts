import type { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      {
        name: "home",
        path: "/",
      },
      {
        name: "behavior",
        path: "/behavior",
      },
      {
        name: "articles",
        path: "/articles",
      },
      {
        name: "article-2022-summary",
        path: "/articles/2022-summary",
      },
      {
        name: "testing-markdown-renderer",
        path: "/dev/testing-markdown-renderer",
      },
    ],
    baseUrl: "http://172.17.0.1:3000",
  },
  lostPixelProjectId: "clrle4r1n14nfnj0e2ij7un7c",
  apiKey: process.env.LOST_PIXEL_API_KEY,
};
