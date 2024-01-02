import { Box, Heading } from "@kuma-ui/core";

import type { ArticleMeta } from "@/app/_features";
import { MarkdownContent, getArticleMeta } from "@/app/_features";
import { format, rootJoin } from "@/app/_utils";

const ArticleMetaDetail = ({
  meta: { publishedAt: _publishedAt, title },
}: { meta: ArticleMeta }) => {
  const publishedAt = format(_publishedAt);

  return (
    <div>
      <Heading variant="xl4" fontWeight={800}>
        {title}
      </Heading>
      <Box display="flex" justifyContent="flex-end">
        <Box as="time" dateTime={publishedAt} color={"colors.zinc.500"}>
          {publishedAt}
        </Box>
      </Box>
    </div>
  );
};

interface Props {
  slug: string;
  handleNotFound: () => void;
}

export const Article = async ({ slug, handleNotFound }: Props) => {
  const filePath = rootJoin(`contents/articles/${slug}.md`);
  const meta = await getArticleMeta(slug);

  return (
    <>
      {meta && <ArticleMetaDetail meta={meta} />}
      <MarkdownContent filePath={filePath} handleNotFound={handleNotFound} />
    </>
  );
};
