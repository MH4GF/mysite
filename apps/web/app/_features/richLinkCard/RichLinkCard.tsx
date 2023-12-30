/* eslint-disable @next/next/no-img-element */
import { Box, Heading, Image, Link, Text, VStack, css } from "@kuma-ui/core";
import { useId } from "react";

import type { OGPResult } from "./getOGP";
import { getOGP } from "./getOGP";

type RichLinkCardInnerProps = OGPResult;

const RichLinkCardInner = ({ url, title, description, imageSrc }: RichLinkCardInnerProps) => {
  const labelledBy = useId();

  if (title === "") {
    return (
      <Link href={url} target="_blank" rel="noreferrer">
        {url}
      </Link>
    );
  }

  return (
    <Box
      as="section"
      height="6rem"
      width="100%"
      border={"1px solid"}
      borderRadius={"0.125rem"}
      className={"not-prose"}
      marginY={"1.25rem"}
      aria-labelledby={labelledBy}
    >
      <Link
        href={url}
        target="_blank"
        rel="noreferrer"
        height={"100%"}
        overflow={"hidden"}
        display={"grid"}
        gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
        gridAutoFlow={"row dense"}
      >
        <VStack gap={"0.5rem"} p={"0.5rem"} gridColumn={"span 3 / span 3"}>
          <Heading
            variant="base"
            overflow="hidden"
            fontWeight="bold"
            textOverflow="ellipsis"
            id={labelledBy}
          >
            {title}
          </Heading>
          <Text variant="xs" color="colors.zinc.500" overflow="hidden">
            {description}
          </Text>
        </VStack>
        {imageSrc !== "" && (
          <Image
            width="100%"
            height="100%"
            gridColumn="span 1 / span 1"
            className={css`
              object-fit: cover;
            `}
            src={imageSrc}
            alt={title}
          />
        )}
      </Link>
    </Box>
  );
};

interface Props {
  url: string;
}

export const RichLinkCard = async ({ url }: Props) => {
  const result = await getOGP(url);
  return <RichLinkCardInner {...result} />;
};
