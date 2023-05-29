import type { ComponentProps } from 'react'

import { ArticleList } from './_features/ArticleList'

const data: ComponentProps<typeof ArticleList>['articles'] = [
  {
    title: 'GraphQL Code Generator v3 Roadmapで推されているclient-presetを紹介する',
    href: '/articles',
    publishedAt: '2023/1/26',
    tags: [],
  },
  {
    title: 'graphql-codegenとzodのz.brandでCustom ScalarのNominal Typingを実現する例',
    href: '/articles',
    publishedAt: '2023/1/10',
    tags: [],
  },
]

export default function Page() {
  return <ArticleList articles={data} />
}
