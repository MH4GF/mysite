/* eslint-disable @next/next/no-img-element */
import { useId } from 'react'

import { getOGP } from './getOGP'
import type { OGPResult } from './types'

type RichLinkCardInnerProps = OGPResult

const RichLinkCardInner = ({ url, title, description, imageSrc }: RichLinkCardInnerProps) => {
  const labelledBy = useId()

  return (
    <section
      className={`not-prose h-24 w-full rounded-sm border border-solid hover:cursor-pointer`}
      aria-labelledby={labelledBy}
    >
      <a
        className="grid h-full grid-flow-row-dense grid-cols-4"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="col-span-3 flex flex-col gap-2 overflow-hidden p-2">
          <h1 className="overflow-hidden text-ellipsis text-base font-bold" id={labelledBy}>
            {title}
          </h1>
          <p className="overflow-hidden text-sm">{description}</p>
        </div>
        <img className="col-span-1 h-full w-full object-cover" src={imageSrc} alt={title} />
      </a>
    </section>
  )
}

interface Props {
  url: string
}

export const RichLinkCard = async ({ url }: Props) => {
  const result = await getOGP(url)
  return <RichLinkCardInner {...result} />
}
