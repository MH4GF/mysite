/* eslint-disable @next/next/no-img-element */
import type { Route } from "next";
import { useId } from "react";

import { UniversalLink } from "../../_components";

import type { OGPResult } from "./getOGP";
import { getOGP } from "./getOGP";

type RichLinkCardInnerProps = OGPResult;

const RichLinkCardInner = ({ url, title, description, imageSrc }: RichLinkCardInnerProps) => {
  const labelledBy = useId();

  if (title === "") {
    return (
      <UniversalLink href={url as Route} isEnabledUnderline>
        {url}
      </UniversalLink>
    );
  }

  return (
    <section className="not-prose my-5 h-24 w-full" aria-labelledby={labelledBy}>
      <UniversalLink
        href={url as Route}
        className="grid h-full grid-flow-row-dense grid-cols-4 overflow-hidden rounded-sm border"
        isEnabledUnderline
      >
        <div className="col-span-3 flex flex-col gap-2 p-2">
          <h2
            id={labelledBy}
            className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold"
          >
            {title}
          </h2>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-zinc-500">
            {description}
          </p>
        </div>
        {imageSrc !== "" && (
          <img
            width="100%"
            height="100%"
            className="col-span-1 h-full w-full object-cover"
            src={imageSrc}
            alt={title}
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
