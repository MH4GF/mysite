import { MarkdownContent } from '@/app/_features'
import { rootJoin } from '@/app/_utils'

interface Props {
  slug: string
  handleNotFound: () => void
}

export const Article = ({ slug, handleNotFound }: Props): JSX.Element => {
  const filePath = rootJoin(`contents/articles/${slug}.md`)

  return <MarkdownContent filePath={filePath} handleNotFound={handleNotFound} />
}
