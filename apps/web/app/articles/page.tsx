import { Box, Grid, Heading } from "@kuma-ui/core";
import type { Metadata } from "next";

import { RssIcon } from "../_components";
import { Link } from "../_features/viewTransition";
import { siteInfo } from "../_utils";

import { ArticleList } from "./_features";

export default function Page() {
  return (
    <Grid gap="2rem">
      <Heading
        as="h1"
        display="flex"
        alignItems="center"
        fontWeight="bold"
        variant="xl3"
        gap="0.5rem"
      >
        <span>Articles</span>
        <Link href="/articles/feed">
          <Box as={RssIcon} height={"1.5rem"} width={"1.5rem"} />
        </Link>
      </Heading>
      <ArticleList />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: `Articles | ${siteInfo.siteName}`,
};
