import type { MetadataRoute } from "next";

import { tagList } from "./_features";
import { baseUrl } from "./_utils";

import { allDocuments } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const documentPaths: MetadataRoute.Sitemap = allDocuments.map((document) => ({
    url: `${baseUrl}${document.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tagPaths: MetadataRoute.Sitemap = tagList.map((tag) => ({
    url: `${baseUrl}/articles/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPaths, ...documentPaths, ...tagPaths];
}
