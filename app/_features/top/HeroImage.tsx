"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { FC } from "react";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

type Props = {
  src: StaticImageData;
  alt: string;
  tooltip: string;
};

export const HeroImage: FC<Props> = ({ src, alt, tooltip }) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image src={src} alt={alt} className="w-full rounded-lg" placeholder="blur" />
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          avoidCollisions={false}
          className="border-0 bg-zinc-500 text-zinc-100 dark:bg-zinc-700 dark:text-zinc-200"
        >
          <TooltipArrow className="fill-zinc-500 dark:fill-zinc-700" />
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
