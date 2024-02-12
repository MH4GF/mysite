/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import { getArticle } from "../../_features/articles/getArticle";

export const runtime = "edge";

export const alt = "Article Title";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Image({ params }: Props) {
  const article = getArticle(`/articles/${params.slug}`);
  if (!article) return new Response("Not Found", { status: 404 });

  const imageData = fetch(new URL("./assets/og-image-base.png", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );
  const fontData = fetch(new URL("./assets/Inter-Bold.ttf", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        width={size.width}
        height={size.height}
        src={(await imageData) as unknown as string}
        alt="Background"
        tw="absolute inset-0"
      />
      <div tw="w-full h-full p-12 text-6xl text-zinc-100 font-extrabold flex items-center justify-center">
        {article.title}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
