import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Article } from "../Article";

// Article.tsx は "@/app/_features" のバレル経由で getArticle / getAdjacentArticles /
// MarkdownRenderer / UniversalLink を import している。MarkdownRenderer は async RSC で
// あり（ストーリー化不可、storyExclusions で RSC 除外済み）、getArticle は contentlayer/generated
// に依存するため、ここでは4つとも決定的なテストダブルに差し替える。
// Article 自身は同期関数であり、この呼び出しは React の描画（reconciler）を経由しないため、
// MarkdownRenderer 等の子コンポーネント本体が実行されることはない
// （JSX 参照は type/props を保持する Element オブジェクトを作るだけ）。
const mocks = vi.hoisted(() => ({
  getArticle: vi.fn(),
  getAdjacentArticles: vi.fn(),
  MarkdownRenderer: () => null,
  UniversalLink: () => null,
}));

vi.mock("@/app/_features", () => mocks);

// ArticleMetaDetail は "@/app/_components" バレル経由で MyAvatar → ui/dialog を module load する。
// これらはブラウザ（storybook プロジェクト）のストーリーで実行カバーされるが、Node 側で
// import だけされると、プロジェクト間でトランスフォームの関数位置がずれて v8 カバレッジの
// マージ時に「未実行の関数」として二重計上されてしまうため、unit テストでは読み込ませない。
// このテストは metaDetail の props のみを検証しており、コンポーネント実体には依存しない
vi.mock("../ArticleMetaDetail", () => ({ ArticleMetaDetail: () => null }));

const mockArticle = {
  href: "/blog/test-article",
  body: { raw: "# Hello World" },
};

const mockAdjacent = { older: undefined, newer: undefined };

describe("Article", () => {
  it("calls handleNotFound and renders nothing when the article is not found", () => {
    mocks.getArticle.mockReturnValue(undefined);
    const handleNotFound = vi.fn();

    const result = Article({ slug: "missing", handleNotFound });

    expect(mocks.getArticle).toHaveBeenCalledWith("/blog/missing");
    expect(handleNotFound).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });

  it("assembles the article tree from getArticle and getAdjacentArticles when found", () => {
    mocks.getArticle.mockReturnValue(mockArticle);
    mocks.getAdjacentArticles.mockReturnValue(mockAdjacent);
    const handleNotFound = vi.fn();

    const element = Article({ slug: "test-article", handleNotFound });

    expect(handleNotFound).not.toHaveBeenCalled();
    expect(mocks.getArticle).toHaveBeenCalledWith("/blog/test-article");
    expect(mocks.getAdjacentArticles).toHaveBeenCalledWith(mockArticle.href);

    if (!isValidElement(element)) {
      throw new Error("Article did not return a valid React element");
    }

    expect(element.type).toBe("div");
    const props = element.props as { "data-pagefind-body": boolean; children: ReactNode };
    expect(props["data-pagefind-body"]).toBe(true);

    const children = Children.toArray(props.children).filter(isValidElement);
    expect(children).toHaveLength(4);

    const [backLink, metaDetail, markdownWrapper, navigation] = children;

    expect(backLink?.type).toBe(mocks.UniversalLink);
    expect((backLink?.props as { href: string }).href).toBe("/blog");

    const metaDetailProps = metaDetail?.props as { article: unknown; markdownUrl: string };
    expect(metaDetailProps.article).toBe(mockArticle);
    expect(metaDetailProps.markdownUrl).toBe("/blog/test-article.md");

    expect(markdownWrapper?.type).toBe("div");
    const markdownChild = (markdownWrapper?.props as { children: ReactElement }).children;
    expect(markdownChild.type).toBe(mocks.MarkdownRenderer);
    expect((markdownChild.props as { raw: string }).raw).toBe(mockArticle.body.raw);

    expect(navigation?.props).toStrictEqual(mockAdjacent);
  });
});
