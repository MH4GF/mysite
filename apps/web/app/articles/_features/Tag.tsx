import clsx from 'clsx'
import { match } from 'ts-pattern'

import type { TagEnum } from '@/app/_features'

interface Props {
  tag: TagEnum
}

export const Tag = ({ tag }: Props) => {
  const colors = match(tag)
    .with('ROUTE06 Tech Blog', () => ['bg-blue-600', 'dark:bg-blue-900'])
    .with('Timee Product Team Blog', () => ['bg-yellow-400', 'dark:bg-yellow-600'])
    .with('Zenn', () => ['bg-sky-600', 'dark:bg-sky-700'])
    .with('Dev', () => ['bg-orange-600', 'dark:bg-orange-700'])
    .with('Life', () => ['bg-rose-700'])
    .with('note', () => ['bg-green-600', 'dark:bg-green-700'])
    .with('Qiita', () => ['bg-teal-500', 'dark:bg-teal-700'])
    .exhaustive()

  return <span className={clsx(colors, 'rounded px-1 py-px text-sm text-white')}>{tag}</span>
}
