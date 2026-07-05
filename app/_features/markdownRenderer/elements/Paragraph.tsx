import { Children, type ComponentProps, isValidElement, type ReactNode } from "react";
import { z } from "zod";

type Props = ComponentProps<"p"> & {
  /**
   * 単体URL段落をリンクカードとして描画するためのレンダラ。
   *
   * リンクカードの実体（RichLinkCard 等の async RSC）を直接 import せず props で注入することで、
   * この共有コンポーネントを外部依存から切り離す（SPEC.md「アーキテクチャ制約」: 外部依存は
   * モック可能な境界を経由する）。実配線は processor.tsx が行う
   */
  renderRichLinkCard?: (url: string) => ReactNode;
};

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
  // isValidElement を通過した要素の props は必ず定義されるため、?. ではなく . でアクセスする
  // （到達不能な nullish 分岐を作らず、分岐カバレッジ 100% を保つ）
  // @ts-expect-error ...  FIXME
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const urlChildren = Children.toArray(children[0].props.children ?? []);

  if (urlChildren.length !== 1) {
    return null;
  }
  const parsed = urlSchema.safeParse(urlChildren[0]);
  return parsed.success ? parsed.data : null;
};

export const Paragraph = ({ children, renderRichLinkCard }: Props) => {
  const maybeUrl = maybeSingleUrl(children);
  if (maybeUrl === null || renderRichLinkCard === undefined) {
    return <p>{children}</p>;
  }

  return <div className="not-prose my-5">{renderRichLinkCard(maybeUrl)}</div>;
};
