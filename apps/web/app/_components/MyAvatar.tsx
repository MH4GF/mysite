import Image from "next/image";

import { externalLinks } from "@/app/_utils";

export const MyAvatar = () => {
  return (
    <Image
      src={externalLinks.avatar}
      alt="MH4GFのプロフィール画像"
      width="150"
      height="150"
      className="inline-block rounded-full"
      priority
    />
  );
};
