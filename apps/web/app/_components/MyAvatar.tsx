import Image from 'next/image'

import { externalLinks } from '../_utils/externalLinks'

export const MyAvatar = () => {
  return (
    <Image
      src={externalLinks.avatar}
      alt="MH4GF's user image"
      width="150"
      height="150"
      className="inline-block rounded-full"
    />
  )
}