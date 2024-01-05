import type { IconComponent } from "./Icons";
import { GitHubIcon, TwitterIcon } from "./Icons";

type SocialKind = "twitter" | "github";
type Socials = Record<SocialKind, { Icon: IconComponent; url: string }>;

const socials: Socials = {
  twitter: {
    Icon: TwitterIcon,
    url: "https://twitter.com/MH4GF",
  },
  github: {
    Icon: GitHubIcon,
    url: "https://github.com/MH4GF",
  },
};

interface Props {
  kind: SocialKind;
}

export const SocialLink = ({ kind }: Props) => {
  const { Icon, url } = socials[kind];

  return (
    <a className="group -m-1 p-1" href={url}>
      <Icon />
    </a>
  );
};
