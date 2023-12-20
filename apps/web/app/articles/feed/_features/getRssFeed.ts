import RSS from "rss";

import { getArticlesMeta } from "@/app/_features";
import { siteInfo } from "@/app/_utils";

export const getRssFeed = async (): Promise<string> => {
  const { siteName } = siteInfo;
  const rss = new RSS({
    title: siteName,
    feed_url: `${siteInfo.url}/articles/feed`,
    site_url: siteInfo.url,
  });
  const articlesMeta = await getArticlesMeta();
  articlesMeta.forEach((article) => {
    rss.item({
      title: article.title,
      description: "",
      url: article.href,
      date: article.publishedAt,
    });
  });

  return rss.xml({ indent: true });
};
