import { MarkdownContent } from '@/app/_features'
import { rootJoin } from '@/app/_utils'

interface Props {
  slug: string
  handleNotFound: () => void
}

export const Content = ({ slug, handleNotFound }: Props): JSX.Element => {
  const filePath = rootJoin(`contents/about/${slug}.md`)

  return <MarkdownContent filePath={filePath} handleNotFound={handleNotFound} />
}
