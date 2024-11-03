import { Children, type ComponentProps, type ReactNode, isValidElement } from "react";
import { z } from "zod";

import { RichLinkCard } from "../../richLinkCard";

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
  if (!(children.length === 1 && isValidElement(children[0]))) {
    return null;
  }
  // @ts-expect-error ... FIXME
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const urlChildren = Children.toArray(children[0].props?.children ?? []);

  if (urlChildren.length !== 1) {
    return null;
  }
  const parsed = urlSchema.safeParse(urlChildren[0]);
  return parsed.success ? parsed.data : null;
};

export const Paragraph = ({ children }: Props) => {
  const maybeUrl = maybeSingleUrl(children);
  if (maybeUrl === null) {
    return <p>{children}</p>;
  }

  // TODO: RichLinkCardをelements以下に移動する
  return (
    <div className="not-prose my-5">
      <RichLinkCard url={maybeUrl} />
    </div>
  );
};
