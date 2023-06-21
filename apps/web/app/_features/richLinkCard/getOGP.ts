import { load } from 'cheerio'

export interface OGPResult {
  url: string
  title: string
  description: string
  imageSrc: string
}

export const getOGP = async (url: string): Promise<OGPResult> => {
  const response = await fetch(url, { next: { revalidate: 60 * 60 } }).catch(() => {
    throw new Error(`Failed to fetch: ${url}`)
  })
  const body = await response.text()
  const $ = load(body)

  const title =
    $('meta[property="og:title"]').attr('content') ??
    $('meta[name="twitter:title"]').attr('content') ??
    ''
  const description =
    $('meta[property="og:description"]').attr('content') ??
    $('meta[name="twitter:description"]').attr('content') ??
    ''
  const imageSrc = $('meta[property="og:image"]').attr('content') ?? ''

  return { url, title, description, imageSrc }
}
