import { HStack, Heading, Link as KumaLink, Spacer, Text } from "@kuma-ui/core";
import { format } from "date-fns";
import Link from "next/link";

import { Tag } from "./Tag";

import type { ArticleMeta } from "@/app/_features";

type LinkProps<T extends string> = Pick<Props<T>, "href" | "title">;

const InternalLink = <T extends string>({ href, title }: LinkProps<T>) => {
  return (
    <Link href={href} legacyBehavior>
      <KumaLink>{title}</KumaLink>
    </Link>
  );
};

const ExternalLink = <T extends string>({ href, title }: LinkProps<T>) => {
  return (
    <KumaLink href={href} target="_blank" rel="noreferrer">
      {title}
      <svg
        className="ml-1 inline-block h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </KumaLink>
  );
};

type Props<T extends string> = ArticleMeta<T>;

export const ArticleListItem = <T extends string>({
  title,
  href,
  externalLink,
  publishedAt: _publishedAt,
  tags,
}: Props<T>) => {
  const publishedAt = format(_publishedAt, "yyyy/MM/dd");

  return (
    <article>
      <Heading as="h2" variant="xl">
        {externalLink ? (
          <ExternalLink href={href} title={title} />
        ) : (
          <InternalLink href={href} title={title} />
        )}
      </Heading>
      <Spacer size={"0.5rem"} />
      <HStack justify={"space-between"}>
        <HStack gap="0.5rem">
          {tags.map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}
        </HStack>
        <Text color={"colors.zinc.500"}>{publishedAt}</Text>
      </HStack>
    </article>
  );
};
