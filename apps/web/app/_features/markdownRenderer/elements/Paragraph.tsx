import { type ReactNode, type ComponentProps, Children } from 'react'
import { z } from 'zod'

import { RichLinkCard } from '../../richLinkCard'

type Props = ComponentProps<'p'>

const maybeSingleUrl = (_children: ReactNode): string | null => {
  const children = Children.toArray(_children)
  if (children.length === 0) return null

  const parsed = z.string().url().safeParse(children[0])
  return parsed.success ? parsed.data : null
}

export const Paragraph = ({ children }: Props) => {
  const maybeUrl = maybeSingleUrl(children)
  if (maybeUrl !== null) {
    return <RichLinkCard url={maybeUrl} />
  }

  return <p>{children}</p>
}
