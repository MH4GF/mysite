import { Box, Grid, HStack } from '@kuma-ui/core';
import Link from 'next/link';

import { RssIcon } from '../_components';

import { ArticleList } from './_features';

export default function Page() {
  return (
    <Grid gap="2rem">
      <HStack
        as="h1"
        alignItems="center"
        fontWeight="bold"
        fontSize={['1.5rem', '1.875rem']}
        lineHeight={['2rem', '2.25rem']}
        gap="0.5rem"
      >
        <span>Articles</span>
        <Link href="/articles/feed">
          <Box as={RssIcon} height={'1.5rem'} width={'1.5rem'} />
        </Link>
      </HStack>
      <ArticleList />
    </Grid>
  );
}
