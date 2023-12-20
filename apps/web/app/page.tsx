import { Flex, Grid, HStack, Heading } from '@kuma-ui/core'
import type { Metadata } from 'next'
import Link from 'next/link'

import { MyAvatar, SocialLink } from './_components'
import { siteInfo } from './_utils'

export default function Page() {
  return (
    <Grid gap={['1rem', '2rem']}>
      <Flex flexDir={['column', 'row']} gap={['1rem', '2rem']} alignItems="center">
        <MyAvatar />
        <Heading fontWeight="bold" fontSize={['1.875rem', '3rem']}>
          Hirotaka Miyagi
        </Heading>
      </Flex>
      <p>I'm a software engineer based in Tokyo, Japan.</p>
      <HStack gap={['0.5rem', '1rem']}>
        <SocialLink kind="twitter" />
        <SocialLink kind="github" />
      </HStack>
      <ul>
        <li>
          <Link href="/readme">📝 取扱説明書</Link>
        </li>
        <li>
          <Link href="/behavior">🚲 好む振る舞い</Link>
        </li>
        <li>
          <Link href="/thinking-in-career">⛰️ キャリアの指向性(脳内メモ)</Link>
        </li>
        <li>
          <Link href="/resume">👋 Resume</Link>
        </li>
      </ul>
    </Grid>
  )
}

export const metadata: Metadata = {
  title: `MH4GF | ${siteInfo.siteName}`,
}
