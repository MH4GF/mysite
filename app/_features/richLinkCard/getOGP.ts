import { load } from "cheerio";

export interface OGPResult {
  url: string;
  title: string;
  description: string;
  imageSrc: string;
}

export const getOGP = async (url: string): Promise<OGPResult> => {
  const response = await fetch(url).catch(() => {
    throw new Error(`Failed to fetch: ${url}`);
  });
  const body = await response.text();
  const cheerio = load(body);

  const title =
    cheerio('meta[property="title"]').attr("content") ??
    cheerio('meta[property="og:title"]').attr("content") ??
    cheerio('meta[name="twitter:title"]').attr("content") ??
    "";
  const description =
    cheerio('meta[property="description"]').attr("content") ??
    cheerio('meta[property="og:description"]').attr("content") ??
    cheerio('meta[name="twitter:description"]').attr("content") ??
    "";
  const imageSrc = cheerio('meta[property="og:image"]').attr("content") ?? "";

  return { url, title, description, imageSrc };
};
