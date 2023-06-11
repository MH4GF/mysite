import { getMarkdownContent } from '@project/markdown-renderer'

import { MarkdownContent } from '../../../_components/MarkdownContent'
import { rootJoin } from '../../../_utils'

interface Props {
  slug: string
  handleNotFound: () => void
}

// @ts-expect-error Async Server Component
export const Article = async ({ slug, handleNotFound }: Props): JSX.Element => {
  const filePath = rootJoin(`contents/articles/${slug}.md`)
  const article = await getMarkdownContent(filePath, handleNotFound)

  return <MarkdownContent>{article}</MarkdownContent>
}
