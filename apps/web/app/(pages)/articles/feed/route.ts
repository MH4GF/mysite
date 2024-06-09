import { getRssFeed } from "./_features";

export function GET() {
  const rss = getRssFeed();
  return new Response(rss, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
