import type { PropsWithChildren } from 'react'

export const MarkdownContent = ({ children }: PropsWithChildren) => (
  <article className="prose dark:prose-invert">{children}</article>
)
