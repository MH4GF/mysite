import type { IconComponent } from "./Icons";
import { GitHubIcon, Icon, TwitterIcon } from "./Icons";

type SocialKind = "twitter" | "github";
type Socials = Record<SocialKind, { icon: IconComponent; url: string }>;

const socials: Socials = {
  twitter: {
    icon: TwitterIcon,
    url: "https://twitter.com/MH4GF",
  },
  github: {
    icon: GitHubIcon,
    url: "https://github.com/MH4GF",
  },
};

interface Props {
  kind: SocialKind;
}

export const SocialLink = ({ kind }: Props) => {
  const { icon, url } = socials[kind];

  return (
    <a className="group -m-1 p-1" href={url}>
      <Icon as={icon} />
    </a>
  );
};
