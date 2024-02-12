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

// https://github.com/vercel/satori/blob/2e8dcb486f3dadeb6fc2e8790cb822a72893a21a/playground/pages/api/font.ts#L86-L111
const fetchFont = async () => {
  const css = await (
    await fetch("https://fonts.googleapis.com/css2?family=Inter:wght@900", {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (!resource?.[1]) return null;

  const res = await fetch(resource[1]);

  return res.arrayBuffer();
};

type Props = {
  params: {
    slug: string;
  };
};

export default async function Image({ params }: Props) {
  const article = getArticle(`/articles/${params.slug}`);
  if (!article) return new Response("Not Found", { status: 404 });

  const imageData = fetch(new URL("./_assets/og-image-base.jpg", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );
  const fontData = await fetchFont();
  if (!fontData) return new Response("Error", { status: 500 });

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
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
