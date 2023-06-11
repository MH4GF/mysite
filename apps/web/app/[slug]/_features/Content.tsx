import { getMarkdownContent } from '@project/markdown-renderer'

import { MarkdownContent } from '../../_components/MarkdownContent'
import { rootJoin } from '../../_utils'

interface Props {
  slug: string
  handleNotFound: () => void
}

// @ts-expect-error Async Server Component
export const Content = async ({ slug, handleNotFound }: Props): JSX.Element => {
  const filePath = rootJoin(`contents/about/${slug}.md`)
  const content = await getMarkdownContent(filePath, handleNotFound)

  return <MarkdownContent>{content}</MarkdownContent>
}
