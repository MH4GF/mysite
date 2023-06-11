import { load } from 'cheerio'

export interface OGPResult {
  url: string
  title: string
  description: string
  imageSrc: string
}

export const getOGP = async (url: string): Promise<OGPResult> => {
  const response = await fetch(url, { next: { revalidate: 60 * 60 } })
  const body = await response.text()
  const $ = load(body)

  const title = $('meta[property="og:title"]').attr('content') ?? ''
  const description = $('meta[property="og:description"]').attr('content') ?? ''
  const imageSrc = $('meta[property="og:image"]').attr('content') ?? ''

  return { url, title, description, imageSrc }
}
