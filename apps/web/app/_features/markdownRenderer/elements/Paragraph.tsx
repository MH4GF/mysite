import { type ReactNode, type ComponentProps, Children } from 'react'
import { z } from 'zod'

import { RichLinkCard } from '../../richLinkCard'
import { TweetEmbed } from '../../tweetEmbed'

type Props = ComponentProps<'p'>

const maybeSingleUrl = (_children: ReactNode): string | null => {
  const children = Children.toArray(_children)
  if (children.length === 0) return null

  const parsed = z.string().url().safeParse(children[0])
  return parsed.success ? parsed.data : null
}

const parseTweetId = (url: string): string | null => {
  const regex = /https:\/\/twitter.com\/\w+\/status\/(\d+)/
  const result = url.match(regex)
  return result?.at(1) ?? null
}

export const Paragraph = ({ children }: Props) => {
  const maybeUrl = maybeSingleUrl(children)
  if (maybeUrl === null) return <p>{children}</p>

  const maybeTweetId = parseTweetId(maybeUrl)
  if (maybeTweetId !== null) return <TweetEmbed tweetId={maybeTweetId} />

  // TODO: RichLinkCardをelements以下に移動する
  return <RichLinkCard url={maybeUrl} />
}
