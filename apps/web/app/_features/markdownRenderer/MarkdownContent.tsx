import { getMarkdownContent } from './getMarkdownContent'

interface Props {
  filePath: string
  handleNotFound: () => void
}

export const MarkdownContent = async ({ filePath, handleNotFound }: Props) => {
  const article = await getMarkdownContent(filePath, handleNotFound)

  return <article className="prose dark:prose-invert">{article}</article>
}
