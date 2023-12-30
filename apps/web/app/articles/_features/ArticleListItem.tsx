import { HStack, Heading, Link as KumaLink, Spacer, Text } from "@kuma-ui/core";

import { Tag } from "./Tag";

import type { ArticleMeta } from "@/app/_features";
import { Link } from "@/app/_features/viewTransition";
import { format } from "@/app/_utils";

type LinkProps<T extends string> = Pick<Props<T>, "href" | "title">;

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
        <title>External Link</title>
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
  const publishedAt = format(_publishedAt);

  return (
    <article>
      <Heading as="h2" variant="xl">
        {externalLink ? (
          <ExternalLink href={href} title={title} />
        ) : (
          <Link href={href}>{title}</Link>
        )}
      </Heading>
      <Spacer size={"0.5rem"} />
      <HStack justify={"space-between"}>
        <HStack gap="0.5rem">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </HStack>
        <Text color={"colors.zinc.500"}>{publishedAt}</Text>
      </HStack>
    </article>
  );
};
