import Image from "next/image";

import avatar from "@/public/images/avatar.jpeg";

export const MyAvatar = () => {
  return (
    <Image
      src={avatar}
      alt="MH4GFのプロフィール画像"
      width="150"
      height="150"
      placeholder="blur"
      className="inline-block rounded-full"
      priority
    />
  );
};
