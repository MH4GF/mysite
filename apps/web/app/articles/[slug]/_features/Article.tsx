import path from 'path'

import { getMarkdownContent } from '@project/markdown-renderer'

import { MarkdownContent } from '../../../_components/MarkdownContent'
import { env } from '../../../env'

interface Props {
  slug: string
  handleNotFound: () => void
}

// @ts-expect-error Async Server Component
export const Article = async ({ slug, handleNotFound }: Props): JSX.Element => {
  const filePath = path.join(env.PNPM_SCRIPT_SRC_DIR, `contents/articles/${slug}.md`)
  const article = await getMarkdownContent(filePath, handleNotFound)

  return <MarkdownContent>{article}</MarkdownContent>
}
