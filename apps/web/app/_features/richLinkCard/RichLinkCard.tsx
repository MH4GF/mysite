/* eslint-disable @next/next/no-img-element */
import type { Route } from "next";
import { useId } from "react";

import { UniversalLink } from "../viewTransition";

import type { OGPResult } from "./getOGP";
import { getOGP } from "./getOGP";

type RichLinkCardInnerProps = OGPResult;

const RichLinkCardInner = ({ url, title, description, imageSrc }: RichLinkCardInnerProps) => {
  const labelledBy = useId();
  const imageAlt = `${new URL(url).hostname} thumbnail image`;

  if (title === "") {
    return (
      <UniversalLink href={url as Route} isEnabledUnderline>
        {url}
      </UniversalLink>
    );
  }

  return (
    <section className="h-24 w-full" aria-labelledby={labelledBy} data-testid="rich-link-card">
      <UniversalLink
        href={url as Route}
        className="grid h-full grid-flow-row-dense grid-cols-4 overflow-hidden rounded-sm border"
        isEnabledUnderline
      >
        <div className="col-span-3 flex flex-col gap-2 p-2">
          <h2
            id={labelledBy}
            className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-base"
            data-ignore-toc
          >
            {title}
          </h2>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-zinc-500">
            {description}
          </p>
        </div>
        {imageSrc !== "" && (
          <img
            width="300"
            height="200"
            className="col-span-1 h-full w-full object-cover"
            src={imageSrc}
            alt={imageAlt}
          />
        )}
      </UniversalLink>
    </section>
  );
};

interface Props {
  url: string;
}

export const RichLinkCard = async ({ url }: Props) => {
  const result = await getOGP(url);
  return <RichLinkCardInner {...result} />;
};
