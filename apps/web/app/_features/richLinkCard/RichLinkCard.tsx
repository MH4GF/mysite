import { useId } from 'react'

interface RichLinkCardInnerProps {
  url: string
  title?: string
  description?: string
  imageSrc?: string
}

const RichLinkCardInner = ({ url, title, description, imageSrc }: RichLinkCardInnerProps) => {
  const labelledBy = useId()

  return (
    <section aria-labelledby={labelledBy}>
      <a href={url} target="_blank" rel="noreferrer">
        <div>
          <h1 id={labelledBy}>{title}</h1>
          <p>{description}</p>
        </div>
        <img src={imageSrc} alt={title} />
      </a>
    </section>
  )
}

interface Props {
  url: string
}

export const RichLinkCard = ({ url }: Props) => {
  return <RichLinkCardInner url={url} />
}
