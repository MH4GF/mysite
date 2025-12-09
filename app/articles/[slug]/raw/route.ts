import { NextResponse } from "next/server";
import { getArticle } from "@/app/_features";

interface Params {
  slug: string;
}

export async function GET(_request: Request, { params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(`/articles/${slug}`);

  if (!article) {
    return new NextResponse("Article not found", { status: 404 });
  }

  return new NextResponse(article.body.raw, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
