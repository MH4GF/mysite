import path from 'path'

import { getMarkdownContent } from '@project/markdown-renderer'

import { MarkdownContent } from '../../_components/MarkdownContent'
import { env } from '../../env'

interface Props {
  slug: string
  handleNotFound: () => void
}

// @ts-expect-error Async Server Component
export const Content = async ({ slug, handleNotFound }: Props): JSX.Element => {
  const filePath = path.join(env.PNPM_SCRIPT_SRC_DIR, `contents/about/${slug}.md`)
  const content = await getMarkdownContent(filePath, handleNotFound)

  return <MarkdownContent>{content}</MarkdownContent>
}
