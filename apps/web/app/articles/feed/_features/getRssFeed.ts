import RSS from 'rss'

import { siteInfo } from '@/app/_utils'

export const getRssFeed = async (): Promise<string> => {
  const { siteName } = siteInfo
  const rss = new RSS({
    title: siteName,
    feed_url: `${siteInfo.url}/articles/feed`,
    site_url: siteInfo.url,
  })

  return rss.xml({ indent: true })
}
