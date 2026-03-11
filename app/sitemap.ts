import { allAbouts, allArticles } from "contentlayer/generated";
import type { MetadataRoute } from "next";
import { tagList } from "./_features";
import { baseUrl } from "./_utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
    },
    {
      url: `${baseUrl}/blog`,
    },
    {
      url: `${baseUrl}/media`,
    },
  ];

  const articlePaths: MetadataRoute.Sitemap = allArticles.map((article) => ({
    url: `${baseUrl}${article.href}`,
    lastModified: new Date(article.publishedAt),
  }));

  const aboutPaths: MetadataRoute.Sitemap = allAbouts.map((article) => ({
    url: `${baseUrl}${article.href}`,
  }));

  const tagPaths: MetadataRoute.Sitemap = tagList.map((tag) => ({
    url: `${baseUrl}/tags/${tag}`,
  }));

  return [...staticPaths, ...articlePaths, ...aboutPaths, ...tagPaths];
}
