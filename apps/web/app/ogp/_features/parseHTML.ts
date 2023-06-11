import { load } from 'cheerio'

interface OGPResult {
  url: string
  title: string
  description: string
  imageSrc: string
}

export const parseHTML = async (url: string): Promise<OGPResult> => {
  // TODO: cache
  const response = await fetch(url)
  const body = await response.text()
  const $ = load(body)

  const title = $('meta[property="og:title"]').attr('content') ?? ''
  const description = $('meta[property="og:description"]').attr('content') ?? ''
  const imageSrc = $('meta[property="og:image"]').attr('content') ?? ''

  return { url, title, description, imageSrc }
}
