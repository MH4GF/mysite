/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import { tagLabelMap } from "../../_features/articles/constants";
import { getArticle } from "../../_features/articles/getArticle";

export const runtime = "edge";

export const alt = "記事タイトル";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// https://github.com/vercel/satori/blob/2e8dcb486f3dadeb6fc2e8790cb822a72893a21a/playground/pages/api/font.ts#L86-L111
const fetchFont = async (fontSource: string) => {
  const css = await (
    await fetch(fontSource, {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (!resource?.[1]) {
    return null;
  }

  const res = await fetch(resource[1]);

  return res.arrayBuffer();
};

const fontEnSource = "https://fonts.googleapis.com/css2?family=Open+Sans:wght@700";
const fontJpSource = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@700";

type FontOptions = {
  name: string;
  data: ArrayBuffer;
  style: "normal";
  weight: 700;
};

const generateFonts = async (): Promise<FontOptions[] | null> => {
  const [fontEnData, fontJpData] = await Promise.all([
    fetchFont(fontEnSource),
    fetchFont(fontJpSource),
  ]);
  if (!(fontEnData && fontJpData)) {
    return null;
  }

  return [
    {
      name: "Open Sans",
      data: fontEnData,
      style: "normal",
      weight: 700,
    },
    {
      name: "IBM Plex Sans JP",
      data: fontJpData,
      style: "normal",
      weight: 700,
    },
  ];
};

type Props = {
  params: {
    slug: string;
  };
};

export default async function Image({ params }: Props) {
  const article = getArticle(`/articles/${params.slug}`);
  if (!article) {
    return new Response("Not Found", { status: 404 });
  }

  const imageData = fetch(new URL("./_assets/og-image-base.jpg", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );
  const fonts = await generateFonts();
  if (!fonts) {
    return new Response("Error", { status: 500 });
  }

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
        alt="背景"
        tw="absolute inset-0"
      />
      <div tw="p-12 text-zinc-300 flex flex-col w-full h-full">
        <h1 tw="text-6xl leading-normal font-bold">{article.title}</h1>
        <div tw="flex">
          {article.tags.map((tag) => (
            <span
              tw="rounded-sm border border-zinc-500 px-2 py-1 mr-2 text-lg text-zinc-500"
              key={tag}
            >
              {tagLabelMap[tag]}
            </span>
          ))}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts,
    },
  );
}
