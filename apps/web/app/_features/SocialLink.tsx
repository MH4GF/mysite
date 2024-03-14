import type { Route } from "next";

import type { IconComponent } from "../_components";
import { GitHubIcon, XIcon } from "../_components";

import { UniversalLink } from "./viewTransition";

type SocialKind = "x" | "github";
type Socials = Record<SocialKind, { Icon: IconComponent; url: string; props: object; alt: string }>;

const socials: Socials = {
  x: {
    Icon: XIcon,
    url: "https://x.com/MH4GF",
    props: { className: "h-4 w-4" },
    alt: "X プロフィール",
  },
  github: {
    Icon: GitHubIcon,
    url: "https://github.com/MH4GF",
    props: { className: "h-6 w-6" },
    alt: "GitHub プロフィール",
  },
};

interface Props {
  kind: SocialKind;
}

export const SocialLink = ({ kind }: Props) => {
  const { Icon, url, props, alt } = socials[kind];

  return (
    <UniversalLink className="group -m-1 p-1" href={url as Route} aria-label={alt}>
      <Icon {...props} />
    </UniversalLink>
  );
};
