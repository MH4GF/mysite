import { Heading } from '@kuma-ui/core'
import { notFound } from 'next/navigation'

import { MarkdownContent } from '@/app/_features'
import { rootJoin } from '@/app/_utils'

export default function Page() {
  const filePath = rootJoin(`app/dev/testing-markdown-renderer/sample.md`)

  return (
    <main>
      <Heading as="h1" fontWeight="bold" fontSize={['1.875rem', '3rem']}>
        Testing Markdown Renderer
      </Heading>
      <MarkdownContent filePath={filePath} handleNotFound={notFound} />
    </main>
  )
}
