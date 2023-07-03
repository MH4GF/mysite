import RSS from 'rss'

import { getArticles } from '@/app/_features'
import { siteInfo } from '@/app/_utils'

export const getRssFeed = async (): Promise<string> => {
  const { siteName } = siteInfo
  const rss = new RSS({
    title: siteName,
    feed_url: `${siteInfo.url}/articles/feed`,
    site_url: siteInfo.url,
  })
  const articles = await getArticles()
  articles.forEach((article) => {
    rss.item({
      title: article.title,
      description: '',
      url: article.href,
      date: article.publishedAt,
    })
  })

  return rss.xml({ indent: true })
}
