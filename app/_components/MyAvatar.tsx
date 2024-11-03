import Image from "next/image";

import avatar from "@/public/images/avatar.jpeg";
import { Root as VisuallyHiddenRoot } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";

export const MyAvatar = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src={avatar}
          alt="MH4GF profile picture"
          width="32"
          height="32"
          className="inline-block rounded-full"
          priority
        />
      </DialogTrigger>
      <DialogContent className="border-none bg-transparent justify-items-center">
        <Image
          src={avatar}
          alt="MH4GF profile picture"
          width="256"
          height="256"
          placeholder="blur"
          className="rounded-full"
          priority
        />
        <VisuallyHiddenRoot>
          <DialogTitle>MH4GF profile picture</DialogTitle>
        </VisuallyHiddenRoot>
        <DialogDescription>
          MH4GF profile picture. The rabbit in the front, his name is Ponpoko.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
