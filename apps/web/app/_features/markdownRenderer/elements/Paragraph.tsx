import { Children, type ComponentProps, type ReactNode, isValidElement } from "react";
import { z } from "zod";

import { RichLinkCard } from "../../richLinkCard";
import { TweetEmbed } from "../../tweetEmbed";

type Props = ComponentProps<"p">;

const urlSchema = z.string().url();

/**
 *
 * 以下のような単体のURLテキストを識別する
 * ```markdown
 * https://mh4gf.dev
 * ```
 * これはprocessorを通すと`<p><a href="https://mh4gf.dev">https://mh4gf.dev</a></p>`のような形で渡ってくる
 */
const maybeSingleUrl = (_children: ReactNode): string | null => {
  const children = Children.toArray(_children);
  if (!(children.length === 1 && isValidElement(children[0]))) return null;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const urlChildren = Children.toArray(children[0].props?.children ?? []);

  if (urlChildren.length !== 1) return null;
  const parsed = urlSchema.safeParse(urlChildren[0]);
  return parsed.success ? parsed.data : null;
};

const parseTweetId = (url: string): string | null => {
  const regex = /https:\/\/twitter.com\/\w+\/status\/(\d+)/;
  const result = url.match(regex);
  return result?.at(1) ?? null;
};

export const Paragraph = ({ children }: Props) => {
  const maybeUrl = maybeSingleUrl(children);
  if (maybeUrl === null) return <p>{children}</p>;

  const maybeTweetId = parseTweetId(maybeUrl);
  if (maybeTweetId !== null) return <TweetEmbed tweetId={maybeTweetId} />;

  // TODO: RichLinkCardをelements以下に移動する
  return <RichLinkCard url={maybeUrl} />;
};
