import { getRssFeed } from "./_features";

export async function GET() {
  const rss = await getRssFeed();
  return new Response(rss, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
