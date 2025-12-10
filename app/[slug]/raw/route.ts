import { allAbouts } from "contentlayer/generated";
import { NextResponse } from "next/server";

interface Params {
  slug: string;
}

export async function GET(_request: Request, { params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const about = allAbouts.find((about) => about.href === `/${slug}`);

  if (!about) {
    return new NextResponse("About page not found", { status: 404 });
  }

  return new NextResponse(about.body.raw, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
